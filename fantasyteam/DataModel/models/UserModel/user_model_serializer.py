from rest_framework import serializers

from DataModel.models.UserModel.user_model import UserModel
from DataModel.models.UserProfilePhotoModel.user_profile_photo_model_serializer import UserProfilePhotoModelSerializer

class UserModelSerializer(serializers.ModelSerializer):
    # Serializer nested per il campo OneToOne
    profile_photo = UserProfilePhotoModelSerializer(required=False) 

    class Meta:
        db_table = 'user'
        model = UserModel
        fields = ['user_id', 'name', 'surname', 'username', 'password', 'profile_photo']
        # Imposta write_only=True per il campo password in modo che non venga incluso nelle risposte API
        extra_kwargs = {
            'password': {'write_only': True}
        } 