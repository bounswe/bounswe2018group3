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
from rest_framework import mixins
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

# Comment views #####################################################

# Function for calculating user comment rating
def calcRatingU(comment_id):  # Upvotes or downvotes (+1 or -1)
    comment = models.UserComment.objects.get(pk=comment_id)
    ratingNum = len(comment.ratings.all())
    if(ratingNum == 0):
        return (0,0)
    totalPoint = 0
    for rating in comment.ratings.all():
        totalPoint += rating.givenPoint
    
    return (totalPoint, ratingNum)


# Function for calculating event comment rating
def calcRatingE(comment_id): # upvote or downvote
    comment = models.EventComment.objects.get(pk=comment_id)
    ratingNum = len(comment.ratings.all())
    if(ratingNum == 0):
        return (0,0)
    totalPoint = 0
    for rating in comment.ratings.all():
        totalPoint += rating.givenPoint
    
    return (totalPoint, ratingNum)    

class UserCommentCreateView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentRWSerializer

    def get(self, request, *args, **kwargs):
        commentList = []
        for comment in models.UserComment.objects.all():
            serializer =  serializers.UserCommentRWSerializer(comment)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRatingU(comment.id)
            del data['ratings']
            data['authorName'] = comment.author.username
            commentList.append(data)
        return Response(commentList)
    
    def post(self, request, *args, **kwargs):
        comment_response =  self.create(request, *args, **kwargs)
        comment = models.UserComment.objects.get(id=comment_response.data["id"])
        serializer =  serializers.UserCommentRWSerializer(comment)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRatingU(comment.id)
        del data['ratings']
        data['authorName'] = comment.author.username
        return JsonResponse(data)

class UserCommentEditView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentRWSerializer

class UserCommentRetrieveView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentReadOnlySerializer

    def get(self, *args, **kwargs):
        comment = models.UserComment.objects.get(pk=self.kwargs['comment_id'])
        serializer =  serializers.UserCommentReadOnlySerializer(comment)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRatingU(comment.id)
        del data['ratings']
        data['authorName'] = comment.author.username
        return JsonResponse(data)

class UserCommentDeleteView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRWSerializer

    def delete(self, request, pk):
        comment = models.UserComment.objects.get(pk=pk)
        if(comment.author == request.user or request.user.is_superuser == 'true'):
            comment.delete()
            return HttpResponse("Item deleted")
        return HttpResponse("Only the author can delete their comments")

class UserCommentFilter(django_filters.FilterSet):
    class Meta:
        model = models.UserComment
        fields = (
            'title',
            'content',
            'date', 
            )

class UserCommentSearchView(generics.ListAPIView): # TODO does not show ratings
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentSearchSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("title", "content", "date", ) # cannot search in many-to many
    #filter_class = EventFilter

    def get(self, request, *args, **kwargs):
        usercomment_set =  models.UserComment.objects.all()
        usercomment_set = self.filter_queryset(usercomment_set)
        
        returned_usercomments = []
        for comment in usercomment_set:
            serializer =  serializers.EventCommentReadOnlySerializer(comment)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRatingU(comment.id)
            del data['ratings']
            data['authorName'] = comment.author.username
            returned_usercomments.append(data)
        
        return JsonResponse(returned_usercomments, safe=False)

class UserCommentRateView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentRatingSerializer

    def rate(self, request, **kwargs):
        comment = models.UserComment.objects.get(pk=self.kwargs['comment_id'])
        for rating in comment.ratings.all():
            if rating.rater.id == request.user.id:
                rating.givenPoint = self.kwargs['new_rating']
                rating.save()
                return Response(calcRatingU(comment.id))
        rating = models.UserCommentRating()
        rating.rater = request.user
        rating.givenPoint = self.kwargs['new_rating']
        rating.comment = comment
        rating.save()

        return Response(calcRatingU(comment.id))

    def unrate(self, request, **kwargs):
        comment = models.UserComment.objects.get(pk=self.kwargs['comment_id'])
        for rating in comment.ratings.all():
            if rating.rater.id == request.user.id:
                rating.delete()
                return Response(calcRatingU(comment.id))

        return Response(calcRatingU(comment.id))


