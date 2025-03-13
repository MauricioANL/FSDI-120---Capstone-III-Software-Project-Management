from django.urls import path
from django.shortcuts import redirect
from django.contrib.auth import views as auth_views
from .views import PictureListView, PictureCreateView, UserRegisterView, PictureUpdateView

urlpatterns = [
    path('', lambda request: redirect('login')),
    path('home', PictureListView.as_view(), name='home'),
    path('new/', PictureCreateView.as_view(), name='newPicture'),

    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('edit/<int:pk>/', PictureUpdateView.as_view(), name='editPicture'),

]
