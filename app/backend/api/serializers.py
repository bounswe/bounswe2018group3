from rest_framework import serializers
from . import models

class EventCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = '__all__'

class UserCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = '__all__'
