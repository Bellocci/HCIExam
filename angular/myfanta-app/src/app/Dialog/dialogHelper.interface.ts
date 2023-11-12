import { ComponentType } from "@angular/cdk/portal";
import { DialogPosition, MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";

export interface DialogHelper {

    /**
     * Metodo per l'apertura della dialog
     * @param dialogConfig : parametro opzione per settare una configurazione personalizzata della dialog
     */
    openDialog<T>(component: ComponentType<T>, dialogConfig?: MatDialogConfig<T | undefined>): void;

    /**
     * Metodo per la chiusura della dialog
     */
    closeDialog(dialogResult?: any): void;

    /**
     * Restituisce la configurazione della dialog
     */
    getDialogConfig<T>(): MatDialogConfig<T>;

    /**
     * Setta i dati da passare alla dialog
     * 
     * @param data 
     */
    setData(data: any): void;

    /**
     * Imposta la largezza della dialog
     * @param width larghezza della dialog (px o percentuale)
     * @param minWidth larghezza minima della dialog in px
     * @param maxWidth larghezza massima della dialog in px     
     * 
     * @throws Error se la dialog non è inizializzata 
     */
    setWidth(width?: string, minWidth?: number, maxWidth?: number): void;

    /**
     * Imposta l'altezza della dialog
     * 
     * @param height altezza della dialog (px o percentuale)
     * @param minHeight altezza minima della dialog in px
     * @param maxHeight altezza massima della dialog in px     
     * 
     * @throws Error se la dialog non è inizializzata 
     */
    setHeight(height?: string, minHeight?: number, maxHeight?: number): void;

    /**
     * Permette di definire la posizione della dialog nella quale deve essere aperta.
     * I valori saranno rappresentati in px. Se non definito la dialog sarà aperta al centro.
     * 
     * @param left 
     * @param top 
     * @param right 
     * @param bottom 
     * 
     * @throws Error se la dialog non è inizializzata 
     */
    setPosition(left?:number, top?:number, right?:number, bottom?:number) : void;

    /**
     * Restituisce un observable che è notificato quando la dialog viene chiusa, oppure
     * undefined se la dialog non è istanziata
     */
    afterClosed(): Observable<any> | undefined;
}