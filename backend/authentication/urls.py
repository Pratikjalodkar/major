from django.urls import path
from .views import ForgotPasswordView, LoginView, RegisterView, ActivateUserView, ResetPasswordView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('activate/<str:uid>/<str:token>/',
         ActivateUserView.as_view(), name='activate'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<int:user_id>/',
         ResetPasswordView.as_view(), name='reset-password'),
#     path('logout/', LogoutView.as_view(), name='logout'),

]
