from django.urls import path
from .views import CheckAuthView, CreateProductView, DeleteProductView, ForgotPasswordView, LoginView, LogoutView, RegisterView, ActivateUserView, ResetPasswordView, UpdateProductView, VendorProductsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('activate/<str:uid>/<str:token>/',
         ActivateUserView.as_view(), name='activate'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<int:user_id>/',
         ResetPasswordView.as_view(), name='reset-password'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path("check-auth/", CheckAuthView.as_view(), name="check-auth"),
    path("products/create/", CreateProductView.as_view(), name="create-product"),
    path("products/", VendorProductsView.as_view(), name="vendor-products"),
    path("products/update/<int:pk>/",
         UpdateProductView.as_view(), name="update-product"),
    path("products/delete/<int:pk>/",
         DeleteProductView.as_view(), name="delete-product"),

]
