from django.shortcuts import render
from rest_framework import generics
from rest_framework import renderers
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from rest_framework import viewsets

from . import models
from . import serializers

# Create your views here.

class UserListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

class UserSerializerReadOnly(generics.ListCreateAPIView):
    permission_classes = ()
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializerReadOnly

class UserPic(viewsets.ModelViewSet):
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