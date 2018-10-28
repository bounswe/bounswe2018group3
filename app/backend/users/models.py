from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators

class CustomUser(AbstractUser):
    #id = models.PositiveIntegerField(unique=True,db_index=True)
    first_name = models.CharField(max_length=127)
    last_name = models.CharField(max_length=127)
    password = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    email = models.CharField(max_length=255, validators=[validators.EmailValidator])
    username = models.CharField(max_length=255, unique=True)
    photo = models.ImageField(blank=True) #may set a default profile pic
    colorScheme = models.SmallIntegerField(default=0)
    watchingTags = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    followedUsers = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    commentList = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    eventList = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    blockedUsers = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    blockedTags = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    #Following fields are included from AbstractUser:
    # last_login
    # is_superuser
    # is_staff
    # is_active
    # date_joined

    def __str__(self):
        return self.email