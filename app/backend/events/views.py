
from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
import django_filters

from . import models
from . import serializers

# Create your views here..

#Read and write event models
class EventListEditView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventEditSerializer


class EventListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer

class EventRetrieveView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = models.Event
        fields = '__all__'

#Read only event models,
class EventSearchView(generics.ListAPIView):
    permission_classes = ()#(IsAuthenticated,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("info", "name", "country", "city", "artist", )
    #filter_class = EventFilter
