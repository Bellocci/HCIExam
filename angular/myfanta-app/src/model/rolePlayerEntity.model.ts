import { SportEnum } from "src/enum/SportEnum.model";
export class RolePlayerEntity {

    private _roleId: number; 
    private _description: string;    
    private _shortDescription: string;
    private _sport: SportEnum;    

    constructor(roleId:number, description:string, shortDescription:string, sport:SportEnum) {
        this._roleId = roleId;
        this._description = description;
        this._shortDescription = shortDescription;
        this._sport = sport;
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

    toJSON() : any {
        return {
            roleId : this.roleId,
            description : this.description,
            shortDescription : this.shortDescription,
            sport : this.sport.toJSON(),
        }
    }

    static fromJSON(json:any) : RolePlayerEntity {
        return new RolePlayerEntity(json.roleId, json.description, json.shortDescription, 
            SportEnum.fromJSON(json.sport));
    }

    equals(other:any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof RolePlayerEntity)) {
            return false;
        }

        return this.roleId == other.roleId && this.description == other.description && this.sport.code == other.sport.code;
    }
}

export const ROLE_PLAYER_DATA:RolePlayerEntity[] = [
    // CALCIO
    new RolePlayerEntity(1, "Portiere", "POR", SportEnum.FOOTBALL_SOCCER),
    new RolePlayerEntity(2, "Difensore", "DIF", SportEnum.FOOTBALL_SOCCER),
    new RolePlayerEntity(3, "Centrocampista", "CEN", SportEnum.FOOTBALL_SOCCER),
    new RolePlayerEntity(4, "Attaccante", "ATT", SportEnum.FOOTBALL_SOCCER),

    // PALLAVOLO
    new RolePlayerEntity(5, "Palleggiatore", "PAL", SportEnum.VOLLEYBALL),
    new RolePlayerEntity(6, "Schiacciatore", "SCH", SportEnum.VOLLEYBALL),
    new RolePlayerEntity(7, "Opposto", "OPP", SportEnum.VOLLEYBALL),
    new RolePlayerEntity(8, "Libero", "LIB", SportEnum.VOLLEYBALL),
    new RolePlayerEntity(9, "Centrale", "CEN", SportEnum.VOLLEYBALL),
    
    // BASKET
    new RolePlayerEntity(10, "Playmaker", "PG", SportEnum.BASKETBALL),
    new RolePlayerEntity(11, "Guardia", "SG", SportEnum.BASKETBALL),
    new RolePlayerEntity(12, "Ala piccola", "SF", SportEnum.BASKETBALL),
    new RolePlayerEntity(13, "Ala grande", "PF", SportEnum.BASKETBALL),
    new RolePlayerEntity(14, "Centro", "C", SportEnum.BASKETBALL),
]