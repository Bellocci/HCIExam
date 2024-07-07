import { DialogDataBuilderAbstract } from "../dialog-data-builder.abstract";
import { DialogDataAbstract } from "../dialog-data.abstract";
import { UserTeamEntity } from "src/model/userTeamEntity.model";
import { UserTeamDialogData } from "./user-team-dialog-data";

export class UserTeamDialogDataBuilder extends DialogDataBuilderAbstract {
    
    private _isCreateMode!: boolean;
    private _userTeam!: UserTeamEntity; 
    
    override build(): DialogDataAbstract {
        let dialogData : UserTeamDialogData = new UserTeamDialogData();
        dialogData.isCreateMode = this._isCreateMode;
        dialogData.userTeam = this._userTeam;
        return dialogData;
    }

    setCreateMode(isCreateMode:boolean) : this {
        this._isCreateMode = isCreateMode;
        return this;
    }

    setUserTeam(userTeam:UserTeamEntity) : this {
        this._userTeam = userTeam;
        return this;
    }
}