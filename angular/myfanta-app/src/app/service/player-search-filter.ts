import { StandardMatchPlayedEnum } from "src/enum/optionEnum/StandardMatchPlayedEnum";
import { LeagueEntity } from "src/model/leagueEntity.model";
import { RolePlayerEntity } from "src/model/rolePlayerEntity.model";
import { TeamEntity } from "src/model/teamEntity.model";

export class PlayerSearchFilter {

    /*
     * ==========
     * ATTRIBUTI 
     * ==========
     */

    private _name: string = "";    
    private _teamsList: TeamEntity[] = [];    
    private _rolesList: RolePlayerEntity[] = [];
    private _matchPlayed: number = -1;
    private _matchPlayedPerc:StandardMatchPlayedEnum = StandardMatchPlayedEnum.ALL_PLAYERS;    
    private _league!: LeagueEntity;
    
    /*
     * ============
     * COSTRUTTORE
     * ============
     */

    constructor() { }

    /*
     * ================
     * GETTER & SETTER 
     * ================
     */
    
    public get league(): LeagueEntity {
        return this._league;
    }

    public set league(value: LeagueEntity) {
        this._league = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value.trim().toLowerCase();
    }

    public get teamsList(): TeamEntity[] {
        return this._teamsList;
    }

    private set teamsList(value: TeamEntity[]) {
        this._teamsList = value;
    }

    public addTeam(team:TeamEntity) : boolean {
        let added:boolean = this.teamsList.find(t => t.equals(team)) == undefined;
        if(added) {
            this.teamsList.push(team);
        }

        return added;
    }

    public removeTeam(team:TeamEntity) : boolean {
        let removed:boolean = false;
        let index:number = this.teamsList.findIndex(t => t.equals(team));
        if(index != -1) {
            this.teamsList.splice(index, 1);
            removed = true;
        }

        return removed;
    }

    public addOrRemoveTeam(team : TeamEntity) : boolean {
        return this.teamsList.find(t => t.equals(team)) == undefined ? this.addTeam(team) : this.removeTeam(team);
    }

    public get rolesList(): RolePlayerEntity[] {
        return this._rolesList;
    }

    private set rolesList(value: RolePlayerEntity[]) {
        this._rolesList = value;
    }

    public addRole(role:RolePlayerEntity) : boolean {
        let added:boolean = this.rolesList.find(r => r.equals(role)) == undefined;
        if(added) {
            this.rolesList.push(role);
        }

        return added;
    }

    public removeRole(role:RolePlayerEntity) : boolean {
        let removed:boolean = false;
        let index:number = this.rolesList.findIndex(r => r.equals(role));
        if(index != -1) {
            this.rolesList.splice(index, 1);
            removed = true;
        }

        return removed;
    }

    public addOrRemoveRole(role:RolePlayerEntity) : boolean {
        return this.rolesList.find(r => r.equals(role)) == undefined ? this.addRole(role) : this.removeRole(role);
    }

    public get matchPlayed(): number {
        return this._matchPlayed;
    }

    public set matchPlayed(value: number) {
        this._matchPlayed = value;
    }

    public get matchPlayedPerc(): StandardMatchPlayedEnum {
        return this._matchPlayedPerc;
    }

    public set matchPlayedPerc(value: StandardMatchPlayedEnum) {
        this._matchPlayedPerc = value;
    }

    /*
     * ===================
     * METODI DI UTILITA'
     * ===================
     */

    public clearSearchFilter() : void {
        this.name = "";
        this.matchPlayed = -1;
        this.rolesList = [];
        this.teamsList = [];
        this.matchPlayedPerc = StandardMatchPlayedEnum.ALL_PLAYERS;
    }
}