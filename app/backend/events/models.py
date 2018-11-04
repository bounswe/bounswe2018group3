from django.db import models
from django.core import validators

class Event(models.Model):
    name = models.CharField(max_length=255)
    info = models.TextField(blank=True)
    location = models.TextField() #subject to change
    artist = models.CharField(max_length=255)
    date = models.DateField(db_index=True, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    tags = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    comments = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    images = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True) 
    attendants = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
