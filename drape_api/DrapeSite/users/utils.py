from django.core.mail import EmailMessage
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.template.loader import render_to_string



def get_base_host(request):
    scheme = 'https' if request.is_secure() else 'http'
    host = request.get_host()
    return f"{scheme}://{host}"

def send_activation_email(user, request):
    base_host = get_base_host(request)
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    activation_link = f"{base_host}/activate/{uid}/{token}/"

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

def send_password_reset_email(user, request):
    base_host = get_base_host(request)
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.id))
    reset_link = f"{base_host}/reset-password/{uid}/{token}/"

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
