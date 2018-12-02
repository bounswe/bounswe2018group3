from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = (
            'email', 
            'username',
            'first_name',
            'last_name', 
            'password',
            'bio', 
            'city', 
            'country',
            'photo',
            'birthday', 
            'colorScheme',
            'rating',
            'followedUsers',
            'blockedUsers')

    def create(self, validated_data):
        return Users.objects.create(**validated_data)

    
    def update(self, instance, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            if instance.id == request.user.id:
                instance.first_name = validated_data.get('first_name', instance.first_name)
                instance.last_name = validated_data.get('last_name', instance.last_name)
                instance.password = validated_data.get('password', instance.password)
                instance.bio = validated_data.get('bio', instance.bio)
                instance.city = validated_data.get('city', instance.city)
                instance.country = validated_data.get('country', instance.country)
                instance.email = validated_data.get('email', instance.email)
                instance.username = validated_data.get('username', instance.username)
                instance.photo = validated_data.get('photo', instance.photo)
                instance.birthday = validated_data.get('birthday', instance.birthday)
                instance.colorScheme = validated_data.get('colorScheme', instance.colorScheme)
                instance.rating = validated_data.get('rating', instance.rating)
                instance.followedUsers = validated_data.get('followedUsers', instance.followedUsers)
                instance.blockedUsers = validated_data.get('blockedUsers', instance.blockedUsers)
                instance.save()
                return instance

class UserSerializerReadOnly(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = fields = (
            'email', 
            'username',
            'first_name',
            'last_name', 
            'bio', 
            'city', 
            'country',
            'photo',
            'birthday', 
            'colorScheme',
            'rating')
        read_only_fields = fields = (
            'email', 
            'username',
            'first_name',
            'last_name', 
            'bio', 
            'city', 
            'country',
            'photo',
            'birthday', 
            'colorScheme',
            'rating')