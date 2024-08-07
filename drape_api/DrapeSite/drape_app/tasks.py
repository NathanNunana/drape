# schedule/tasks.py

from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.timezone import now
from django.conf import settings
from drape_app.models import Schedule
from datetime import timedelta

@shared_task
def send_reminder_email(user_email, subject, text_content, html_content):
    email = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [user_email])
    email.attach_alternative(html_content, "text/html")
    email.send()

@shared_task
def schedule_reminders():
    tomorrow = now() + timedelta(days=1)
    schedules_start = Schedule.objects.filter(start_date=tomorrow.date())
    schedules_due = Schedule.objects.filter(due_date=tomorrow.date())

    for schedule in schedules_start:
        context = {
            'user': schedule.user,
            'product': schedule.product,
            'start_date': schedule.start_date
        }
        text_content = render_to_string('emails/start_reminder.html', context)
        html_content = render_to_string('emails/start_reminder.html', context)
        send_reminder_email.apply_async(
            args=[
                schedule.user.email,
                'Reminder: Your service is starting soon',
                text_content,
                html_content
            ]
        )

    for schedule in schedules_due:
        context = {
            'user': schedule.user,
            'product': schedule.product,
            'due_date': schedule.due_date
        }
        text_content = render_to_string('emails/due_reminder.html', context)
        html_content = render_to_string('emails/due_reminder.html', context)
        send_reminder_email.apply_async(
            args=[
                schedule.user.email,
                'Reminder: Your service is due soon',
                text_content,
                html_content
            ]
        )
