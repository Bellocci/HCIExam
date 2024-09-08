from django.http import HttpRequest
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view

from DataModel.models.LeagueModel.league_model import LeagueModel
from DataModel.models.LeagueModel.league_model_serializer import LeagueModelSerializer

@csrf_exempt
@api_view(['GET'])
def get_leagues(request: HttpRequest) -> JsonResponse:
    print("Invoking rest: leagues")
    leagues = LeagueModel.objects.all()
    league_serializer = LeagueModelSerializer(leagues, many=True)
    return JsonResponse({
        'status' : '200',
        'result' : league_serializer.data
    }, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['GET'])
def load_league(request: HttpRequest) -> JsonResponse:
    print("Invoking rest: load league")

    league_id = request.query_params.get('league_id', None)
    if(league_id is None):
        print('Error while retriving league : id is None')
        return JsonResponse({
            'status' : '400',
            'result' : 'Id is mandatory to load league'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        league_id = int(league_id)
    except ValueError:
        print('Error while retriving league with id : ', league_id)
        return JsonResponse({'error' : 'League id does not have type "int"'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        league = LeagueModel.objects.get(league_id=league_id)
        league_serializer = LeagueModelSerializer(league)
        print("Load league: ", league)
        return JsonResponse({
            'status' : '200',
            'result' : league_serializer.data
        }, status=status.HTTP_200_OK)
    
    except LeagueModel.DoesNotExist:
        errorMessage = "Not found league with id: " + league_id
        return JsonResponse({
            'status' : '404',
            'result' : errorMessage
        }, status=status.HTTP_404_NOT_FOUND)