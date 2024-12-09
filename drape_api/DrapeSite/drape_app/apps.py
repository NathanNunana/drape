from django.apps import AppConfig
from django.db.models.signals import post_migrate


class DrapeAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'drape_app'

    def ready(self):
        from drape_app.signals import start_scheduler
        post_migrate.connect(start_scheduler, sender=self)
