from django.db import models

class UserProfilePhotoModel(models.Model):
    user = models.OneToOneField('UserModel', on_delete=models.CASCADE, primary_key=True)
    photo_file_name = models.CharField(max_length=100, null=False, blank=True)
    binary_content = models.BinaryField(null=False, blank=False)

    class Meta:
        db_table = 'user_profile_photos'

    def __str__(self):
        return f"Photo for {self.user.username}"