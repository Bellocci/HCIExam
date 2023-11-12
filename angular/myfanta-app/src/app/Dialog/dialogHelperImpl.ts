import { DialogPosition, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Observable, map, take } from "rxjs";
import { ComponentType } from "@angular/cdk/portal";
import { DialogHelper } from "./dialogHelper.interface";


export class DialogHelperImpl implements DialogHelper {

    private static readonly MAX_HEIGHT: string = "600px";
    private static readonly MAX_WIDTH: string = "800px";

    private static readonly STANDARD_ENTER_ANIMATION = "300ms";
    private static readonly STANDARD_EXIT_ANIMATION = "400ms";

    private dialog!: MatDialog;
    private dialogConfig: MatDialogConfig<any>;
    private dialogRef!: MatDialogRef<any> | undefined;

    constructor(dialog: MatDialog) {
        if (!dialog) {
            throw new Error("MatDialog argument cannot be null!");
        }
        console.log("Construct dialog");
        this.dialog = dialog;
        this.dialogConfig = new MatDialogConfig();
        this.setStandardConfiguration();        
    }    

    private setStandardConfiguration() : void {        
        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = false;
        this.dialogConfig.maxWidth = undefined;
        this.dialogConfig.width = undefined;
        this.dialogConfig.maxHeight = undefined;
        this.dialogConfig.height = undefined;
        this.dialogConfig.enterAnimationDuration = DialogHelperImpl.STANDARD_ENTER_ANIMATION;
        this.dialogConfig.exitAnimationDuration = DialogHelperImpl.STANDARD_EXIT_ANIMATION;
        this.dialogConfig.position = undefined;
    }

    /**
     * Listener per l'apertura della dialog
     * 
     * @param component 
     * @param dialogConfig : Opzionale
     */
    openDialog<T>(component: ComponentType<T>, dialogConfig?: MatDialogConfig<T | undefined>): void {
        dialogConfig != undefined ?
            this.dialogRef = this.dialog.open(component, dialogConfig) :
            this.dialogRef = this.dialog.open(component, this.dialogConfig);
    }

    /**
     * Listener per la chiusura della dialog
     */
    closeDialog(dialogResult?: any): void {
        if (!this.dialogRef) {
            throw new Error("Dialog not defined!");
        }
        console.log("Close dialog");
        this.setStandardConfiguration();
        this.dialogRef.close(dialogResult);
    }

    /**
     * 
     * @returns MatDialogConfig<T>
     */
    getDialogConfig<T>(): MatDialogConfig<T> {
        return this.dialogConfig;
    }

    setData(data: any): void {
        this.dialogConfig.data = data;
    }

    setWidth(width?: string, minWidth?: number, maxWidth?: number): void {
        if (this.dialogConfig == undefined) {
            throw Error("DialogConfig not defined");
        }
        this.dialogConfig.minWidth = minWidth;
        this.dialogConfig.maxWidth = maxWidth;
        this.dialogConfig.width = width;
    }

    setHeight(height?: string, minHeight?: number, maxHeight?: number): void {
        if (this.dialogConfig == undefined) {
            throw Error("DialogConfig not defined");
        }
        this.dialogConfig.minHeight = minHeight;
        this.dialogConfig.maxHeight = maxHeight;
        this.dialogConfig.height = height;
    }

    setPosition(left?: number, top?: number, right?: number, bottom?: number): void {
        if (this.dialogConfig == undefined) {
            throw Error("DialogConfig not defined");
        }
        const dialogPosition:DialogPosition = {
            left: left != undefined ? left.toString() + "px" : undefined, 
            top : top != undefined ? top.toString() + "px" : undefined,
            right : right != undefined ? right.toString() + "px" : undefined,
            bottom : bottom != undefined ? bottom.toString() + "px" : undefined
        }
        this.dialogConfig.position = dialogPosition;
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