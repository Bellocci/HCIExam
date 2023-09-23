import { SportEnum } from "src/enum/SportEnum.model";
import { TeamEntity } from "../teamEntity.model";
import { PlayerEntity } from "../playerEntity.model";

export class OptionEntity {

    private _optionId: number;
    private _sport: SportEnum;
    private _budget: number;  
    private _minAge: number;    
    private _maxAge: number;      
    private _teamsList: TeamEntity[] = [];            
    private _playersToInclude: PlayerEntity[] = [];    
    private _playersToExclude: PlayerEntity[] = [];   
    private _active: boolean;     

    constructor(sport:SportEnum);
    constructor(optionId: number, sport: SportEnum, budget: number, minAge: number, maxAge: number, active:boolean);
    constructor(... params:any[]) {
        if(params.length == 1) {
            this._optionId = -1;
            this._minAge = 18;
            this._maxAge = 99;
            this._budget = 250;
            this._active = true;
            this._sport = params[0];
        } else if(params.length == 5) {
            this._optionId = params[0];
            this._minAge = params[1];
            this._maxAge = params[2];
            this._budget = params[3];
            this._sport = params[4];
            this._active = params[5];
        } else {
            throw new Error("Error while create OptionEntity with params: " + params.toString());
        }  
    }

    public get optionId(): number {
        return this._optionId;
    }

    private set optionId(value: number) {
        this._optionId = value;
    }

    public get sport(): SportEnum {
        return this._sport;
    }

    public set sport(value: SportEnum) {
        this._sport = value;
    }

    public get budget(): number {
        return this._budget;
    }
    
    public set budget(value: number) {
        this._budget = value;
    }

    public get minAge(): number {
        return this._minAge;
    }
    
    public set minAge(value: number) {
        this._minAge = value;
    }

    public get maxAge(): number {
        return this._maxAge;
    }
    
    public set maxAge(value: number) {
        this._maxAge = value;
    }

    public get teamsList(): TeamEntity[] {
        return this._teamsList;
    }
    
    public set teamsList(value: TeamEntity[]) {
        this._teamsList = value;
    }

    public get playersToInclude(): PlayerEntity[] {
        return this._playersToInclude;
    }
    
    public set playersToInclude(value: PlayerEntity[]) {
        this._playersToInclude = value;
    }

    public get playersToExclude(): PlayerEntity[] {
        return this._playersToExclude;
    }

    public set playersToExclude(value: PlayerEntity[]) {
        this._playersToExclude = value;
    }

    public get active(): boolean {
        return this._active;
    }

    private set active(value: boolean) {
        this._active = value;
    }

    toString() : string {
        return "Sport: " + this.sport.description + "Budget: " + this.budget + ", minAge: " + this.minAge + ", maxAge:" + this.maxAge +
            ", team:" + this.teamsList.toString() + ", playersToInclude: " + this.playersToInclude.toString() + 
            ", playerToExclude: " + this.playersToExclude.toString();
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof OptionEntity)) {
            return false;
        }

        return this.optionId == other.optionId && SportEnum.equals(this.sport, other.sport);
    }

    toJSON() : any {
        let jsonTeamList:any[] = [];
        this.teamsList.forEach(p => jsonTeamList.push(p.toJSON())) ;

        let jsonIncludePlayerList:any[] = [];
        this.playersToInclude.forEach(p => jsonIncludePlayerList.push(p.toJSON()));

        let jsonExcludePlayerList:any[] = [];
        this.playersToExclude.forEach(p => jsonExcludePlayerList.push(p.toJSON()));

        return {
            optionId: this.optionId,
            sport: this.sport.toJSON(),
            budget: this.budget,
            minAge: this.minAge,
            maxAge: this.maxAge,
            teamsList: jsonTeamList,
            playersToInclude: jsonIncludePlayerList,
            playersToExclude: jsonExcludePlayerList,
            active: this.active
        }
    }

    static fromJSON(json:any) : OptionEntity {
        let entity:OptionEntity = new OptionEntity(json.optionId, SportEnum.fromJSON(json.sport), json.budget,
            json.minAge, json.maxAge, json.active);

        json.teamsList.forEach((t:TeamEntity) => entity.teamsList.push(TeamEntity.fromJSON(t)));
        json.playersToInclude.forEach((p: PlayerEntity) => entity.playersToInclude.push(PlayerEntity.fromJSON(p)));
        json.playersToExclude.forEach((p: PlayerEntity) => entity.playersToInclude.push(PlayerEntity.fromJSON(p)));

        return entity;
    }
}