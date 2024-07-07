from django.db import models

from DataModel.models.PlayerAdditionalInfoModel.player_additional_info_model import PlayerAdditionalInfoModel

class BasketballPlayerAdditionalInfoModel(PlayerAdditionalInfoModel):        
    game_started = models.PositiveIntegerField(default=0)
    points = models.PositiveIntegerField(default=0)
    rebounds = models.PositiveIntegerField(default=0)
    assist = models.PositiveIntegerField(default=0)
    field_goal_percentage = models.DecimalField(decimal_places=1, max_digits=20, default=0)
    three_point_percentage = models.DecimalField(decimal_places=1, max_digits=20, default=0)
    steals = models.PositiveIntegerField(default=0)
    blocks = models.PositiveIntegerField(default=0)
    personal_fouls = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'basketball_players_additional_info'
