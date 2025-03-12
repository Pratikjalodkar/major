from django.utils.decorators import method_decorator
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from .serializers import ProductSerializer
from .models import Product
from django.utils.timezone import now
from django.contrib.sessions.models import Session
from rest_framework import generics, permissions
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.generics import ListAPIView
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated
from .models import Category, Product, User  # Import your custom User model
from django.contrib.auth import authenticate
from builtins import Exception, print, str
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
from .serializers import ProductSerializer, RegisterSerializer
from django.urls import reverse
from .decorators import logout_required
from django.contrib.auth.decorators import login_required


User = get_user_model()

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
        print(f"📩 Incoming Data: {request.data}")  

        serializer = RegisterSerializer(data=request.data)
        print(f"🔒 Serializer: {serializer}")

        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

        print(f"❌ Serializer Errors: {serializer.errors}")  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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



class LoginView(APIView):
    permission_classes = [AllowAny]

    # @method_decorator(logout_required)
    @logout_required
    def post(self, request):
        # print(f"User: {request.user}, Auth: {request.auth}")
        # auth = JWTAuthentication()
        # user_auth_tuple = auth.authenticate(request)

        # if user_auth_tuple is not None:
        #     user, _ = user_auth_tuple
        #     return Response({"error": "You are already logged in."}, status=status.HTTP_400_BAD_REQUEST)

        email = request.data.get("email")
        password = request.data.get("password")
        # print(email, password)

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


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request) 
        return Response({"message": "Logout successful"}, status=200)

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


class CheckAuthView(APIView):
    def get(self, request):
        print(
            f"🔍 User: {request.user}, Authenticated: {request.user.is_authenticated}")

        # Debug: Check if session ID is present
        session_id = request.COOKIES.get("sessionid")
        print(f"🔍 Session ID from cookies: {session_id}")

        # Verify session exists in DB
        if session_id:
            try:
                session = Session.objects.get(session_key=session_id)
                data = session.get_decoded()
                print(f"🔍 Decoded session data: {data}")
                if "_auth_user_id" in data:
                    print(f"✅ User ID from session: {data['_auth_user_id']}")
            except Session.DoesNotExist:
                print("❌ Session does not exist in DB")

        if request.user.is_authenticated:
            return Response({"isAuthenticated": True}, status=200)
        return Response({"isAuthenticated": False}, status=200)



class UserProfileSerializer(serializers.ModelSerializer):
    profilePic = serializers.ImageField(source="profile_image", required=False)
    businessName = serializers.CharField(
        source="business_name", required=False, allow_blank=True)
    businessAddress = serializers.CharField(
        source="business_address", required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["username", "email", "role", "bio", "profilePic",
                  "businessName", "businessAddress", "is_verified"]
        read_only_fields = ["username", "email", "role", "is_verified"]

    def validate(self, data):
        # Vendors must have business name & address
        if self.instance.role == "vendor" and (not data.get("business_name") or not data.get("business_address")):
            raise serializers.ValidationError(
                "Vendors must provide business name and address.")
        return data


class IsVendor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated


# API View for creating a product
class CreateProductView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsVendor]

    def perform_create(self, serializer):
        fashion_category = get_object_or_404(Category, name="Fashion")
        serializer.save(vendor=self.request.user, category=fashion_category)


class VendorProductsView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)


class UpdateProductView(RetrieveUpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)


class DeleteProductView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)


@api_view(["GET"])
def get_product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)













