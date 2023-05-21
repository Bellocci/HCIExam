import { Observable, of } from "rxjs";

class TeamEntity {
    teamId!:number;
    teamName!:string;
    teamAbbreviation!:string;
    championship!:number;
    active!:boolean;
}

export const TEAM_DATA:Observable<TeamEntity[]> = of([
    {
        teamId :  1,
        teamName : 'Atalanta',
        teamAbbreviation : 'ATA',
        championship : 1,
        active: true,
    },
    {
        teamId : 2,
        teamName : 'Bologna',
        teamAbbreviation : 'BOL',
        championship : 1,
        active: true,
    },
    {
        teamId : 3,
        teamName : 'Arsenal',
        teamAbbreviation : 'ARS',
        championship : 2,
        active: true,
    },
    {
        teamId : 4,
        teamName : 'Aston Villa',
        teamAbbreviation : 'ASV',
        championship : 2,
        active: true,
    },
    {
        teamId : 5,
        teamName : 'Savino Del Bene',
        teamAbbreviation : 'SAV',
        championship : 3,
        active: true,
    },
    {
        teamId : 6,
        teamName : 'Los Angeles Lakers',
        teamAbbreviation : 'LAL',
        championship : 4,
        active: true,
    },
])