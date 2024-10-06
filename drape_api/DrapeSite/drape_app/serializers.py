from rest_framework import serializers
from django.core.exceptions import ValidationError
import os
from drape_app.models import (Address, OpeningHoursType, OpeningHours, Company, ServiceType, 
                            Service, AboutUs, Product, Price, ProductType, Analytics, 
                            ContactUs, Schedule, BookForService)
from drape_app.utils import send_email
from django.template.loader import render_to_string



class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class OpeningHoursTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHoursType
        fields = '__all__'

class OpeningHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHours
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

    def validate_logo(self, value):
        # Validate file extension
        valid_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in valid_extensions:
            raise ValidationError(f'Unsupported file extension. Allowed extensions are: {", ".join(valid_extensions)}')

        # Validate file size (max 1MB)
        max_size = 1 * 1024 * 1024  # 1 MB
        if value.size > max_size:
            raise ValidationError('Image file size exceeds the maximum limit of 1MB.')

        return value

class ServiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceType
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        
    def validate_image(self, value):
        # Validate file extension
        valid_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in valid_extensions:
            raise ValidationError(f'Unsupported file extension. Allowed extensions are: {", ".join(valid_extensions)}')

        # Validate file size (max 1MB)
        max_size = 1 * 1024 * 1024  # 1 MB
        if value.size > max_size:
            raise ValidationError('Image file size exceeds the maximum limit of 1MB.')

        return value

class AboutUsSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = AboutUs
        fields = '__all__'
        
    def validate_image(self, value):
        # Validate file extension
        valid_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in valid_extensions:
            raise ValidationError(f'Unsupported file extension. Allowed extensions are: {", ".join(valid_extensions)}')

        # Validate file size (max 1MB)
        max_size = 1 * 1024 * 1024  # 1 MB
        if value.size > max_size:
            raise ValidationError('Image file size exceeds the maximum limit of 1MB.')

        return value



