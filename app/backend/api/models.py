from django.db import models

# Create your models here.

class Event(models.Model):
    name = models.CharField(max_length=255)
    info = models.TextField(blank=True)
    location = models.TextField() #subject to change
    artist = models.CharField(max_length=255)
    date = models.DateField()
    price = models.FloatField()
    #tags =
    #comments =
    rating = models.DecimalField(max_digits=3,decimal_places=2)
    #images = 
    #attendants =

class Comment(models.Model):
    author = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=3,decimal_places=2)
    date = models.DateField()
    content = models.TextField()

class Tag(models.Model):
    name = models.CharField(max_length=255,unique=True)
    #connectedTags =
    followerNumber = models.IntegerField()