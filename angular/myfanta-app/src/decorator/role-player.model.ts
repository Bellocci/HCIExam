import { SportEnum } from "src/enum/SportEnum.model";
import { RolePlayerEntity } from "src/model/rolePlayerEntity.model";


export class RolePlayer {

    private entity:RolePlayerEntity;

    constructor(entity:RolePlayerEntity) {
        this.entity = entity;
    }

    getId() : number {
        return this.entity.id;
    }

    getDescription() : string {
        return this.entity.description;
    }

    getShortDescription() : string {
        return this.entity.shortDescription;
    }

    getSport() : SportEnum {
        return this.entity.sport;
    }

    isActive() : boolean {
        return this.entity.active;
    }

    setActive(active:boolean) : void {
        this.entity.active = active;
    }

    toJSON() : any {
        return {
            id : this.entity.id,
            description : this.entity.description,
            shortDescription : this.entity.shortDescription,
            sport : this.entity.sport.toJSON(),
            active : this.entity.active
        }
    }

    static fromJSON(json:any) : RolePlayer {
        return new RolePlayer(
            new RolePlayerEntity(json.id, json.description, json.shortDescription, SportEnum.fromJSON(json.sport), json.active));
    }
}