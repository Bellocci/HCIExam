import { DialogDataAbstract } from "../dialog-data.abstract";
import { UserTeamEntity } from "src/model/userTeamEntity.model";

export class UserTeamDialogData extends DialogDataAbstract {

    /*
     * ==========
     * VARIABILI 
     * ==========
     */
    
    private _isCreateMode: boolean = true;
    private _userTeam!: UserTeamEntity;    

    /*
     * ============
     * CONSTRUCTOR 
     * ============
     */
    constructor() {
        super();
    }

    /*
     * ================
     * GETTER & SETTER 
     * ================
     */

    public get isCreateMode(): boolean {
        return this._isCreateMode;
    }

    public set isCreateMode(value: boolean) {
        this._isCreateMode = value;
    }

    public get userTeam(): UserTeamEntity {
        return this._userTeam;
    }
    
    public set userTeam(value: UserTeamEntity) {
        this._userTeam = value;
    }    
}