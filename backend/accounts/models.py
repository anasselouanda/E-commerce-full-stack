from django.db import models
###
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    # Le lien unique : 1 User = 1 Profile
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    
    # Tes champs personnalisés
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.user.username