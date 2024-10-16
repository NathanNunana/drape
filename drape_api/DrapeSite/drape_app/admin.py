from django.contrib import admin
from django.utils.html import format_html
from .models import (Address, OpeningHoursType, OpeningHours, Company, ServiceType, Service,
                    AboutUs, Price, Product, ProductType, Analytics, ContactUs, Schedule, 
                    BookForService)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('street_name', 'digital_address', 'city', 'country', 'email')
    search_fields = ('street_name', 'digital_address', 'city', 'country', 'email')

@admin.register(OpeningHoursType)
class OpeningHoursTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(OpeningHours)
class OpeningHoursAdmin(admin.ModelAdmin):
    list_display = ('type', 'duration')
    list_filter = ('type',)
    search_fields = ('type__name', 'duration')

# Optionally, you can also customize the inline admin interface if OpeningHours should be edited inline with OpeningHoursType
class OpeningHoursInline(admin.TabularInline):
    model = OpeningHours
    extra = 1  # Number of empty forms to display

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'logo')
    search_fields = ('name',)
    readonly_fields = ('logo',)  # Optional: To make the logo field read-only

@admin.register(ServiceType)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'service_type', 'image')
    list_filter = ('service_type',)
    search_fields = ('title', 'description', 'operations', 'service_type__name')
    readonly_fields = ('image',)  # Optional: To make the file field read-only

    def image_link(self, obj):
        if obj.image:
            return format_html("<a href='{}'>{}</a>", obj.image.url, obj.image.name)
        return "No file"

    image_link.short_description = "File"
    
@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_display = ('motto', 'company_description', 'image_preview')
    search_fields = ('motto', 'company_description')

    def image_preview(self, obj):
        if obj.image:
            return format_html("<a href='{}'><img src='{}' width='50' height='50' /></a>", obj.image.url, obj.image.url)
        return "No image"

    image_preview.short_description = "Image Preview"

@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ('product', 'price', 'effective_date',)
    search_fields = ('product', 'price',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_type', 'color', 'description')
    search_fields = ('name', 'base_type', 'color', 'description')
    list_filter = ('base_type', 'color')


admin.site.register(ProductType)

@admin.register(Analytics)
class AnalyticsAdmin(admin.ModelAdmin):
    list_display = ('name', 'value', 'file_link')
    search_fields = ('name', 'value')

    def file_link(self, obj):
        if obj.file:
            return format_html("<a href='{}'>{}</a>", obj.file.url, obj.file.name)
        return "No file"

    file_link.short_description = "File"

@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('your_name', 'subject', 'email')
    search_fields = ('your_name', 'subject', 'email', 'message')


class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'services', 'start_date', 'due_date', 'booking_date')
    list_filter = ('services', 'start_date', 'due_date')
    search_fields = ('user__email', 'product__name', 'services')

admin.site.register(Schedule, ScheduleAdmin)


@admin.register(BookForService)
class BookForServiceAdmin(admin.ModelAdmin):
    list_display = ('your_name', 'email_address', 'service_date')
    search_fields = ('your_name', 'email_address')