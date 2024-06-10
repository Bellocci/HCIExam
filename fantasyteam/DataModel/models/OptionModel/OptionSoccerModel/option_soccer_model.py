from django.db import models

from DataModel.models.OptionModel.option_abstract_model import OptionAbstractModel

class OptionSoccerModel(OptionAbstractModel):
    budget_goalkeeper = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_defender = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_midfielder = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    budget_straikers = models.DecimalField(null=True, decimal_places=2, max_digits=20)    
    average_match_played = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_goals = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_assist = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_yellow_cards = models.DecimalField(null=True, decimal_places=2, max_digits=20)
    average_red_cards = models.DecimalField(null=True, decimal_places=2, max_digits=20)

    class Meta:
        db_table = 'options_soccer'