from .models import User  # Import your custom User model
from django.contrib.auth import authenticate
from builtins import Exception, str
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import get_object_or_404
from .serializers import RegisterSerializer
from django.urls import reverse
from .decorators import logout_required

User = get_user_model()

# ✅ Register View (User Signup)
# class RegisterView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):

#         print(f"📩 Incoming Data: {request.data}")
#         serializer = RegisterSerializer(data=request.data)

#         if serializer.is_valid():
#             try:
#                 user = serializer.save()
#                 print(f"✅ User created: {user.username}, {user.email}")
#                 # user.is_active = False  # Set inactive until email verification
#                 user.save()
#                 print(f"✅ User saved: {user.username}")

#                 # Generate email verification link
#                 uid = urlsafe_base64_encode(force_bytes(user.pk))
#                 token = default_token_generator.make_token(user)
#                 activation_link = f"{settings.FRONTEND_BASE_URL}/activate/{uid}/{token}/"
#                 print(f"✅ Activation link: {activation_link}")

#                 # Send email verification link (Uncomment if needed)
#                 # try:
#                 #     send_mail(
#                 #         subject="Verify Your Email",
#                 #         message=f"Click the link to verify your email: {activation_link}",
#                 #         from_email=settings.EMAIL_HOST_USER,
#                 #         recipient_list=[user.email],
#                 #         fail_silently=False,
#                 #     )
#                 # except Exception as e:
#                 #     return Response({"error": f"Failed to send verification email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#                 return Response({"message": "Registration successful. Check your email to verify."}, status=status.HTTP_201_CREATED)

#             except Exception as e:
#                 print(f"❌ User creation failed: {str(e)}")
#                 return Response({"error": f"User creation failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         print(f"❌ Serializer errors: {serializer.errors}")
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(f"📩 Incoming Data: {request.data}")  # Log incoming data

        serializer = RegisterSerializer(data=request.data)
        print(f"🔒 Serializer: {serializer}")

        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

        print(f"❌ Serializer Errors: {serializer.errors}")  # Log errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Email Activation View
class ActivateUserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(User, pk=uid)

            if user.is_active:
                return Response({"message": "User already verified."}, status=status.HTTP_400_BAD_REQUEST)

            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return Response({"message": "Email verified successfully!"}, status=status.HTTP_200_OK)

            return Response({"error": "Invalid token or user already verified."}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)


# ✅ Login View


class LoginView(APIView):
    permission_classes = [AllowAny]

    @logout_required
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        print(email, password)

        if not email or not password:
            return Response({"error": "Both email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()

        if user and user.check_password(password):  # Correctly check password
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role,
                },
                "token": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# ✅ Forgot Password (Sends Reset Email)
class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email", "").strip().lower()
        user = User.objects.filter(email=email).first()

        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"{settings.FRONTEND_BASE_URL}/reset-password/{uid}/{token}/"

            try:
                send_mail(
                    "Password Reset Request",
                    f"Click the link below to reset your password:\n{reset_link}",
                    settings.EMAIL_HOST_USER,
                    [email],
                    fail_silently=False,
                )
            except Exception:
                return Response({"error": "Failed to send email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"message": "Password reset link sent to your email."}, status=status.HTTP_200_OK)

        return Response({"error": "Email not found."}, status=status.HTTP_400_BAD_REQUEST)


# ✅ Reset Password (Using Secure Token)
class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(User, pk=uid)

            if not default_token_generator.check_token(user, token):
                return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

            new_password = request.data.get("new_password")
            confirm_password = request.data.get("confirm_password")

            if new_password != confirm_password:
                return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)

        except Exception:
            return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)
