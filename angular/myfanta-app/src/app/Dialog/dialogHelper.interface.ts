import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

export interface DialogHelper<T> {

    /**
     * Metodo per l'apertura della dialog
     * @param dialogConfig : parametro opzione per settare una configurazione personalizzata della dialog
     */
    openDialog(dialogConfig?:MatDialogConfig<T | undefined>) : void;

    /**
     * Metodo per la chiusura della dialog
     */
    closeDialog() : void;

    /**
     * Restituisce la configurazione della dialog
     */
    getDialogConfig() : MatDialogConfig<T>;
}