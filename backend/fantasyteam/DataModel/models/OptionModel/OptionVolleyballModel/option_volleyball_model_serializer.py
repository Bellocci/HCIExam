from rest_framework import serializers

from DataModel.models.OptionModel.OptionVolleyballModel.option_volleyball_model import OptionVolleyballModel
from DataModel.models.UserTeamModel.user_team_model_serializer import UserTeamModelSerializer   

class OptionVolleyballModelSerializer(serializers.Serializer):
    user_team = UserTeamModelSerializer(read_only=True)

    class Meta:
        model = OptionVolleyballModel
        fields = ['option_id', 'user_team', 'min_age', 'max_age', 'apply_favorite_players', 'apply_excluded_players',
                  'average_match_played', 'average_set_played', 'budget_setter', 'budget_left_side_hitter', 
                  'budget_opposite_hitter', 'budget_middle_blocker', 'budget_libero', 'average_attack_scored',
                  'average_block_points_scored', 'average_ace_points_scored', 'average_perfect_receives']