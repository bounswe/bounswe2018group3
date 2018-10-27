from django.db import models
from django.contrib.auth.models import User
from django.core import validators

# Create your models here.

class CustomUser(User):
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255) #check at least 1 number etc.
    bio = models.TextField(blank=True)
    email = models.CharField(validator=[validators.EmailValidator])
    username = models.CharField(max_length=255, unique=True)
    photo = models.ImageField()
    #colorScheme
    #watchingTags
    #followedUsers
    #commentList
    rating = models.DecimalField(max_digits=3,decimal_places=2);
    #eventList
    #blockedUsers
    #blockedTags

    def __str__(self):
        return self.email