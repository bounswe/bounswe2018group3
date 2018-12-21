from rest_framework import serializers
from . import models
from events.models import Event
from users.models import CustomUser
import datetime

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
        )

    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            instance = models.EventComment.objects.create()
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.author = request.user
            instance.date = datetime.datetime.now()
            instance.event = Event.objects.get(pk=validated_data.get('event_id'))
            instance.save()
            return instance

    def update(self, instance, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            if instance.author.id == request.user.id:
                instance.title = validated_data.get('title', instance.title)
                instance.content = validated_data.get('content', instance.content)
                instance.date = datetime.datetime.now()
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
        )

    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            instance = models.UserComment.objects.create()
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.author = request.user
            instance.date = datetime.datetime.now()
            instance.user = CustomUser.objects.get(pk=validated_data.get('user_id'))
            instance.save()
            return instance

    def update(self, instance, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            if instance.author.id == request.user.id:
                instance.title = validated_data.get('title', instance.title)
                instance.content = validated_data.get('content', instance.content)
                instance.date = datetime.datetime.now()
                instance.save()
                return instance

class UserCommentReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserComment
        fields = '__all__'
        #read_only_fields = ('__all__')

class EventCommentReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventComment
        fields = '__all__'
        #read_only_fields = ('__all__')
"""
class UserCommentRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserComment
        fields = ('id', 'ratings', )

class EventCommentRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.EventComment
        fields = ('id', 'ratings', )
"""

class UserCommentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserComment
        fields = (
            'id',
            'title',
            'content',
            'author', 
            'date', 
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
            )

class UserCommentRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserComment
        fields = ('id', 'ratings', 'flaggers',)

class EventCommentRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.EventComment
        fields = ('id', 'ratings', 'flaggers',)

# Tag related serializers

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

class UserImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.UserImage
        fields = ('url', 'id', 'content')
        #user = serializers.Field(source='user.id')

    def create(self, data):
        request = self.context.get("request")
        return models.UserImage.objects.create(user=request.user, **data)
