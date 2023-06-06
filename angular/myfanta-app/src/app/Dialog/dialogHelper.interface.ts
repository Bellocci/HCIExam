import { ComponentType } from "@angular/cdk/portal";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";

export interface DialogHelper<T> {

    /**
     * Metodo per l'apertura della dialog
     * @param dialogConfig : parametro opzione per settare una configurazione personalizzata della dialog
     */
    openDialog<T>(component:ComponentType<T>, dialogConfig?:MatDialogConfig<T | undefined>) : void;

    /**
     * Metodo per la chiusura della dialog
     */
    closeDialog() : void;

    /**
     * Restituisce la configurazione della dialog
     */
    getDialogConfig() : MatDialogConfig<T>;

    /**
     * Restituisce un observable che è notificato quando la dialog viene chiusa, oppure
     * undefined se la dialog non è istanziata
     */
    afterClosed() : Observable<any> | undefined;

    /**
     * Restituisce un observable che è notficato quando la dialog viene aperta, oppure undefined
     * se la dialog non è istanziata
     */
    afterOpened() : Observable<any> | undefined;
}