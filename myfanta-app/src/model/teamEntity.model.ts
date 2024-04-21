import { LEAGUE_DATA, LeagueEntity } from "./leagueEntity.model";

export class TeamEntity {

    private _teamId: number;
    private _teamName: string;
    private _teamAbbreviation: string;
    private _league: LeagueEntity;

    constructor(teamId: number, teamName: string, teamAbbreviation: string, league: LeagueEntity) {
        this._teamId = teamId;
        this._teamName = teamName;
        this._teamAbbreviation = teamAbbreviation;
        this._league = league;
    }

    public get teamId(): number {
        return this._teamId;
    }

    private set teamId(value: number) {
        this._teamId = value;
    }

    public get teamName(): string {
        return this._teamName;
    }

    private set teamName(value: string) {
        this._teamName = value;
    }

    public get teamAbbreviation(): string {
        return this._teamAbbreviation;
    }

    private set teamAbbreviation(value: string) {
        this._teamAbbreviation = value;
    }

    public get league(): LeagueEntity {
        return this._league;
    }

    private set league(value: LeagueEntity) {
        this._league = value;
    }

    toString(): string {
        return "Id:" + this.teamId + " name:" + this.teamName +
            " abbreviation:" + this.teamAbbreviation +
            " league: " + this.league.name;
    }

    equals(other: any): boolean {
        if (other == null) {
            return false;
        }

        if (!(other instanceof TeamEntity)) {
            return false;
        }

        return this.teamId == other.teamId && this.teamAbbreviation == other.teamAbbreviation &&
            this.teamName === other.teamName && this.league.equals(other.league);
    }

    toJSON(): any {
        return {
            teamId: this.teamId,
            name: this.teamName,
            abbreviation: this.teamAbbreviation,
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