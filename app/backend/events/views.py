
from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import viewsets

import django_filters

from . import models
from . import serializers

# Create your views here..

#Read and write event models
class EventEditView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventEditSerializer

class EventDeleteView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.EventRWSerializer

    def delete(self, request, pk):
        event = models.Event.objects.get(pk=pk)
        if(request.user == event.creator or request.user.is_superuser == 'true'):
            event.delete()
            return HttpResponse("Event deleted")
        return HttpResponse("Only the creator can delete their events")


class EventCreateView(generics.ListCreateAPIView):
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

class EventUserRelated(APIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Event.objects.all()

    def get(self, request, page, format=None):
        
        event_set = models.Event.objects.all()
        events = []
        for event in event_set:
            events.append(event)
        events.sort(key=lambda x: x.date, reverse=True)
        
        events_serialized = [(serializers.EventRWSerializer(event).data) for event in events]
        return Response(events_serialized[page*10:(page+1)*10])

class EventRateView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRatingSerializer

    def rate(self, *args, **kwargs):
        event = models.Event.objects.get(pk=self.kwargs['event_id'])
        totalRating = event.rating * event.ratingNum
        event.ratingNum = event.ratingNum + 1
        event.rating = (totalRating + self.kwargs['new_rating']) / event.ratingNum
        event.save()

        return HttpResponse(event.rating)