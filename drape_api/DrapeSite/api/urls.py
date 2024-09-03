
from django.urls import path, include


urlpatterns = [
   path ('auth/', include(('users.urls', 'users'), namespace='users' ) ),
   path ('', include(('drape_app.urls')) ),
]