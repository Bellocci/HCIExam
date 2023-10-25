import { SportEnum } from "src/enum/SportEnum.model";
import { OptionEntity } from "./optionEntity.model";
import { PlayerEntity } from "../playerEntity.model";
import { TeamEntity } from "../teamEntity.model";

export class OptionsVolleyballEntity extends OptionEntity {

    // Parametro non rilevate per la creazione del team, non viene passato al backend
    // utilizzato solo per sapere se considerare il budget dei giocatori 
    private _isBudgetCustomisedByRoles: boolean;    
    private _budgetHitterSpiker: number;
    private _budgetMiddleBlocker: number;
    private _budgetSetter: number;
    private _budgetOppositeSpiker: number;
    private _budgetLibero: number;
    // Parametro non rilevate per la creazione del team, non viene passato al backend
    // utilizzato solo per sapere se considerare i parametri per la media della squadra 
    private _isVolleyballTeamOptionEnabled: boolean;    
    private _avgAttackPointsScored: number;    
    private _avgBlockPointsScored: number;
    private _avgAcePointsScored: number;
    private _avgPerfectReceive: number;
    private _avgAttackErrors: number;
    private _avgBlock: number;
    private _avgServiceErrors: number;
    private _avgReceiveErrors: number;

    constructor(id?: string, active?: boolean) {
        super(SportEnum.VOLLEYBALL, id, active);
        this._isBudgetCustomisedByRoles = false;
        this._budgetHitterSpiker = 0;
        this._budgetMiddleBlocker = 0;
        this._budgetSetter = 0;
        this._budgetOppositeSpiker = 0;
        this._budgetLibero = 0;
        this._isVolleyballTeamOptionEnabled = false;
        this._avgAttackPointsScored = 0;
        this._avgBlockPointsScored = 0;
        this._avgBlockPointsScored = 0;
        this._avgAcePointsScored = 0;
        this._avgPerfectReceive = 0;
        this._avgAttackErrors = 0;
        this._avgBlock = 0;
        this._avgServiceErrors = 0;
        this._avgReceiveErrors = 0;
    }

    public get isBudgetCustomisedByRoles(): boolean {
        return this._isBudgetCustomisedByRoles;
    }

    public set isBudgetCustomisedByRoles(value: boolean) {
        this._isBudgetCustomisedByRoles = value;
    }

    public get budgetHitterSpiker(): number {
        return this._budgetHitterSpiker;
    }

    public set budgetHitterSpiker(value: number) {
        this._budgetHitterSpiker = value;
    }

    public get budgetMiddleBlocker(): number {
        return this._budgetMiddleBlocker;
    }

    public set budgetMiddleBlocker(value: number) {
        this._budgetMiddleBlocker = value;
    }

    public get budgetSetter(): number {
        return this._budgetSetter;
    }

    public set budgetSetter(value: number) {
        this._budgetSetter = value;
    }

    public get budgetOppositeSpiker(): number {
        return this._budgetOppositeSpiker;
    }

    public set budgetOppositeSpiker(value: number) {
        this._budgetOppositeSpiker = value;
    }

    public get budgetLibero(): number {
        return this._budgetLibero;
    }

    public set budgetLibero(value: number) {
        this._budgetLibero = value;
    }

    public get isVolleyballTeamOptionEnabled(): boolean {
        return this._isVolleyballTeamOptionEnabled;
    }
    
    public set isVolleyballTeamOptionEnabled(value: boolean) {
        this._isVolleyballTeamOptionEnabled = value;
    }

    public get avgAttackPointsScored(): number {
        return this._avgAttackPointsScored;
    }
    
    public set avgAttackPointsScored(value: number) {
        this._avgAttackPointsScored = value;
    }

    public get avgBlockPointsScored(): number {
        return this._avgBlockPointsScored;
    }

    public set avgBlockPointsScored(value: number) {
        this._avgBlockPointsScored = value;
    }

    public get avgAcePointsScored(): number {
        return this._avgAcePointsScored;
    }
    
    public set avgAcePointsScored(value: number) {
        this._avgAcePointsScored = value;
    }

    public get avgPerfectReceive(): number {
        return this._avgPerfectReceive;
    }

