from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drape_app.views import (AddressViewSet, OpeningHoursTypeViewSet, OpeningHoursViewSet, 
                            ServiceTypeViewSet, ServiceViewSet, AboutUsViewSet, 
                            ProductViewSet, PriceViewSet, ProductTypeViewSet, 
                            AnalyticsViewSet, ContactUsViewSet, ScheduleViewSet,
                            BookForServiceViewSet, NewsletterViewSet, AdminPostNewsLetterViewSet,
                            TechnicalTeamMemberViewSet)

router = DefaultRouter()
router.register(r'addresses', AddressViewSet)
router.register(r'opening-hours-types', OpeningHoursTypeViewSet)
router.register(r'opening-hours', OpeningHoursViewSet)
router.register(r'service-types', ServiceTypeViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'about-us', AboutUsViewSet)
router.register(r'products', ProductViewSet)
router.register(r'price', PriceViewSet)
router.register(r'products-type', ProductTypeViewSet)
router.register(r'analytics', AnalyticsViewSet)
router.register(r'contact-us', ContactUsViewSet)
router.register(r'schedules', ScheduleViewSet, basename='schedule')
router.register(r'book-for-service', BookForServiceViewSet)
router.register(r'news-letter', NewsletterViewSet)
router.register(r'admin-post-news-letter', AdminPostNewsLetterViewSet)
router.register(r'team-members', TechnicalTeamMemberViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
