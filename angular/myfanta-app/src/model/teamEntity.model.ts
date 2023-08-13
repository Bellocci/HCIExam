import { League } from "src/decorator/League.model";
import { LEAGUE_DATA, LeagueEntity } from "./leagueEntity.model";

export class TeamEntity {
    teamId!:number;
    teamName!:string;
    teamAbbreviation!:string;
    league!:League;
    active!:boolean;

    constructor(teamId:number, teamName:string, teamAbbreviation:string, league:League, active:boolean) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamAbbreviation = teamAbbreviation;
        this.league = league;
        this.active = active;
    }
}

export const TEAM_DATA:TeamEntity[] = [
    {
        teamId :  1,
        teamName : 'Atalanta',
        teamAbbreviation : 'ATA',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 2,
        teamName : 'Bologna',
        teamAbbreviation : 'BOL',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 3,
        teamName : 'Cagliari',
        teamAbbreviation : 'CAG',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 4,
        teamName : 'Empoli',
        teamAbbreviation : 'EMP',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 5,
        teamName : 'Fiorentina',
        teamAbbreviation : 'FIO',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 6,
        teamName : 'Frosinone',
        teamAbbreviation : 'FRO',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 7,
        teamName : 'Genoa',
        teamAbbreviation : 'GEN',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 8,
        teamName : 'Inter',
        teamAbbreviation : 'INT',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 9,
        teamName : 'Juventus',
        teamAbbreviation : 'JUV',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 10,
        teamName : 'Lazio',
        teamAbbreviation : 'LAZ',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 11,
        teamName : 'Lecce',
        teamAbbreviation : 'LEC',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 12,
        teamName : 'Milan',
        teamAbbreviation : 'MIL',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 13,
        teamName : 'Monza',
        teamAbbreviation : 'MON',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 14,
        teamName : 'Napoli',
        teamAbbreviation : 'NAP',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 15,
        teamName : 'Roma',
        teamAbbreviation : 'ROM',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 16,
        teamName : 'Salernitana',
        teamAbbreviation : 'SAL',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 17,
        teamName : 'Sassuolo',
        teamAbbreviation : 'SAS',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 18,
        teamName : 'Torino',
        teamAbbreviation : 'TOR',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 19,
        teamName : 'Udinese',
        teamAbbreviation : 'UDI',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 20,
        teamName : 'Verona',
        teamAbbreviation : 'VER',
        league : new League(LEAGUE_DATA[0]),
        active: true,
    },
    {
        teamId : 21,
        teamName : 'Arsenal',
        teamAbbreviation : 'ARS',
        league : new League(LEAGUE_DATA[1]),
        active: true,
    },
    {
        teamId : 22,
        teamName : 'Aston Villa',
        teamAbbreviation : 'ASV',
        league : new League(LEAGUE_DATA[1]),
        active: true,
    },
    {
        teamId : 23,
        teamName : 'Savino Del Bene',
        teamAbbreviation : 'SAV',
        league : new League(LEAGUE_DATA[2]),
        active: true,
    },
    {
        teamId : 24,
        teamName : 'Los Angeles Lakers',
        teamAbbreviation : 'LAL',
        league : new League(LEAGUE_DATA[3]),
        active: true,
    },
]