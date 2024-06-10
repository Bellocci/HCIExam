from django.db import models

from DataModel.models.UserTeamModel.user_team_model import UserTeamModel

class OptionAbstractModel(models.Model):
    option_id = models.AutoField(primary_key=True)
    user_team = models.OneToOneField(UserTeamModel, on_delete=models.CASCADE, unique=True)
    min_age = models.IntegerField(null=True)
    max_age = models.IntegerField(null=True)
    apply_favorite_players = models.BooleanField(default=True)
    apply_excluded_players = models.BooleanField(default=True)    

    class Meta:
        abstract = True