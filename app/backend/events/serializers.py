from rest_framework import serializers
from . import models

#Read and write event models
class EventSerializerReadWrite(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = '__all__'

#Read only event models
class EventSerializerReadOnly(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = '__all__'
        read_only_fields = '__all__'

