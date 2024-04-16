import { SportEnum } from "src/enum/SportEnum.model";
import { TeamEntity } from "../teamEntity.model";
import { PlayerEntity } from "../playerEntity.model";
import { OptionFootballSoccerEntity } from "./optionFootballSoccerEntity.model";

export abstract class OptionEntity {

    private _optionId: number;
    private _sport: SportEnum;
    private _budget: number;  
    private _minAge: number;    
    private _maxAge: number;
    private _teamsList: PlayerEntity[] = [];
    private _playersToInclude: PlayerEntity[] = [];
    private _playersToExclude: PlayerEntity[] = [];   

    constructor(sport:SportEnum, id?:string);
    constructor(optionId: number, sport: SportEnum, budget: number, minAge: number, maxAge: number);
    constructor(... params:any[]) {
        if(params.length == 1) {
            this._optionId = -1;
            this._minAge = 18;
            this._maxAge = 99;
            this._budget = 250;
            this._sport = params[0];
        } else if(params.length == 2) {
            this._optionId = params[1] != undefined ? params[1] : -1;
            this._minAge = 18;
            this._maxAge = 99;
            this._budget = 250;
            this._sport = params[0];
        } else if(params.length == 5) {
            this._optionId = params[0];
            this._minAge = params[1];
            this._maxAge = params[2];
            this._budget = params[3];
            this._sport = params[4];
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

    public get teamsList(): PlayerEntity[] {
        return this._teamsList;
    }
    
    public set teamsList(value: PlayerEntity[]) {
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
        this.teamsList.forEach(t => jsonTeamList.push(t.toJSON())) ;

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
        }
    }

    static fromJSON(json:any) : OptionEntity {

        let entity:OptionEntity;
        SportEnum.visit(SportEnum.fromJSON(json.sport), {

            footballSoccer() {
                entity = new OptionFootballSoccerEntity(json.optionId);
            },

            basketball() {
                entity = new OptionFootballSoccerEntity(json.optionId);
            },

            volleyball() {
                entity = new OptionFootballSoccerEntity(json.optionId);
            },
        }) 

        json.teamsList.forEach((t:TeamEntity) => entity.teamsList.push(PlayerEntity.fromJSON(t)));
        json.playersToInclude.forEach((p: PlayerEntity) => entity.playersToInclude.push(PlayerEntity.fromJSON(p)));
        json.playersToExclude.forEach((p: PlayerEntity) => entity.playersToInclude.push(PlayerEntity.fromJSON(p)));

        return entity!;
    }
    
}