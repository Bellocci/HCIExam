from rest_framework import serializers

from DataModel.models.OptionModel.OptionBasketballModel.option_basketball_model import OptionBasketballModel
from DataModel.models.UserTeamModel.user_team_model_serializer import UserTeamModelSerializer

class OptionBasketballModelSerializer(serializers.Serializer):
    user_team = UserTeamModelSerializer(read_only=True)

    class Meta:
        model = OptionBasketballModel
        fields = ['option_id', 'user_team', 'min_age', 'max_age', 'apply_favorite_players', 'apply_excluded_players',
                  'budget_point_guard', 'budget_shooting_guard', 'budget_small_forward', 'budget_power_forward', 'budget_center',
                  'average_games_played', 'average_games_started', 'average_points_per_game', 'average_rebounds_per_game',
                  'average_assists_per_game', 'average_three_points']