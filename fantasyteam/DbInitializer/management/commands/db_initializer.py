from typing import Any
from datetime import datetime
from django.core.management.base import BaseCommand
from django.conf import settings

import pandas as pd

from DataModel.enum.country_enum import CountryEnum
from DataModel.enum.sport_enum import SportEnum

from DataModel.models.LeagueModel.league_model import LeagueModel
from DataModel.models.PlayerAdditionalInfoModel.BasketballPlayerAdditionalInfoModel.basketball_player_additional_info_model import BasketballPlayerAdditionalInfoModel
from DataModel.models.PlayerAdditionalInfoModel.SoccerPlayerAdditionalInfoModel.soccer_player_additional_info_model import SoccerPlayerAdditionalInfoModel
from DataModel.models.PlayerAdditionalInfoModel.VolleyballPlayerAdditionalInfoModel.volleyball_player_additional_info_model import VolleyballPlayerAdditionalInfoModel
from DataModel.models.PlayerModel.player_model import PlayerModel
from DataModel.models.RolePlayerModel.role_player_model import RolePlayerModel
from DataModel.models.TeamModel.team_model import TeamModel
from DataModel.models.UserModel.user_model import UserModel

"""
BaseCommand consente di creare comandi personalizzati da eseguire tramite la gestione dei comandi di Django. 
Ereditare da BaseCommand consente di definire comandi che possono essere eseguiti utilizzando manage.py,
allo stesso modo in cui vengono eseguiti i comandi 'migrate' o 'runserver'.

I comandi personalizzati devo essere posizionati all'interno della directory management/commands di una applicazione Django.
"""
class Command(BaseCommand):
    # Descrizione del comando personalizzato
    help = 'Initialize database with initial data'

    def __initialize_user(self):
        print("Starting create new user")
        new_user = UserModel()
        new_user.name = 'Francesco'
        new_user.surname = 'Bellocci'
        new_user.username = 'Scon'
        new_user.password = 'Password1!'
        new_user.save()
        print("Created new user : ", new_user)

    def __initialize_league(self):
        print("Starting create leagues")

        # Campionato calcio Serie A
        soccer_league_serie_A = LeagueModel()
        soccer_league_serie_A.name = 'Serie A'
        soccer_league_serie_A.sport = SportEnum.SOCCER.name
        soccer_league_serie_A.country = CountryEnum.ITALY.name
        soccer_league_serie_A.save()
        print("Created new League: ", soccer_league_serie_A)

        # Campionato pallavolo Serie A1 Femminile
        volleyball_serie_a1_tigota = LeagueModel()
        volleyball_serie_a1_tigota.name = 'Serie A1 Tigotà'
        volleyball_serie_a1_tigota.sport = SportEnum.VOLLEYBALL.name
        volleyball_serie_a1_tigota.country = CountryEnum.ITALY.name
        volleyball_serie_a1_tigota.save()
        print("Created new League: ", volleyball_serie_a1_tigota)

        # Campionato basket NBA
        basketball_nba = LeagueModel()
        basketball_nba.name = 'NBA'
        basketball_nba.sport = SportEnum.BASKETBALL.name
        basketball_nba.country = CountryEnum.UNITED_STATES.name
        basketball_nba.save()
        print("Created new League: ", basketball_nba)

    def __initialize_teams(self):
        print("Starting create teams")
        folder_resources_path = settings.DB_INITIALIZER_RESOURCES_DIR

        # Creazione team di calcio    
        soccer_teams = pd.read_csv(folder_resources_path + "/soccer_teams.csv")    
        print("Given soccer teams dataframe :\n", soccer_teams)

        soccer_league_serie_A = LeagueModel.objects.get(name='Serie A', sport=SportEnum.SOCCER.name)
        for index in range(len(soccer_teams)):
            new_team = TeamModel()
            new_team.name = soccer_teams.iloc[index, 0]
            new_team.short_name = soccer_teams.iloc[index, 1]
            new_team.league = soccer_league_serie_A
            new_team.save()
            print("Created new team: ", new_team)
        
        # Creazione team di pallavolo    
        volleyball_teams = pd.read_csv(folder_resources_path + "/volley_teams.csv")    
        print("Given volleyball teams dataframe :\n", volleyball_teams)

        volleyball_league_serie_A = LeagueModel.objects.get(name='Serie A1 Tigotà', sport=SportEnum.VOLLEYBALL.name)
        for index in range(len(volleyball_teams)):
            new_team = TeamModel()
            new_team.name = volleyball_teams.iloc[index, 0]
            new_team.short_name = volleyball_teams.iloc[index, 1]
            new_team.league = volleyball_league_serie_A
            new_team.save()
            print("Created new team: ", new_team)

        # Creazione team di calcio    
        basketball_teams = pd.read_csv(folder_resources_path + "/basket_teams.csv")    
        print("Given basketball teams dataframe :\n", basketball_teams)

        basketball_league_nba = LeagueModel.objects.get(name='NBA', sport=SportEnum.BASKETBALL.name)
        for index in range(len(basketball_teams)):
            new_team = TeamModel()
            new_team.name = basketball_teams.iloc[index, 0]
            new_team.short_name = basketball_teams.iloc[index, 1]
            new_team.league = basketball_league_nba
            new_team.save()
            print("Created new team: ", new_team)

    def __initialize_roles(self):
        print("Starting create roles")

        #
        # Calcio
        #

        # Portiere
        goalkeeper = RolePlayerModel()
        goalkeeper.description = "Portiere"
        goalkeeper.short_description = "POR"
        goalkeeper.sport = SportEnum.SOCCER.name
        goalkeeper.save()
        print("Created new role: ", goalkeeper)

        # Difensore
        defender = RolePlayerModel()
        defender.description = "Difensore"
        defender.short_description = "DIF"
        defender.sport = SportEnum.SOCCER.name
        defender.save()
        print("Created new role: ", defender)

        # Centrocampista
        midfielder = RolePlayerModel()
        midfielder.description = "Centrocampista"
        midfielder.short_description = "CEN"
        midfielder.sport = SportEnum.SOCCER.name
        midfielder.save()
        print("Created new role: ", midfielder)

        # Attaccante
        straiker = RolePlayerModel()
        straiker.description = "Attaccante"
        straiker.short_description = "ATT"
        straiker.sport = SportEnum.SOCCER.name
        straiker.save()
        print("Created new role: ", straiker)

        #
        # PALLAVOLO
        #

        # Palleggiatore
        setter = RolePlayerModel()
        setter.description = "Palleggiatore"
        setter.short_description = "PAL"
        setter.sport = SportEnum.VOLLEYBALL.name
        setter.save()
        print("Created new role: ", setter)

        # Schiacciatore
        left_side_hitter = RolePlayerModel()
        left_side_hitter.description = "Schiacciatore"
        left_side_hitter.short_description = "SCH"
        left_side_hitter.sport = SportEnum.VOLLEYBALL.name
        left_side_hitter.save()
        print("Created new role: ", left_side_hitter)

        # Opposto
        opposite_hitter = RolePlayerModel()
        opposite_hitter.description = "Opposto"
        opposite_hitter.short_description = "OPP"
        opposite_hitter.sport = SportEnum.VOLLEYBALL.name
        opposite_hitter.save()
        print("Created new role: ", opposite_hitter)

        # Centrale
        midde_blocker = RolePlayerModel()
        midde_blocker.description = "Centrale"
        midde_blocker.short_description = "CEN"
        midde_blocker.sport = SportEnum.VOLLEYBALL.name
        midde_blocker.save()
        print("Created new role: ", midde_blocker)

        # Libero
        libero = RolePlayerModel()
        libero.description = "Libero"
        libero.short_description = "LIB"
        libero.sport = SportEnum.VOLLEYBALL.name
        libero.save()
        print("Created new role: ", libero)

        #
        # BASKET
        #

        # Guardia
        shooting_guard = RolePlayerModel()
        shooting_guard.description = "Guardia"
        shooting_guard.short_description = "G"
        shooting_guard.sport = SportEnum.BASKETBALL.name
        shooting_guard.save()
        print("Created new role: ", shooting_guard)

        # Ala
        forward = RolePlayerModel()
        forward.description = "Ala"
        forward.short_description = "A"
        forward.sport = SportEnum.BASKETBALL.name
        forward.save()
        print("Created new role: ", forward)

        # Centro
        center = RolePlayerModel()
        center.description = "Centro"
        center.short_description = "C"
        center.sport = SportEnum.BASKETBALL.name
        center.save()
        print("Created new role: ", center)

    def __initialize_players(self):
        print("Starting create players")
        folder_resources_path = settings.DB_INITIALIZER_RESOURCES_DIR
        role_dictionary = {}
        team_dictionary = {}
        player_description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

        #
        # CALCIO
        #
        soccer_players = pd.read_csv(folder_resources_path + "/statistiche_fantacalcio_2023_2024.csv")
        print("Given soccer players dataframe :\n", soccer_players)

        for index in range(len(soccer_players)):
            new_player = PlayerModel()
            new_player.sport = SportEnum.SOCCER.name

            # Nome
            name = soccer_players.iloc[index, 0]
            if(name is not None and type(name) is str):
                new_player.name = name

            # Cognome
            new_player.last_name = soccer_players.iloc[index, 1]

            # Nazionalita
            nationality = soccer_players.iloc[index, 2]
            if(nationality is not None and type(nationality) is str):
                new_player.nationality = nationality                 

            # Ruolo
            role_player = soccer_players.iloc[index, 3]
            role = role_dictionary.get(role_player)
            if(role is None):
                role = RolePlayerModel.objects.get(short_description = role_player, sport = SportEnum.SOCCER.name)
                role_dictionary[role_player] = role
            new_player.role = role

            # Team
            team_player = soccer_players.iloc[index, 4]
            team = team_dictionary.get(team_player)
            if(team is None):
                team = TeamModel.objects.get(name = team_player)
                team_dictionary[team_player] = team
            new_player.team = team

            # Quotazione
            new_player.fantasy_price = float(soccer_players.iloc[index, 5].replace(',','.'))

            # Anno di nascita
            date_of_birth = soccer_players.iloc[index, 6]
            if(date_of_birth is not None and type(date_of_birth) is str):
                new_player.date_of_birth = datetime.strptime(date_of_birth, '%d/%m/%Y').date()            

            # MV
            new_player.average_rating = float(soccer_players.iloc[index, 7].replace(',','.'))
            
            # FMV
            new_player.fanta_average_rating = float(soccer_players.iloc[index, 8].replace(',','.'))
            
            new_player.save()
            print("Created new player: ", new_player)

            # Creazione informazioni aggiuntive
            soccer_player_additional_info = SoccerPlayerAdditionalInfoModel()
            soccer_player_additional_info.player = new_player
            soccer_player_additional_info.year_of_starting_season = 2023
            soccer_player_additional_info.year_of_ending_season = 2024
            soccer_player_additional_info.team = team
            soccer_player_additional_info.description = player_description

            soccer_player_additional_info.match_played = int(soccer_players.iloc[index, 9])
            soccer_player_additional_info.goal_scored = int(soccer_players.iloc[index, 10])
            soccer_player_additional_info.goals_conceded = int(soccer_players.iloc[index, 11])
            soccer_player_additional_info.penalties_saved = int(soccer_players.iloc[index, 12])
            soccer_player_additional_info.total_penalties_kicked = int(soccer_players.iloc[index, 13])
            soccer_player_additional_info.penalties_scored = int(soccer_players.iloc[index, 14])
            soccer_player_additional_info.assist = int(soccer_players.iloc[index, 15])
            soccer_player_additional_info.warnings = int(soccer_players.iloc[index, 16])
            soccer_player_additional_info.expulsions = int(soccer_players.iloc[index, 17])
            soccer_player_additional_info.save()

        
        #
        # BASKET
        #

        basket_players = pd.read_csv(folder_resources_path + "/statistiche_nba_regular_season_2023_2024.csv")
        print("Given basket players dataframe :\n", basket_players)

        for index in range(len(basket_players)):
            new_player = PlayerModel()
            new_player.sport = SportEnum.BASKETBALL.name

            # Nome
            name = basket_players.iloc[index, 0]
            if(name is not None and type(name) is str):
                new_player.name = name

            # Cognome
            new_player.last_name = basket_players.iloc[index, 1]

            # Nazionalita
            nationality = basket_players.iloc[index, 2]
            if(nationality is not None and type(nationality) is str):
                new_player.nationality = nationality                 

            # Ruolo
            role_player = basket_players.iloc[index, 3]
            role = role_dictionary.get(role_player)
            if(role is None):
                role = RolePlayerModel.objects.get(short_description = role_player, sport = SportEnum.BASKETBALL.name)
                role_dictionary[role_player] = role
            new_player.role = role

            # Team
            team_player = basket_players.iloc[index, 4]
            team = team_dictionary.get(team_player)
            if(team is None):
                team = TeamModel.objects.get(name = team_player)
                team_dictionary[team_player] = team
            new_player.team = team

            # Quotazione
            new_player.fantasy_price = float(basket_players.iloc[index, 5].replace(',','.'))

            # Anno di nascita
            date_of_birth = basket_players.iloc[index, 6]
            if(date_of_birth is not None and type(date_of_birth) is str):
                new_player.date_of_birth = datetime.strptime(date_of_birth, '%d/%m/%Y').date()            

            # MV
            new_player.average_rating = float(basket_players.iloc[index, 7].replace(',','.'))
            
            # FMV
            new_player.fanta_average_rating = float(basket_players.iloc[index, 8].replace(',','.'))
            
            new_player.save()
            print("Created new player: ", new_player)

            # Creazione informazioni aggiuntive
            basketball_player_additional_info = BasketballPlayerAdditionalInfoModel()
            basketball_player_additional_info.player = new_player
            basketball_player_additional_info.year_of_starting_season = 2023
            basketball_player_additional_info.year_of_ending_season = 2024
            basketball_player_additional_info.team = team
            basketball_player_additional_info.description = player_description

            basketball_player_additional_info.match_played = int(basket_players.iloc[index, 9])
            basketball_player_additional_info.game_started = int(basket_players.iloc[index, 10])
            basketball_player_additional_info.points = int(basket_players.iloc[index, 11])
            basketball_player_additional_info.rebounds = int(basket_players.iloc[index, 12])
            basketball_player_additional_info.assist = int(basket_players.iloc[index, 13])
            basketball_player_additional_info.field_goal_percentage = float(basket_players.iloc[index, 14].replace(',','.'))
            basketball_player_additional_info.three_point_percentage = float(basket_players.iloc[index, 15].replace(',','.'))
            basketball_player_additional_info.steals = int(basket_players.iloc[index, 16])
            basketball_player_additional_info.blocks = int(basket_players.iloc[index, 17])
            basketball_player_additional_info.personal_fouls = int(basket_players.iloc[index, 18])
            basketball_player_additional_info.save()

        
        #
        # PALLAVOLO
        #

        volleyball_players = pd.read_csv(folder_resources_path + "/statistiche_volley_regular_season_2023_2024.csv")
        print("Given volleyball players dataframe :\n", volleyball_players)

        for index in range(len(volleyball_players)):
            new_player = PlayerModel()
            new_player.sport = SportEnum.VOLLEYBALL.name

            # Nome
            name = volleyball_players.iloc[index, 0]
            if(name is not None and type(name) is str):
                new_player.name = name

            # Cognome
            new_player.last_name = volleyball_players.iloc[index, 1]

            # Nazionalita
            nationality = volleyball_players.iloc[index, 2]
            if(nationality is not None and type(nationality) is str):
                new_player.nationality = nationality                 

            # Ruolo
            role_player = volleyball_players.iloc[index, 3]
            role = role_dictionary.get(role_player)
            if(role is None):
                role = RolePlayerModel.objects.get(short_description = role_player, sport = SportEnum.VOLLEYBALL.name)
                role_dictionary[role_player] = role
            new_player.role = role

            # Team
            team_player = volleyball_players.iloc[index, 4]
            team = team_dictionary.get(team_player)
            if(team is None):
                team = TeamModel.objects.get(name = team_player)
                team_dictionary[team_player] = team
            new_player.team = team

            # Quotazione
            new_player.fantasy_price = float(volleyball_players.iloc[index, 5].replace(',','.'))

            # Anno di nascita
            date_of_birth = volleyball_players.iloc[index, 6]
            if(date_of_birth is not None and type(date_of_birth) is str):
                new_player.date_of_birth = datetime.strptime(date_of_birth, '%d/%m/%Y').date()            

            # MV
            new_player.average_rating = float(volleyball_players.iloc[index, 7])
            
            # FMV
            new_player.fanta_average_rating = float(volleyball_players.iloc[index, 8])
            
            new_player.save()
            print("Created new player: ", new_player)

            # Creazione informazioni aggiuntive
            volleyball_player_additional_info = VolleyballPlayerAdditionalInfoModel()
            volleyball_player_additional_info.player = new_player
            volleyball_player_additional_info.year_of_starting_season = 2023
            volleyball_player_additional_info.year_of_ending_season = 2024
            volleyball_player_additional_info.team = team
            volleyball_player_additional_info.description = player_description

            volleyball_player_additional_info.match_played = int(volleyball_players.iloc[index, 9]) 
            volleyball_player_additional_info.set_played = int(volleyball_players.iloc[index, 10])
            volleyball_player_additional_info.total_points_scored = int(volleyball_players.iloc[index, 11])
            volleyball_player_additional_info.total_serves = int(volleyball_players.iloc[index, 12])
            volleyball_player_additional_info.error_serves = int(volleyball_players.iloc[index, 13])
            volleyball_player_additional_info.ace_points_scored = int(volleyball_players.iloc[index, 14])
            volleyball_player_additional_info.total_receiving = int(volleyball_players.iloc[index, 15])
            volleyball_player_additional_info.error_receiving = int(volleyball_players.iloc[index, 16])
            volleyball_player_additional_info.perfect_receiving_percentage = float(volleyball_players.iloc[index, 17].replace(',','.'))
            volleyball_player_additional_info.total_attacks = int(volleyball_players.iloc[index, 18])
            volleyball_player_additional_info.error_attacks = int(volleyball_players.iloc[index, 19])
            volleyball_player_additional_info.kills = int(volleyball_players.iloc[index, 20])
            volleyball_player_additional_info.total_blocks = int(volleyball_players.iloc[index, 21])
            volleyball_player_additional_info.blocking_errors = int(volleyball_players.iloc[index, 22])
            volleyball_player_additional_info.kill_blocks = int(volleyball_players.iloc[index, 23])
        

    # Override del metodo contenente la logica del comando
    def handle(self, *args: Any, **options: Any):
        # Creazione utente
        self.__initialize_user()

        # Creazione campionati
        self.__initialize_league()

        # Creazione teams
        self.__initialize_teams()

        # Creazione ruoli
        self.__initialize_roles()

        # Creazione giocatori
        self.__initialize_players()

        self.stdout.write(self.style.SUCCESS('Database initialized successfully'))
