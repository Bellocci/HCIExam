from rest_framework import serializers

from DataModel.models.PlayerModel.player_model import PlayerModel
from DataModel.models.PlayerAdditionalInfoModel.player_additional_info_model import PlayerAdditionalInfoModel
from DataModel.models.PlayerAdditionalInfoModel.VolleyballPlayerAdditionalInfoModel.volleyball_player_additional_info_model import VolleyballPlayerAdditionalInfoModel
from DataModel.models.TeamModel.team_model_serializer import TeamModelSerializer

class VolleyballPlayerAdditionalInfo(serializers.Serializer):
    player = PlayerModel(read_only=True)
    team = TeamModelSerializer(read_only=True)

    class Meta:
        model = VolleyballPlayerAdditionalInfoModel
        fields = ['player_additional_info_id', 'player', 'year_of_starting_season', 'year_of_ending_season',
                  'team', 'description', 'match_player', 'set_played', 'total_points_scored', 'total_serves', 
                  'error_serves', 'ace_points_scored', 'total_receiving', 'error_receiving', 'perfect_receiving_percentage',
                  'total_attacks', 'error_attacks', 'blocked_attacks', 'kills', 'total_blocks', 'blocking_errors',
                  'kill_blocks']