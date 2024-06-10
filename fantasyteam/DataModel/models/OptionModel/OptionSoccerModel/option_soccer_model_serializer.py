from rest_framework import serializers

from DataModel.models.OptionModel.OptionSoccerModel.option_soccer_model import OptionSoccerModel
from DataModel.models.UserTeamModel.user_team_model_serializer import UserTeamModelSerializer   

class OptionSoccerModelSerializer(serializers.Serializer):
    user_team = UserTeamModelSerializer(read_only=True)
    
    class Meta:
        model = OptionSoccerModel
        fields = ['option_id', 'user_team', 'min_age', 'max_age', 'apply_favorite_players', 'apply_excluded_players',
                  'budget_goalkeeper', 'budget_defender', 'budget_midfielder', 'budget_straikers', 'average_match_played',
                  'average_goals', 'average_assist', 'average_yellow_cards', 'average_red_cards']
    