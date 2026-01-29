from django.contrib import admin
###
from .models import UserProfile
# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone','address' ,'city') # Ce qu'on verra dans la liste

admin.site.register(UserProfile, UserProfileAdmin)