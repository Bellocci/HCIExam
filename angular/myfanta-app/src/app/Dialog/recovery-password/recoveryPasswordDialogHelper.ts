import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogHelper } from "../dialogHelper.interface";
import { RecoveryPasswordComponent } from "./recovery-password.component";

/**
 * Classe di helper per la costruzione della RecoveryPasswordDialog component
 */
export class RecoveryPasswordDialogHelper implements DialogHelper<RecoveryPasswordComponent> {

    private static readonly MAX_HEIGHT:string = "1000px";
    private static readonly MAX_WIDTH:string = "800px";

    private static readonly STANDARD_ENTER_ANIMATION = "300ms";
    private static readonly STANDARD_EXIT_ANIMATION = "400ms";

    private dialog!:MatDialog;
    private dialogConfig:MatDialogConfig<RecoveryPasswordComponent> = new MatDialogConfig();
    private dialogRef!:MatDialogRef<RecoveryPasswordComponent> | null;

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
        this.dialogConfig.enterAnimationDuration = RecoveryPasswordDialogHelper.STANDARD_ENTER_ANIMATION;
        this.dialogConfig.exitAnimationDuration = RecoveryPasswordDialogHelper.STANDARD_EXIT_ANIMATION;
    }

    openDialog(dialogConfig?: MatDialogConfig<RecoveryPasswordComponent> | undefined): void {
        if(dialogConfig != undefined) {
            this.dialogRef = this.dialog.open(RecoveryPasswordComponent, dialogConfig);
        } else {
            this.dialogRef = this.dialog.open(RecoveryPasswordComponent, this.dialogConfig);
        }  
    }
    closeDialog(): void {
        if(!this.dialogRef) {
            throw new Error("Registration dialog is not open!");
        }
        this.dialogRef.close();
    }
    getDialogConfig(): MatDialogConfig<RecoveryPasswordComponent> {
        return {...this.dialogConfig};
    }

}