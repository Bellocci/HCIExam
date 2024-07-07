import { TeamEntity } from "src/model/teamEntity.model";


export class StandardOption {

    private _budget: number;    
    private _minAge: number;    
    private _maxAge: number;
    private _includeFavorite: boolean;
    private _includeBlacklist: boolean;    
    private _includeAdvancedFilter: boolean;
    private _selectedTeams: Set<TeamEntity>;    

    constructor() {
        this._budget = 250;
        this._minAge = 18;
        this._maxAge = 99;
        this._includeFavorite = false;
        this._includeBlacklist = false;
        this._includeAdvancedFilter = false;
        this._selectedTeams = new Set<TeamEntity>();
    }

    public get budget(): number {
        return this._budget;
    }

    public set budget(budget: number) {
        this._budget = budget;
    }

    public get minAge(): number {
        return this._minAge;
    }

    public set minAge(minAge: number) {
        this._minAge = minAge;
    }

    public get maxAge(): number {
        return this._maxAge;
    }

    public set maxAge(maxAge: number) {
        this._maxAge = maxAge;
    }

    public get includeFavorite(): boolean {
        return this._includeFavorite;
    }
    public set includeFavorite(includeFavorite: boolean) {
        this._includeFavorite = includeFavorite;
    }

    public get includeBlacklist(): boolean {
        return this._includeBlacklist;
    }

    public set includeBlacklist(includeBlacklist: boolean) {
        this._includeBlacklist = includeBlacklist;
    }

    public get includeAdvancedFilter(): boolean {
        return this._includeAdvancedFilter;
    }

    public set includeAdvancedFilter(includeAdvancedFilter: boolean) {
        this._includeAdvancedFilter = includeAdvancedFilter;
    }

    public get selectedTeams(): Set<TeamEntity> {
        return this._selectedTeams;
    }
    
    public set selectedTeams(selectedTeams: Set<TeamEntity>) {
        this._selectedTeams = selectedTeams;
    }
}