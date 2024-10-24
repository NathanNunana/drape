from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .utils import send_activation_email, send_password_reset_email

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        send_activation_email(user, self.context['request'])
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Get the token for the user
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        return token

    def validate(self, attrs):
        # Validate the credentials
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(request=self.context.get('request'), email=email, password=password)
        
        if not user:
            raise serializers.ValidationError('Invalid email or password.')

        # Generate the token
        data = super().validate(attrs)
        token = self.get_token(user)
        data.update({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
            'access': str(token.access_token),
            'refresh': str(token),
        })
        
        return data


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user found with this email address.")
        return value

    def save(self):
        email = self.validated_data['email']
        user = User.objects.get(email=email)
        if user:
            send_password_reset_email(user, self.context['request'])

class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    uid = serializers.CharField()
    token = serializers.CharField()

    def save(self):
        uid = force_str(urlsafe_base64_decode(self.validated_data['uid']))
        token = self.validated_data['token']
        new_password = self.validated_data['new_password']

        user = User.objects.get(pk=uid)
        if not default_token_generator.check_token(user, token):
            raise serializers.ValidationError("Invalid token or user ID")

        user.set_password(new_password)
        user.save()
