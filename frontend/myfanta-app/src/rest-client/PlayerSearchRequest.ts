import { SportEnum } from "src/enum/SportEnum.model";
import { PlayerEntity } from "src/model/playerEntity.model";
import { TeamEntity } from "src/model/teamEntity.model";
import { SportEnumVisitorAbstract } from "src/visitor/sport-enum/SportEnumVisitorAbstract";

export class PlayerSearchRequest {

    private _sport!: SportEnum;    
    private _budget!: number;    
    private _fmv!: number;    
    private _minAge!: number;    
    private _maxAge!: number;    
    private _teams: Set<TeamEntity> = new Set<TeamEntity>();    
    private _favoritePlayers: Set<PlayerEntity> = new Set<PlayerEntity>();    
    private _excludedPlayers: Set<PlayerEntity> = new Set<PlayerEntity>();    

    constructor() {
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

    public get fmv(): number {
        return this._fmv;
    }
    
    public set fmv(value: number) {
        this._fmv = value;
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

    public get teams(): Set<TeamEntity> {
        return this._teams;
    }
    
    public set teams(value: Set<TeamEntity>) {
        this._teams = value;
    }

    public get favoritePlayers(): Set<PlayerEntity> {
        return this._favoritePlayers;
    }
    
    public set favoritePlayers(value: Set<PlayerEntity>) {
        this._favoritePlayers = value;
    }

    public get excludedPlayers(): Set<PlayerEntity> {
        return this._excludedPlayers;
    }
    
    public set excludedPlayers(value: Set<PlayerEntity>) {
        this._excludedPlayers = value;
    }
}