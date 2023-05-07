import { ChampionshipEnum } from "src/model/ChampionshipEnum.model";
import { LeagueEntity } from "src/model/leagueEntity.model";
import { Sport } from "./sport.model";

export class League {

    private leagueEntity!:LeagueEntity;
    private sport!:Sport;

    constructor(leagueEntity:LeagueEntity) {
        this.leagueEntity = leagueEntity;
    }

    getLeagueId() : number {
        return this.leagueEntity.leagueId;
    }

    getSport() : Sport {
        if(!this.sport) {
            this.sport = new Sport(this.leagueEntity.sport);
        }
        return this.sport;
    }

    getName() : string {
        return this.leagueEntity.name;
    }

    getChampionshipId() : number {
        return this.leagueEntity.championship.id
    }

    getChampionshipName() : string {
        return this.leagueEntity.championship.description;
    }

    toString() : string {
        return "Id:" + this.leagueEntity.leagueId + ", Nome: " + this.leagueEntity.name +  
            ", Campionato: " + this.leagueEntity.championship.description +
            ", Sport: " + this.leagueEntity.sport.name;
    }
}