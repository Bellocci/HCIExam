import { SportEnum } from "src/enum/SportEnum.model";
import { LEAGUE_DATA, LeagueEntity } from "./leagueEntity.model";


export class RolePlayerEntity {
    id:number;
    description:string;
    shortDescription:string;
    sport:SportEnum;
    active:boolean;

    constructor(id:number, description:string, shortDescription:string, sport:SportEnum, active:boolean) {
        this.id = id;
        this.description = description;
        this.shortDescription = shortDescription;
        this.sport = sport;
        this.active = active;
    }
}

export const ROLE_PLAYER_DATA:RolePlayerEntity[] = [
    // Calcio
    {
        id : 1,
        description : "Portiere",
        shortDescription : "P",
        sport : SportEnum.FOOTBALL_SOCCER,
        active : true
    },
    {
        id : 2,
        description : "Difensore",
        shortDescription : "D",
        sport : SportEnum.FOOTBALL_SOCCER,
        active : true
    },
    {
        id : 3,
        description : "Centrocampista",
        shortDescription : "C",
        sport : SportEnum.FOOTBALL_SOCCER,
        active : true
    },
    {
        id : 4,
        description : "Attaccante",
        shortDescription : "A",
        sport : SportEnum.FOOTBALL_SOCCER,
        active : true
    },

    // Pallavolo

    {
        id : 5,
        description : "Palleggiatore",
        shortDescription : "P",
        sport : SportEnum.VOLLEYBALL,
        active : true
    },
    {
        id : 6,
        description : "Schiacciatore",
        shortDescription : "S",
        sport : SportEnum.VOLLEYBALL,
        active : true
    },
    {
        id : 7,
        description : "Opposto",
        shortDescription : "O",
        sport : SportEnum.VOLLEYBALL,
        active : true
    },
    {
        id : 8,
        description : "Libero",
        shortDescription : "L",
        sport : SportEnum.VOLLEYBALL,
        active : true
    },
    {
        id : 9,
        description : "Centrale",
        shortDescription : "C",
        sport : SportEnum.VOLLEYBALL,
        active : true
    },

    // BASKET

    {
        id : 10,
        description : "Playmaker",
        shortDescription : "PG",
        sport : SportEnum.BASKETBALL,
        active : true
    },
    {
        id : 11,
        description : "Guardia",
        shortDescription : "SG",
        sport : SportEnum.BASKETBALL,
        active : true
    },
    {
        id : 12,
        description : "Ala piccola",
        shortDescription : "SF",
        sport : SportEnum.BASKETBALL,
        active : true
    },
    {
        id : 13,
        description : "Ala grande",
        shortDescription : "PF",
        sport : SportEnum.BASKETBALL,
        active : true
    },
    {
        id : 14,
        description : "Centro",
        shortDescription : "C",
        sport : SportEnum.BASKETBALL,
        active : true
    },
]