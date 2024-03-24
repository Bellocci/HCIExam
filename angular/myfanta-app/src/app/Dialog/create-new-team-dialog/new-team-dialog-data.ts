import { ChampionshipEnum } from "src/enum/ChampionshipEnum.model";
import { DialogDataAbstract } from "../dialog-data.abstract";
import { SportEnum } from "src/enum/SportEnum.model";
import { LeagueEntity } from "src/model/leagueEntity.model";

export class NewTeamDialogData extends DialogDataAbstract {

    /*
     * ==========
     * VARIABILI 
     * ==========
     */
    
    private _isCreateMode: boolean = true;
    private _teamName!: string;    
    private _sport!: SportEnum;
    private _championship!: ChampionshipEnum;    
    private _league!: LeagueEntity;    

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

    public get teamName(): string {
        return this._teamName;
    }

    public set teamName(value: string) {
        this._teamName = value;
    }

    public get sport(): SportEnum {
        return this._sport;
    }

    public set sport(value: SportEnum) {
        this._sport = value;
    }

    public get championship(): ChampionshipEnum {
        return this._championship;
    }

    public set championship(value: ChampionshipEnum) {
        this._championship = value;
    }

    public get league(): LeagueEntity {
        return this._league;
    }

    public set league(value: LeagueEntity) {
        this._league = value;
    }
}