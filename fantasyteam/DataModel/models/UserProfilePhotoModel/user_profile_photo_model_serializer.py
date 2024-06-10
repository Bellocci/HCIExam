from base64 import b64decode
from rest_framework import serializers

from DataModel.models.UserModel.user_model import UserModel
from DataModel.models.UserProfilePhotoModel.user_profile_photo_model import UserProfilePhotoModel


class UserProfilePhotoModelSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserModel.objects.all())
    binary_content = serializers.CharField(required=True)

    def validate_binary_content(self, value):
        return bytearray(b64decode(value))

    class Meta:
        db_name = 'user_profile_photo'
        model = UserProfilePhotoModel
        fields = ['user','photo_file_name','binary_content']  

    def create(self, validated_data):
        user = UserModel.objects.get(user_id=self.context.get('user_id'))
        validated_data.pop('user')
        return UserProfilePhotoModel.objects.create(user=user, **validated_data)