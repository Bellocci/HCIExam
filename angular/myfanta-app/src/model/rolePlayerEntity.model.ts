import { SportEnum } from "src/enum/SportEnum.model";
import { LEAGUE_DATA, LeagueEntity } from "./leagueEntity.model";


export interface RolePlayerEntity {
    id: number,
    description : string,
    shortDescription : string,
    sport : SportEnum
}

export const ROLE_PLAYER_DATA:RolePlayerEntity[] = [
    // Calcio
    {
        id : 1,
        description : "Portiere",
        shortDescription : "P",
        sport : SportEnum.FOOTBALL_SOCCER
    },
    {
        id : 2,
        description : "Difensore",
        shortDescription : "D",
        sport : SportEnum.FOOTBALL_SOCCER
    },
    {
        id : 3,
        description : "Centrocampista",
        shortDescription : "C",
        sport : SportEnum.FOOTBALL_SOCCER
    },
    {
        id : 4,
        description : "Attaccante",
        shortDescription : "A",
        sport : SportEnum.FOOTBALL_SOCCER
    },

    // Pallavolo

    {
        id : 5,
        description : "Palleggiatore",
        shortDescription : "P",
        sport : SportEnum.VOLLEYBALL
    },
    {
        id : 6,
        description : "Schiacciatore",
        shortDescription : "S",
        sport : SportEnum.VOLLEYBALL
    },
    {
        id : 7,
        description : "Opposto",
        shortDescription : "O",
        sport : SportEnum.VOLLEYBALL
    },
    {
        id : 8,
        description : "Libero",
        shortDescription : "L",
        sport : SportEnum.VOLLEYBALL
    },
    {
        id : 9,
        description : "Centrale",
        shortDescription : "C",
        sport : SportEnum.VOLLEYBALL
    },

    // BASKET

    {
        id : 10,
        description : "Playmaker",
        shortDescription : "PG",
        sport : SportEnum.BASKETBALL
    },
    {
        id : 11,
        description : "Guardia",
        shortDescription : "SG",
        sport : SportEnum.BASKETBALL
    },
    {
        id : 12,
        description : "Ala piccola",
        shortDescription : "SF",
        sport : SportEnum.BASKETBALL
    },
    {
        id : 13,
        description : "Ala grande",
        shortDescription : "PF",
        sport : SportEnum.BASKETBALL
    },
    {
        id : 14,
        description : "Centro",
        shortDescription : "C",
        sport : SportEnum.BASKETBALL
    },
]