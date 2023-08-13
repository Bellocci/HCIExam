import { ChampionshipEnum } from "src/enum/ChampionshipEnum.model";
import { SportEnum } from "src/enum/SportEnum.model";
import { LeagueEntity } from "src/model/leagueEntity.model";

export class League {

    private leagueEntity!:LeagueEntity;

    constructor(leagueEntity:LeagueEntity) {
        this.leagueEntity = leagueEntity;
    }

    getLeagueId() : number {
        return this.leagueEntity.leagueId;
    }

    getSport() : SportEnum {
        return this.leagueEntity.sport;
    }

    getName() : string {
        return this.leagueEntity.name;
    }
    
    getChampionship() : ChampionshipEnum {
        return this.leagueEntity.championship;
    }

    isActive() : boolean {
        return this.leagueEntity.active;
    }

    setActive(active:boolean) : void {
        this.leagueEntity.active = active;
    }

    toString() : string {
        return "Id:" + this.leagueEntity.leagueId + ", Nome: " + this.leagueEntity.name +  
            ", Campionato: " + this.leagueEntity.championship +
            ", Sport: " + this.leagueEntity.sport;
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof League)) {
            return false;
        }

        return this.leagueEntity.leagueId == other.leagueEntity.leagueId && this.leagueEntity.name == other.leagueEntity.name &&
            this.leagueEntity.sport == other.leagueEntity.sport && this.leagueEntity.championship == other.leagueEntity.championship;
    }

    toJSON() : any {
        return {
            id : this.leagueEntity.leagueId,
            sport : this.leagueEntity.sport.toJSON(),
            name : this.leagueEntity.name,
            championship : this.leagueEntity.championship.toJSON(),
            active : this.leagueEntity.active
        }
    }

    static fromJSON(json:any) : League {
        return new League(
            new LeagueEntity(json.id, json.name, SportEnum.fromJSON(json.sport), 
                ChampionshipEnum.fromJSON(json.championship), json.active));
    } 
}