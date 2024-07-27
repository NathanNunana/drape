from django.contrib import admin
from users.models import User
from django.utils.translation import gettext as _


admin.site.site_header = _('Drape Site')
admin.site.index_title = _('Drape Admin Dashboard')

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'username', 'first_name', 'last_name', 'date_joined']
    search_fields = ['username', 'email']
    list_filter = ['date_joined']