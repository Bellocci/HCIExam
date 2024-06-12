from django.conf.urls import include
from django.urls import re_path
from DataModel.models.UserModel import views

urlpatterns=[
    re_path(r"^login", views.find_user),
    re_path(r"^subscription", views.create_new_user),
    re_path(r"^recover_password", views.retrieve_password),
    re_path(r"^id=([0-9]+)/profile_photo/", include('DataModel.models.UserProfilePhotoModel.urls'))
]