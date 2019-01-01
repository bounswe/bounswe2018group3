from rest_framework import serializers
from . import models
from events.models import Event
from users.models import CustomUser

from django.utils import timezone
from datetime import datetime

class AnnotationRWSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Annotation
        fields = "__all__"

class BodyRWSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Body
        fields = "__all__"

class SelectorRWSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Selector
        fields = "__all__"

class TargetRWSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Target
        fields = "__all__"