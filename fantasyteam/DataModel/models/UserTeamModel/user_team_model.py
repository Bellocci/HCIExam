from django.db import models

from DataModel.enum.sport_enum import SportEnum
from DataModel.models.UserModel.user_model import UserModel
from DataModel.models.LeagueModel.league_model import LeagueModel

class UserTeamModel(models.Model):
    user_team_id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=255)
    sport = models.CharField(max_length=100, choices=SportEnum.choices())
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    league = models.ForeignKey(LeagueModel, on_delete=models.CASCADE)
    deleted = models.BooleanField(default=False)  

    class Meta:
        db_table = 'user_teams'  
