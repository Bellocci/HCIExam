from django.urls import re_path

from DataModel.models.LeagueModel import views

urlpatterns=[
    re_path(r'^$', views.get_leagues)
]