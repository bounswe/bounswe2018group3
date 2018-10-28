# Create your views here.
from allauth.socialaccount.providers.facebook.views import \
    FacebookOAuth2Adapter
from django.shortcuts import render
from rest_auth.registration.views import SocialLoginView

from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.decorators import api_view

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

@api_view()
def complete_view(request):
    return Response("Email account is activated!")
    
@api_view()
def verification_sent_view(request):
    return Response("Email has been sent to given address!")