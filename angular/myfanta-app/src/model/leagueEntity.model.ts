import { SportEntity, SPORT_DATA } from "./sportEntity.model";

export class LeagueEntity {
    leagueId!:number;
    name!:string;
    sport!:SportEntity;
    championshipId!:number;
}

export const LEAGUE_DATA:LeagueEntity[] = [
    {
        leagueId : 1,
        name : 'Serie A',
        sport : SPORT_DATA[0],
        championshipId : 1
    },
    {
        leagueId : 2,
        name : 'Premier League',
        sport : SPORT_DATA[0],
        championshipId : 2
    },
    {
        leagueId : 3,
        name : 'Serie A1 Femminile',
        sport : SPORT_DATA[1],
        championshipId : 1
    },
    {
        leagueId : 4,
        name : 'NBA',
        sport : SPORT_DATA[2],
        championshipId : 3
    },
    {
        leagueId : 5,
        name : 'Serie A1 Maschile',
        sport : SPORT_DATA[1],
        championshipId : 1
    },
]