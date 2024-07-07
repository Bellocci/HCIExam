from rest_framework import serializers

from DataModel.models.PlayerAdditionalInfoModel.BasketballPlayerAdditionalInfoModel.basketball_player_additional_info_model import BasketballPlayerAdditionalInfoModel
from DataModel.models.PlayerModel.player_model_serializer import PlayerModelSerializer
from DataModel.models.TeamModel.team_model_serializer import TeamModelSerializer

class BasketballPlayerAdditionalInfoModelSerializer(serializers.Serializer):
    player = PlayerModelSerializer(read_only=True)
    team = TeamModelSerializer(read_only=True)

    class Meta:
        model = BasketballPlayerAdditionalInfoModel
        fields = ['player_additional_info_id', 'player', 'year_of_starting_season', 'year_of_ending_season', 
                  'team', 'description', 'match_played', 'game_started', 'points', 'rebounds', 'assist', 
                  'field_goal_percentage', 'three_point_percentage', 'steals', 'blocks', 'personal_fouls']