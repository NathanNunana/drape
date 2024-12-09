
from django_apscheduler.jobstores import DjangoJobStore
from apscheduler.schedulers.background import BackgroundScheduler
from drape_app.scheduler import schedule_reminders

def start_scheduler(sender, **kwargs):
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")
    scheduler.add_job(schedule_reminders, 'interval', hours=24, misfire_grace_time=3600)  # Grace period for missed jobs
    scheduler.start()
