import { ChampionshipEnum } from "src/enum/ChampionshipEnum.model";
import { DialogDataBuilderAbstract } from "../dialog-data-builder.abstract";
import { DialogDataAbstract } from "../dialog-data.abstract";
import { LeagueEntity } from "src/model/leagueEntity.model";
import { SportEnum } from "src/enum/SportEnum.model";
import { NewTeamDialogData } from "./new-team-dialog-data";

export class NewTeamDialogDataBuilder extends DialogDataBuilderAbstract {
    
    private _isCreateMode!: boolean;
    private _teamName!: string;    
    private _sport!: SportEnum;
    private _championship!: ChampionshipEnum;    
    private _league!: LeagueEntity;   
    
    override build(): DialogDataAbstract {
        let dialogData : NewTeamDialogData = new NewTeamDialogData();
        dialogData.isCreateMode = this._isCreateMode;
        dialogData.teamName = this._teamName;
        dialogData.sport = this._sport;
        dialogData.championship = this._championship;
        dialogData.league = this._league;
        return dialogData;
    }

    setCreateMode(isCreateMode:boolean) : this {
        this._isCreateMode = isCreateMode;
        return this;
    }

    setTeamName(teamName:string) : this {
        this._teamName = teamName;
        return this;
    }

    setSport(sport:SportEnum) : this {
        this._sport = sport;
        return this;
    }

    setChampionship(championship:ChampionshipEnum) : this {
        this._championship = championship;
        return this;
    }

    setLeague(league:LeagueEntity) : this {
        this._league = league;
        return this;
    }
}