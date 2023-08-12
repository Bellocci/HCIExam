import { RolePlayer } from "src/decorator/role-player.model";
import { Team } from "src/decorator/team.model";
import { SportEnum } from "src/enum/SportEnum.model";
import { OptionFootballSoccerEnum } from "src/enum/optionEnum/OptionFootballSoccerEnum.model";

export class TableFilterOption {

    private static readonly ROLE_MAP_DEFAULT_VALUE:Map<number,RolePlayer> = new Map();
    private static readonly MATCH_PLAYED_PERC_DEFAULT_VALUE:number = 0;
    private static readonly TEAMS_MAP_DEFAULT_VALUE:Map<number, Team> = new Map();
    private static readonly PLAYER_NAME_DEFAULT_VALUE:string = "";

    private roleMap:Map<number,RolePlayer>;
    private matchPlayedPerc:number;
    private teamsMap:Map<number,Team>;
    private playerName:string;

    constructor(playerName?:string, matchPlayedPerc?:number, 
        roleMap?:Map<number, RolePlayer>, teamsMap?:Map<number, Team>) {

        this.playerName = playerName != undefined ? playerName : TableFilterOption.PLAYER_NAME_DEFAULT_VALUE;
        this.matchPlayedPerc = matchPlayedPerc != undefined ? matchPlayedPerc : TableFilterOption.MATCH_PLAYED_PERC_DEFAULT_VALUE;
        this.roleMap = roleMap != undefined ? roleMap : TableFilterOption.ROLE_MAP_DEFAULT_VALUE;
        this.teamsMap = teamsMap != undefined ? teamsMap : TableFilterOption.TEAMS_MAP_DEFAULT_VALUE;
    }

    getRoles() : RolePlayer[] {
        return [... this.roleMap.values()];
    }

    updateRoles(role:RolePlayer) : void {
        this.roleMap.has(role.getId()) ? this.roleMap.delete(role.getId()) : this.roleMap.set(role.getId(), role);
    }

    hasRole(role:RolePlayer) : boolean {
        return this.roleMap.has(role.getId());
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
                return OptionFootballSoccerEnum.TOTAL_MATCH.value as number;
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

    getTeams() : Team[] {
        return [... this.teamsMap.values()];
    }

    hasTeams(team:Team) : boolean {
        return this.teamsMap.has(team.getId());
    }

    updateTeams(team:Team) : void {
        this.teamsMap.has(team.getId()) ? this.teamsMap.delete(team.getId()) : this.teamsMap.set(team.getId(), team);
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
        let rolesMap:Map<number, RolePlayer> = new Map();
        for(let r of json.roles) {
            let role:RolePlayer = RolePlayer.fromJSON(r);
            rolesMap.set(role.getId(), role);
        }

        let teamsMap:Map<number, Team> = new Map();
        for(let t of json.teams) {
            let team:Team = Team.fromJSON(t);
            teamsMap.set(team.getId(), team);
        }

        return new TableFilterOption(json.playerName, json.matchPlayedPerc, rolesMap, teamsMap);
    }
}