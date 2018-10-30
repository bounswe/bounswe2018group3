
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from . import models
from . import serializers

# Create your views here.

class EventListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer
    