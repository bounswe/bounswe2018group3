from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.AnnotationCreateView.as_view()),
    path('<int:pk>', views.AnnotationDetail.as_view(), name='annotation-detail'),

]