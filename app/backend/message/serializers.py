from rest_framework import serializers
from . import models

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Message
        fields = "__all__"