class ProductSerializer(serializers.ModelSerializer):
    specifications = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'name', 'image', 'base_type', 'color', 'description', 
            'product_type', 'warranty_duration', 
            # basic_generator_parameters
            'model_number', 'diesel_oil_type', 'output_power',
            'output_voltage', 'output_current', 'normal_frequency', 
            'rated_speed', 'steady_state_voltage_regulation_rate',
            'voltage_fluctuation_rate', 'transient_voltage_regulation', 
            'voltage_settling_time', 'steady_state_frequency_control', 
            'frequency_jitter', 'transient_frequency_fluctuation', 
            'frequency_stabilization_time', 'fuel_consumption_mcr', 
            'noise_lp7m', 
            # Engine specifications
            'diesel_engine_brand_provenance', 'diesel_engine_model_number',
            'stand_by_power', 'cylinder_model_type', 'bore_stroke',
            'compression_ratio', 'starting_system', 'cooling_system',
            'fuel_system', 'speed_regulating_system', 'air_intake_method',
            'displacement', 'engine_oil_capacity', 'rotation_rate',
            # Alternator specifications
            'alternator_brand_place_of_origin', 'motor_type', 
            'rated_power', 'rated_voltage', 'insulation_grade', 
            'protection_degree', 'connection_mode', 'adjustment_mode',
            'output_frequency', 'output_factor',
            'specifications'
        ]
        
    def validate_image(self, value):
        # Validate file extension
        valid_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in valid_extensions:
            raise ValidationError(f'Unsupported file extension. Allowed extensions are: {", ".join(valid_extensions)}')

        # Validate file size (max 1MB)
        max_size = 1 * 1024 * 1024  # 1 MB
        if value.size > max_size:
            raise ValidationError('Image file size exceeds the maximum limit of 1MB.')

        return value        

    def get_specifications(self, obj):
        return {
            "basic_generator_parameters": self.get_basic_generator_parameters(obj),
            "engine_specification": self.get_engine_specification(obj),
            "alternator_specification": self.get_alternator_specification(obj)
        }

    def get_basic_generator_parameters(self, obj):
        return {
            "model_number": obj.model_number,
            "output_power": obj.output_power,
            "diesel_oil_type": obj.diesel_oil_type,
            "output_voltage": obj.output_voltage,
            "output_current": obj.output_current,
            "normal_frequency": obj.normal_frequency,
            "rated_speed": obj.rated_speed,
            "steady_state_voltage_regulation_rate": obj.steady_state_voltage_regulation_rate,
            "voltage_fluctuation_rate": obj.voltage_fluctuation_rate,
            "transient_voltage_regulation": obj.transient_voltage_regulation,
            "voltage_settling_time": obj.voltage_settling_time,
            "steady_state_frequency_control": obj.steady_state_frequency_control,
            "frequency_jitter": obj.frequency_jitter,
            "transient_frequency_fluctuation": obj.transient_frequency_fluctuation,
            "frequency_stabilization_time": obj.frequency_stabilization_time,
            "fuel_consumption_mcr": obj.fuel_consumption_mcr,
            "noise_lp7m": obj.noise_lp7m
        }

    def get_engine_specification(self, obj):
        return {
            "diesel_engine_brand_provenance": obj.diesel_engine_brand_provenance,
            "diesel_engine_model_number": obj.diesel_engine_model_number,
            "stand_by_power": obj.stand_by_power,
            "cylinder_model_type": obj.cylinder_model_type,
            "bore_stroke": obj.bore_stroke,
            "compression_ratio": obj.compression_ratio,
            "starting_system": obj.starting_system,
            "cooling_system": obj.cooling_system,
            "fuel_system": obj.fuel_system,
            "speed_regulating_system": obj.speed_regulating_system,
            "air_intake_method": obj.air_intake_method,
            "displacement": obj.displacement,
            "engine_oil_capacity": obj.engine_oil_capacity,
            "rotation_rate": obj.rotation_rate
        }

    def get_alternator_specification(self, obj):
        return {
            "alternator_brand_place_of_origin": obj.alternator_brand_place_of_origin,
            "motor_type": obj.motor_type,
            "rated_power": obj.rated_power,
            "rated_voltage": obj.rated_voltage,
            "insulation_grade": obj.insulation_grade,
            "protection_degree": obj.protection_degree,
            "connection_mode": obj.connection_mode,
            "adjustment_mode": obj.adjustment_mode,
            "output_frequency": obj.output_frequency,
            "output_factor": obj.output_factor
        }

    def to_representation(self, instance):
        # Call the superclass method to get the default representation
        representation = super().to_representation(instance)

        # Check the request method
        request_method = self.context.get('request').method

        if request_method == 'GET':
            # For GET requests, keep only specific fields
            fields_to_keep = [
                'name', 'image', 'base_type', 'color', 'description', 
                'product_type', 'warranty_duration', 'specifications'
            ]
            return {field: representation[field] for field in fields_to_keep if field in representation}
        else:
            # For POST and UPDATE requests, remove 'specifications'
            representation.pop('specifications', None)
            return representation



        
class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'

class AnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analytics
        fields = '__all__'

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ['your_name', 'subject', 'email', 'message']

    def create(self, validated_data):
        # Create the ContactUs instance
        contact_us_instance = ContactUs.objects.create(**validated_data)

        # Prepare the email context
        context = {
            'name': contact_us_instance.your_name,
            'subject': contact_us_instance.subject,
            'message': contact_us_instance.message
        }
        
        # Render the email template
        html_content = render_to_string('emails/contact_confirmation.html', context)

        # Send the confirmation email
        subject = "Thank you for contacting Drape"
        text_content = "Thank you for reaching out. We have received your message and will get back to you soon."
        recipient_list = [contact_us_instance.email]

        send_email(subject, text_content, html_content, recipient_list)

        return contact_us_instance


class ScheduleSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Schedule
        fields = ['id', 'user', 'product', 'booking_date', 'services', 'start_date', 'due_date', 'message']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)


class BookForServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookForService
        fields = '__all__'

    def create(self, validated_data):
        # Create the BookForService instance
        instance = BookForService.objects.create(**validated_data)

        # Prepare email content for the submission confirmation
        subject = "Service Booking Submission"
        context = {
            'user_name': instance.your_name,
            'services': instance.services,
            'service_date': instance.service_date,
            'special_request': instance.special_request,
        }

        text_content = f"Dear {instance.your_name},\n\nThank you for booking our service on {instance.service_date}."
        html_content = render_to_string('emails/service_submission.html', context)

        # Send submission confirmation email
        send_email(subject, text_content, html_content, [instance.email_address])

        return instance
