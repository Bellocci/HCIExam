import { LEAGUE_DATA, LeagueEntity } from "./leagueEntity.model";

export class TeamEntity {

    private _team_id: number;    
    private _name: string;    
    private _short_name: string;    
    private _league: LeagueEntity;

    constructor(team_id: number, name: string, short_name: string, league: LeagueEntity) {
        this._team_id = team_id;
        this._name = name;
        this._short_name = short_name;
        this._league = league;
    }

    public get team_id(): number {
        return this._team_id;
    }
    
    public set team_id(value: number) {
        this._team_id = value;
    }

    public get name(): string {
        return this._name;
    }

    public get short_name(): string {
        return this._short_name;
    }

    public set short_name(value: string) {
        this._short_name = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get league(): LeagueEntity {
        return this._league;
    }

    private set league(value: LeagueEntity) {
        this._league = value;
    }

    equals(other: any): boolean {
        if (other == null) {
            return false;
        }

        if (!(other instanceof TeamEntity)) {
            return false;
        }

        return this.team_id == other.team_id && this.short_name == other.short_name &&
            this.name === other.name && this.league.equals(other.league);
    }

    toJSON(): any {
        return {
            teamId: this.team_id,
            name: this.name,
            abbreviation: this.short_name,
            league: this.league.toJSON(),
        }
    }

    static fromJSON(json: any): TeamEntity {
        return new TeamEntity(json.teamId, json.name, json.abbreviation, LeagueEntity.fromJSON(json.league));
    }
}

export const TEAM_DATA: TeamEntity[] = [
    new TeamEntity(1, 'Atalanta', 'ATA', LEAGUE_DATA[0]),
    new TeamEntity(2, 'Bologna', 'BOL', LEAGUE_DATA[0]),
    new TeamEntity(3, 'Cagliari', 'CAG', LEAGUE_DATA[0]),
    new TeamEntity(4, 'Empoli', 'EMP', LEAGUE_DATA[0]),
    new TeamEntity(5, 'Fiorentina', 'FIO', LEAGUE_DATA[0]),
    new TeamEntity(6, 'Frosinone', 'FRO', LEAGUE_DATA[0]),
    new TeamEntity(7, 'Genoa', 'GEN', LEAGUE_DATA[0]),
    new TeamEntity(8, 'Inter', 'INT', LEAGUE_DATA[0]),
    new TeamEntity(9, 'Juventus', 'JUV', LEAGUE_DATA[0]),
    new TeamEntity(10, 'Lazio', 'LAZ', LEAGUE_DATA[0]),
    new TeamEntity(11, 'Lecce', 'LEC', LEAGUE_DATA[0]),
    new TeamEntity(12, 'Milan', 'MIL', LEAGUE_DATA[0]),
    new TeamEntity(13, 'Monza', 'MON', LEAGUE_DATA[0]),
    new TeamEntity(14, 'Napoli', 'NAP', LEAGUE_DATA[0]),
    new TeamEntity(15, 'Roma', 'ROM', LEAGUE_DATA[0]),
    new TeamEntity(16, 'Salernitana', 'SAL', LEAGUE_DATA[0]),
    new TeamEntity(17, 'Sassuolo', 'SAS', LEAGUE_DATA[0]),
    new TeamEntity(18, 'Torino', 'TOR', LEAGUE_DATA[0]),
    new TeamEntity(19, 'Udinese', 'UDI', LEAGUE_DATA[0]),
    new TeamEntity(20, 'Verona', 'VER', LEAGUE_DATA[0]),
    new TeamEntity(21, 'Arsenal', 'ARS', LEAGUE_DATA[1]),
    new TeamEntity(22, 'Aston Villa', 'ASV', LEAGUE_DATA[1]),
    new TeamEntity(23, 'Savino Del Bene', 'SAV', LEAGUE_DATA[3]),
    new TeamEntity(24, 'Losa Angeles Lakers', 'LAL', LEAGUE_DATA[2]),
]