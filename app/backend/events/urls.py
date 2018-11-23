from django.urls import include, path

from . import views

urlpatterns = [
    path('edit/', views.EventListViewReadWrite.as_view()),
    path('', views.EventListViewReadOnly.as_view()),
]