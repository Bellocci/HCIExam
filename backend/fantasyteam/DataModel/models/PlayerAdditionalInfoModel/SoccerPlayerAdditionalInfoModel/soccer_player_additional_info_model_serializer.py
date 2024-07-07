from rest_framework import serializers

from DataModel.enum.sport_enum import SportEnum
from DataModel.models.PlayerAdditionalInfoModel.SoccerPlayerAdditionalInfoModel.soccer_player_additional_info_model import SoccerPlayerAdditionalInfoModel
from DataModel.models.PlayerModel.player_model_serializer import PlayerModelSerializer
from DataModel.models.TeamModel.team_model_serializer import TeamModelSerializer

class SoccerPlayerAdditionalInfoModelSerializer(serializers.Serializer):
    # definiamo read only a True per evitare che il serializer possa modificare le informazioni del giocatore 
    player = PlayerModelSerializer(read_only=True)    
    team = TeamModelSerializer(read_only=True)

    class Meta:
        model = SoccerPlayerAdditionalInfoModel
        fields = ['player_additional_info_id', 'player', 'year_of_starting_season', 'year_of_ending_season',
                  'team', 'description', 'match_player', 'goal_scored', 'goals_conceded', 'own_goal', 'clean_sheet', 
                  'penalties_saved', 'total_penalties_kicked', 'penalties_scored', 'assist', 'warnings', 'expulsions']
