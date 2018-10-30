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
