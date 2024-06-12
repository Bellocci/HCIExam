from django.db import models
from DataModel.models.UserProfilePhotoModel.user_profile_photo_model import UserProfilePhotoModel

class UserModel(models.Model):
    #
    # Modello dati
    #
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    username = models.CharField(max_length=100, unique=True, error_messages={
        'unique' : 'Username already exist'
    })
    password = models.CharField(max_length=100)

    class Meta:
        db_table = 'users'      

    def __str__(self):
        return f"{self.name} {self.surname}"