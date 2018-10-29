from django.urls import include, path, re_path
from .views import FacebookLogin, ExampleView
from allauth.account.views import ConfirmEmailView
from allauth.account.views import confirm_email as allauthemailconfirmation
from rest_auth.registration.views import VerifyEmailView
from .views import CompleteView, VerificationSentView
from django.views.generic import TemplateView

urlpatterns = [
    path('users/', include('users.urls')),
    path('events/', include('events.urls')),
    path('rest-auth/registration/account-confirm-email/<str:key>/', allauthemailconfirmation, name='account_confirm_email'),
    path('rest-auth/registration/account-email-verification-sent/', VerificationSentView.as_view(), name='account_email_verification_sent'),
    path('rest-auth/registration/complete/', CompleteView.as_view(), name='account_confirm_complete'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/ExampleView/', ExampleView.as_view()),
]