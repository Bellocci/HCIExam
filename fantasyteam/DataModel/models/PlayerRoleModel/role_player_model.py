from django.db import models

from DataModel.enum.sport_enum import SportEnum

class PlayerRoleModel(models.Model):
    role_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100)
    short_description = models.CharField(max_length=25)
    sport = models.CharField(max_length=100, choices=SportEnum.choices())

    class Meta:
        db_table = 'players_role'

    def __str__(self) -> str:
        return f"{self.description} [{self.short_description}]"
