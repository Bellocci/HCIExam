from django.db import models

from DataModel.models.PlayerAdditionalInfoModel.player_additional_info_model import PlayerAdditionalInfoModel

class SoccerPlayerAdditionalInfoModel(PlayerAdditionalInfoModel):
    goal_scored = models.PositiveIntegerField(default=0)
    goals_conceded = models.PositiveIntegerField(default=0)
    own_goal = models.PositiveIntegerField(default=0)
    clean_sheet = models.PositiveIntegerField(default=0)
    penalties_saved = models.PositiveIntegerField(default=0)
    total_penalties_kicked = models.PositiveIntegerField(default=0)
    penalties_scored = models.PositiveIntegerField(default=0)
    assist = models.PositiveIntegerField(default=0)
    warnings = models.PositiveIntegerField(default=0)
    expulsions = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'soccer_players_additional_info'
