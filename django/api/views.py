import json

from django.shortcuts import render

from django.http.response import JsonResponse

from api.models import Championship, Sport
from api.serializers import ChampionshipSerializer, SportSerializer

# Return all sport from the database
def getSportsList(request):
    sports = Sport.objects.all()
    sports_serializer = SportSerializer(sports, many = True)
    return JsonResponse(sports_serializer.data, safe = False)

# Return all championship from the database
def getChampionshipsList(request):
    championship = Championship.objects.all()
    championship_serializer = ChampionshipSerializer(championship, many = True)
    return JsonResponse(championship_serializer.data, safe = False)