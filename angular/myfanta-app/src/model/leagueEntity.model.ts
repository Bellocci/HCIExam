import { SportEnum } from "src/enum/SportEnum.model";
import { ChampionshipEnum } from "../enum/ChampionshipEnum.model";

export class LeagueEntity {
    private _leagueId: number;
    private _name: string;
    private _sport: SportEnum;
    private _championship: ChampionshipEnum;
    private _active: boolean;

    constructor(leagueId: number, name: string, sport: SportEnum, 
        championship: ChampionshipEnum, active: boolean) {

        this._leagueId = leagueId
        this._name = name
        this._sport = sport
        this._championship = championship
        this._active = active
    }

    public get leagueId(): number {
        return this._leagueId;
    }

    private set leagueId(value: number) {
        this._leagueId = value;
    }

    public get name(): string {
        return this._name;
    }

    private set name(value: string) {
        this._name = value;
    }

    public get sport(): SportEnum {
        return this._sport;
    }

    private set sport(value: SportEnum) {
        this._sport = value;
    }

    public get championship(): ChampionshipEnum {
        return this._championship;
    }

    private set championship(value: ChampionshipEnum) {
        this._championship = value;
    }

    public get active(): boolean {
        return this._active;
    }

    private set active(value: boolean) {
        this._active = value;
    }

    toString() : string {
        return "Id:" + this.leagueId + ", Nome: " + this.name + ", Campionato: " + this.championship +
            ", Sport: " + this.sport;
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof LeagueEntity)) {
            return false;
        }

        return this.leagueId == other.leagueId && this.name == other.name &&
            this.sport == other.sport && this.championship == other.championship;
    }

    toJSON() : any {
        return {
            leagueId : this.leagueId,
            sport : this.sport.toJSON(),
            name : this.name,
            championship : this.championship.toJSON(),
            active : this.active
        }
    }

    static fromJSON(json:any) : LeagueEntity {
        return new LeagueEntity(
            json.leagueId, json.name, SportEnum.fromJSON(json.sport), ChampionshipEnum.fromJSON(json.championship), json.active);
    } 
}

export const LEAGUE_DATA: LeagueEntity[] = [
    new LeagueEntity(1, 'Serie A', SportEnum.FOOTBALL_SOCCER, ChampionshipEnum.ITA_CHAMP, true),
    new LeagueEntity(2,'Premier League', SportEnum.FOOTBALL_SOCCER, ChampionshipEnum.ENG_CHAMP, true),
    new LeagueEntity(3,'NBA', SportEnum.BASKETBALL, ChampionshipEnum.USA_CHAMP, true),
    new LeagueEntity(4, 'Serie A1', SportEnum.VOLLEYBALL, ChampionshipEnum.ITA_CHAMP, true)
]