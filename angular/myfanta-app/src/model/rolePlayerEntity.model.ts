import { SportEnum } from "src/enum/SportEnum.model";
import { LEAGUE_DATA, LeagueEntity } from "./leagueEntity.model";


export class RolePlayerEntity {
    private _roleId: number;    
    private _description: string;    
    private _shortDescription: string;    
    private _sport: SportEnum;    
    private _active: boolean;    

    constructor(roleId:number, description:string, shortDescription:string, sport:SportEnum, active:boolean) {
        this._roleId = roleId;
        this._description = description;
        this._shortDescription = shortDescription;
        this._sport = sport;
        this._active = active;
    }

    public get roleId(): number {
        return this._roleId;
    }

    private set roleId(value: number) {
        this._roleId = value;
    }

    public get description(): string {
        return this._description;
    }

    private set description(value: string) {
        this._description = value;
    }

    public get shortDescription(): string {
        return this._shortDescription;
    }

    private set shortDescription(value: string) {
        this._shortDescription = value;
    }

    public get sport(): SportEnum {
        return this._sport;
    }

    private set sport(value: SportEnum) {
        this._sport = value;
    }

    public get active(): boolean {
        return this._active;
    }

    private set active(value: boolean) {
        this._active = value;
    }

    toJSON() : any {
        return {
            roleId : this.roleId,
            description : this.description,
            shortDescription : this.shortDescription,
            sport : this.sport.toJSON(),
            active : this.active
        }
    }

    static fromJSON(json:any) : RolePlayerEntity {
        return new RolePlayerEntity(json.roleId, json.description, json.shortDescription, 
            SportEnum.fromJSON(json.sport), json.active);
    }
}

export const ROLE_PLAYER_DATA:RolePlayerEntity[] = [
    // CALCIO
    new RolePlayerEntity(1, "Portiere", "P", SportEnum.FOOTBALL_SOCCER, true),
    new RolePlayerEntity(2, "Difensore", "D", SportEnum.FOOTBALL_SOCCER, true),
    new RolePlayerEntity(3, "Centrocampista", "C", SportEnum.FOOTBALL_SOCCER, true),
    new RolePlayerEntity(4, "Attaccante", "A", SportEnum.FOOTBALL_SOCCER, true),

    // PALLAVOLO
    new RolePlayerEntity(5, "Palleggiatore", "P", SportEnum.VOLLEYBALL, true),
    new RolePlayerEntity(6, "Schiacciatore", "S", SportEnum.VOLLEYBALL, true),
    new RolePlayerEntity(7, "Opposto", "O", SportEnum.VOLLEYBALL, true),
    new RolePlayerEntity(8, "Libero", "L", SportEnum.VOLLEYBALL, true),
    new RolePlayerEntity(9, "Centrale", "C", SportEnum.VOLLEYBALL, true),
    
    // BASKET
    new RolePlayerEntity(10, "Playmaker", "PG", SportEnum.BASKETBALL, true),
    new RolePlayerEntity(11, "Guardia", "SG", SportEnum.BASKETBALL, true),
    new RolePlayerEntity(12, "Ala piccola", "SF", SportEnum.BASKETBALL, true),
    new RolePlayerEntity(13, "Ala grande", "PF", SportEnum.BASKETBALL, true),
    new RolePlayerEntity(14, "Centro", "C", SportEnum.BASKETBALL, true),
]