from rest_framework import serializers
from . import models

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = '__all__'
