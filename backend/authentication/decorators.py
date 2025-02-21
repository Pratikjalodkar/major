from builtins import Exception, isinstance
from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model

User = get_user_model()


def logout_required(view_func):
    @wraps(view_func)
    def wrapped_view(self, request, *args, **kwargs):
        jwt_auth = JWTAuthentication()
        header = jwt_auth.get_header(request)
        if header:
            try:
                validated_token = jwt_auth.get_validated_token(header)
                user = jwt_auth.get_user(validated_token)
                if user and isinstance(user, User):
                    return Response({"message": "You are already logged in.", "redirect": "/home"}, status=status.HTTP_302_FOUND)
            except Exception:
                pass  # Token is invalid or not provided, allow access

        return view_func(self, request, *args, **kwargs)

    return wrapped_view
