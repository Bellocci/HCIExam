from rest_framework import serializers

from DataModel.enum.sport_enum import SportEnum
from DataModel.models.LeagueModel.league_model_serializer import LeagueModelSerializer
from DataModel.models.UserModel.user_model_serializer import UserModelSerializer
from DataModel.models.UserTeamModel.user_team_model import UserTeamModel

class UserTeamModelSerializer(serializers.Serializer):
    sport = serializers.SerializerMethodField()
    user = UserModelSerializer(read_only=True)
    league = LeagueModelSerializer(read_only=True)

    class Meta:
        model = UserTeamModel
        fields = ['user_team_id', 'team_name', 'sport', 'user', 'league', 'deleted']

    def get_sport(self, obj):
        sport = SportEnum(obj.sport)
        return {
            'name' : sport.name,
            'description' : sport.description
        }