from django.urls import re_path

from DataModel.models.PlayerModel import views

urlpatterns = [
    re_path(r"search", views.search_players)
]