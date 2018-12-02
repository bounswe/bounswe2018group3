from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.EventListCreateView.as_view()),
    path('<int:pk>/', views.EventRetrieveView.as_view()),
    path('edit/<int:pk>/', views.EventListEditView.as_view()),
    path('search/', views.EventSearchView.as_view()),
    path('homepage/<int:page>/', views.EventUserRelated.as_view()),
    path('rate/<int:event_id>/<int:new_rating>', views.EventRateView.as_view({'get': 'rate'})),
]