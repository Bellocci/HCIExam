import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
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
    closeDialog(): void {
        if(!this.dialogRef) {
            throw new Error("CreateNewTeam dialogRef not found!");
        }
        this.dialogRef.close();
    }
    getDialogConfig<T>(): MatDialogConfig<T> {
        return {... this.dialogConfig};
    }
    afterClosed(): Observable<any> | undefined {
        return this.dialogRef?.afterClosed();
    }
    afterOpened(): Observable<any> | undefined {
        return this.dialogRef?.afterOpened();
    }
    
}