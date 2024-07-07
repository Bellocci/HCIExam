from django.http import HttpRequest
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view

from DataModel.models.LeagueModel.league_model import LeagueModel
from DataModel.models.RolePlayerModel.role_player_model import RolePlayerModel
from DataModel.models.RolePlayerModel.role_player_model_serializer import RolePlayerModelSerializer

@csrf_exempt
@api_view(['GET'])
def get_roles(request: HttpRequest) -> JsonResponse:

    league_id = request.query_params.get('league_id', None)
    if(league_id is None):
        print('Error while retriving player roles. League id is None')
        return JsonResponse({'error' : 'League is mandatory to search all roles'}, status=status.HTTP_400_BAD_REQUEST)
    else:    
        try:
            league_id = int(league_id)
        except ValueError:
            print('Error while retriving league with id : ', league_id)
            return JsonResponse({'error' : 'League is mandatory to search players'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        league = LeagueModel.objects.get(league_id=league_id)
    except LeagueModel.DoesNotExist:
        print('League not found for id ', league_id)
        return JsonResponse({'error' : 'Error while retriving player roles. League not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    role_queryset = RolePlayerModel.objects.filter(sport=league.sport)
    if(role_queryset.exists()):
        role_serializer = RolePlayerModelSerializer(role_queryset.all(), many=True)
        return JsonResponse({'ok' : role_serializer.data}, status=status.HTTP_200_OK)
    
    else:
        print('No roles player found for sport ', league.sport)
        return JsonResponse({'error' : 'No roles player found'}, status=status.HTTP_404_NOT_FOUND)
    
