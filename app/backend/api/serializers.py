from rest_framework import serializers
from . import models
from events.models import Event
from users.models import CustomUser
import datetime

class EventCommentRWSerializer(serializers.ModelSerializer):
    event_id = serializers.IntegerField()

    class Meta:
        model = models.EventComment
        fields = (
            'id',
            'title',
            'content',
            'author',
            'date',
            'event',
            'event_id',
            'rating'
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
    user_id = serializers.IntegerField()

    class Meta:
        model = models.UserComment
        fields = (
            'id',
            'title',
            'content',
            'author',
            'date',
            'user',
            'user_id',
            'rating',
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

class UserCommentRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserComment
        fields = ('id', 'rating', 'ratingNum',)

class EventCommentRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.EventComment
        fields = ('id', 'rating', 'ratingNum')

    """
    def update(self, instance, validated_data):
        totalRating = instance.rating * instance.ratingNum
        instance.ratingNum = instance.ratingNum + 1
        instance.rating = (totalRating + validated_data.get('new_rating')) / instance.ratingNum
        instance.save()
        return instance"""

class UserCommentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserComment
        fields = (
            'id',
            'title',
            'content',
            'author', 
            'date', 
            'rating',)

class EventCommentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventComment
        fields = (
            'id',
            'title',
            'content',
            'author',
            'date',
            'rating')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = '__all__'
