from django.db import models
from DataModel.models.UserProfilePhotoModel.user_profile_photo_model import UserProfilePhotoModel

class UserModel(models.Model):
    #
    # Modello dati
    #
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, error_messages="Name is mandatory")
    surname = models.CharField(max_length=255, error_messages="Surname is mandatory")
    username = models.CharField(max_length=100, error_messages="Username is mandatory", unique=True)
    password = models.CharField(max_length=100, error_messages="Password is mandatory")
    
    #
    # Attributi aggiuntivi
    #
    profile_photo:UserProfilePhotoModel;

    class Meta:
        db_table = 'users'

    def get_profile_photo(self) -> UserProfilePhotoModel:
        if(self.profile_photo is None):
            self.profile_photo = UserProfilePhotoModel.objects.get(user_id=self.user_id)
        return self.profile_photo        

    def __str__(self):
        return f"{self.name} {self.surname}"