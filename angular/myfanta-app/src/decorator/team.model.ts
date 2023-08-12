
import { TeamEntity } from 'src/model/teamEntity.model';
import { League } from './League.model';

export class Team {
    
    private teamEntity:TeamEntity;

    constructor(teamEntity:TeamEntity) {
        this.teamEntity = teamEntity;
    }

    getId() : number {
        return this.teamEntity.teamId;
    }

    getName() : string {
        return this.teamEntity.teamName;
    }

    getAbbreviation() : string {
        return this.teamEntity.teamAbbreviation;
    }

    getLeague() : League {
        return this.teamEntity.league;
    }

    isActive() : boolean {
        return this.teamEntity.active;
    }

    setActive(active:boolean) : void {
        this.teamEntity.active = active;
    }

    toString() : string {
        return "Id:" + this.teamEntity.teamId + " name:" + this.teamEntity.teamName +
            " abbreviation:" + this.teamEntity.teamAbbreviation + 
            " league: " + this.teamEntity.league.getName();
    }

    equals(other:any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof Team)) {
            return false;
        }

        return this.teamEntity.teamId == other.getId() && this.teamEntity.teamAbbreviation == other.getAbbreviation() &&
            this.teamEntity.teamName === other.getName() && this.teamEntity.league.equals(other.getLeague());
    }

    toJSON() : any {
        return {
            id : this.teamEntity.teamId,
            name : this.teamEntity.teamName,
            abbreviation : this.teamEntity.teamAbbreviation,
            league : this.teamEntity.league.toJSON(),
            active : this.teamEntity.active
        }
    }

    static fromJSON(json:any) : Team {
        return new Team(new TeamEntity(json.id, json.name, json.abbreviation, League.fromJSON(json.league), json.active));
    }
}