class UserCommentFlagView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.UserComment.objects.all()
    serializer_class = serializers.UserCommentRatingSerializer

    def get(self, request, comment_id):
        user = models.CustomUser.objects.get(id=request.user.id)
        if user.is_superuser:
            comment = models.UserComment.objects.get(id=comment_id)
            serializer = serializers.UserCommentRatingSerializer(comment)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRatingU(comment.id)
            del data['ratings']
            return JsonResponse(data)
        return HttpResponse("Only superusers can see the flagged number.")

    def flag(self, request, comment_id):
        flagger_id = request.user.id
        flagger = models.CustomUser.objects.get(id=flagger_id)
        comment = models.UserComment.objects.get(id=comment_id)
        comment.flaggers.add(flagger)
        comment.save()
        serializer = serializers.UserCommentRatingSerializer(comment)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRatingU(comment.id)
        del data['ratings']
        return JsonResponse(data)

    def unflag(self, request, comment_id): 
        flagger_id = request.user.id
        flagger = models.CustomUser.objects.get(id=flagger_id)
        comment = models.UserComment.objects.get(id=comment_id)
        comment.flaggers.remove(flagger)
        comment.save()
        serializer = serializers.UserCommentRatingSerializer(comment)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRatingU(comment.id)
        del data['ratings']
        return JsonResponse(data)


class EventCommentCreateView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRWSerializer

    def get(self, request, *args, **kwargs):
        commentList = []
        for comment in models.EventComment.objects.all():
            serializer =  serializers.EventCommentRWSerializer(comment)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRatingE(comment.id)
            del data['ratings']
            data['authorName'] = comment.author.username
            commentList.append(data)
        return Response(commentList)

    def post(self, request, *args, **kwargs):
        comment_response =  self.create(request, *args, **kwargs)
        comment = models.EventComment.objects.get(id=comment_response.data["id"])
        serializer =  serializers.EventCommentRWSerializer(comment)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRatingE(comment.id)
        del data['ratings']
        data['authorName'] = comment.author.username
        return JsonResponse(data)

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
        if(comment.author == request.user or request.user.is_superuser == 'true'):
            comment.delete()
            return HttpResponse("Item deleted")
        return HttpResponse("Only the author can delete their comments")

class EventCommentRetrieveView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentReadOnlySerializer

    def get(self, *args, **kwargs):
        comment = models.EventComment.objects.get(pk=self.kwargs['comment_id'])
        serializer =  serializers.EventCommentReadOnlySerializer(comment)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRatingE(comment.id)
        del data['ratings']
        data['authorName'] = comment.author.username
        return JsonResponse(data)

class EventCommentFilter(django_filters.FilterSet):
    class Meta:
        model = models.EventComment
        fields = (
            'title',
            'content',
            'author', 
            'date',
            )

class EventCommentSearchView(generics.ListAPIView): # TODO does not show ratings
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentSearchSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("title", "content","date")
    #filter_class = EventFilter

    def get(self, request, *args, **kwargs):
        eventcomment_set =  models.EventComment.objects.all()
        eventcomment_set = self.filter_queryset(eventcomment_set)
        
        returned_eventcomments = []
        for comment in eventcomment_set:
            serializer =  serializers.EventCommentReadOnlySerializer(comment)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRatingE(comment.id)
            del data['ratings']
            data['authorName'] = comment.author.username
            returned_eventcomments.append(data)
        
        return JsonResponse(returned_eventcomments, safe=False)

class EventCommentRateView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRatingSerializer

    def rate(self, request, **kwargs):
        comment = models.EventComment.objects.get(pk=self.kwargs['comment_id'])
        for rating in comment.ratings.all():
            if rating.rater.id == request.user.id:
                rating.givenPoint = self.kwargs['new_rating']
                rating.save()
                return Response(calcRatingE(comment.id))
        rating = models.EventCommentRating()
        rating.rater = request.user
        rating.givenPoint = self.kwargs['new_rating']
        rating.comment = comment
        rating.save()

        return Response(calcRatingE(comment.id))

    def unrate(self, request, **kwargs):
        comment = models.EventComment.objects.get(pk=self.kwargs['comment_id'])
        for rating in comment.ratings.all():
            if rating.rater.id == request.user.id:
                rating.delete()
                return Response(calcRatingE(comment.id))

        return Response(calcRatingE(comment.id))

