from django.db import models

from DataModel.enum.sport_enum import SportEnum
from DataModel.models.PlayerRoleModel.role_player_model import PlayerRoleModel
from DataModel.models.TeamModel.team_model import TeamModel

class PlayerModel(models.Model):
    player_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100)
    nationality = models.TextField(default='')
    sport = models.CharField(max_length=100,choices=SportEnum.choices())
    role = models.ForeignKey(PlayerRoleModel, null=True, on_delete=models.SET_NULL)
    team = models.ForeignKey(TeamModel, null=True, on_delete=models.SET_NULL)
    fantasy_price = models.DecimalField(decimal_places=3, max_digits=20, default=0)
    date_of_birth = models.DateField(null=True)
    average_rating = models.DecimalField(decimal_places=3, max_digits=20, default=0)
    fanta_average_rating = models.DecimalField(decimal_places=3, max_digits=20, default=0)

    class Meta:
        db_table = 'players'

    def __str__(self) -> str:
        return f"{self.last_name}"