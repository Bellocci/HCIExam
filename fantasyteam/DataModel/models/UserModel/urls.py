from django.urls import re_path
from . import views

urlpatterns=[
    re_path(r"^/user/login", views.find_user),
    #re_path(r"^subscription", views.create_new_user),
]