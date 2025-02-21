from builtins import ValueError
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """Custom manager for User model where email is the unique identifier."""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is a required field')

        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)  # Set active by default
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """Custom User model using email instead of username for authentication."""

    USER = 'user'
    VENDOR = 'vendor'

    ROLE_CHOICES = [
        (USER, 'User'),
        (VENDOR, 'Vendor'),
    ]

    email = models.EmailField(unique=True, verbose_name=_("Email Address"))
    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[RegexValidator(
            regex=r'^[a-zA-Z0-9_]+$',
            message="Username must be alphanumeric and can contain underscores (_).",
            code="invalid_username"
        )],
        verbose_name=_("Username")
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=USER)
    is_email_verified = models.BooleanField(default=False)
    mobile_no = models.CharField(
        max_length=10, unique=True, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    objects = CustomUserManager()  # Use custom user manager

    USERNAME_FIELD = 'email'  # Login using email instead of username
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.username} - {self.email} - {self.role}"
