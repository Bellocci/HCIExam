from django.db import models

from DataModel.enum.sport_enum import SportEnum
from DataModel.enum.country_enum import CountryEnum

class LeagueModel(models.Model):
    league_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    sport = models.CharField(max_length=100,choices=SportEnum.choices())
    country = models.CharField(max_length=100,choices=CountryEnum.choices())

    class Meta:
        db_table = 'leagues'

    def __str__(self):
        return f"{self.name}"