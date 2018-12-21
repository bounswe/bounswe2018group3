from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
import django_filters
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response

from . import models
from . import serializers
from api.models import UserRating, Tag
from events.models import Event
from datetime import datetime

def calcRating(user_id):
        user = models.CustomUser.objects.get(pk=user_id)
        ratingNum = len(user.ratings.all())
        if(ratingNum == 0):
            return (0,0)
        totalPoint = 0
        for rating in user.ratings.all():
            totalPoint += rating.givenPoint
        
        return (totalPoint/ratingNum, ratingNum)

class UserCreateView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserRWSerializer

    def get(self, request, *args, **kwargs):
        userList = []
        for user in models.CustomUser.objects.all():
            serializer =  serializers.UserRWSerializer(user)
            data = serializer.data
            (data['rating'], data['ratingNum']) = calcRating(user.id)
            del data['ratings']
            userList.append(data)
        return Response(userList)

    def post(self, request, *args, **kwargs):
        user_response =  self.create(request, *args, **kwargs)
        if "tag_ids" in request.data: # watching tags can be given by creating user
            tag_ids = request.data["tag_ids"]
            tag_ids = '{"tag_ids":'+tag_ids+'}'
            user = models.CustomUser.objects.get(id=user_response.data["id"])
            for tag_id in json.loads(tag_ids)["tag_ids"]:
                tag = Tag.objects.get(id=tag_id)
                user.watchingTags.add(tag)
            user.save()
        return user_response

class UserEditView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserRWSerializer

class UserDeleteView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserRWSerializer

    def delete(self, request, pk):
        user = models.CustomUser.objects.get(pk=pk)
        if(request.user.is_superuser == 'true'):
            user.delete()
            return HttpResponse("User deleted")
        return HttpResponse("Only a superuser can delete users")

class UserRateView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserRatingSerializer

    def rate(self, request, **kwargs):
        user = models.CustomUser.objects.get(pk=self.kwargs['user_id'])
        for rating in user.ratings.all():
            if rating.rater.id == request.user.id:
                rating.givenPoint = self.kwargs['new_rating']
                rating.save()
                return HttpResponse(self.calcRating(user.id))
        rating = UserRating()
        rating.rater = request.user
        rating.givenPoint = self.kwargs['new_rating']
        rating.user = user
        rating.save()

        return HttpResponse(self.calcRating(user.id))

    def calcRating(self, pk):
        user = models.CustomUser.objects.get(pk=self.kwargs['user_id'])
        if(len(user.ratings.all()) == 0):
            return 0
        totalPoint = 0
        for rating in user.ratings.all():
            totalPoint += rating.givenPoint
        
        return totalPoint/len(user.ratings.all())

class UserRetrieveView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserReadOnlySerializer

    def get(self, request, pk):
        user = models.CustomUser.objects.get(pk=pk)
        serializer = serializers.UserReadOnlySerializer(user)
        data = serializer.data
        futureEvents = []
        pastEvents = []
        for event in user.event_set.all():
            if(event.date > datetime.date(datetime.now())):
                futureEvents.append(event.id)
            else:
                pastEvents.append(event.id)
        data['futureEvents'] = futureEvents
        data['pastEvents'] = pastEvents

        events = Event.objects.all()
        created_events = []
        for event in events:
            if event.creator.id == user.id:
                created_events.append(event.id)

        data['createdEvents'] = created_events
        (data['rating'], data['ratingNum']) = calcRating(user.id)
        del data['ratings']
        return JsonResponse(data)

class UserAttendView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserAttendSerializer

    def attend(self, request, event_id): #may need to check if already exists
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        event = Event.objects.get(id=event_id)
        event.attendants.add(user)
        event.save()
        serializer = serializers.UserAttendSerializer(user)

        return JsonResponse(serializer.data)

    def unattend(self, request, event_id): # need to check if attending
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        event = Event.objects.get(id=event_id)
        event.attendants.remove(user)
        event.save()
        serializer = serializers.UserAttendSerializer(user)

        return JsonResponse(serializer.data)

class UserFilter(django_filters.FilterSet):
    class Meta:
        model = models.CustomUser
        fields = (
            'username',
            'first_name',
            'last_name', 
            'bio', 
            'city', 
            'country',
            'birthday', 
            'ratings',)

#Read only event models,
class UserSearchView(generics.ListAPIView):
    permission_classes = ()#(IsAuthenticated,)
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSearchSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("first_name", "last_name", "country", "city", "username", )
    #filter_class = EventFilter

class UserPicView(viewsets.ModelViewSet):
    http_method_names = ['get', 'put']
    permission_classes = ()
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.ProfilePicSerializer
    pagination_class = None

    def getpic(self, *args, **kwargs):

        user = models.CustomUser.objects.get(pk=self.kwargs['user_id'])
        image = user.profile_pic
        size = image.size

        return HttpResponse(image, content_type='image/png')

class UserFollowsUserView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()

    def follow(self, request, followed_user_id): #may need to check if already exists
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        followed_user = models.CustomUser.objects.get(id=followed_user_id)
        user.followedUsers.add(followed_user)
        user.save()

        return Response("User is followed.")

    def unfollow(self, request, followed_user_id): # need to check if attending
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        unfollowed_user = models.CustomUser.objects.get(id=followed_user_id)
        user.followedUsers.remove(unfollowed_user)
        user.save()
        
        return Response("User is unfollowed.")

class UserBlocksUserView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()

    def block(self, request, blocked_user_id): #may need to check if already exists
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        blocked_user = models.CustomUser.objects.get(id=blocked_user_id)
        user.blockedUsers.add(blocked_user)
        user.save()

        return Response("User is blocked.")

    def unblock(self, request, blocked_user_id): # need to check if attending
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        unblocked_user = models.CustomUser.objects.get(id=blocked_user_id)
        user.blockedUsers.remove(unblocked_user)
        user.save()
        
        return Response("User is unblocked.")

class UserWatchesTagView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()

    def watch(self, request, tag_id): #may need to check if already exists
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        tag = Tag.objects.get(id=tag_id)
        tag.watchers.add(user)
        tag.save()

        return Response("Tag is watched.")

    def unwatch(self, request, tag_id): # need to check if attending
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        tag = Tag.objects.get(id=tag_id)
        tag.watchers.remove(user)
        tag.save()
        
        return Response("Tag is unwatched.")

class UserBlocksTagView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.CustomUser.objects.all()

    def block(self, request, tag_id): #may need to check if already exists
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        tag = Tag.objects.get(id=tag_id)
        tag.blockers.add(user)
        tag.save()

        return Response("Tag is blocked.")

    def unblock(self, request, tag_id): # need to check if attending
        user_id = request.user.id
        user = models.CustomUser.objects.get(id=user_id)
        tag = Tag.objects.get(id=tag_id)
        tag.blockers.remove(user)
        tag.save()
        
        return Response("Tag is unblocked.")