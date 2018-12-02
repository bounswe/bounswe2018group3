from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

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
