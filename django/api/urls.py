from django.urls import re_path
from api import views

urlpatterns = [
    re_path(r'^sports/$', views.getSportsList),
    re_path(r'^championships/$', views.getChampionshipsList),
]