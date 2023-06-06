import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogHelper } from "../dialogHelper.interface";
import { RecoveryPasswordDialogComponent } from "./recovery-password-dialog.component";
import { Observable } from "rxjs";

/**
 * Classe di helper per la costruzione della RecoveryPasswordDialog component
 */
export class RecoveryPasswordDialogHelper implements DialogHelper<RecoveryPasswordDialogComponent> {

    private static readonly ID = "recoveryPasswordDialog";

    private static readonly MAX_HEIGHT:string = "1000px";
    private static readonly MAX_WIDTH:string = "800px";

    private static readonly STANDARD_ENTER_ANIMATION = "300ms";
    private static readonly STANDARD_EXIT_ANIMATION = "400ms";

    private dialog!:MatDialog;
    private dialogConfig:MatDialogConfig<RecoveryPasswordDialogComponent> = new MatDialogConfig();
    private dialogRef!:MatDialogRef<RecoveryPasswordDialogComponent> | null;

    constructor(dialog:MatDialog) {
        if(!dialog) {
            throw new Error("MatDialog argument cannot be null!");
        }
        this.dialog = dialog;

        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = false;
        this.dialogConfig.maxWidth = RecoveryPasswordDialogHelper.MAX_WIDTH;
        this.dialogConfig.width = "auto";
        this.dialogConfig.maxHeight = RecoveryPasswordDialogHelper.MAX_HEIGHT;
        this.dialogConfig.height = "auto";
        this.dialogConfig.id = RecoveryPasswordDialogHelper.ID;
        this.dialogConfig.enterAnimationDuration = RecoveryPasswordDialogHelper.STANDARD_ENTER_ANIMATION;
        this.dialogConfig.exitAnimationDuration = RecoveryPasswordDialogHelper.STANDARD_EXIT_ANIMATION;
    }

    openDialog(dialogConfig?: MatDialogConfig<RecoveryPasswordDialogComponent> | undefined): void {
        if(dialogConfig != undefined) {
            this.dialogRef = this.dialog.open(RecoveryPasswordDialogComponent, dialogConfig);
        } else {
            this.dialogRef = this.dialog.open(RecoveryPasswordDialogComponent, this.dialogConfig);
        }  
    }

    closeDialog(): void {
        if(!this.dialogRef) {
            throw new Error("Registration dialog is not open!");
        }
        this.dialogRef.close();
    }
    
    getDialogConfig(): MatDialogConfig<RecoveryPasswordDialogComponent> {
        return {...this.dialogConfig};
    }

    afterClosed(): Observable<any> | undefined {
        throw new Error("Method not implemented.");
    }
    afterOpened(): Observable<any> | undefined {
        throw new Error("Method not implemented.");
    }
}