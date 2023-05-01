import { SportEntity } from "src/model/sportEntity.model";

export class Sport {

    private sportEntity:SportEntity;

    constructor(sportEntity:SportEntity) {
        this.sportEntity = sportEntity;
    }

    getSportId() : number {
        return this.sportEntity.sportId;
    }

    getName() : string {
        return this.sportEntity.name;
    }
}