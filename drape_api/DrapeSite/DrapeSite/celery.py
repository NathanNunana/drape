from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings
from celery.schedules import crontab


# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DrapeSite.settings')

app = Celery('DrapeSite')

# Load configuration from Django settings, with a 'CELERY' prefix
app.config_from_object('django.conf:settings', namespace='CELERY')




# Celery Beat schedule
app.conf.beat_schedule = {
    'send-reminder-email': {
        'task': 'drape_app.tasks.schedule_reminders',
        'schedule': crontab(hour=7, minute=31),  # Runs daily at 4 PM Accra time
    },
}

# Discover and load tasks.py in Django apps automatically
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
