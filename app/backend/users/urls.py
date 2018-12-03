from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.UserCreateView.as_view()), 
    path('edit/<int:pk>', views.UserEditView.as_view()),
    path('delete/<int:pk>', views.UserDeleteView.as_view({'delete': 'delete'})),
    path('search/', views.UserSearchView.as_view()),
    path('<int:pk>', views.UserRetrieveView.as_view()),
    path('getpic/<int:user_id>', views.UserPicView.as_view({'get': 'getpic'})),
    path('rate/<int:user_id>/<int:new_rating>', views.UserRateView.as_view({'get': 'rate'})),
]