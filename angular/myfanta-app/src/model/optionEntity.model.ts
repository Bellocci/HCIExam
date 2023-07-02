import { Player } from "src/decorator/player.model";
import { Team } from "src/decorator/team.model";
import { SportEnum } from "src/enum/SportEnum.model";

export class OptionEntity {

    private optionId!:number;
    private minAge!:number;
    private maxAge!:number;
    private maxCredit!:number;
    private teamsList:Team[] = [];
    private sport!:SportEnum;
    private playersToInclude:Player[] = [];
    private playersToExclude:Player[] = [];

    constructor() {
        this.optionId = -1;
    }

    getId() : number {
        return this.optionId;
    }

    getMinAge() : number {
        return this.minAge;
    }

    setMinAge(minAge:number) : void {
        this.minAge = minAge;
    }

    getMaxAge() : number {
        return this.maxAge;
    }

    setMaxAge(maxAge:number) : void {
        this.maxAge = maxAge;
    }

    getMaxCredit() : number {
        return this.maxCredit;
    }

    setMaxCredit(credit:number) {
        this.maxCredit = credit;
    }

    getTeamsList() : Team[] {
        return this.teamsList;
    }

    setTeamsList(teamsList:Team[]) : void {
        this.teamsList = teamsList;
    }

    getSport() : SportEnum {
        return this.sport;
    }

    setSport(sport:SportEnum) : void {
        this.sport = sport;
    }

    getPlayersToInclude() : Player[] {
        return this.playersToInclude;
    } 

    setPlayersToInclude(playersList:Player[]) : void {
        this.playersToInclude = playersList;
    }

    getPlayersToExclude() : Player[] {
        return this.playersToExclude
    }

    setPlayersToExclude(playersList:Player[]) : void {
        this.playersToExclude = playersList;
    }
}