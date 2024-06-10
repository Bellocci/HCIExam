from rest_framework import serializers

from DataModel.models.LeagueModel.league_model_serializer import LeagueModelSerializer
from DataModel.models.TeamModel.team_model import TeamModel

class TeamModelSerializer(serializers.Serializer):
    league = LeagueModelSerializer(read_only=True)

    class Meta:
        model = TeamModel
        fields = ['team_id', 'name', 'short_name', 'league']