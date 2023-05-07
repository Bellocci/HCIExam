import { Championship, ChampionshipEnum } from "./ChampionshipEnum.model";
import { SportEntity, SPORT_DATA } from "./sportEntity.model";

export class LeagueEntity {
    leagueId!:number;
    name!:string;
    sport!:SportEntity;
    championship!:Championship;
}

export const LEAGUE_DATA:LeagueEntity[] = [
    {
        leagueId : 1,
        name : 'Serie A',
        sport : SPORT_DATA[0],
        championship : ChampionshipEnum.IT_CHAMP
    },
    {
        leagueId : 2,
        name : 'Premier League',
        sport : SPORT_DATA[0],
        championship : ChampionshipEnum.EN_CHAMP
    },
    {
        leagueId : 3,
        name : 'Serie A1 Femminile',
        sport : SPORT_DATA[1],
        championship : ChampionshipEnum.IT_CHAMP
    },
    {
        leagueId : 4,
        name : 'NBA',
        sport : SPORT_DATA[2],
        championship : ChampionshipEnum.USA_CHAMP
    },
    {
        leagueId : 5,
        name : 'Serie A1 Maschile',
        sport : SPORT_DATA[1],
        championship : ChampionshipEnum.IT_CHAMP 
    },
]