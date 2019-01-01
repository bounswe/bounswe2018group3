from django.core import validators
from django.db import models
from users.models import CustomUser
from django.utils import timezone
from api.models import EventImage

class Body(models.Model):
    format = models.CharField(max_length=255, default ="text/plain")
    type = models.CharField(max_length=255, default ="TextualBody")
    value = models.TextField(blank=True)

class Selector(models.Model):
    sel_type = models.CharField(max_length=255, blank=True)
    # ImagePositionSelector
    type = models.CharField(max_length=255, blank=True, null=True)
    image_id = models.FloatField(blank=True, null=True)
    width = models.FloatField(blank=True, null=True)
    height = models.FloatField(blank=True, null=True)
    x = models.FloatField(blank=True, null=True)
    y = models.FloatField(blank=True, null=True)
    # TextPositionSelector
    start = models.IntegerField(blank=True, null=True)
    end = models.IntegerField(blank=True, null=True)

class Target(models.Model):
    source = models.IntegerField(blank=True, null=True)
    selector = models.ForeignKey(Selector, blank=True, on_delete=models.CASCADE, related_name='target')

class Annotation(models.Model):
    context = models.CharField(max_length=255, default="http://www.w3.org/ns/anno.jsonld")
    type = models.CharField(max_length=255, default="Annotation")
    body = models.ForeignKey(Body, blank=True, on_delete=models.CASCADE, related_name='annotation')
    target = models.ForeignKey(Target, blank=True, on_delete=models.CASCADE, related_name='annotation')
    creator = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    created = models.DateField(db_index=True, default=timezone.localdate())
    image = models.ForeignKey(EventImage, on_delete=models.CASCADE, blank=True, null=True, related_name="annotations")


