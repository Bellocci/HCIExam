import { UserTeamEntity } from "src/model/userTeamEntity.model"
import { User } from "./user.model";
import { League } from "./League.model";
import { PlayerDecoratorFactoryService } from "src/decorator-factory/player-decorator-factory.service";
import { Player } from "./player.model";
import { Option } from "./option/option.model";

export class UserTeam {

    private entity!: UserTeamEntity;

    constructor(private playerDecoratorFactory:PlayerDecoratorFactoryService,
        private userTeamEntity?:UserTeamEntity) {
            if(userTeamEntity != undefined) {
                this.entity = userTeamEntity;
            } else {
                this.entity = new UserTeamEntity();
                this.entity.id = -1;
                this.entity.active = true;
            }
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

    setUser(user:User) : void {
        this.entity.user = user;
    }

    getNameTeam() : string {
        return this.entity.nameTeam;
    }

    setNameTeam(nameTeam:string) : void {
        this.entity.nameTeam = nameTeam;
    }

    getLeague() : League {
        return this.entity.league;
    }

    setLeague(league:League) {
        this.entity.league = league;
    }

    // L'operatore spread [...nomeArray] crea una shallow copy di un array
    getTeam() : Player[] {
        return [...this.playerDecoratorFactory.decorateList(this.entity.team)];
    }

    addPlayerToTeam(player:Player) : boolean {
        if(this.entity.team.filter(p => p.playerId == player.getId()).length == 0) {
            this.entity.team.push(player.getEntity());
            return true;
        }
        return false;
    }

    removePlayerFromTeam(player:Player) : boolean {
        let index = this.entity.team.findIndex(p => p.playerId == player.getId());
        if(index != -1) {
            this.entity.team.splice(index, 1);
            return true;
        }
        return false;
    }

    getFavoritList() : Player[] {
        return [...this.playerDecoratorFactory.decorateList(this.entity.favoriteList)];
    }

    addPlayerToFavoriteList(player:Player) : boolean {
        if(this.entity.favoriteList.filter(p => p.playerId == player.getId()).length == 0) {
            this.entity.favoriteList.push(player.getEntity());
            return true;
        }
        return false;
    }

    removePlayerFromFavoiriteList(player:Player) : boolean {
        let index = this.entity.favoriteList.findIndex(p => p.playerId == player.getId());
        if(index != -1) {
            this.entity.favoriteList.splice(index, 1);
            return true;
        }
        return false;
    }

    getBlackList() : Player[] {
        return [...this.playerDecoratorFactory.decorateList(this.entity.blacklist)];
    }

    addPlayerToBlacklist(player:Player) : boolean {
        if(this.entity.blacklist.filter(p => p.playerId == player.getId()).length == 0) {
            this.entity.blacklist.push(player.getEntity());
            return true;
        }
        return false;
    }

    removePlayerFromBlacklist(player:Player) : boolean {
        let index = this.entity.blacklist.findIndex(p => p.playerId == player.getId());
        if(index != -1) {
            this.entity.blacklist.splice(index, 1);
            return true;
        }
        return false;
    }

    setActive(active:boolean) : void {
        this.entity.active = active;
    }

    isActive() : boolean {
        return this.entity.active;
    }

    getOption() : Option {
        return this.entity.option;
    }

    setOption(option:Option) : void {
        this.entity.option = option;
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