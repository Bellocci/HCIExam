from rest_framework import serializers

from DataModel.enum.sport_enum import SportEnum
from DataModel.enum.country_enum import CountryEnum
from DataModel.models.LeagueModel.league_model import LeagueModel

class LeagueModelSerializer(serializers.ModelSerializer):
    sport = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()

    class Meta:
        model = LeagueModel
        fields = ['league_id', 'name', 'sport', 'country']

    def get_sport(self, obj):
        sport = SportEnum(obj.sport)
        return {
            'name' : sport.name,
            'description' : sport.description
        }
    
    def get_country(self, obj):
        country = CountryEnum(obj.country)
        return {
            'name' : country.name,
            'description' : country.description,
            'short_description' : country.short_description
        }