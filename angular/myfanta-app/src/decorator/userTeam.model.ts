import { UserTeamEntity } from "src/model/userTeamEntity.model"
import { User } from "./user.model";
import { League } from "./League.model";
import { Player } from "src/model/player.model";

export class UserTeam {

    private entity!: UserTeamEntity;

    constructor(entity:UserTeamEntity) {
        this.entity = entity;
    }

    getEntity() : UserTeamEntity {
        return this.entity;
    }

    getId(): number {
        return this.entity.id;
    }

    getUser(): User {
        return this.entity.user;
    }

    getNameTeam() : string {
        return this.entity.nameTeam;
    }

    getLeague() : League {
        return this.entity.league;
    }

    // L'operatore spread [...nomeArray] crea una shallow copy di un array
    getTeam() : Player[] {
        return [...this.entity.team];
    }

    getFavoritList() : Player[] {
        return [...this.entity.favoriteList];
    }

    getBlackList() : Player[] {
        return [...this.entity.blacklist];
    }

    setActive(active:boolean) : void {
        this.entity.active = active;
    }

    isActive() : boolean {
        return this.entity.active;
    }

    toString() : string {
        return "Nome: " + this.entity.nameTeam + ", Sport: " + this.entity.league.getSport() +
            ", " + this.entity.league.getChampionship() + ", Lega: " + this.entity.league.getName();
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof UserTeam)) {
            return false;
        }

        return this.entity.user.equals(other.entity.user) && this.entity.id == other.entity.id &&
            this.entity.nameTeam == other.entity.nameTeam && this.entity.active == other.entity.active
    }
}