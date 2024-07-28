from rest_framework import permissions

class IsSuperAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow read-only access for all users
        if request.method in permissions.SAFE_METHODS:
            return True
        # Otherwise, only allow access if the user is a super admin
        return request.user and request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        # Allow read-only access for all users
        if request.method in permissions.SAFE_METHODS:
            return True
        # Otherwise, only allow access if the user is a super admin
        return request.user and request.user.is_superuser
