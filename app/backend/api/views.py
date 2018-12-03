# Create your views here.
from allauth.socialaccount.providers.facebook.views import \
    FacebookOAuth2Adapter
from django.shortcuts import render, redirect
from rest_auth.registration.views import SocialLoginView

from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.decorators import api_view

import requests

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import generics
from rest_framework import filters
from rest_framework import viewsets
import django_filters
from . import models
from . import serializers

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class ExampleView(APIView):
    # authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)


class CompleteView(APIView):
    permission_classes = ()

    def get(self, request, format=None):
        content = {
            'detail': "E-mail verification is complete!"
        }
        return Response(content)

class VerificationSentView(APIView):
    permission_classes = ()

    def get(self, request, format=None):
        content = {
            'detail': "E-mail verification is sent!"
        }
        return Response(content)

# Comment views

class UserCommentCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentRWSerializer

class UserCommentEditView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentRWSerializer

class UserCommentRateView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentRatingSerializer

    def rate(self, request, pk, new_rating):
        comment = models.UserComment.objects.get(pk=pk)
        totalRating = comment.rating * comment.ratingNum
        comment.ratingNum = comment.ratingNum + 1
        comment.rating = (totalRating + new_rating) / comment.ratingNum
        comment.save()

        return HttpResponse(comment.rating)

class UserCommentRetrieveView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentReadOnlySerializer

class UserCommentDeleteView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRWSerializer

    def delete(self, request, pk):
        comment = models.UserComment.objects.get(pk=pk)
        if(comment.author == request.user):
            comment.delete()
            return HttpResponse("Item deleted")
        return HttpResponse("Only the author can delete their comments")

class UserCommentFilter(django_filters.FilterSet):
    class Meta:
        model = models.UserComment
        fields = (
            'title',
            'content',
            'author', 
            'date', 
            'rating', 
            'ratingNum',
            )

class UserCommentSearchView(generics.ListAPIView):
    permission_classes = ()#(IsAuthenticated,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentSearchSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("title", "content", "author", )
    #filter_class = EventFilter

class EventCommentCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRWSerializer

class EventCommentEditView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRWSerializer

class EventCommentDeleteView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRWSerializer

    def delete(self, request, pk):
        comment = models.EventComment.objects.get(pk=pk)
        if(comment.author == request.user):
            comment.delete()
            return HttpResponse("Item deleted")
        return HttpResponse("Only the author can delete their comments")


class EventCommentRateView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRatingSerializer

    def rate(self, request, pk, new_rating):
        comment = models.EventComment.objects.get(pk=pk)
        totalRating = comment.rating * comment.ratingNum
        comment.ratingNum = comment.ratingNum + 1
        comment.rating = (totalRating + new_rating) / comment.ratingNum
        comment.save()

        return HttpResponse(comment.rating)

class EventCommentRetrieveView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentReadOnlySerializer

class EventCommentFilter(django_filters.FilterSet):
    class Meta:
        model = models.EventComment
        fields = (
            'title',
            'content',
            'author', 
            'date', 
            'rating', 
            'ratingNum',
            )

class EventCommentSearchView(generics.ListAPIView):
    permission_classes = ()#(IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentSearchSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("title", "content",)
    #filter_class = EventFilter