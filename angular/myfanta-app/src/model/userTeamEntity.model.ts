import { USER_DATA, UserEntity } from "./userEntity.model";
import { LEAGUE_DATA, LeagueEntity } from "./leagueEntity.model";
import { PlayerEntity } from "./playerEntity.model";
import { OptionEntity } from "./options/optionEntity.model";
import { SportEnum } from "src/enum/SportEnum.model";

export class UserTeamEntity {
    private _userTeamId: number;        
    private _user: UserEntity;
    private _nameTeam: string;
    private _league: LeagueEntity;
    private _team: PlayerEntity[] = [];
    private _favoriteList: PlayerEntity[] = [];
    private _blacklist: PlayerEntity[] = [];    
    private _option: OptionEntity;
    private _active: boolean;

    constructor(id:number, user:UserEntity, nameTeam:string, league:LeagueEntity, option:OptionEntity, active:boolean);
    constructor(user:UserEntity, nameTeam:string, league:LeagueEntity, option:OptionEntity, active:boolean);
    constructor(... params:any[]) {
        if(params.length == 6) {
            this._userTeamId = params[0];
            this._user = params[1];
            this._nameTeam = params[2];
            this._league = params[3];
            this._option = params[4];
            this._active = params[5];
        } else if(params.length == 5) {
            this._userTeamId = -1;
            this._user = params[0];
            this._nameTeam = params[1];
            this._league = params[2];
            this._option = params[3];
            this._active = params[4];
        } else {
            throw new Error("Error while create user team entity. Params: " + params.toString());
        }
    }

    public get userTeamId(): number {
        return this._userTeamId;
    }

    private set userTeamId(value: number) {
        this._userTeamId = value;
    }

    public get user(): UserEntity {
        return this._user;
    }

    private set user(value: UserEntity) {
        this._user = value;
    }

    public get nameTeam(): string {
        return this._nameTeam;
    }

    public set nameTeam(value: string) {
        this._nameTeam = value;
    }

    public get league(): LeagueEntity {
        return this._league;
    }

    private set league(value: LeagueEntity) {
        this._league = value;
    }

    public get team(): PlayerEntity[] {
        return this._team;
    }

    private set team(value: PlayerEntity[]) {
        this._team = value;
    }

    public addPlayerToTeam(player:PlayerEntity) : boolean {
        if(this.team.filter(p => p.playerId == player.playerId).length == 0) {
            this.team.push(player);
            return true;
        }
        return false;
    }

    public removePlayerFromTeam(player:PlayerEntity) : boolean {
        let index = this.team.findIndex(p => p.playerId == player.playerId);
        if(index != -1) {
            this.team.splice(index, 1);
            return true;
        }
        return false;
    }

    public get favoriteList(): PlayerEntity[] {
        return this._favoriteList;
    }

    private set favoriteList(value: PlayerEntity[]) {
        this._favoriteList = value;
    }

    public addPlayerToFavoriteList(player:PlayerEntity) : boolean {
        if(this.favoriteList.filter(p => p.playerId == player.playerId).length == 0) {
            this.favoriteList.push(player);
            return true;
        }
        return false;
    }

    removePlayerFromFavoiriteList(player:PlayerEntity) : boolean {
        let index = this.favoriteList.findIndex(p => p.playerId == player.playerId);
        if(index != -1) {
            this.favoriteList.splice(index, 1);
            return true;
        }
        return false;
    }

    public get blacklist(): PlayerEntity[] {
        return this._blacklist;
    }

    private set blacklist(value: PlayerEntity[]) {
        this._blacklist = value;
    }    

    public addPlayerToBlacklist(player:PlayerEntity) : boolean {
        if(this.blacklist.filter(p => p.playerId == player.playerId).length == 0) {
            this.blacklist.push(player);
            return true;
        }
        return false;
    }

    public removePlayerFromBlacklist(player:PlayerEntity) : boolean {
        let index = this.blacklist.findIndex(p => p.playerId == player.playerId);
        if(index != -1) {
            this.blacklist.splice(index, 1);
            return true;
        }
        return false;
    }

    public get option(): OptionEntity {
        return this._option;
    }

    public set option(value: OptionEntity) {
        this._option = value;
    }

    public get active(): boolean {
        return this._active;
    }

    private set active(value: boolean) {
        this._active = value;
    }

    toString() : string {
        return "Nome: " + this.nameTeam + ", Sport: " + this.league.sport + ", " + 
            this.league.championship + ", Lega: " + this.league.name;
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof UserTeamEntity)) {
            return false;
        }

        return this.userTeamId == other.userTeamId && this.user.equals(other.user) && this.nameTeam == other.nameTeam &&
            this.league.equals(other.league) && this.active == other.active;
    }

    toJSON() : any {
        let jsonTeam:any[] = [];
        this.team.forEach(p => jsonTeam.push(p.toJSON()));

        let jsonFavoriteList:any[] = [];
        this.favoriteList.forEach(p => jsonFavoriteList.push(p.toJSON()));

        let jsonBlacklist:any[] = [];
        this.blacklist.forEach(p => jsonBlacklist.push(p.toJSON()));

        return {
            userTeamId: this.userTeamId,
            user: this.user.toJSON(),
            nameTeam: this.nameTeam,
            league: this.league,
            team: jsonTeam,
            favoriteList: jsonFavoriteList,
            blacklist: jsonBlacklist,
            option: this.option.toJSON(),
            active: this.active
        }
    }

    static fromJSON(json:any) : UserTeamEntity {
        let entity:UserTeamEntity = new UserTeamEntity(json.userTeamId, UserEntity.fromJSON(json.user), json.nameTeam, LeagueEntity.fromJSON(json.league),
            OptionEntity.fromJSON(json.option), json.active);

        json.team.forEach((p: PlayerEntity) => entity.addPlayerToTeam(PlayerEntity.fromJSON(p)));
        json.favoriteList.forEach((p: PlayerEntity) => entity.addPlayerToFavoriteList(PlayerEntity.fromJSON(p)));
        json.blacklist.forEach((p: PlayerEntity) => entity.addPlayerToBlacklist(PlayerEntity.fromJSON(p)));

        return entity;
    }
}

export const CUSTOMS_TEAM_DATA: UserTeamEntity[] = [
    new UserTeamEntity(1, USER_DATA[0], "SerieA Football", LEAGUE_DATA[0], new OptionEntity(SportEnum.FOOTBALL_SOCCER), true),        
    new UserTeamEntity(3, USER_DATA[0], "Nba - squadra 1", LEAGUE_DATA[3], new OptionEntity(SportEnum.BASKETBALL), true),
    new UserTeamEntity(4, USER_DATA[0], "Serie A - squadra 2", LEAGUE_DATA[0], new OptionEntity(SportEnum.FOOTBALL_SOCCER), true),
    new UserTeamEntity(5, USER_DATA[0], "Premier League - squadra 1", LEAGUE_DATA[1], new OptionEntity(SportEnum.FOOTBALL_SOCCER), true),
    new UserTeamEntity(6, USER_DATA[0], "SerieA - 2", LEAGUE_DATA[0], new OptionEntity(SportEnum.FOOTBALL_SOCCER), true),
]