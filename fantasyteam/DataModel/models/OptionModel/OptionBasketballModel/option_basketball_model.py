from django.db import models

from DataModel.models.OptionModel.option_abstract_model import OptionAbstractModel

class OptionBasketballModel(OptionAbstractModel):
    budget_point_guard = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_shooting_guard = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_small_forward = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_power_forward = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_center = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_games_played = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_games_started = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_points_per_game = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_rebounds_per_game = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_assists_per_game = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_three_points = models.DecimalField(null=True, decimal_places=2, max_digits=20)    

    class Meta:
        db_table = 'options_basketball'