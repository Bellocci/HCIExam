import { League } from "src/decorator/League.model";
import { ChampionshipEnum } from "src/enum/ChampionshipEnum.model";
import { SportEnum } from "src/enum/SportEnum.model";


export interface CreateNewTeamDataStructure {
    teamName : string,
    sport : SportEnum | undefined,
    championship : ChampionshipEnum | undefined,
    league : League | undefined,
    importPlayer : boolean | undefined,
}