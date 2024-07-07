from rest_framework import serializers

from DataModel.models.PlayerModel.player_model_serializer import PlayerModelSerializer
from DataModel.models.UserTeamPlayerModel.user_team_player_model import UserTeamPlayerModel
from DataModel.models.UserTeamModel.user_team_model_serializer import UserTeamModelSerializer

class UserTeamPlayerSerializer(serializers.Serializer):
    user_team = UserTeamModelSerializer(read_only=True)
    player = PlayerModelSerializer(read_only=True)

    class Meta:
        model = UserTeamPlayerModel
        fields = ['user_team_player_id', 'included_team', 'favorite', 'excluded', 'user_team', 'player']