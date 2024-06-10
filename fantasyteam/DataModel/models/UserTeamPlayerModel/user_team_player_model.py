from django.db import models

from DataModel.models.UserTeamModel.user_team_model import UserTeamModel
from DataModel.models.PlayerModel.player_model import PlayerModel

class UserTeamPlayerModel(models.Model):
    user_team_player_id = models.AutoField(primary_key=True)
    included_team = models.BooleanField(default=False)
    favorite = models.BooleanField(default=False)
    excluded = models.BooleanField(default=False)
    user_team = models.ForeignKey(UserTeamModel, on_delete=models.CASCADE)
    player = models.ForeignKey(PlayerModel, on_delete=models.CASCADE)

    class Meta:
        db_table = 'user_team_players'