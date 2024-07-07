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
    leagues = LeagueModel.objects.all()
    league_serializer = LeagueModelSerializer(leagues, many=True)
    return JsonResponse({'ok' : league_serializer.data}, status=status.HTTP_200_OK)