    public set avgPerfectReceive(value: number) {
        this._avgPerfectReceive = value;
    }

    public get avgAttackErrors(): number {
        return this._avgAttackErrors;
    }

    public set avgAttackErrors(value: number) {
        this._avgAttackErrors = value;
    }

    public get avgBlock(): number {
        return this._avgBlock;
    }

    public set avgBlock(value: number) {
        this._avgBlock = value;
    }

    public get avgServiceErrors(): number {
        return this._avgServiceErrors;
    }

    public set avgServiceErrors(value: number) {
        this._avgServiceErrors = value;
    }
    
    public get avgReceiveErrors(): number {
        return this._avgReceiveErrors;
    }
    
    public set avgReceiveErrors(value: number) {
        this._avgReceiveErrors = value;
    }

    public calculateTotalBudgetByRoles(): number {
        return this.budgetHitterSpiker + this._budgetMiddleBlocker + this.budgetOppositeSpiker +
            this._budgetSetter + this._budgetLibero;
    }

    override toString() : string {
        return "Sport: " + this.sport.description + "Budget: " + this.budget + ", minAge: " + this.minAge + ", maxAge:" + this.maxAge +
        ", team:" + this.teamsList.toString() + ", playersToInclude: " + this.playersToInclude.toString() +
        ", playerToExclude: " + this.playersToExclude.toString() + ", budgetHitterSpiker: " + this.budgetHitterSpiker + 
        ", budgetMiddleBlocker: " + this.budgetMiddleBlocker + ", budgetSetter: " + this.budgetSetter + 
        ", budgetOppositeSpiker: " + this.budgetOppositeSpiker + ", budgetLibero: " + this.budgetLibero;
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
            active: this.active,
            budgetHitterSpiker: this.budgetHitterSpiker,
            budgetMiddleBlocker: this.budgetMiddleBlocker,
            budgetSetter: this.budgetSetter,
            budgetOppositeSpiker: this.budgetOppositeSpiker,
            budgetLibero: this.budgetLibero,
            avgAttackPointsScored: this.avgAttackPointsScored,
            avgBlockPointsScored: this.avgBlockPointsScored,
            avgAcePointsScored: this.avgAcePointsScored,
            avgPerfectReceive: this.avgPerfectReceive,
            avgAttackErrors: this.avgAttackErrors,
            avgBlock: this.avgBlock,
            avgServiceErrors: this.avgServiceErrors,
            avgReceiveErrors: this.avgReceiveErrors
        }
    }

    static override fromJSON(json: any): OptionsVolleyballEntity {
        let entity:OptionsVolleyballEntity = new OptionsVolleyballEntity(json.id, json.active);
        entity.budget = json.budget;
        entity.minAge = json.minAge;
        entity.maxAge = json.maxAge;
        entity.isBudgetCustomisedByRoles = true;
        entity.budgetHitterSpiker = json.budgetHitterSpiker;
        entity.budgetMiddleBlocker = json.budgetMiddleBlocker;
        entity.budgetSetter = json.budgetSetter;
        entity.budgetOppositeSpiker = json.budgetOppositeSpiker;
        entity.budgetLibero = json.budgetLibero;
        entity.isVolleyballTeamOptionEnabled = true;
        entity.avgAttackPointsScored = json.avgAttackPointsScored;
        entity.avgBlockPointsScored = json.avgBlockPointsScored;
        entity.avgAcePointsScored = json.avgAcePointsScored;
        entity.avgPerfectReceive = json.avgPerfectReceive;
        entity.avgAttackErrors = json.avgAttackErrors;
        entity.avgBlock = json.avgBlock;
        entity.avgServiceErrors = json.avgServiceErrors;
        entity.avgReceiveErrors = json.avgReceiveErrors;
        json.teamsList.forEach((t: TeamEntity) => entity.teamsList.push(TeamEntity.fromJSON(t)));
        json.playersToInclude.forEach((p: PlayerEntity) => entity.playersToInclude.push(PlayerEntity.fromJSON(p)));
        json.playersToExclude.forEach((p: PlayerEntity) => entity.playersToInclude.push(PlayerEntity.fromJSON(p)));

        return entity;
    }
}