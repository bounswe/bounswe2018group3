from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.UserCreateView.as_view()), 
    path('edit/<int:pk>/', views.UserEditView.as_view()),
    path('search/', views.UserSearchView.as_view()),
    path('<int:pk>/', views.UserRetrieveView.as_view()),
    path('getpic/<int:user_id>/', views.UserPicView.as_view({'get': 'getpic'})),
]