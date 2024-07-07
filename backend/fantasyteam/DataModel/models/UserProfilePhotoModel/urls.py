from django.urls import re_path

from DataModel.models.UserProfilePhotoModel import views

urlpatterns=[
    re_path(r"^upload", views.upload_photo),
    re_path(r"^delete", views.delete_photo)
]