from django.http import HttpRequest
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view

from DataModel.models.PlayerModel.player_model import PlayerModel;
from DataModel.models.PlayerModel.player_model_serializer import PlayerModelSerializer

@csrf_exempt
@api_view(['GET'])
def search_players(request: HttpRequest) -> JsonResponse:

    league_id = request.query_params.get('league_id', None)
    if(league_id is None):
        print('Error while retriving league with id : ', league_id)
        return JsonResponse({'error' : 'League is mandatory to search players'}, status=status.HTTP_400_BAD_REQUEST)
    else:    
        try:
            league_id = int(league_id)
        except ValueError:
            print('Error while retriving league with id : ', league_id)
            return JsonResponse({'error' : 'League is mandatory to search players'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Costruzione Query
    query_set = PlayerModel.objects.get_queryset()
    query_set = query_set.filter(team__league__league_id=league_id)

    last_name = request.query_params.get('last_name', None)
    if(last_name is not None and len(last_name) > 0):
        query_set = query_set.filter(last_name__icontains=last_name)

    team_ids = request.query_params.getlist('teams', None)
    if(team_ids is not None and len(team_ids) > 0):
        query_set = query_set.filter(team__in=team_ids)    

    role_ids = request.query_params.getlist('roles', None)
    if(role_ids is not None and len(role_ids) > 0):
        query_set = query_set.filter(role__in=role_ids)

    limit_results = request.query_params.get('limit_results', None)
    if(limit_results is not None):
        try:
            limit_results = int(limit_results)
            query_set = query_set[:limit_results]
        except ValueError:
            # Ignoro il parametro limit se non è un numero intero valido
            pass
    
    print('Eseguo la query : ', query_set.query)
    serializer = PlayerModelSerializer(query_set, many=True)   
    print('Risultati trovati : ', len(serializer.data)) 
    return JsonResponse({'ok' : serializer.data}, status=status.HTTP_200_OK)

    
    
    
    

    

