import { USER_DATA, UserEntity } from "./userEntity.model";
import { LEAGUE_DATA, LeagueEntity } from "./leagueEntity.model";
import { PlayerEntity } from "./playerEntity.model";
import { OptionEntity } from "./options/optionEntity.model";
import { OptionFootballSoccerEntity } from "./options/optionFootballSoccerEntity.model";
import { UserTeamPlayerEntity } from "./userTeamPlayerEntity.model";

export class UserTeamEntity {

    private _userTeamId: number;        
    private _user: UserEntity;
    private _nameTeam: string;
    private _league: LeagueEntity;
    private _userTeamPlayerList: UserTeamPlayerEntity[] = [];    
    private _option: OptionEntity;

    constructor(id:number, user:UserEntity, nameTeam:string, league:LeagueEntity, option:OptionEntity);
    constructor(user:UserEntity, nameTeam:string, league:LeagueEntity, option:OptionEntity);
    constructor(... params:any[]) {

        if(params.length == 5) {
            this._userTeamId = params[0];
            this._user = params[1];
            this._nameTeam = params[2];
            this._league = params[3];
            this._option = params[4];
        } else if(params.length == 4) {
            this._userTeamId = -1;
            this._user = params[0];
            this._nameTeam = params[1];
            this._league = params[2];
            this._option = params[3];
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

    public get userTeamPlayerList(): UserTeamPlayerEntity[] {
        return this._userTeamPlayerList;
    }

    public set userTeamPlayerList(value: UserTeamPlayerEntity[]) {
        this._userTeamPlayerList = value;
    }

    public get team(): PlayerEntity[] {
        return this.userTeamPlayerList
                .filter(userTeamPlayer => userTeamPlayer.isIncludedInTeam)
                .map(userTeamPlayer => userTeamPlayer.player);
    }

    public addPlayerToTeam(player:PlayerEntity) : boolean {

        // Verifico se il giocatore è già presente nella lista dei giocatori 
        let userTeamPlayer:UserTeamPlayerEntity | undefined = this.userTeamPlayerList
                .find(userTeamPlayer => userTeamPlayer.player.equals(player));
        
       let added:boolean;
        if(userTeamPlayer != undefined && !userTeamPlayer.isIncludedInTeam) {            
            /*
             * Caso giocatore già presente nella lista dei giocatori ma non nella squadra
             */
            userTeamPlayer.includedInTeam = true;
            added = true;
        } else if(userTeamPlayer == undefined) {
            /*
             * Caso giocatore ancora non presente nella lista dei giocatori  
             */
            let newUserTeamPlayer:UserTeamPlayerEntity = new UserTeamPlayerEntity(this, player);
            newUserTeamPlayer.includedInTeam = true;
            this.userTeamPlayerList.push(newUserTeamPlayer);
            added = true;
        } else {
            /*
             * Caso giocatore già presente nella lista dei giocatori e nella squadra
             */
            added = false;
        }

        return added;
    }

    public removePlayerFromTeam(player:PlayerEntity) : boolean {

        // Verifico se il giocatore è presente nella lista dei giocatori 
        let userTeamPlayer:UserTeamPlayerEntity | undefined = this.userTeamPlayerList
                .find(userTeamPlayer => userTeamPlayer.player.equals(player));
        
       let removed:boolean;
        if(userTeamPlayer != undefined && userTeamPlayer.isIncludedInTeam) {            
            /*
             * Caso giocatore presente nella lista dei giocatori e nella squadra
             */
            userTeamPlayer.includedInTeam = false;
            removed = true;
        } else {
            /*
             * Caso giocatore non presente nella lista dei giocatori oppure non presente nella squadra
             */
            removed = false;
        }

        return removed;
    }

    public get favoriteList(): PlayerEntity[] {
        return this.userTeamPlayerList
                .filter(userTeamPlayer => userTeamPlayer.isIncludedInFavoriteList)
                .map(userTeamPlayer => userTeamPlayer.player);
    }

    public addPlayerToFavoriteList(player:PlayerEntity) : boolean {
        // Verifico se il giocatore è già presente nella lista dei giocatori 
        let userTeamPlayer:UserTeamPlayerEntity | undefined = this.userTeamPlayerList
                .find(userTeamPlayer => userTeamPlayer.player.equals(player));
        
       let added:boolean;
        if(userTeamPlayer != undefined && !userTeamPlayer.isIncludedInFavoriteList) {            
            /*
             * Caso giocatore già presente nella lista dei giocatori ma non tra i preferiti
             */
            userTeamPlayer.includedInFavoriteList = true;
            added = true;
        } else if(userTeamPlayer == undefined) {
            /*
             * Caso giocatore ancora non presente nella lista dei giocatori  
             */
            let newUserTeamPlayer:UserTeamPlayerEntity = new UserTeamPlayerEntity(this, player);
            newUserTeamPlayer.includedInFavoriteList = true;
            this.userTeamPlayerList.push(newUserTeamPlayer);
            added = true;
        } else {
            /*
             * Caso giocatore già presente nella lista dei giocatori e nella lista dei preferiti
             */
            added = false;
        }

        return added;
    }

    removePlayerFromFavoiriteList(player:PlayerEntity) : boolean {
        // Verifico se il giocatore è presente nella lista dei giocatori 
        let userTeamPlayer:UserTeamPlayerEntity | undefined = this.userTeamPlayerList
                .find(userTeamPlayer => userTeamPlayer.player.equals(player));
        
       let removed:boolean;
        if(userTeamPlayer != undefined && userTeamPlayer.isIncludedInFavoriteList) {            
            /*
             * Caso giocatore presente nella lista dei giocatori e nella lista dei giocatori preferiti
             */
            userTeamPlayer.includedInFavoriteList = false;
            removed = true;
        } else {
            /*
             * Caso giocatore non presente nella lista dei giocatori oppure non presente nella 
             * lista dei giocatori preferiti
             */
            removed = false;
        }

        return removed;
    }

    public get blacklist(): PlayerEntity[] {
        return this.userTeamPlayerList
            .filter(userTeamPlayer => userTeamPlayer.isIncludedInBlacklist)
            .map(userTeamPlayer => userTeamPlayer.player);
    } 

    public addPlayerToBlacklist(player:PlayerEntity) : boolean {
        // Verifico se il giocatore è già presente nella lista dei giocatori 
        let userTeamPlayer:UserTeamPlayerEntity | undefined = this.userTeamPlayerList
                .find(userTeamPlayer => userTeamPlayer.player.equals(player));
        
       let added:boolean;
        if(userTeamPlayer != undefined && !userTeamPlayer.isIncludedInBlacklist) {            
            /*
             * Caso giocatore già presente nella lista dei giocatori ma non tra i giocatori da escludere
             */
            userTeamPlayer.includedInBlacklist = true;
            added = true;
        } else if(userTeamPlayer == undefined) {
            /*
             * Giocatore ancora non presente nella lista dei giocatori  
             */
            let newUserTeamPlayer:UserTeamPlayerEntity = new UserTeamPlayerEntity(this, player);
            newUserTeamPlayer.includedInBlacklist = true;
            this.userTeamPlayerList.push(newUserTeamPlayer);
            added = true;
        } else {
            /*
             * Giocatore già presente nella lista dei giocatori e nella lista dei giocatori da escludere
             */
            added = false;
        }

        return added;
    }

    public removePlayerFromBlacklist(player:PlayerEntity) : boolean {
        // Verifico se il giocatore è presente nella lista dei giocatori 
        let userTeamPlayer:UserTeamPlayerEntity | undefined = this.userTeamPlayerList
                .find(userTeamPlayer => userTeamPlayer.player.equals(player));
        
       let removed:boolean;
        if(userTeamPlayer != undefined && userTeamPlayer.isIncludedInBlacklist) {            
            /*
             * Giocatore presente nella lista dei giocatori e nella lista dei giocatori da escludere
             */
            userTeamPlayer.includedInBlacklist = false;
            removed = true;
        } else {
            /*
             * Giocatore non presente nella lista dei giocatori oppure non presente nella 
             * lista dei giocatori da escludere
             */
            removed = false;
        }

        return removed;
    }

    public get option(): OptionEntity {
        return this._option;
    }

    public set option(value: OptionEntity) {
        this._option = value;
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
            this.league.equals(other.league)
    }
}

export const CUSTOMS_TEAM_DATA: UserTeamEntity[] = [
    new UserTeamEntity(1, USER_DATA[0], "SerieA Football", LEAGUE_DATA[0], new OptionFootballSoccerEntity()),     
    new UserTeamEntity(3, USER_DATA[0], "Nba - squadra 1", LEAGUE_DATA[3], new OptionFootballSoccerEntity()),
    new UserTeamEntity(4, USER_DATA[0], "Serie A - squadra 2", LEAGUE_DATA[0], new OptionFootballSoccerEntity()),
    new UserTeamEntity(5, USER_DATA[0], "Premier League - squadra 1", LEAGUE_DATA[1], new OptionFootballSoccerEntity()),
    new UserTeamEntity(6, USER_DATA[0], "SerieA - 2", LEAGUE_DATA[0], new OptionFootballSoccerEntity()),
]