import { PlayerEntity } from "src/model/playerEntity.model";
import { Team } from "./team.model";
import { RolePlayer } from "./role-player.model";

export class Player {

    private playerEntity:PlayerEntity;

    constructor(playerEntity:PlayerEntity) {
        this.playerEntity = playerEntity;
    }

    getEntity() : PlayerEntity {
        return this.playerEntity;
    }

    getId() : number {
        return this.playerEntity.playerId;
    }

    getName() : string {
        return this.playerEntity.playerName;
    }

    getTeam() : Team {
        return this.playerEntity.team;
    }

    getCost() : number {
        return this.playerEntity.cost;
    }

    getRole() : RolePlayer {
        return this.playerEntity.role;
    }

    getAge() : number {
        return this.playerEntity.age;
    }

    getMatchPlayed() : number {
        return this.playerEntity.matchPlayed;
    }

    isActive() : boolean {
        return this.playerEntity.active;
    }

    getDescription() : string {
        return this.playerEntity.description;
    }

    equals(other:any) {
        if(other == null) {
            return false;
        }

        if(!(other instanceof Player)) {
            return false;
        }

        return this.playerEntity.playerId == other.getId() && this.playerEntity.active == other.isActive() &&
            this.playerEntity.playerName == other.getName() && this.playerEntity.role == other.getRole() &&
            this.playerEntity.age == other.getAge() && this.playerEntity.cost == other.getCost() && 
            this.playerEntity.matchPlayed == other.getMatchPlayed() && this.playerEntity.team.equals(other.getTeam());
    }
}