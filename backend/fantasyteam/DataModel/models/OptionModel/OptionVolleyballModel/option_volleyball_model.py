from django.db import models

from DataModel.models.OptionModel.option_abstract_model import OptionAbstractModel

class OptionVolleyballModel(OptionAbstractModel):
    average_match_played = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_set_played = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_setter = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_left_side_hitter = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_opposite_hitter = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_midde_blocker = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_libero = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_attack_scored = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_block_points_scored = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_ace_points_scored = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_perfect_receives = models.DecimalField(null=True, decimal_places=2, max_digits=20)

    class Meta:
        db_table = 'options_volleyball'