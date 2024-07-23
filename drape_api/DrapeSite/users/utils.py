from django.core.mail import EmailMessage
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.template.loader import render_to_string

def send_activation_email(user, frontend_base_url):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.id))
    activation_link = f"{frontend_base_url}/activate/{uid}/{token}/"
    
    subject = "Activate Your Account"
    message = render_to_string('emails/account_activation.html', {
        'user': user,
        'activation_link': activation_link,
    })
    email = EmailMessage(
        subject,
        message,
        from_email=settings.EMAIL_HOST_USER,
        to=[user.email]
    )
    email.content_subtype = 'html'  # Setting the content type to HTML
    email.send()

def send_password_reset_email(user, frontend_base_url):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.id))
    reset_link = f"{frontend_base_url}/reset-password/{uid}/{token}/"
    
    subject = "Reset Your Password"
    message = render_to_string('emails/password_reset.html', {
        'user': user,
        'reset_link': reset_link,
    })
    email = EmailMessage(
        subject,
        message,
        from_email=settings.EMAIL_HOST_USER,
        to=[user.email]
    )
    email.content_subtype = 'html'  # Setting the content type to HTML
    email.send()
