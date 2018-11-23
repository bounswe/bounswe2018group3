
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from . import models
from . import serializers

# Create your views here..
int i = 0
#Read and write event models
class EventListViewReadWrite(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializerReadWrite
    
#Read only event models
class EventListViewReadOnly(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializerReadOnly