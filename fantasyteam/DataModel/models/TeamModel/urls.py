from django.urls import re_path

from DataModel.models.TeamModel import views

urlpatterns=[
    re_path(r'^$', views.get_teams)
]