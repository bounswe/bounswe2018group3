from django.db import models
from django.core import validators

class Event(models.Model):
    #index = models.PositiveIntegerField(unique=True,db_index=True)
    name = models.CharField(max_length=255)
    info = models.TextField(blank=True)
    location = models.TextField() #subject to change
    artist = models.CharField(max_length=255)
    date = models.DateField(db_index=True)
    price = models.FloatField()
    tags = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    comments = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    images = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True) 
    attendants = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)

class Comment(models.Model):
    #id = models.IntegerField(unique=True,db_index=True)
    author = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    date = models.DateField(db_index=True)
    content = models.TextField()

class Tag(models.Model):
    #id = models.IntegerField(unique=True,db_index=True)
    name = models.CharField(max_length=255,unique=True,db_index=True)
    connectedTags = models.CharField(validators=[validators.int_list_validator],max_length=255,blank=True)
    followerNumber = models.PositiveIntegerField()