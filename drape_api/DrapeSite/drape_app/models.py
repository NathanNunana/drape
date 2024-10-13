from django.db import models
from django.conf import settings
from django.template.loader import render_to_string
from drape_app.utils import send_email


# Address
class Address(models.Model):
    street_name = models.CharField(max_length=255)
    digital_address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return f'{self.street_name}, {self.city}, {self.country}'

# Opening Hours Type
class OpeningHoursType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Opening Hours
class OpeningHours(models.Model):
    type = models.ForeignKey(OpeningHoursType, on_delete=models.CASCADE)
    duration = models.CharField(max_length=100)  # e.g., "9:00 AM - 5:00 PM"

    def __str__(self):
        return f'{self.type.name}: {self.duration}'

# Company
class Company(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='company_logos/')

    def __str__(self):
        return self.name

# Service Type
class ServiceType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

# Service
class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    operations = models.TextField()
    service_type = models.ForeignKey(ServiceType, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='service_images/', blank=True, null=True)

    def __str__(self):
        return self.title


# About Us
class AboutUs(models.Model):
    image = models.ImageField(upload_to='about_us_images/', blank=True, null=True)
    motto = models.CharField(max_length=255)
    company_description = models.TextField()

    def __str__(self):
        return self.motto



# Price model
class Price(models.Model):
    product = models.ForeignKey('Product', related_name='prices', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    effective_date = models.DateField()

    def __str__(self):
        return f"{self.product.name} - {self.price} as of {self.effective_date}"

class ProductType(models.Model):
    RENTAL = 'rental'
    SALE = 'sale'
    
    PRODUCT_TYPE_CHOICES = [
        (RENTAL, 'Rental'),
        (SALE, 'Sale'),
    ]
    
    type_name = models.CharField(max_length=10, choices=PRODUCT_TYPE_CHOICES, unique=True)

    def __str__(self):
        return self.type_name
    
    

class Product(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    base_type = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    description = models.TextField()
    product_type = models.ForeignKey(ProductType, on_delete=models.SET_NULL, null=True)
    warranty_duration = models.CharField(max_length=100, blank=True, null=True)

    # Technical Parameters of Generator Equipment (specification)
    model_number = models.CharField(max_length=100, blank=True, null=True)
    output_power = models.CharField(max_length=100, blank=True, null=True)
    power_factor = models.CharField(max_length=100, blank=True, null=True)
    output_voltage = models.CharField(max_length=100, blank=True, null=True)
    output_current = models.CharField(max_length=100, blank=True, null=True)
    normal_frequency = models.CharField(max_length=100, blank=True, null=True)
    rated_speed = models.CharField(max_length=100, blank=True, null=True)
    diesel_oil_type = models.CharField(max_length=100, blank=True, null=True)
    steady_state_voltage_regulation_rate = models.CharField(max_length=100, blank=True, null=True)
    voltage_fluctuation_rate = models.CharField(max_length=100, blank=True, null=True)
    transient_voltage_regulation = models.CharField(max_length=100, blank=True, null=True)
    voltage_settling_time = models.CharField(max_length=100, blank=True, null=True)
    steady_state_frequency_control = models.CharField(max_length=100, blank=True, null=True)
    frequency_jitter = models.CharField(max_length=100, blank=True, null=True)
    transient_frequency_fluctuation = models.CharField(max_length=100, blank=True, null=True)
    frequency_stabilization_time = models.CharField(max_length=100, blank=True, null=True)
    fuel_consumption_mcr = models.CharField(max_length=100, blank=True, null=True)
    noise_lp7m = models.CharField(max_length=100, blank=True, null=True)

    # Technical Parameters of Diesel Engine
    diesel_engine_brand_provenance = models.CharField(max_length=100, blank=True, null=True)
    diesel_engine_model_number = models.CharField(max_length=100, blank=True, null=True)
    stand_by_power = models.CharField(max_length=100, blank=True, null=True)
    cylinder_model_type = models.CharField(max_length=100, blank=True, null=True)
    bore_stroke = models.CharField(max_length=100, blank=True, null=True)
    compression_ratio = models.CharField(max_length=100, blank=True, null=True)
    starting_system = models.CharField(max_length=100, blank=True, null=True)
    cooling_system = models.CharField(max_length=100, blank=True, null=True)
    fuel_system = models.CharField(max_length=100, blank=True, null=True)
    speed_regulating_system = models.CharField(max_length=100, blank=True, null=True)
    air_intake_method = models.CharField(max_length=100, blank=True, null=True)
    displacement = models.CharField(max_length=100, blank=True, null=True)
    engine_oil_capacity = models.CharField(max_length=100, blank=True, null=True)
    rotation_rate = models.CharField(max_length=100, blank=True, null=True)

    # Technical Parameters of Alternator
    alternator_brand_place_of_origin = models.CharField(max_length=100, blank=True, null=True)
    motor_type = models.CharField(max_length=100, blank=True, null=True)
    rated_power = models.CharField(max_length=100, blank=True, null=True)
    rated_voltage = models.CharField(max_length=100, blank=True, null=True)
    insulation_grade = models.CharField(max_length=100, blank=True, null=True)
    protection_degree = models.CharField(max_length=100, blank=True, null=True)
    connection_mode = models.CharField(max_length=100, blank=True, null=True)
    adjustment_mode = models.CharField(max_length=100, blank=True, null=True)
    output_frequency = models.CharField(max_length=100, blank=True, null=True)
    output_factor = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name



# Analytics
class Analytics(models.Model):
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Contact Us
class ContactUs(models.Model):
    your_name = models.CharField(max_length=255)
    subject = models.CharField(max_length=255, blank=True)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return f'{self.your_name} - {self.subject}'

class Schedule(models.Model):
    SERVICE_CHOICES = [
        ('Diagnostic Test', 'Diagnostic Test'),
        ('Engine Servicing', 'Engine Servicing'),
        ('Tires Replacement', 'Tires Replacement'),
        ('Oil Changing', 'Oil Changing'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    services = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    start_date = models.DateTimeField()
    due_date = models.DateTimeField()
    message = models.TextField()

    def __str__(self):
        return f"Schedule for {self.user.email} - {self.product.name}"
    
    
class BookForService(models.Model):
    SERVICE_CHOICES = [
        ('Diagnostic Test', 'Diagnostic Test'),
        ('Engine Servicing', 'Engine Servicing'),
        ('Tires Replacement', 'Tires Replacement'),
        ('Oil Changing', 'Oil Changing'),
    ]
    your_name = models.CharField(max_length=100)
    email_address = models.EmailField()
    services = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    service_date = models.DateTimeField()
    special_request = models.TextField(blank=True)  # Allow blank requests
    is_confirmed = models.BooleanField(default=False)  # To track admin confirmation

    def __str__(self):
        return f"Book for Service - {self.your_name} - {self.service_date}"

    def send_confirmation_email(self):
        """
        This method sends a confirmation email when the booking is confirmed by the admin.
        """
        subject = "Service Booking Confirmed"
        context = {
            'user_name': self.your_name,
            'services': self.services,
            'service_date': self.service_date,
            'special_request': self.special_request,
        }

        text_content = f"Dear {self.your_name},\n\nWe are pleased to inform you that your booking has been confirmed for {self.service_date}."
        html_content = render_to_string('emails/booking_confirmed.html', context)

        # Sending the confirmation email
        send_email(subject, text_content, html_content, [self.email_address])
