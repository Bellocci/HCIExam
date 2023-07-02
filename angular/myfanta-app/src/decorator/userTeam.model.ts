import { UserTeamEntity } from "src/model/userTeamEntity.model"
import { User } from "./user.model";
import { League } from "./League.model";
import { PlayerDecoratorFactoryService } from "src/decorator-factory/player-decorator-factory.service";
import { Player } from "./player.model";
import { Option } from "./option/option.model";

export class UserTeam {

    private entity!: UserTeamEntity;
    private myTeam:Player[];
    private favoritList:Player[];
    private blackList:Player[];

    constructor(private userTeamEntity:UserTeamEntity,
        private playerDecoratorFactory:PlayerDecoratorFactoryService) {
        this.entity = userTeamEntity;
        this.myTeam = playerDecoratorFactory.decorateList(userTeamEntity.team);
        this.favoritList = playerDecoratorFactory.decorateList(userTeamEntity.favoriteList);
        this.blackList = playerDecoratorFactory.decorateList(userTeamEntity.blacklist);
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
        return [...this.myTeam];
    }

    getFavoritList() : Player[] {
        return [...this.favoritList];
    }

    getBlackList() : Player[] {
        return [...this.blackList];
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