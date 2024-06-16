from django.urls import re_path

from DataModel.models.TeamModel import views

urlpatterns=[
    re_path(r'^teams/league=([0-9]+)', views.get_teams)
]