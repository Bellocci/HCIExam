import { TEAM_DATA, TeamEntity } from "./teamEntity.model";
import { ROLE_PLAYER_DATA, RolePlayerEntity } from "./rolePlayerEntity.model";

export class PlayerEntity {

    private _playerId: number;
    private _playerName: string;
    private _team: TeamEntity;    
    private _cost: number;    
    private _role: RolePlayerEntity;    
    private _age: number;
    private _matchPlayed: number;    
    private _description: string;
    private _averageRating: number;    
    private _fantaMarketValue: number;    

    constructor(playerId: number, playerName: string, team: TeamEntity, cost: number, role: RolePlayerEntity,
        age: number,matchPlayed: number, description: string) {
        
        this._playerId = playerId
        this._playerName = playerName
        this._team = team
        this._cost = cost
        this._role = role
        this._age = age
        this._matchPlayed = matchPlayed
        this._description = description
        this._averageRating = 0;
        this._fantaMarketValue = 0;
    }

    public get playerId(): number {
        return this._playerId;
    }

    private set playerId(value: number) {
        this._playerId = value;
    }

    public get playerName(): string {
        return this._playerName;
    }

    private set playerName(value: string) {
        this._playerName = value;
    }

    public get team(): TeamEntity {
        return this._team;
    }

    private set team(value: TeamEntity) {
        this._team = value;
    }

    public get cost(): number {
        return this._cost;
    }

    private set cost(value: number) {
        this._cost = value;
    }

    public get role(): RolePlayerEntity {
        return this._role;
    }

    private set role(value: RolePlayerEntity) {
        this._role = value;
    }

    public get age(): number {
        return this._age;
    }

    private set age(value: number) {
        this._age = value;
    }

    public get matchPlayed(): number {
        return this._matchPlayed;
    }

    private set matchPlayed(value: number) {
        this._matchPlayed = value;
    }

    public get description(): string {
        return this._description;
    }

    private set description(value: string) {
        this._description = value;
    }

    public get fantaMarketValue(): number {
        return this._fantaMarketValue;
    }

    public set fantaMarketValue(value: number) {
        this._fantaMarketValue = value;
    }

    public get averageRating(): number {
        return this._averageRating;
    }

    public set averageRating(value: number) {
        this._averageRating = value;
    }

    toString() : string {
        return "Name: " + this.playerName + " Team: " + this.team.teamName + " Role: " + this.role.description;
    }

    equals(other:any) {
        if(other == null) {
            return false;
        }

        if(!(other instanceof PlayerEntity)) {
            return false;
        }

        return this.playerId == other.playerId &&
            this.playerName == other.playerName && this.role == other.role &&
            this.age == other.age && this.cost == other.cost && 
            this.matchPlayed == other.matchPlayed;
    }

    toJSON() : any {
        return {
            playerId: this.playerId,
            playerName : this.playerName,
            team : this.team.toJSON(),
            cost : this.cost,
            role : this.role.toJSON(),
            age : this.age,
            matchPlayed : this.matchPlayed,
            description : this.description,
        }
    }

    static fromJSON(json:any) : PlayerEntity {
        return new PlayerEntity(json.playerId, json.playerName, TeamEntity.fromJSON(json.team),
            json.cost, RolePlayerEntity.fromJSON(json.role), json.age, json.matchPlayed, 
            json.description);
    }
}

const description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const PLAYER_DATA_SERIE_A: PlayerEntity[] = [
    new PlayerEntity(1, "Musso", TEAM_DATA[0], 12, ROLE_PLAYER_DATA[0], 27, 34, description),
    new PlayerEntity(2, "Toloi", TEAM_DATA[0], 8, ROLE_PLAYER_DATA[1], 31, 16, description),
    new PlayerEntity(3, "Malinovskyi", TEAM_DATA[0], 22, ROLE_PLAYER_DATA[2], 28, 22, description),
    new PlayerEntity(4, "Pasalic", TEAM_DATA[0], 28, ROLE_PLAYER_DATA[2], 27, 24, description),
    new PlayerEntity(5, "Arnautovic", TEAM_DATA[1], 24, ROLE_PLAYER_DATA[3], 32, 23, description),
    new PlayerEntity(6, "De Silvestri", TEAM_DATA[1], 14, ROLE_PLAYER_DATA[1], 33, 23, description),
    new PlayerEntity(7, "Soriano", TEAM_DATA[1], 10, ROLE_PLAYER_DATA[2], 31, 25, description),
    new PlayerEntity(8, "Skorupski", TEAM_DATA[1], 10, ROLE_PLAYER_DATA[0], 30, 27, description),
    new PlayerEntity(9, "Theate", TEAM_DATA[1], 12, ROLE_PLAYER_DATA[1], 21, 22, description),
    new PlayerEntity(10, "Orsolini", TEAM_DATA[1], 18, ROLE_PLAYER_DATA[2], 25, 18, description),
    new PlayerEntity(11, "Muriel", TEAM_DATA[0], 23, ROLE_PLAYER_DATA[3], 30, 16, description),
    new PlayerEntity(12, "Zapata", TEAM_DATA[0], 34, ROLE_PLAYER_DATA[3], 30, 17, description),
    new PlayerEntity(13, "Zappacosta", TEAM_DATA[0], 13, ROLE_PLAYER_DATA[1], 29, 21, description),
    new PlayerEntity(14, "De Roon", TEAM_DATA[0], 8, ROLE_PLAYER_DATA[2], 30, 21, description),
    new PlayerEntity(15, "Boga", TEAM_DATA[0], 8, ROLE_PLAYER_DATA[3], 25, 16, description),    
]

export const PLAYER_DATA_PREMIER_LEAGUE: PlayerEntity[] = [
    new PlayerEntity(16, "Ramsdale", TEAM_DATA[2], 17, ROLE_PLAYER_DATA[0], 24, 19, description),
    new PlayerEntity(17, "Gabriel", TEAM_DATA[2], 14, ROLE_PLAYER_DATA[1], 25, 19, description),
    new PlayerEntity(18, "Thomas", TEAM_DATA[2], 14, ROLE_PLAYER_DATA[2], 29, 17, description),
    new PlayerEntity(19, "Watkins", TEAM_DATA[3], 15, ROLE_PLAYER_DATA[3], 27, 20, description),
    new PlayerEntity(20, "Traorè", TEAM_DATA[3], 3, ROLE_PLAYER_DATA[3], 27, 2, description),    
]

export const PLAYER_DATA_NBA: PlayerEntity[] = [
    new PlayerEntity(26, "Lebron", TEAM_DATA[5], 15, ROLE_PLAYER_DATA[13], 29, 20, description),
    new PlayerEntity(27, "Russell", TEAM_DATA[5], 19.5, ROLE_PLAYER_DATA[10], 32, 16, description),
    new PlayerEntity(28, "Talen", TEAM_DATA[5], 8.5, ROLE_PLAYER_DATA[10], 22, 7, description),
    new PlayerEntity(29, "Carmelo", TEAM_DATA[5], 8.0, ROLE_PLAYER_DATA[11], 38, 15, description)
]