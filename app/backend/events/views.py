from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets

import django_filters
import json
from . import models
from . import serializers
from api.models import EventRating
from api.models import Tag

 # Function for calculating rating of an event
def calcRating(event_id):
    event = models.Event.objects.get(pk=event_id)
    ratingNum = len(event.ratings.all())
    if(ratingNum == 0):
        return (0,0)
    totalPoint = 0
    for rating in event.ratings.all():
        totalPoint += rating.givenPoint
    return (totalPoint/ratingNum, ratingNum)

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

class EventRetrieveView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer

    def get(self, *args, **kwargs):
        event = models.Event.objects.get(pk=self.kwargs['event_id'])
        serializer =  serializers.EventRWSerializer(event)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRating(event.id)
        del data['ratings']
        return JsonResponse(data)

"""
    def get(self, *args, **kwargs):
        eventsList = []
        for event in models.Event.objects.all():
            serializer =  serializers.EventRWSerializer(event)
            data = serializer.data
            data['rating'] = EventRateView.calcRating(event.id)
            del data['ratings']
            eventsList.append(data)
        HttpResponse(eventsList)
"""


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = models.Event
        fields = '__all__'

#Read only event models,
class EventSearchView(generics.ListAPIView): # TODO does not show ratings nicely
    permission_classes = (IsAuthenticatedOrReadOnly,)#(IsAuthenticated,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("info", "name", "country", "city", "artist", )
    #filter_class = EventFilter
    def get(self, request, *args, **kwargs):
        event_set = models.Event.objects.all()
        event_set = self.filter_queryset(event_set)
        
        returned_events = []
        for event in event_set:
            serializer =  serializers.EventRWSerializer(event)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRating(event.id)
            del data['ratings']
            returned_events.append(data)
        
        return JsonResponse(returned_events, safe=False)

class EventUserRelated(APIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Event.objects.all()

    def get(self, request, page, format=None):
        event_set = models.Event.objects.all()
        events = []
        for event in event_set:
            events.append(event)
        events.sort(key=lambda x: x.date, reverse=True)
        
        returned_events = []
        for event in events:
            serializer =  serializers.EventRWSerializer(event)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRating(event.id)
            del data['ratings']
            returned_events.append(data)
        return JsonResponse(returned_events[page*10:(page+1)*10], safe=False)

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
                return Response(calcRating(event.id)) 
        rating = EventRating()
        rating.rater = request.user
        rating.givenPoint = self.kwargs['new_rating']
        rating.event = event
        rating.save()

        return Response(calcRating(event.id))

    def unrate(self, request, **kwargs):
        event = models.Event.objects.get(pk=self.kwargs['event_id'])
        for rating in event.ratings.all():
            if rating.rater.id == request.user.id:
                rating.delete()
                return Response(calcRating(event.id))

        return Response(calcRating(event.id))

class EventFlagView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRatingSerializer

    def get(self, request, event_id):
        user = models.CustomUser.objects.get(id=request.user.id)
        if user.is_superuser:
            event = models.Event.objects.get(id=event_id)
            serializer = serializers.EventRatingSerializer(event)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRating(event.id)
            del data['ratings']
            return JsonResponse(data)
        return HttpResponse("Only superusers can see the flagged number.")

    def flag(self, request, event_id):
        flagger_id = request.user.id
        flagger = models.CustomUser.objects.get(id=flagger_id)
        event = models.Event.objects.get(id=event_id)
        event.flaggers.add(flagger)
        event.save()
        serializer = serializers.EventRatingSerializer(event)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRating(event.id)
        del data['ratings']
        return JsonResponse(data)

    def unflag(self, request, event_id): 
        flagger_id = request.user.id
        flagger = models.CustomUser.objects.get(id=flagger_id)
        event = models.Event.objects.get(id=event_id)
        event.flaggers.remove(flagger)
        event.save()
        serializer = serializers.EventRatingSerializer(event)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRating(event.id)
        del data['ratings']
        return JsonResponse(data)

class EventCreateView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventRWSerializer

    def get(self, request, *args, **kwargs):
        eventList = []
        for event in models.Event.objects.all():
            serializer =  serializers.EventRWSerializer(event)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRating(event.id)
            del data['ratings']
            eventList.append(data)
        return Response(eventList)

    def post(self, request, *args, **kwargs):
        event_response =  self.create(request, *args, **kwargs)
        event = models.Event.objects.get(id=event_response.data["id"])
        if "tag_ids" in request.data:
            tag_ids = request.data["tag_ids"]
            tag_ids = '{"tag_ids":'+tag_ids+'}'
            for tag_id in json.loads(tag_ids)["tag_ids"]:
                tag = Tag.objects.get(id=tag_id)
                event.tags.add(tag)
            event.save()
        serializer =  serializers.EventRWSerializer(event)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRating(event.id)
        del data['ratings']
        return JsonResponse(data)
