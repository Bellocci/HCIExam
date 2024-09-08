import { SportEnum } from "src/enum/SportEnum.model";
import { ChampionshipEnum } from "../enum/ChampionshipEnum.model";
import { TeamEntity } from "./teamEntity.model";
import { CountryEnum } from "src/enum/CountryEnum.model";

export class LeagueEntity {

    private _league_id: number;
    private _name: string;
    private _sport: SportEnum;
    private _country: CountryEnum;    
    private _teamsList: TeamEntity[] = [];

    constructor(_league_id: number, name: string, sport: SportEnum, country:CountryEnum) {

        this._league_id = _league_id
        this._name = name
        this._sport = sport
        this._country = country
    }

    public get league_id(): number {
        return this._league_id;
    }

    private set league_id(value: number) {
        this._league_id = value;
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

    public get country(): CountryEnum {
        return this._country;
    }

    private set country(value: CountryEnum) {
        this._country = value;
    }

    public get teamsList(): TeamEntity[] {
        return this._teamsList;
    }

    public set teamsList(value: TeamEntity[]) {
        this._teamsList = value;
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof LeagueEntity)) {
            return false;
        }

        return this.league_id == other.league_id && this.name == other.name &&
            this.sport == other.sport && this.country == other.country;
    }

    toJSON() : any {
        return {
            leagueId : this.league_id,
            sport : this.sport.toJSON(),
            name : this.name,
            championship : this.country.toJSON(),
        }
    }

    static fromJSON(json:any) : LeagueEntity {
        return new LeagueEntity(
            json.leagueId, json.name, SportEnum.fromJSON(json.sport), CountryEnum.fromJSON(json.country));
    } 

    static fromJSONArray(json:any[]) : LeagueEntity[] {
        let result:LeagueEntity[] = []
        console.log("Inizio deserializzazione lista");
        json.forEach((value) => {
            console.log(value);
            let newLeague = new LeagueEntity(
                value.leagueId, value.name, SportEnum.fromJSON(value.sport), CountryEnum.fromJSON(value.country));
            result.push(newLeague);
        })

        return result;
    }
}

export const LEAGUE_DATA: LeagueEntity[] = [
    new LeagueEntity(1, 'Serie A', SportEnum.FOOTBALL_SOCCER, CountryEnum.ITALY),
    new LeagueEntity(2,'Premier League', SportEnum.FOOTBALL_SOCCER, CountryEnum.ENGLAND),
    new LeagueEntity(3,'NBA', SportEnum.BASKETBALL, CountryEnum.UNITED_STATES),
    new LeagueEntity(4, 'Serie A1', SportEnum.VOLLEYBALL, CountryEnum.ITALY)
]