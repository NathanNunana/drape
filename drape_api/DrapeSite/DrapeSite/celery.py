from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DrapeSite.settings')

app = Celery('DrapeSite')

# Load configuration from Django settings, with a 'CELERY' prefix
app.config_from_object('django.conf:settings', namespace='CELERY')

# Discover and load tasks.py in Django apps automatically
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
