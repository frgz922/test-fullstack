from . import models
from . import serializers
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class UserView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
