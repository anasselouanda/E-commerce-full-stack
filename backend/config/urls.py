from django.contrib import admin
from django.urls import path
###
from django.conf import settings
from django.conf.urls.static import static
###
from rest_framework import routers
from django.urls import include
from products.views import ProductViewSet, CategoryViewSet


router = routers.DefaultRouter()
router.register('products', ProductViewSet)
router.register('categories', CategoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # AJOUTE CES DEUX LIGNES OBLIGATOIRES POUR LA SÉCURITÉ 
    path('api/auth/', include('djoser.urls')),       # Pour s'inscrire
    path('api/auth/', include('djoser.urls.jwt')),   # Pour se connecter (Token)
]


# Cette partie active l'affichage des images en mode développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)