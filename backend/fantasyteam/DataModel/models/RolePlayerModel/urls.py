from django.urls import re_path

from DataModel.models.RolePlayerModel import views

urlpatterns=[
    re_path(r'^searchbyleague', views.get_roles)
]