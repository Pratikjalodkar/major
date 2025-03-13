from django.shortcuts import get_object_or_404
from .models import Category, Product, VendorProfile
from builtins import dict, isinstance, super
import re
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.conf import settings
import requests

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
    role = serializers.ChoiceField(
        choices=[('customer', 'Customer'), ('vendor', 'Vendor')], required=True)
    mobile_no = serializers.CharField(required=True)
    address = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password',
                  'confirm_password', 'role', 'mobile_no', 'address']

    def validate_email(self, value):
        """Validate email format and restrict to allowed domains."""
        allowed_domains = ["gmail.com"]
        email_pattern = r"^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$"

        match = re.match(email_pattern, value)
        if not match:
            raise serializers.ValidationError("Invalid email format.")

        domain = match.group(1)
        if domain not in allowed_domains:
            raise serializers.ValidationError(
                f"Only emails with {allowed_domains} are allowed.")

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "This email is already registered.")
        
         # Email validation using external API
        # api_key = settings.EMAIL_VALIDATION_API_KEY
        # email_validation_url = f"https://api.zerobounce.net/v2/validate?api_key={api_key}&email={value}"

        # email_validation_url = f"https://api.mailboxvalidator.com/v1/validation/single?key={api_key}&email={value}&format=json"

        # try:
        #     response = requests.get(email_validation_url, timeout=5)
        #     response.raise_for_status()
        #     result = response.json()
        # except requests.RequestException:
        #     raise serializers.ValidationError(
        #         "Failed to connect to email validation service.")
        # print("ZeroBounce Response:", result)

        # if not isinstance(result, dict) or "status" not in result or result.get("status") != "valid":
        #     raise serializers.ValidationError("Invalid email address.")


        return value

    def validate_mobile_no(self, value):
        """Validate mobile number (must be exactly 10 digits)."""
        if not re.match(r"^\d{10}$", value):
            raise serializers.ValidationError(
                "Invalid mobile number. Must be exactly 10 digits.")
        return value

    def validate(self, data):
        """Ensure password and confirm_password match."""
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        """Create user and generate verification token."""
        validated_data.pop(
            'confirm_password')  # Remove confirm_password before saving
        validated_data['password'] = make_password(
            validated_data['password'])  # Hash password

        user = User.objects.create(**validated_data)
        user.is_active = False  # Require email verification
        user.save()

        return user

# class RegisterSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=True)
#     password = serializers.CharField(write_only=True, required=True)
#     confirm_password = serializers.CharField(write_only=True, required=True)
#     role = serializers.ChoiceField(
#         choices=[('customer', 'Customer'), ('vendor', 'Vendor')])

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password', 'confirm_password', 'role']

#     def validate_email(self, value):
#         """Check if the email is already registered and validate it using an API."""
#         allowed_domains = ["gmail.com"]  # List of allowed domains
#         email_pattern = r"^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$"

#         match = re.match(email_pattern, value)
#         if not match:
#             raise serializers.ValidationError("Invalid email format.")

#         domain = match.group(1)
#         if domain not in allowed_domains:
#             raise serializers.ValidationError(
#                 f"Only emails with {allowed_domains} are allowed.")
        
#         if User.objects.filter(email=value).exists():
#             raise serializers.ValidationError(
#                 "This email is already registered.")

#         # Email validation using external API
#         # api_key = settings.EMAIL_VALIDATION_API_KEY
#         # email_validation_url = f"https://api.zerobounce.net/v2/validate?api_key={api_key}&email={value}"

#         # email_validation_url = f"https://api.mailboxvalidator.com/v1/validation/single?key={api_key}&email={value}&format=json"
        

#         # try:
#         #     response = requests.get(email_validation_url, timeout=5)
#         #     response.raise_for_status()
#         #     result = response.json()
#         # except requests.RequestException:
#         #     raise serializers.ValidationError(
#         #         "Failed to connect to email validation service.")
#         # print("ZeroBounce Response:", result)

#         # if not isinstance(result, dict) or "status" not in result or result.get("status") != "valid":
#         #     raise serializers.ValidationError("Invalid email address.")
        
#         return value

#     def validate(self, data):
#         """Ensure password and confirm_password match."""
#         if data['password'] != data['confirm_password']:
#             raise serializers.ValidationError(
#                 {"confirm_password": "Passwords do not match."})
#         return data

#     def create(self, validated_data):
#         """Create user and generate verification token."""
#         validated_data.pop('confirm_password')  # Remove confirm_password
#         validated_data['password'] = make_password(
#             validated_data['password'])  # Hash password

#         user = User.objects.create(**validated_data)
#         user.is_active = False  # Require email verification
#         user.save()

#         return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user profile details."""
    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'user_type', 'mobile_no', 'address')


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Ensure email and password are provided."""
        if not data.get("email") or not data.get("password"):
            raise serializers.ValidationError(
                "Both email and password are required.")
        return data



class ForgotPasswordSerializer(serializers.Serializer):
    """Serializer for forgot password request."""
    email = serializers.EmailField()

    def validate_email(self, value):
        """Check if email exists in the system."""
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user found with this email.")
        return value


class ResetPasswordSerializer(serializers.Serializer):
    """Serializer for password reset."""
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Ensure passwords match."""
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."})
        return data


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), required=False)
    category_name = serializers.CharField(
        source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'category',
                  'category_name', 'inventory', 'image', 'is_active']
        read_only_fields = ['vendor']

    def create(self, validated_data):
        # Auto-set vendor to the logged-in user
        validated_data['vendor'] = self.context['request'].user

        # If no category is provided, default to "Fashion"
        if 'category' not in validated_data:
            fashion_category = get_object_or_404(Category, name="Fashion")
            validated_data['category'] = fashion_category

        return super().create(validated_data)


class VendorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile
        fields = ['id', 'user', 'phone', 'address']

