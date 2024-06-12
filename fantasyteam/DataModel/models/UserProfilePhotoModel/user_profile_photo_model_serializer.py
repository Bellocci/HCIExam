import base64
from rest_framework import serializers

from DataModel.models.UserModel.user_model import UserModel
from DataModel.models.UserProfilePhotoModel.user_profile_photo_model import UserProfilePhotoModel

def is_base64_encoded(data):
    try:
        base64.b64decode(data)
        return True
    except (ValueError, base64.binascii.Error) as e:
        print("Errore durante la decodifica base64:", e)
        return False

class UserProfilePhotoModelSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserModel.objects.all(), write_only=True)
    binary_content = serializers.CharField(required=True)    

    class Meta:
        model = UserProfilePhotoModel
        fields = ['user','photo_file_name','binary_content']

    def validate_binary_content(self, value):
        if(value is None or len(value) == 0):
            raise serializers.ValidationError('Binary content is mandatory.')
        
        # Si controlla se è codificata in base64
        if(not is_base64_encoded(value)):
            raise serializers.ValidationError('The image is not a valid base64 string.')

        # Si controlla che sia un file .jpg o .png
        data = base64.b64decode(value)
        jpg_signature = b'\xff\xd8\xff'
        png_signature = b'\x89PNG\r\n\x1a\n'
        if(not data.startswith(jpg_signature) and not data.startswith(png_signature)):
            raise serializers.ValidationError("Only '.jpg' and '.png' files are allowed")

        return bytearray(data)
    
    def validate_photo_file_name(self, value):
        if(value is None):
            value = ''
        return value