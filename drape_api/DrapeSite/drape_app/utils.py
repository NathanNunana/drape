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
    Send a newsletter email to all subscribers with the content of a given post.
    """
    # Import Newsletter within the function to avoid circular import
    from .models import Newsletter
    
    # Get subscriber emails from Newsletter model
    recipient_list = list(Newsletter.objects.values_list('email', flat=True))
    if not recipient_list:
        logger.warning("No subscribers found to send the newsletter to.")
        return

    # Prepare email content
    subject = post.subject
    text_content = post.news_content
    html_content = render_to_string('emails/newsletter_post.html', {
        'title': post.title,
        'content': post.news_content,
        'attachments': post.attachments.all(),
    })

    # Initialize email with plain text and HTML versions
    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list
    )
    email.attach_alternative(html_content, "text/html")

    # Attach files if there are any
    for attachment in post.attachments.all():
        if attachment.file:
            email.attach_file(attachment.file.path)

    # Try sending email and log any errors
    try:
        email.send()
        logger.info(f"Newsletter '{subject}' sent to {len(recipient_list)} subscribers.")
        print(f"Newsletter '{subject}' sent to: {recipient_list}")  # Debugging print
    except Exception as e:
        logger.error(f"Failed to send newsletter '{subject}': {e}")
        print(f"Error sending email: {e}")  # Debugging print
