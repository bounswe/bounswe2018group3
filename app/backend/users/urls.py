from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.UserListView.as_view()),
    path('getpic/<int:user_id>/', views.UserPic.as_view({'get': 'getpic'})),
]