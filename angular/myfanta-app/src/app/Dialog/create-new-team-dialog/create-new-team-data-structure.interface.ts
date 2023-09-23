import { ChampionshipEnum } from "src/enum/ChampionshipEnum.model";
import { SportEnum } from "src/enum/SportEnum.model";
import { LeagueEntity } from "src/model/leagueEntity.model";


export interface CreateNewTeamDataStructure {
    teamName : string,
    sport : SportEnum | undefined,
    championship : ChampionshipEnum | undefined,
    league : LeagueEntity | undefined,
    importPlayer : boolean | undefined,
}