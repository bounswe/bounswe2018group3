from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators

class CustomUser(AbstractUser):
    #id = models.PositiveIntegerField(unique=True,db_index=True)
    first_name = models.CharField(max_length=127)
    last_name = models.CharField(max_length=127)
    password = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    city = models.CharField(blank=True, max_length=255)
    country = models.CharField(blank=True, max_length=255)
    email = models.EmailField()
    username = models.CharField(max_length=255, unique=True)
    profile_pic = models.ImageField(upload_to = 'pic_folder/profile_pics/', default = '/default_profile.png')
    birthday = models.DateField(blank=True, null=True)
    colorScheme = models.SmallIntegerField(default=0)
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    followedUsers = models.ManyToManyField("self", symmetrical=False, related_name="followers")
    blockedUsers = models.ManyToManyField("self", symmetrical=False, related_name="blockers")
    #written_comments = models.EmbeddedModelField(model_container=Comment) can be accessed as comment_set
    #watchingTags = models.ForeignKey(Tag, on_delete=models.CASCADE, related_field="watchers")
    #blockedTags = models.ForeignKey(Tag, on_delete=models.CASCADE, related_field="blockers")
    #createdEvents = models.EmbeddedModelField(model_container=Event) can be accessed as created_events
    #Following two fields can be accessed as event_set
    #attendedEvents = models.EmbeddedModelField(model_container=Event)
    #upcomingEvents = models.EmbeddedModelField(model_container=Event)
    #Following fields are included from AbstractUser:
    # last_login
    # is_superuser
    # is_staff
    # is_active
    # date_joined

    def __str__(self):
        return self.email