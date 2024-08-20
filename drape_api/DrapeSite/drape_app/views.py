from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from drape_app.models import (Address, OpeningHoursType, OpeningHours, Company, ServiceType, 
                              Service, AboutUs, Product, Analytics, ContactUs, Schedule)
from drape_app.permissions import IsSuperAdminOrReadOnly
from drape_app.serializers import (AddressSerializer, OpeningHoursTypeSerializer, OpeningHoursSerializer, CompanySerializer, 
                          ServiceTypeSerializer, ServiceSerializer, AboutUsSerializer, ProductSerializer, AnalyticsSerializer, 
                          ContactUsSerializer, ScheduleSerializer)

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

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [IsSuperAdminOrReadOnly]

class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    permission_classes = [IsSuperAdminOrReadOnly]


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context