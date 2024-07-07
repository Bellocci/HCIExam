from django.db import models

from DataModel.models.PlayerAdditionalInfoModel.player_additional_info_model import PlayerAdditionalInfoModel

class VolleyballPlayerAdditionalInfoModel(PlayerAdditionalInfoModel):
    set_played = models.PositiveIntegerField(default=0)
    total_points_scored = models.PositiveBigIntegerField(default=0)
    total_serves = models.PositiveBigIntegerField(default=0)
    error_serves = models.PositiveIntegerField(default=0)
    ace_points_scored = models.PositiveIntegerField(default=0)
    total_receiving = models.PositiveBigIntegerField(default=0)
    error_receiving = models.PositiveIntegerField(default=0)
    perfect_receiving_percentage = models.DecimalField(decimal_places=1, max_digits=20, default=0)
    total_attacks = models.PositiveBigIntegerField(default=0)
    error_attacks = models.PositiveIntegerField(default=0)
    blocked_attacks = models.PositiveIntegerField(default=0)
    # Attacchi vincenti
    kills = models.PositiveIntegerField(default=0)
    total_blocks = models.PositiveIntegerField(default=0)
    blocking_errors = models.PositiveIntegerField(default=0)
    # Muri vincenti
    kill_blocks = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'volleyball_players_additional_info'