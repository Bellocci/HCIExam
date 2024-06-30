from rest_framework import serializers

from DataModel.enum.sport_enum import SportEnum
from DataModel.models.PlayerModel.player_model import PlayerModel
from DataModel.models.RolePlayerModel.role_player_model_serializer import RolePlayerModelSerializer
from DataModel.models.TeamModel.team_model_serializer import TeamModelSerializer

class PlayerModelSerializer(serializers.ModelSerializer):
    # impostiamo read-only a True per non consentire al serializer di modificare gli attributi
    role = RolePlayerModelSerializer(read_only=True)
    sport = serializers.SerializerMethodField(read_only=True)
    team = TeamModelSerializer(read_only=True)

    class Meta:
        model = PlayerModel
        fields = ['player_id', 'name', 'last_name', 'nationality', 'sport', 'role', 'team',
                  'fantasy_price', 'date_of_birth', 'average_rating', 'fanta_average_rating']
        
    def get_sport(self, obj):
        sport = SportEnum(obj.sport)
        return {
            'name' : sport.name,
            'description' : sport.description
        }