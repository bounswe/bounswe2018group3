from rest_framework import serializers
from . import models

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('name', 'images', 'info', 'price', 'location')
