from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.template.loader import render_to_string
from django.conf import settings


def get_base_host(request):
    scheme = 'https' if request.is_secure() else 'http'
    host = request.get_host()
    return f"{scheme}://{host}"


def send_activation_email(user, request):
    current_site = get_current_site(request)
    domain = get_base_host(request)
    subject = "Activate Your Account"
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    activation_url = f"{domain}/activate/{uid}/{token}/"
    message = render_to_string(
        "emails/account_activation.html",
        {
            "user": user,
            "activation_url": activation_url,
        },
    )
    text_content = strip_tags(message)
    email_message = EmailMultiAlternatives(
        subject,
        text_content,
        settings.EMAIL_HOST_USER,
        [user.email],
    )
    email_message.attach_alternative(message, "text/html")
    email_message.send()


def send_password_reset_email(user, request):
    base_host = get_base_host(request)
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.id))
    reset_link = f"{base_host}/password-reset-confirm/{uid}/{token}/"

    subject = "Reset Your Password"
    message = render_to_string('emails/password_reset.html', {
        'user': user,
        'reset_link': reset_link,
    })
    email = EmailMultiAlternatives(
        subject,
        message,
        from_email=settings.EMAIL_HOST_USER,
        to=[user.email]
    )
    email.content_subtype = 'html'  # Setting the content type to HTML
    email.send()
