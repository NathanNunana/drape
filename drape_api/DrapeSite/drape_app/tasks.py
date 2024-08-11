from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.timezone import now
from django.conf import settings
from drape_app.models import Schedule
from datetime import timedelta
import logging

# Set up logging
logger = logging.getLogger(__name__)

@shared_task
def send_reminder_email(user_email, subject, text_content, html_content):
    try:
        email = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [user_email])
        email.attach_alternative(html_content, "text/html")
        email.send()
        logger.info(f'Reminder email sent to {user_email}')
    except Exception as e:
        logger.error(f'Failed to send reminder email to {user_email}: {e}')

@shared_task
def schedule_reminders():
    try:
        tomorrow = now() + timedelta(days=1)  # Calculate the time for tomorrow
        # Get all schedules starting tomorrow
        schedules_start = Schedule.objects.filter(start_date__date=tomorrow.date())
        # Get all schedules due tomorrow
        schedules_due = Schedule.objects.filter(due_date__date=tomorrow.date())

        # Send reminder for schedules starting soon
        for schedule in schedules_start:
            try:
                context = {
                    'user': schedule.user,
                    'product': schedule.product,
                    'start_date': schedule.start_date
                }
                text_content = render_to_string('emails/start_reminder.txt', context)
                html_content = render_to_string('emails/start_reminder.html', context)
                send_reminder_email.apply_async(
                    args=[
                        schedule.user.email,
                        'Reminder: Your service is starting soon',
                        text_content,
                        html_content
                    ]
                )
            except Exception as e:
                logger.error(f'Error scheduling start reminder for {schedule.user.email}: {e}')

        # Send reminder for schedules due soon
        for schedule in schedules_due:
            try:
                context = {
                    'user': schedule.user,
                    'product': schedule.product,
                    'due_date': schedule.due_date
                }
                text_content = render_to_string('emails/due_reminder.txt', context)
                html_content = render_to_string('emails/due_reminder.html', context)
                send_reminder_email.apply_async(
                    args=[
                        schedule.user.email,
                        'Reminder: Your service is due soon',
                        text_content,
                        html_content
                    ]
                )
            except Exception as e:
                logger.error(f'Error scheduling due reminder for {schedule.user.email}: {e}')

    except Exception as e:
        logger.error(f'Failed to schedule reminders: {e}')
