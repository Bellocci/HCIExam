from django.http import HttpRequest
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view

from DataModel.models.TeamModel.team_model import TeamModel
from DataModel.models.TeamModel.team_model_serializer import TeamModelSerializer

@csrf_exempt
@api_view(['GET'])
def get_teams(request: HttpRequest) -> JsonResponse:

    league_id = request.query_params.get('league_id', None)
    if(league_id is None):
        print('Error while retriving teams : league id is None')
        return JsonResponse({'error' : 'League is mandatory to search all teams'}, status=status.HTTP_400_BAD_REQUEST)
    else:    
        try:
            league_id = int(league_id)
        except ValueError:
            print('Error while retriving league with id : ', league_id)
            return JsonResponse({'error' : 'League is mandatory to search players'}, status=status.HTTP_400_BAD_REQUEST)
    
    team_queryset = TeamModel.objects.filter(league=league_id)
    if(not team_queryset.exists()):
        print('Not teams found related to league id: ', league_id)
        return JsonResponse({'error' : 'Teams not found'}, status=status.HTTP_404_NOT_FOUND)

    print("RESULT: ", team_queryset.all())
    team_serializer = TeamModelSerializer(team_queryset.all(), many=True)
    print("DATA: ", team_serializer.data)
    return JsonResponse({'ok' : team_serializer.data}, status=status.HTTP_200_OK)