from django.db import models
from django.core import validators
from django.utils import timezone
from users.models import CustomUser
from events.models import Event
import datetime

class Comment(models.Model):
    #id = models.IntegerField(unique=True,db_index=True)
    #author = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="writtenComments") #may also use EmbeddedModelField
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    ratingNum = models.IntegerField(default=0)
    date = models.DateTimeField(db_index=True,default=timezone.now)
    title = models.CharField(max_length=255)
    content = models.TextField()

    class Meta:
       abstract = True

class EventComment(Comment) :
    author = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="writtenEventComments")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="comments", null=True)

class UserComment(Comment) :
    author = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="writtenUserComments")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="comments", null=True)

class Tag(models.Model):
    #id = models.IntegerField(unique=True,db_index=True)
    name = models.CharField(max_length=255,unique=True,db_index=True)
    connectedTags = models.ManyToManyField("self")
    followerNumber = models.PositiveIntegerField()
    events = models.ManyToManyField(Event, related_name="tags")
    watchers = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="watchingTags")
    blockers = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="blockedTags")

class Image(models.Model):
    #id = models.IntegerField(unique=True,db_index=True)
    content = models.ImageField(upload_to='pic_folder/');

    class Meta:
       abstract = True

class EventImage(Image) :
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="images")

class UserImage(Image) :
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="images")
