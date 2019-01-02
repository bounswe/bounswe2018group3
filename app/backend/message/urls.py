from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.MessageGetView.as_view()),
    path('<int:user_id>', views.MessageView.as_view({'get': 'get', 'post': 'send'})),
]