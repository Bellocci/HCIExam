import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Observable, map, take } from "rxjs";
import { ComponentType } from "@angular/cdk/portal";
import { DialogHelper } from "./dialogHelper.interface";


export class DialogHelperImpl implements DialogHelper {

    private static readonly MAX_HEIGHT:string = "1000px";
    private static readonly MAX_WIDTH:string = "800px";

    private static readonly STANDARD_ENTER_ANIMATION = "300ms";
    private static readonly STANDARD_EXIT_ANIMATION = "400ms";

    private dialog!:MatDialog;
    private dialogConfig:MatDialogConfig<any> = new MatDialogConfig();
    private dialogRef!:MatDialogRef<any> | undefined;

    constructor(dialog:MatDialog) {
        if(!dialog) {
            throw new Error("MatDialog argument cannot be null!");
        }
        this.dialog = dialog;

        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = false;
        this.dialogConfig.maxWidth = DialogHelperImpl.MAX_WIDTH;
        this.dialogConfig.width = "auto";
        this.dialogConfig.maxHeight = DialogHelperImpl.MAX_HEIGHT;
        this.dialogConfig.height = "auto";
        this.dialogConfig.enterAnimationDuration = DialogHelperImpl.STANDARD_ENTER_ANIMATION;
        this.dialogConfig.exitAnimationDuration = DialogHelperImpl.STANDARD_EXIT_ANIMATION;
    }    

    /**
     * Listener per l'apertura della dialog
     * 
     * @param component 
     * @param dialogConfig : Opzionale
     */
    openDialog<T>(component: ComponentType<T>, dialogConfig?: MatDialogConfig<T | undefined>): void {
        if(dialogConfig != undefined) {
            this.dialogRef = this.dialog.open(component, dialogConfig);
        } else {
            this.dialogRef = this.dialog.open(component, this.dialogConfig);
        } 
    }

    /**
     * Listener per la chiusura della dialog
     */
    closeDialog(dialogResult?:any): void {
        if(!this.dialogRef) {
            throw new Error("CreateNewTeam dialogRef not found!");
        }
        this.dialogRef.close(dialogResult);
    }

    /**
     * 
     * @returns MatDialogConfig<T>
     */
    getDialogConfig<T>(): MatDialogConfig<T> {
        return {... this.dialogConfig};
    }

    setData(data: any): void {
        this.dialogConfig.data = data;
    }

    /**
     * Restituisce un observable che è notificato quando la dialog viene chiusa, oppure
     * undefined se la dialog non è istanziata
     * 
     * @returns Observable
     */
    afterClosed(): Observable<any> | undefined {
        /*
        - pipe() è un metodo che ci consente di concatenare più operatori su un'Observable, nel nostro caso gli operatori take(1) e map() successivamente.
        - take(1) è un operatore che emette solo il primo valore emesso dall'Observable e poi completa l'Observable stesso. 
          In pratica, assicura che riceveremo solo il primo valore emesso dall'Observable e poi l'Observable si completerà 
          automaticamente.
        - map() è un operatore che ci consente di trasformare i valori emessi da un'Observable in un altro valore. 
          In questo caso, stiamo semplicemente restituendo il valore response senza effettuare alcuna trasformazione.
        */
        return this.dialogRef?.afterClosed().pipe(
            take(1), 
            map(response => {
                return response;
            })
        );
    }
    
}