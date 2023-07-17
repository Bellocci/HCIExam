import { User } from "src/decorator/user.model";
import { League } from "src/decorator/League.model";
import { USER_DATA } from "./userEntity.model";
import { LEAGUE_DATA } from "./leagueEntity.model";
import { PLAYER_DATA_NBA, PLAYER_DATA_PREMIER_LEAGUE, PLAYER_DATA_SERIE_A } from "./playerEntity.model";
import { PlayerEntity } from "./playerEntity.model";
import { Option } from "src/decorator/option/option.model";
import { OptionEntity } from "./optionEntity.model";
import { OptionFootballSoccer } from "src/decorator/option/optionFootballSoccer.model";

export class UserTeamEntity {
    id!:number;
    user!:User;
    nameTeam!:string;
    league!:League;
    team:PlayerEntity[] = [];
    favoriteList:PlayerEntity[] = [];
    blacklist:PlayerEntity[] = [];
    active!:boolean;
    option!:Option;
}

export const CUSTOMS_TEAM_DATA:UserTeamEntity[] = [
    {
        id : 1,
        user : new User(USER_DATA[0]),
        nameTeam : "SerieA Football",
        league : new League(LEAGUE_DATA[0]),
        team : PLAYER_DATA_SERIE_A,
        favoriteList : [],
        blacklist : [],
        active: true,
        option: new OptionFootballSoccer(new OptionEntity())
    },
    {
        id : 3,
        user : new User(USER_DATA[0]),
        nameTeam : "Nba - squadra 1",
        league : new League(LEAGUE_DATA[3]),
        team : [],
        favoriteList : [],
        blacklist : PLAYER_DATA_NBA,
        active: true,
        option: new OptionFootballSoccer(new OptionEntity())
    },
    {
        id : 4,
        user : new User(USER_DATA[0]),
        nameTeam : "Serie A - squadra 2",
        league : new League(LEAGUE_DATA[0]),
        team : PLAYER_DATA_SERIE_A,
        favoriteList : [],
        blacklist : [PLAYER_DATA_SERIE_A[0], PLAYER_DATA_SERIE_A[1], PLAYER_DATA_SERIE_A[2]],
        active: true,
        option: new OptionFootballSoccer(new OptionEntity())
    },
    {
        id : 5,
        user : new User(USER_DATA[0]),
        nameTeam : "Premier League - squadra 1",
        league : new League(LEAGUE_DATA[1]),
        team : PLAYER_DATA_PREMIER_LEAGUE,
        favoriteList : [],
        blacklist : [],
        active: true,
        option: new OptionFootballSoccer(new OptionEntity())
    }
]