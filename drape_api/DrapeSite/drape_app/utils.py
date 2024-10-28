from django.core.mail import EmailMultiAlternatives
from django.conf import settings
import logging
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)

def send_email(subject, text_content, html_content, recipient_list):
    """Send an email with the given subject, text, and HTML content to the recipient list."""
    email = EmailMultiAlternatives(
        subject=subject, 
        body=text_content, 
        from_email=settings.EMAIL_HOST_USER, 
        to=recipient_list
    )
    email.attach_alternative(html_content, "text/html")
    
    try:
        email.send()
        logger.info(f'Email sent successfully to {recipient_list}')
    except Exception as e:
        logger.error(f'Failed to send email to {recipient_list}: {e}')


def send_newsletter_email(post):
    """
    Retrieve all subscribed emails and send them the newsletter content.
    """
    # Import Newsletter model here to avoid circular import
    from .models import Newsletter

    # Retrieve all subscribed emails
    recipient_list = list(Newsletter.objects.values_list('email', flat=True))
    
    if not recipient_list:
        logger.warning("No subscribers found for the newsletter.")
        return  # Exit if there are no subscribers

    # Prepare email content
    subject = post.subject
    text_content = post.news_content
    html_content = render_to_string('emails/newsletter_post.html', {
        'title': post.title,
        'content': post.news_content,
        'attachments': post.attachments.all(),
    })

    # Initialize email with attachments
    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list
    )
    email.attach_alternative(html_content, "text/html")

    # Attach files to the email
    for attachment in post.attachments.all():
        if attachment.file:
            email.attach_file(attachment.file.path)

    # Send email and handle errors
    try:
        email.send()
        logger.info(f'Newsletter sent successfully to {len(recipient_list)} subscribers.')
    except Exception as e:
        logger.error(f'Failed to send newsletter: {e}')
