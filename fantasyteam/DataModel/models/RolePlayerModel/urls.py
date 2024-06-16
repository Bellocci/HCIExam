from django.urls import re_path

from DataModel.models.RolePlayerModel import views

urlpatterns=[
    re_path(r'^roles/league=([0-9]+)', views.get_roles)
]