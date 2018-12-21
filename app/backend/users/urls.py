from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.UserCreateView.as_view()), 
    path('edit/<int:pk>', views.UserEditView.as_view()),
    path('delete/<int:pk>', views.UserDeleteView.as_view({'delete': 'delete'})),
    path('search/', views.UserSearchView.as_view()),
    path('<int:pk>', views.UserRetrieveView.as_view({'get': 'get'})),
    path('attend/<int:event_id>', views.UserAttendView.as_view({'get': 'attend', 'delete': 'unattend'})),
    path('interest/<int:event_id>', views.UserInterestedView.as_view({'get': 'interest', 'delete': 'uninterest'})),
    path('follow/<int:followed_user_id>', views.UserFollowsUserView.as_view({'get': 'follow', 'delete': 'unfollow'})),
    path('block/<int:blocked_user_id>', views.UserBlocksUserView.as_view({'get': 'block', 'delete': 'unblock'})),
    path('watch/<int:tag_id>', views.UserWatchesTagView.as_view({'get': 'watch', 'delete': 'unwatch'})),
    path('blockTag/<int:tag_id>', views.UserBlocksTagView.as_view({'get': 'block', 'delete': 'unblock'})),
    path('getpic/<int:user_id>', views.UserPicView.as_view({'get': 'getpic'})),
    path('rate/<int:user_id>/<int:new_rating>', views.UserRateView.as_view({'get': 'rate'})),
    path('flag/<int:user_id>', views.UserFlagView.as_view({'get': 'get', 'post': 'flag', 'delete': 'unflag'})),
]