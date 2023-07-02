import { Team } from "../team.model";

export interface SimpleOption {

    budget:number,
    minAge:number,
    maxAge:number,
    includeFavorite:boolean,
    includeBlacklist:boolean,
    includeAdvancedFilter:boolean,
    selectedTeams:Set<Team>
}