class EventCommentFlagView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.EventComment.objects.all()
    serializer_class = serializers.EventCommentRatingSerializer

    def get(self, request, comment_id):
        user = models.CustomUser.objects.get(id=request.user.id)
        if user.is_superuser:
            comment = models.EventComment.objects.get(id=comment_id)
            serializer = serializers.EventCommentRatingSerializer(comment)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRatingE(comment.id)
            del data['ratings']
            return JsonResponse(data)
        return HttpResponse("Only superusers can see the flagged number.")

    def flag(self, request, comment_id):
        flagger_id = request.user.id
        flagger = models.CustomUser.objects.get(id=flagger_id)
        comment = models.EventComment.objects.get(id=comment_id)
        comment.flaggers.add(flagger)
        comment.save()
        serializer = serializers.EventCommentRatingSerializer(comment)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRatingE(comment.id)
        del data['ratings']
        return JsonResponse(data)

    def unflag(self, request, comment_id): 
        flagger_id = request.user.id
        flagger = models.CustomUser.objects.get(id=flagger_id)
        comment = models.EventComment.objects.get(id=comment_id)
        comment.flaggers.remove(flagger)
        comment.save()
        serializer = serializers.EventCommentRatingSerializer(comment)
        data = serializer.data
        (data['rating'], data['ratingNum']) = calcRatingE(comment.id)
        del data['ratings']
        return JsonResponse(data)

# Tag related views ###################################################

class TagCreateView(generics.ListCreateAPIView): # TODO currently every user can do this, not cool
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagRWSerializer

class TagEditView(generics.UpdateAPIView):  # TODO currently every user can do this, not cool
    permission_classes = (IsAuthenticated,)
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagRWSerializer

class TagDeleteView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagRWSerializer

    def delete(self, request, pk):
        tag = models.Tag.objects.get(pk=pk)
        if(request.user.is_superuser == 'true'):
            tag.delete()
            return HttpResponse("Tag deleted")
        return HttpResponse("Only a superuser can delete tags")

class TagRetrieveView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagReadOnlySerializer

class TagSearchView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSearchSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name", )

# Image related views #######################################

class UserImagesView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        photo = models.UserImage.objects.all()
        serializer = serializers.UserImageSerializer(photo, context={'request': request}, many=True)
        return Response(data=serializer.data)

    def post(self, request, format=None):
        serializer = serializers.UserImageSerializer(context={'request': request}, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class UserImageDetail(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, pk):
        return models.UserImage.objects.get(pk=pk)


    def get(self, request, pk, format=None):
        photo = self.get_object(pk)
        serializer = serializers.UserImageSerializer(photo, context={'request': request})
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        photo = self.get_object(pk)
        serializer = serializers.UserImageSerializer(photo, context={'request': request}, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk, format=None):
        photo = self.get_object(pk)
        photo.delete()
        return Response("Deleted.")

class EventImagesView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        photo = models.EventImage.objects.all()
        serializer = serializers.EventImageSerializer(photo, context={'request': request}, many=True)
        return Response(data=serializer.data)

    def post(self, request, format=None):
        serializer = serializers.EventImageSerializer(context={'request': request}, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class EventImageDetail(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, pk):
        return models.EventImage.objects.get(pk=pk)


    def get(self, request, pk, format=None):
        photo = self.get_object(pk)
        serializer = serializers.EventImageSerializer(photo, context={'request': request})
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        photo = self.get_object(pk)
        serializer = serializers.EventImageSerializer(photo, context={'request': request}, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk, format=None):
        photo = self.get_object(pk)
        photo.delete()
        return Response("Deleted.")