
from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
import django_filters

from . import models
from . import serializers

# Create your views here..

#Read and write event models
class EventListViewReadWrite(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializerReadWrite
    

class EventFilter(django_filters.FilterSet):
    class Meta:
        model = models.Event
        fields = '__all__'

#Read only event models,
class EventListViewReadOnly(generics.ListAPIView):
    permission_classes = ()#(IsAuthenticated,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializerReadOnly
    filter_backends = (filters.SearchFilter,)
    search_fields = ("info", "name", "location", "artist", )
    #filter_class = EventFilter
