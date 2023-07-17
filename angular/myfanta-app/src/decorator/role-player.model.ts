import { SportEnum } from "src/enum/SportEnum.model";
import { RolePlayerEntity } from "src/model/rolePlayerEntity.model";


export class RolePlayer {

    private entity:RolePlayerEntity;

    constructor(entity:RolePlayerEntity) {
        this.entity = entity;
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
}