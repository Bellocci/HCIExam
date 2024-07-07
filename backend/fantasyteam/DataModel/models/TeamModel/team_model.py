from django.db import models

from DataModel.models.LeagueModel.league_model import LeagueModel

class TeamModel(models.Model):
    team_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=10)
    league = models.ForeignKey(LeagueModel, on_delete=models.CASCADE)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return f"{self.name} [{self.short_name}]"