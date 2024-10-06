from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from drape_app.models import (Address, OpeningHoursType, OpeningHours, Company, ServiceType, 
                            Service, AboutUs, Product, Price, ProductType, Analytics, 
                            ContactUs, Schedule, BookForService)
from drape_app.permissions import IsSuperAdminOrReadOnly
from drape_app.serializers import (AddressSerializer, OpeningHoursTypeSerializer, OpeningHoursSerializer, CompanySerializer, 
                        ServiceTypeSerializer, ServiceSerializer, AboutUsSerializer, ProductSerializer, PriceSerializer, ProductTypeSerializer,
                        AnalyticsSerializer, ContactUsSerializer, ScheduleSerializer,
                        BookForServiceSerializer)

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class OpeningHoursTypeViewSet(viewsets.ModelViewSet):
    queryset = OpeningHoursType.objects.all()
    serializer_class = OpeningHoursTypeSerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class OpeningHoursViewSet(viewsets.ModelViewSet):
    queryset = OpeningHours.objects.all()
    serializer_class = OpeningHoursSerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class ServiceTypeViewSet(viewsets.ModelViewSet):
    queryset = ServiceType.objects.all()
    serializer_class = ServiceTypeSerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsSuperAdminOrReadOnly]
    
class AboutUsViewSet(viewsets.ModelViewSet):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer
    permission_classes = [IsSuperAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsSuperAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

class PriceViewSet(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class ProductTypeViewSet(viewsets.ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
class BookForServiceViewSet(viewsets.ModelViewSet):
    queryset = BookForService.objects.all()
    serializer_class = BookForServiceSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        previous_status = instance.is_confirmed  # Capture the previous status
        response = super().update(request, *args, **kwargs)

        # Check if the booking has been confirmed by the admin
        if not previous_status and instance.is_confirmed:
            instance.send_confirmation_email()  # Send confirmation email

        return response
