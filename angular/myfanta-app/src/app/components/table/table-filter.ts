import { SportEnum } from "src/enum/SportEnum.model";
import { RolePlayerEntity } from "src/model/rolePlayerEntity.model";
import { TeamEntity } from "src/model/teamEntity.model";

export class TableFilterOption {

    private static readonly ROLE_MAP_DEFAULT_VALUE:Map<number,RolePlayerEntity> = new Map();
    private static readonly MATCH_PLAYED_PERC_DEFAULT_VALUE:number = 0;
    private static readonly TEAMS_MAP_DEFAULT_VALUE:Map<number, TeamEntity> = new Map();
    private static readonly PLAYER_NAME_DEFAULT_VALUE:string = "";

    private roleMap:Map<number,RolePlayerEntity>;
    private matchPlayedPerc:number;
    private teamsMap:Map<number,TeamEntity>;
    private playerName:string;

    constructor(playerName?:string, matchPlayedPerc?:number, 
        roleMap?:Map<number, RolePlayerEntity>, teamsMap?:Map<number, TeamEntity>) {

        this.playerName = playerName != undefined ? playerName : TableFilterOption.PLAYER_NAME_DEFAULT_VALUE;
        this.matchPlayedPerc = matchPlayedPerc != undefined ? matchPlayedPerc : TableFilterOption.MATCH_PLAYED_PERC_DEFAULT_VALUE;
        this.roleMap = roleMap != undefined ? roleMap : TableFilterOption.ROLE_MAP_DEFAULT_VALUE;
        this.teamsMap = teamsMap != undefined ? teamsMap : TableFilterOption.TEAMS_MAP_DEFAULT_VALUE;
    }

    getRoles() : RolePlayerEntity[] {
        return [... this.roleMap.values()];
    }

    updateRoles(role:RolePlayerEntity) : void {
        this.roleMap.has(role.roleId) ? this.roleMap.delete(role.roleId) : this.roleMap.set(role.roleId, role);
    }

    hasRole(role:RolePlayerEntity) : boolean {
        return this.roleMap.has(role.roleId);
    }

    getMatchPlayedPerc() : number {
        return this.matchPlayedPerc;
    }

    setMatchPlayedPerc(matchPlayedPerc:number) : void {
        this.matchPlayedPerc = matchPlayedPerc;
    }

    calculateMatchPlayedFilter(sport:SportEnum) : number {
        const totalMatch:number = SportEnum.visitAndReturn<number>(sport, {
            footballSoccer() {
                return 38;
            },

            volleyball() {
                return 0;
            },  

            basketball() {
                return 0;
            }
        });

        return Math.trunc((totalMatch * this.matchPlayedPerc) / 100);
    }

    getTeams() : TeamEntity[] {
        return [... this.teamsMap.values()];
    }

    hasTeams(team:TeamEntity) : boolean {
        return this.teamsMap.has(team.teamId);
    }

    updateTeams(team:TeamEntity) : void {
        this.teamsMap.has(team.teamId) ? this.teamsMap.delete(team.teamId) : this.teamsMap.set(team.teamId, team);
    }

    getPlayerName() : string {
        return this.playerName;
    }

    setPlayerName(playerName:string) : void {
        this.playerName = playerName;
    }

    clear() : void {
        this.roleMap = TableFilterOption.ROLE_MAP_DEFAULT_VALUE;
        this.matchPlayedPerc = TableFilterOption.MATCH_PLAYED_PERC_DEFAULT_VALUE;
        this.teamsMap = TableFilterOption.TEAMS_MAP_DEFAULT_VALUE;
        this.playerName = TableFilterOption.PLAYER_NAME_DEFAULT_VALUE;
    }

    toJSON() : any {
        return {
            playerName : this.playerName,
            matchPlayedPerc : this.matchPlayedPerc,
            teams : [... this.teamsMap.values()],
            roles : [... this.roleMap.values()]
        }
    }

    static fromJSON(json:any) : TableFilterOption {
        let rolesMap:Map<number, RolePlayerEntity> = new Map();
        for(let r of json.roles) {
            let role:RolePlayerEntity = RolePlayerEntity.fromJSON(r);
            rolesMap.set(role.roleId, role);
        }

        let teamsMap:Map<number, TeamEntity> = new Map();
        for(let t of json.teams) {
            let team:TeamEntity = TeamEntity.fromJSON(t);
            teamsMap.set(team.teamId, team);
        }

        return new TableFilterOption(json.playerName, json.matchPlayedPerc, rolesMap, teamsMap);
    }
}