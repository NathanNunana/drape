from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drape_app.views import (AddressViewSet, OpeningHoursTypeViewSet, OpeningHoursViewSet, 
                             CompanyViewSet, ServiceTypeViewSet, ServiceViewSet, AboutUsViewSet, 
                             ProductViewSet, PriceViewSet, ProductTypeViewSet, AnalyticsViewSet, ContactUsViewSet, ScheduleViewSet)

router = DefaultRouter()
router.register(r'addresses', AddressViewSet)
router.register(r'opening-hours-types', OpeningHoursTypeViewSet)
router.register(r'opening-hours', OpeningHoursViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'service-types', ServiceTypeViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'about-us', AboutUsViewSet)
router.register(r'products', ProductViewSet)
router.register(r'price', PriceViewSet)
router.register(r'products-type', ProductTypeViewSet)
router.register(r'analytics', AnalyticsViewSet)
router.register(r'contact-us', ContactUsViewSet)
router.register(r'schedules', ScheduleViewSet, basename='schedule')


urlpatterns = [
    path('', include(router.urls)),
]
