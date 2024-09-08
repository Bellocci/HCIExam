import { TEAM_DATA, TeamEntity } from "./teamEntity.model";
import { ROLE_PLAYER_DATA, RolePlayerEntity } from "./rolePlayerEntity.model";
import { CountryEnum } from "src/enum/CountryEnum.model";
import { SportEnum } from "src/enum/SportEnum.model";

export class PlayerEntity {

    private _player_id: number;
    private _name: string;
    private _last_name: string;
    private _nationality: CountryEnum;   
    private _sport: SportEnum;     
    private _role: RolePlayerEntity;    
    private _team: TeamEntity;    
    private _fantasy_price: number;        
    private _date_of_birth: Date;    
    private _average_rating: number;    
    private _fanta_average_rating: number;        

    constructor(_player_id: number, name: string, last_name:string, nationality:CountryEnum, 
        sport:SportEnum, role: RolePlayerEntity, team: TeamEntity, _fantasy_price: number,
        date_of_birth:Date, average_rating:number, fanta_average_rating:number) {
        
        this._player_id = _player_id;
        this._name = name;
        this._last_name = last_name;
        this._nationality = nationality;
        this._sport = sport;
        this._role = role;
        this._team = team;
        this._fantasy_price = _fantasy_price;
        this._date_of_birth = date_of_birth;
        this._average_rating = average_rating;
        this._fanta_average_rating = fanta_average_rating;
    }

    public get player_id(): number {
        return this._player_id;
    }

    private set player_id(value: number) {
        this._player_id = value;
    }

    public get name(): string {
        return this._name;
    }

    private set name(value: string) {
        this._name = value;
    }

    public get last_name(): string {
        return this._last_name;
    }

    public set last_name(value: string) {
        this._last_name = value;
    }

    public get nationality(): CountryEnum {
        return this._nationality;
    }
    
    public set nationality(value: CountryEnum) {
        this._nationality = value;
    }

    public get sport(): SportEnum {
        return this._sport;
    }
    
    public set sport(value: SportEnum) {
        this._sport = value;
    }

    public get role(): RolePlayerEntity {
        return this._role;
    }

    private set role(value: RolePlayerEntity) {
        this._role = value;
    }

    public get team(): TeamEntity {
        return this._team;
    }

    private set team(value: TeamEntity) {
        this._team = value;
    }

    public get fantasy_price(): number {
        return this._fantasy_price;
    }
    
    public set fantasy_price(value: number) {
        this._fantasy_price = value;
    }    

    public get date_of_birth(): Date {
        return this._date_of_birth;
    }
    
    public set date_of_birth(value: Date) {
        this._date_of_birth = value;
    }

    public get average_rating(): number {
        return this._average_rating;
    }

    public set average_rating(value: number) {
        this._average_rating = value;
    }

    public get fanta_average_rating(): number {
        return this._fanta_average_rating;
    }
    
    public set fanta_average_rating(value: number) {
        this._fanta_average_rating = value;
    }

    toString() : string {
        return "Name: " + this.name + " Team: " + this.team.name + " Role: " + this.role.description;
    }

    equals(other:any) {
        if(other == null) {
            return false;
        }

        if(!(other instanceof PlayerEntity)) {
            return false;
        }

        return this.player_id == other.player_id &&
            this.name == other.name && this.role == other.role &&
            this.nationality == other.nationality &&
            this.sport == other.sport;
    }
}