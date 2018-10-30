from django.db import models
from django.core import validators

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