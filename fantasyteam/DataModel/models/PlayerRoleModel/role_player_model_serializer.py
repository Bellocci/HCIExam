from rest_framework import serializers

from DataModel.enum.sport_enum import SportEnum
from DataModel.models.PlayerRoleModel.role_player_model import PlayerRoleModel

class PlayerRoleModelSerializer(serializers.ModelSerializer):
    sport = serializers.SerializerMethodField()

    class Meta:
        model = PlayerRoleModel
        fields = ['role_id', 'description', 'short_description', 'sport']

    def get_sport(self, obj):
        sport = SportEnum(obj.sport)
        return {
            'name' : sport.name,
            'description' : sport.description
        }