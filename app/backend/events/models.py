from django.core import validators
from djongo import models
from django import forms
from users.models import CustomUser


class Event(models.Model):
    name = models.CharField(max_length=255)
    info = models.TextField(blank=True)
    location = models.TextField() #subject to change
    creator = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='created_events')
    artist = models.CharField(max_length=255)
    date = models.DateField(db_index=True, blank=True, null=True)
    time = models.TimeField(db_index=True, blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    #tags = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    #tags = models.ManyToManyField(Tag, related_name='event_set')
    #comments = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    #comments = models.ListField(EmbeddedModelField(model_container=Comment))
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    #images = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True) 
    images = models.ListField()
    #attendants = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    attendants = models.ManyToManyField(CustomUser, related_name='event_set')
