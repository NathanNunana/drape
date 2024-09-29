from django.apps import AppConfig

class DrapeAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'drape_app'

    def ready(self):
        import drape_app.scheduler  # This will trigger the scheduler
