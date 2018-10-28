from django.urls import include, path, re_path
from .views import FacebookLogin, ExampleView
from allauth.account.views import ConfirmEmailView
from allauth.account.views import confirm_email as allauthemailconfirmation
from rest_auth.registration.views import VerifyEmailView
from .views import complete_view, verification_sent_view, confirm_email
from django.views.generic import TemplateView
from allauth.account.views import confirm_email



urlpatterns = [
    path('users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/account-confirm-email/<str:key>/', complete_view, name='account_confirm_email'),
    path('rest-auth/registration/account-email-verification-sent/', verification_sent_view, name='account_email_verification_sent'),
    path('registration/complete/', complete_view, name='account_confirm_complete'),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/ExampleView/', ExampleView.as_view()),
]