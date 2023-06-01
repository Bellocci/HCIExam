import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogHelper } from "../dialogHelper.interface";
import { LoginDialogComponent } from "./login-dialog.component";
import { DialogConfig } from "@angular/cdk/dialog";

/**
 * Classe di helper per la costruzione della LoginDialog component
 */
export class LoginDialogHelper implements DialogHelper<LoginDialogComponent> {

    private static readonly MAX_HEIGHT:string = "1000px";
    private static readonly MAX_WIDTH:string = "800px";

    private static readonly STANDARD_ENTER_ANIMATION = "300ms";
    private static readonly STANDARD_EXIT_ANIMATION = "400ms";

    private dialog!:MatDialog;
    private dialogConfig:MatDialogConfig<LoginDialogComponent> = new MatDialogConfig();
    private dialogRef!:MatDialogRef<LoginDialogComponent> | undefined;

    constructor(dialog:MatDialog) {
        if(!dialog) {
            throw new Error("MatDialog argument cannot be null!");
        }
        this.dialog = dialog;

        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = false;
        this.dialogConfig.maxWidth = LoginDialogHelper.MAX_WIDTH;
        this.dialogConfig.width = "auto";
        this.dialogConfig.maxHeight = LoginDialogHelper.MAX_HEIGHT;
        this.dialogConfig.height = "auto";
        this.dialogConfig.id="loginDialog";
        this.dialogConfig.enterAnimationDuration = LoginDialogHelper.STANDARD_ENTER_ANIMATION;
        this.dialogConfig.exitAnimationDuration = LoginDialogHelper.STANDARD_EXIT_ANIMATION;
    }

    /**
     * Metodo per l'apertura della LoginDialog
     * 
     * @param maxWidth : opzionale
     * @param maxHeight : opzionale
     * @param enterAnimationDuration : opzionale 
     * @param exitAnimationDuration : opzionale
     * @param dialogConfig : opzionale
     */
    openDialog(dialogConfig?: MatDialogConfig<LoginDialogComponent> | undefined): void {
        
        if(dialogConfig != undefined) {
            this.dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
        } else {
            this.dialogRef = this.dialog.open(LoginDialogComponent, this.dialogConfig);
        }        
    }

    /**
     * Listener che esegue la chiusura della LoginDialog
     */
    closeDialog(): void {
        this.dialogRef = this.dialog.getDialogById('loginDialog');
        if(!this.dialogRef) {
            throw new Error("Login dialog ref not found!");
        }
        this.dialogRef.close();
    }

    /**
     * Restituisce la configurazione utilizzata per la LoginDialog
     */
    getDialogConfig(): MatDialogConfig<LoginDialogComponent> {
        return {...this.dialogConfig};
    }
}