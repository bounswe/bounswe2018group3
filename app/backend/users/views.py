from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
import django_filters
from django.http import HttpResponse
from rest_framework import viewsets

from . import models
from . import serializers

# Create your views here.

class UserCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserRWSerializer

class UserEditView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserRWSerializer

class UserRateView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserRatingSerializer

    def rate(self, *args, **kwargs):
        user = models.CustomUser.objects.get(pk=self.kwargs['user_id'])
        totalRating = user.rating * user.ratingNum
        user.ratingNum = user.ratingNum + 1
        user.rating = (totalRating + self.kwargs['new_rating']) / user.ratingNum
        user.save()

        return HttpResponse(user.rating)

class UserRetrieveView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserReadOnlySerializer

class UserFilter(django_filters.FilterSet):
    class Meta:
        model = models.CustomUser
        fields = (
            'username',
            'first_name',
            'last_name', 
            'bio', 
            'city', 
            'country',
            'birthday', 
            'rating',)

#Read only event models,
class UserSearchView(generics.ListAPIView):
    permission_classes = ()#(IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSearchSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("first_name", "last_name", "country", "city", "username", )
    #filter_class = EventFilter

class UserPicView(viewsets.ModelViewSet):
    http_method_names = ['get', 'put']
    permission_classes = ()
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.ProfilePicSerializer
    pagination_class = None

    def getpic(self, *args, **kwargs):

        user = models.CustomUser.objects.get(pk=self.kwargs['user_id'])
        image = user.profile_pic
        size = image.size

        return HttpResponse(image, content_type='image/png')