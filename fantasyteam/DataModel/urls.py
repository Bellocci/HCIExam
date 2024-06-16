from django.urls import re_path
from django.conf.urls import include

urlpatterns=[
    re_path(r"^model/user/", include('DataModel.models.UserModel.urls')),
    re_path(r"^model/league/", include('DataModel.models.LeagueModel.urls')),
    re_path(r"^model/team/", include('DataModel.models.TeamModel.urls')),
    re_path(r"^model/roleplayer/", include('DataModel.models.RolePlayerModel.urls'))
]