''' Serializers allow conversion from received data in formats such as JSON to Python objects and viceversa.'''

from rest_framework import serializers
from .models import *

class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ('id',
                  'name')


class ChampionshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Championship
        fields = ('id',
                  'name',
                  'sport')


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id',
                  'name',
                  'championship')


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id',
                  'name',
                  'team',
                  'cost',
                  'role',
                  'age',
                  'matchPlayed')


class FootballSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballPlayer
        fields = ('id',
                  'playerName',
                  'goal',
                  'assist',
                  'yellowCard',
                  'redCard',
                  'scoreAverage',
                  'fantaScoreAverage')


class VolleyballSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolleyballPlayer
        fields = ('id',
                  'playerName',
                  'block',
                  'attackPoint',
                  'forearmPass',
                  'score')