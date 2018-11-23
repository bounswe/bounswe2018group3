from rest_framework import serializers
from . import models
from djangotoolbox.fields import ListField
from djangotoolbox.fields import EmbeddedModelFields

#Read and write event models
class EventSerializerReadWrite(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = '__all__'

    def create(self, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.info = validated_data.get('info', instance.info)
        instance.location = validated_data.get('location', instance.location)
        instance.creator = request.user
        instance.artist = validated_data.get('artist', instance.artist)
        instance.date = validated_data.get('date', instance.date)
        instance.time = validated_data.get('time', instance.time)
        instance.price = validated_data.get('price', instance.price)
        instance.tags = validated_data.get('tags', instance.tags)
        instance.comments = validated_data.get('comments', instance.comments)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.images = validated_data.get('images', instance.images)
        instance.attendants = validated_data.get('attendants', instance.attendants)

    def update(self, instance, validated_data):
        if instance.creator == request.user:
            instance.name = validated_data.get('name', instance.name)
            instance.info = validated_data.get('info', instance.info)
            instance.location = validated_data.get('location', instance.location)
            instance.creator = validated_data.get('creator', instance.creator)
            instance.artist = validated_data.get('artist', instance.artist)
            instance.date = validated_data.get('date', instance.date)
            instance.time = validated_data.get('time', instance.time)
            instance.price = validated_data.get('price', instance.price)
            instance.tags = validated_data.get('tags', instance.tags)
            instance.comments = validated_data.get('comments', instance.comments)
            instance.rating = validated_data.get('rating', instance.rating)
            instance.images = validated_data.get('images', instance.images)
            instance.attendants = validated_data.get('attendants', instance.attendants)

#Read only event models
class EventSerializerReadOnly(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = '__all__'
        read_only_fields = ('__all__', )