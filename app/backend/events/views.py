
from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import viewsets

import django_filters
import json
from . import models
from . import serializers
from api.models import EventRating

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
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer

class EventRetrieveView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = models.Event
        fields = '__all__'

#Read only event models,
class EventSearchView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)#(IsAuthenticated,)
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

    def rate(self, request, **kwargs):
        event = models.Event.objects.get(pk=self.kwargs['event_id'])
        for rating in event.ratings.all():
            if rating.rater.id == request.user.id:
                rating.givenPoint = self.kwargs['new_rating']
                rating.save()
                return HttpResponse(self.calcRating(event.id)) 
        rating = EventRating()
        rating.rater = request.user
        rating.givenPoint = self.kwargs['new_rating']
        rating.event = event
        rating.save()

        return HttpResponse(self.calcRating(event.id))

    def calcRating(self,pk):
        event = models.Event.objects.get(pk=self.kwargs['event_id'])
        if(len(event.ratings.all()) == 0):
            return 0
        totalPoint = 0
        for rating in event.ratings.all():
            totalPoint += rating.givenPoint
        
        return totalPoint/len(event.ratings.all())

class EventCreateView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        event_response =  self.create(request, *args, **kwargs)
        tag_ids = request.data["tag_ids"]
        tag_ids = '{"tag_ids":'+tag_ids+'}'
        event = models.Event.objects.get(id=event_response.data["id"])
        for tag_id in json.loads(tag_ids)["tag_ids"]:
            tag = Tag.objects.get(id=tag_id)
            event.tags.add(tag)
        event.save()
        return event_response
