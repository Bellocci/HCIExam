import { PlayerEntity } from "./playerEntity.model";
import { UserTeamEntity } from "./userTeamEntity.model";

export class UserTeamPlayerEntity {

    private _userTeamPlayerId!: number;
    private _includedInTeam: boolean = false;    
    private _includedInFavoriteList: boolean = false;    
    private _includedInBlacklist: boolean = false;
    private _player!: PlayerEntity;    
    private _userTeam!: UserTeamEntity;   
    private _deleted: boolean = false;    
    
    constructor(userTeam:UserTeamEntity, player:PlayerEntity) {
        this._userTeam = userTeam;
        this._player = player;
    }
    
    public get userTeamPlayerId(): number {
        return this._userTeamPlayerId;
    }

    public get isIncludedInTeam(): boolean {
        return this._includedInTeam;
    }

    public set includedInTeam(value: boolean) {
        this._includedInTeam = value;
    }

    public get isIncludedInFavoriteList(): boolean {
        return this._includedInFavoriteList;
    }

    public set includedInFavoriteList(value: boolean) {
        this._includedInFavoriteList = value;
    }

    public get isIncludedInBlacklist(): boolean {
        return this._includedInBlacklist;
    }

    public set includedInBlacklist(value: boolean) {
        this._includedInBlacklist = value;
    }

    public get player(): PlayerEntity {
        return this._player;
    }

    public get userTeam(): UserTeamEntity {
        return this._userTeam;
    }

    public set userTeam(value: UserTeamEntity) {
        this._userTeam = value;
    }

    public get deleted(): boolean {
        return this._deleted;
    }
    
    public set deleted(value: boolean) {
        this._deleted = value;
    }

    toString() {
        return "id: " + this.userTeamPlayerId + " Player: " + this.player.toString() + 
            " Included team: " + this.isIncludedInTeam + " Included favorite list: " + this.isIncludedInFavoriteList +
            " Included blacklist: " + this.isIncludedInBlacklist; 
            
    }

}