from django.urls import include, path, re_path
from .views import FacebookLogin, ExampleView
from allauth.account.views import confirm_email as allauthemailconfirmation
from rest_auth.registration.views import VerifyEmailView


urlpatterns = [
    path('users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('registration/account-confirm-email/<str:key>/', allauthemailconfirmation, name="account_confirm_email"),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/ExampleView/', ExampleView.as_view()),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
]