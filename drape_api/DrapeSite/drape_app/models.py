from django.db import models

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
    logo = models.ImageField(upload_to='media/company_logos/')

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
    file = models.FileField(upload_to='media/service_files/', blank=True, null=True)

    def __str__(self):
        return self.title

# About Us
class AboutUs(models.Model):
    file = models.FileField(upload_to='media/about_us_files/', blank=True, null=True)
    motor = models.CharField(max_length=255)
    company_description = models.TextField()

    def __str__(self):
        return self.motor

# Product
class Product(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='media/product_files/', blank=True, null=True)
    base_type = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    noise_rating = models.DecimalField(max_digits=10, decimal_places=2)
    integrated_diesel_tank_capacity = models.DecimalField(max_digits=10, decimal_places=2)
    fuel_consumption = models.DecimalField(max_digits=10, decimal_places=2)
    dimension = models.DecimalField(max_digits=10, decimal_places=2)
    dry_weight = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    specification = models.TextField()

    def __str__(self):
        return self.name

# Analytics
class Analytics(models.Model):
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    file = models.FileField(upload_to='media/analytics_files/', blank=True, null=True)

    def __str__(self):
        return self.name

# Contact Us
class ContactUs(models.Model):
    your_name = models.CharField(max_length=255)
    subject = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return f'{self.your_name} - {self.subject}'
