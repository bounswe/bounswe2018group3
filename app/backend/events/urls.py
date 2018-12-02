from django.urls import include, path

from . import views

urlpatterns = [
    path('edit/<int:pk>/', views.EventListEditView.as_view()),
    path('search/', views.EventSearchView.as_view()),
    path('<int:pk>/', views.EventRetrieveView.as_view()),
    path('', views.EventListCreateView.as_view()),
    path('homepage/<int:page>/', views.EventUserRelated.as_view()),


]