from django.urls import include, path

from . import views

urlpatterns = [
    path('edit/<int:pk>/', views.EventListViewReadWrite.as_view()),
    path('edit/', views.EventListViewReadWrite.as_view()),
    path('', views.EventListViewReadOnly.as_view()),
]