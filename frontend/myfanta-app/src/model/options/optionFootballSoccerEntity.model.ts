import { OptionEntity } from "./optionEntity.model";
import { SportEnum } from "src/enum/SportEnum.model";
import { TeamEntity } from "../teamEntity.model";
import { PlayerEntity } from "../playerEntity.model";

export class OptionFootballSoccerEntity extends OptionEntity {
    
    private _budgetGoalkeeper: number;
    private _budgetDefender: number;
    private _budgetMidfielder: number;
    private _budgetStraikers: number;
    private _averageGoal: number;
    private _averageAssist: number;
    private _averageMatchPlayed: number;
    private _averageYellowCard: number;
    private _averageRedCard: number;

    private _isBudgetCustomisedByRoles: boolean;

    constructor(id?: string) {
        super(SportEnum.FOOTBALL_SOCCER, id);
        this._isBudgetCustomisedByRoles = false;
        this._budgetGoalkeeper = 0;
        this._budgetDefender = 0;
        this._budgetMidfielder = 0;
        this._budgetStraikers = 0;
        this._averageGoal = 0;
        this._averageAssist = 0;
        this._averageMatchPlayed = 0;
        this._averageYellowCard = 0;
        this._averageRedCard = 0;
    }

    public get isBudgetCustomisedByRoles(): boolean {
        return this._isBudgetCustomisedByRoles;
    }

    public set isBudgetCustomisedByRoles(value: boolean) {
        this._isBudgetCustomisedByRoles = value;
    }

    public get budgetGoalkeeper(): number {
        return this._budgetGoalkeeper;
    }

    public set budgetGoalkeeper(value: number) {
        this._budgetGoalkeeper = value;
    }

    public get budgetDefender(): number {
        return this._budgetDefender;
    }

    public set budgetDefender(value: number) {
        this._budgetDefender = value;
    }

    public get budgetMidfielder(): number {
        return this._budgetMidfielder;
    }

    public set budgetMidfielder(value: number) {
        this._budgetMidfielder = value;
    }

    public get budgetStraikers(): number {
        return this._budgetStraikers;
    }

    public set budgetStraikers(value: number) {
        this._budgetStraikers = value;
    }

    public get averageGoal(): number {
        return this._averageGoal;
    }

    public set averageGoal(value: number) {
        this._averageGoal = value;
    }

    public get averageAssist(): number {
        return this._averageAssist;
    }

    public set averageAssist(value: number) {
        this._averageAssist = value;
    }

    public get averageMatchPlayed(): number {
        return this._averageMatchPlayed;
    }

    public set averageMatchPlayed(value: number) {
        this._averageMatchPlayed = value;
    }

    public get averageYellowCard(): number {
        return this._averageYellowCard;
    }

    public set averageYellowCard(value: number) {
        this._averageYellowCard = value;
    }

    public get averageRedCard(): number {
        return this._averageRedCard;
    }

    public set averageRedCard(value: number) {
        this._averageRedCard = value;
    }

    public calculateTotalBudgetByRoles(): number {
        return this.budgetGoalkeeper + this.budgetDefender + this.budgetMidfielder + this.budgetStraikers;
    }

    override toString(): string {
        return "Sport: " + this.sport.description + "Budget: " + this.budget + ", minAge: " + this.minAge + ", maxAge:" + this.maxAge +
            ", team:" + this.teamsList.toString() + ", playersToInclude: " + this.playersToInclude.toString() +
            ", playerToExclude: " + this.playersToExclude.toString() + ", customBudgetByRoles: " + this.isBudgetCustomisedByRoles +
            ", budgetGoalkeeper: " + this.budgetGoalkeeper + ", budgetDefender: " + this.budgetDefender +
            ", budgetMidfielder: " + this.budgetMidfielder + ", budgetStraikers: " + this.budgetStraikers;
    }

    override toJSON(): any {
        let jsonTeamList: any[] = [];
        this.teamsList.forEach(t => jsonTeamList.push(t.toJSON()));

        let jsonIncludePlayerList: any[] = [];
        this.playersToInclude.forEach(p => jsonIncludePlayerList.push(p.toJSON()));

        let jsonExcludePlayerList: any[] = [];
        this.playersToExclude.forEach(p => jsonExcludePlayerList.push(p.toJSON()));

        return {
            optionId: this.optionId,
            sport: SportEnum.FOOTBALL_SOCCER.toJSON(),
            budget: this.budget,
            minAge: this.minAge,
            maxAge: this.maxAge,
            teamsList: jsonTeamList,
            playersToInclude: jsonIncludePlayerList,
            playersToExclude: jsonExcludePlayerList,
            isCustomBudgetByRoles: this.isBudgetCustomisedByRoles,
            budgetGoalkeeper: this.budgetGoalkeeper,
            budgetDefender: this.budgetDefender,
            budgetMidfielder: this.budgetMidfielder,
            budgetStraikers: this.budgetStraikers,
            averageGoal: this.averageGoal,
            averageAssist: this.averageAssist,
            averageMatchPlayed: this.averageMatchPlayed,
            averageYellowCard: this.averageYellowCard,
            averageRedCard: this.averageRedCard
        }
    }

    static override fromJSON(json: any): OptionFootballSoccerEntity {
        let entity: OptionFootballSoccerEntity = new OptionFootballSoccerEntity(json.optionId);
        entity.budget = json.budget;
        entity.minAge = json.minAge;
        entity.maxAge = json.maxAge;
        entity.isBudgetCustomisedByRoles = json.isCustomBudgetByRoles;
        entity.budgetGoalkeeper = json.budgetGoalkeeper;
        entity._budgetDefender = json.budgetDefender;
        entity.budgetMidfielder = json.budgetMidfielder;
        entity.budgetStraikers = json.budgetStraikers;
        entity.averageGoal = json.averageGoal;
        entity.averageAssist = json.averageAssist;
        entity.averageMatchPlayed = json.averageMatchPlayed;
        entity.averageYellowCard = json.averageYellowCard;
        entity.averageRedCard = json._averageRedCard;
        json.teamsList.forEach((t: TeamEntity) => entity.teamsList.push(PlayerEntity.fromJSON(t)));
        json.playersToInclude.forEach((p: PlayerEntity) => entity.playersToInclude.push(PlayerEntity.fromJSON(p)));
        json.playersToExclude.forEach((p: PlayerEntity) => entity.playersToInclude.push(PlayerEntity.fromJSON(p)));

        return entity;
    }    
}