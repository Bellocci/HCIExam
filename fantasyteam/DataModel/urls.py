from django.urls import re_path
from django.conf.urls import include
from DataModel import views

urlpatterns=[
    re_path(r"^/user/", include('DataModel.models.UserModel.urls')),
]