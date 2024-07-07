from django.db import models

from DataModel.models.PlayerModel.player_model import PlayerModel
from DataModel.models.TeamModel.team_model import TeamModel

class PlayerAdditionalInfoModel(models.Model):
    player_additional_info_id = models.AutoField(primary_key=True)
    player = models.ForeignKey(PlayerModel, on_delete=models.CASCADE)    
    year_of_starting_season = models.PositiveIntegerField()
    year_of_ending_season = models.PositiveIntegerField()
    team = models.ForeignKey(TeamModel, null=True, on_delete=models.SET_NULL)
    description = models.TextField()
    match_played = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
        unique_together = ('player', 'year_of_starting_season', 'year_of_ending_season', 'team')