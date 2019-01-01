from rest_framework import serializers
from . import models
from events.models import Event
from users.models import CustomUser

from django.utils import timezone
from datetime import datetime

class EventCommentRWSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.EventComment
        fields = (
            'id',
            'title',
            'content',
            'author',
            'date',
            'event',
            'ratings'
        )

    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            if "ratings" in validated_data:
                del validated_data["ratings"]

            return models.EventComment.objects.create(author=request.user, date=datetime.now(), **validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            if instance.author.id == request.user.id:
                instance.title = validated_data.get('title', instance.title)
                instance.content = validated_data.get('content', instance.content)
                instance.date = timezone.localtime()
                instance.save()
                return instance

class UserCommentRWSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserComment
        fields = (
            'id',
            'title',
            'content',
            'author',
            'date',
            'user',
            'ratings',
        )

    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            if "ratings" in validated_data:
                del validated_data["ratings"]

            return models.UserComment.objects.create(author=request.user, date=datetime.now(), **validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            if instance.author.id == request.user.id:
                instance.title = validated_data.get('title', instance.title)
                instance.content = validated_data.get('content', instance.content)
                instance.date = timezone.localtime()
                instance.save()
                return instance

class UserCommentReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserComment
        fields = (
            'id',
            'title',
            'content',
            'author', 
            'date',
            'user',
            'ratings',
            )

class EventCommentReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventComment
        fields = (
            'id',
            'title',
            'content',
            'author', 
            'date', 
            'event',
            'ratings',
            )

class UserCommentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserComment
        fields = (
            'id',
            'title',
            'content',
            'author',
            'date',
            'user',
            )

class EventCommentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventComment
        fields = (
            'id',
            'title',
            'content',
            'author',
            'date',
            'event',
            )

class UserCommentRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserComment
        fields = ('id', 'ratings', 'flaggers',)

class EventCommentRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.EventComment
        fields = ('id', 'ratings', 'flaggers',)

# Tag related serializers ####################################################

class TagRWSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = '__all__'

    def create(self, validated_data):
        instance =  models.Tag.objects.create()
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class TagReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = '__all__'
        read_only_fields = (
            'id',
            'name',
            'events',
            'connectedTags',
            'watcherNumber',
            'blockers',
            'watchers')

class TagSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = (
            'id',
            'name',
            'events',
            'connectedTags',
            'watcherNumber',
            'blockers',
            'watchers')

# Image related serializers ###############################################

class UserImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.UserImage
        fields = ('url', 'id', 'content')
        #user = serializers.Field(source='user.id')

    def create(self, data):
        request = self.context.get("request")
        return models.UserImage.objects.create(user=request.user, **data)

class EventImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.EventImage
        fields = ('url', 'id', 'content', 'annotations')
        #user = serializers.Field(source='user.id')

    def create(self, data):
        request = self.context.get("request")
        if "event_id" in request.data:
            print("*"*70)
            event = models.Event.objects.get(pk =int(request.data["event_id"]))
            print(event)
            print("*"*70)
            if event.creator.id == request.user.id:
                print("*"*70)
                return models.EventImage.objects.create(event=event, **data)

