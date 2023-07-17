import { SportEnum } from "src/enum/SportEnum.model";
import { ChampionshipEnum } from "../enum/ChampionshipEnum.model";

export class LeagueEntity {
    leagueId!:number;
    name!:string;
    sport!:SportEnum;
    championship!:ChampionshipEnum;
    active!:boolean;
}

export const LEAGUE_DATA:LeagueEntity[] = [
    {
        leagueId : 1,
        name : 'Serie A',
        sport : SportEnum.FOOTBALL_SOCCER,
        championship : ChampionshipEnum.ITA_CHAMP,
        active: true
    },
    {
        leagueId : 2,
        name : 'Premier League',
        sport : SportEnum.FOOTBALL_SOCCER,
        championship : ChampionshipEnum.ENG_CHAMP,
        active: true
    },
    {
        leagueId : 3,
        name : 'NBA',
        sport : SportEnum.BASKETBALL,
        championship : ChampionshipEnum.USA_CHAMP,
        active: true
    },
    {
        leagueId : 4,
        name : 'Serie A1',
        sport : SportEnum.VOLLEYBALL,
        championship : ChampionshipEnum.ITA_CHAMP,
        active: true
    },
]