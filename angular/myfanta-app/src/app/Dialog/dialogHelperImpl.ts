import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { DialogHelper } from "./dialogHelper.interface";
import { ComponentType } from "@angular/cdk/portal";


export class DialogHelperImpl<T> implements DialogHelper<T> {

    private static readonly MAX_HEIGHT:string = "1000px";
    private static readonly MAX_WIDTH:string = "800px";

    private static readonly STANDARD_ENTER_ANIMATION = "300ms";
    private static readonly STANDARD_EXIT_ANIMATION = "400ms";

    private dialog!:MatDialog;
    private dialogConfig:MatDialogConfig<T> = new MatDialogConfig();
    private dialogRef!:MatDialogRef<T> | undefined;

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
     * @param dialogConfig : Opzionale
     */
    openDialog<T>(component: ComponentType<T>, dialogConfig?: MatDialogConfig<T | undefined>): void {
        if(dialogConfig != undefined) {
            this.dialogRef = this.dialog.open(component, dialogConfig);
        } else {
            this.dialogRef = this.dialog.open(component, this.dialogConfig);
        } 
    }



    closeDialog(): void {
        throw new Error("Method not implemented.");
    }
    getDialogConfig(): MatDialogConfig<T> {
        throw new Error("Method not implemented.");
    }
    afterClosed(): Observable<any> | undefined {
        throw new Error("Method not implemented.");
    }
    afterOpened(): Observable<any> | undefined {
        throw new Error("Method not implemented.");
    }
    
}