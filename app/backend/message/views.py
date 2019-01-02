from django.shortcuts import render
from users.models import CustomUser
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics
from rest_framework import filters
from rest_framework import viewsets
from rest_framework import mixins
from . import models, serializers

class MessageGetView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer

class MessageView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer

    def messageTime(self, message):
        return message.datetime

    def get(self, request, *args, **kwargs):
        #print(CustomUser.objects.get(id=kwargs['user_id']) == CustomUser.objects.get(id=kwargs['user_id']))
        sentMessages = models.Message.objects.filter(sender=request.user.id)
        sentMessages = sentMessages.filter(receiver=CustomUser.objects.get(id=kwargs['user_id']))
        receivedMessages = models.Message.objects.filter(receiver=request.user)
        receivedMessages = receivedMessages.filter(sender=CustomUser.objects.get(id=kwargs['user_id']))
        messages = []
        for message in sentMessages:
            messages.append(message)
        for message in receivedMessages:
            messages.append(message)
        messages = sorted(messages, key=self.messageTime)
        returnList = []
        for message in messages:
            serializer = serializers.MessageSerializer(message)
            returnList.append(serializer.data)

        return Response(returnList)

    def send(self, request, *args, **kwargs):
        message_response = self.create(request, *args, **kwargs)
        message = models.Message.objects.get(id=message_response.data['id'])
        message.sender = request.user
        message.receiver = CustomUser.objects.get(id=kwargs['user_id'])
        message.save()
        return self.get(request, *args, **kwargs)
        
