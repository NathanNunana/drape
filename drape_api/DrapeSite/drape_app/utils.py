from django.core.mail import EmailMultiAlternatives
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_email(subject, text_content, html_content, recipient_list):
    """Send an email with the given subject, text, and HTML content to the recipient list."""
    email = EmailMultiAlternatives(
        subject, 
        text_content, 
        settings.EMAIL_HOST_USER, 
        recipient_list
        )
    
    email.attach_alternative(html_content, "text/html")
    
    try:
        email.send()
        logger.info(f'Email sent successfully to {recipient_list}')
    except Exception as e:
        logger.error(f'Failed to send email to {recipient_list}: {e}')
