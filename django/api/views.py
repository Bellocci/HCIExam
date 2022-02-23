import json

from django.shortcuts import render

from django.http.response import JsonResponse

from api.models import Championship, Sport
from api.serializers import ChampionshipSerializer, SportSerializer

# Return all sport from the database
def __getSportList(request):
    sports = Sport.objects.all()
    sports_serializer = SportSerializer(sports, many = True)
    return sports_serializer

# Return all championship from the database
def __getChampionshipList(request):
    championship = Championship.objects.all()
    championship_serializer = ChampionshipSerializer(championship, many = True)
    return championship_serializer

# Return a dictionary with all sport and championship
def getSportCategories(request):
    sports_serializer = __getSportList(request)
    championship_serializer = __getChampionshipList(request)

    serializer_list = {}
    serializer_list = {'sport': sports_serializer.data, 'championship': championship_serializer.data}

    return JsonResponse(serializer_list, safe = False)