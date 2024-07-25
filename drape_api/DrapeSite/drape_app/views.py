from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from drape_app.models import Address, OpeningHoursType, OpeningHours, Company, ServiceType, Service, AboutUs, Product, Analytics, ContactUs
from drape_app.permissions import IsSuperAdmin
from drape_app.serializers import (AddressSerializer, OpeningHoursTypeSerializer, OpeningHoursSerializer, CompanySerializer, 
                          ServiceTypeSerializer, ServiceSerializer, AboutUsSerializer, ProductSerializer, AnalyticsSerializer, 
                          ContactUsSerializer)

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class OpeningHoursTypeViewSet(viewsets.ModelViewSet):
    queryset = OpeningHoursType.objects.all()
    serializer_class = OpeningHoursTypeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class OpeningHoursViewSet(viewsets.ModelViewSet):
    queryset = OpeningHours.objects.all()
    serializer_class = OpeningHoursSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class ServiceTypeViewSet(viewsets.ModelViewSet):
    queryset = ServiceType.objects.all()
    serializer_class = ServiceTypeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class AboutUsViewSet(viewsets.ModelViewSet):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]

class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSuperAdmin]
