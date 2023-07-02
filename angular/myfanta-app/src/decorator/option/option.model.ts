import { OptionEntity } from "src/model/optionEntity.model";
import { Team } from "../team.model";
import { SportEnum } from "src/enum/SportEnum.model";
import { Player } from "../player.model";


export abstract class Option extends OptionEntity {

    protected entity!:OptionEntity;

    constructor(entity:OptionEntity) {
        super();
        this.entity = entity;
    }

    override getSport(): SportEnum {
        return this.entity.getSport();
    }

    override getMinAge(): number {
        return this.entity.getMinAge();
    }

    override setMinAge(minAge: number): void {
        this.entity.setMinAge(minAge);
    }

    override getMaxAge(): number {
        return this.entity.getMaxAge();
    }

    override setMaxAge(maxAge: number): void {
        this.entity.setMaxAge(maxAge);
    }

    override getMaxCredit(): number {
        return this.entity.getMaxCredit();
    }

    override setMaxCredit(credit: number): void {
        this.entity.setMaxCredit(credit);
    }

    abstract override getTeamsList(): Team[];

    abstract addTeamToList(team:Team): boolean;

    abstract removeTeamFromList(team:Team) : boolean;

    abstract override getPlayersToInclude(): Player[];

    abstract addPlayerToInclude(player:Player) : boolean;

    abstract removePlayerToInclude(player:Player) : boolean;

    abstract override getPlayersToExclude(): Player[];

    abstract addPlayerToExclude(player:Player) : boolean;

    abstract removePlayerToExlude(player:Player) : boolean;

    isNewEntity() : boolean {
        return this.entity.getId() == -1;
    }
}