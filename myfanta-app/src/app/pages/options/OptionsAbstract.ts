import { OptionEntity } from "src/model/options/optionEntity.model";
import { IdMatCard } from "./IdMatCardInterface";


export abstract class OptionsAbstract {

    /**
     * Metodo che aggiorna le opzioni per i filtri standard
     * 
     * @param option 
     */
    abstract updateOptionStandard(option: OptionEntity) : void;

    /**
     * Metodo che restituisce una lista implementata in modo hardcoded
     * degli id di ciascuna mat-card
     *  
     * @returns ids
     */
    public static getIds(): IdMatCard[] {
        throw new Error("not implemented");
    }
}