from django.shortcuts import render
from rest_framework import generics

from . import models
from . import serializers

# Create your views here.

class UserListView(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer