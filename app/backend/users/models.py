from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators

class CustomUser(AbstractUser):
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255) #check at least 1 number etc.
    bio = models.TextField(blank=True)
    email = models.CharField(max_length=255, validators=[validators.EmailValidator])
    username = models.CharField(max_length=255, unique=True)
    #photo = models.ImageField()
    colorScheme = models.IntegerField()
    watchingTags = models.CharField(validators=[validators.int_list_validator],max_length=255)
    followedUsers = models.CharField(validators=[validators.int_list_validator],max_length=255)
    commentList = models.CharField(validators=[validators.int_list_validator],max_length=255)
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    eventList = models.CharField(validators=[validators.int_list_validator],max_length=255)
    blockedUsers = models.CharField(validators=[validators.int_list_validator],max_length=255)
    blockedTags = models.CharField(validators=[validators.int_list_validator],max_length=255)

    def __str__(self):
        return self.email