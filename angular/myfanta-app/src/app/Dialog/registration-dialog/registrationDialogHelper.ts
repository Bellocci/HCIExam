import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogHelper } from "../dialogHelper.interface";
import { RegistrationDialogComponent } from "./registration-dialog.component";
import { Observable } from "rxjs";

/**
 * Classe di helper per la costruzione della RegistrationDialog component
 */
export class RegistrationDialogHelper implements DialogHelper<RegistrationDialogComponent> {

    private static readonly MAX_HEIGHT:string = "1000px";
    private static readonly MAX_WIDTH:string = "800px";

    private static readonly STANDARD_ENTER_ANIMATION = "300ms";
    private static readonly STANDARD_EXIT_ANIMATION = "400ms";

    private dialog!:MatDialog;
    private dialogConfig:MatDialogConfig<RegistrationDialogComponent> = new MatDialogConfig();
    private dialogRef!:MatDialogRef<RegistrationDialogComponent> | null;

    constructor(dialog:MatDialog) {
        if(!dialog) {
            throw new Error("MatDialog argument cannot be null!");
        }
        this.dialog = dialog;

        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = false;
        this.dialogConfig.maxWidth = RegistrationDialogHelper.MAX_WIDTH;
        this.dialogConfig.width = "auto";
        this.dialogConfig.maxHeight = RegistrationDialogHelper.MAX_HEIGHT;
        this.dialogConfig.height = "auto";
        this.dialogConfig.id = "registrationDialog"
        this.dialogConfig.enterAnimationDuration = RegistrationDialogHelper.STANDARD_ENTER_ANIMATION;
        this.dialogConfig.exitAnimationDuration = RegistrationDialogHelper.STANDARD_EXIT_ANIMATION;
    }

    /**
     * Metodo per l'apertura della RegistrationDialog
     * 
     * @param dialogConfig : Opzionale
     */
    openDialog(dialogConfig?: MatDialogConfig<RegistrationDialogComponent> | undefined): void {
        if(dialogConfig != undefined) {
            this.dialogRef = this.dialog.open(RegistrationDialogComponent, dialogConfig);
        } else {
            this.dialogRef = this.dialog.open(RegistrationDialogComponent, this.dialogConfig);
        }        
    }

    /**
     * Listener per la chiusura della RegistrationDialog
     */
    closeDialog(): void {
        if(!this.dialogRef) {
            throw new Error("Registration dialog is not open!");
        }
        this.dialogRef.close();
    }

    /**
     * Restituisce la configurazione utilizzata per la RegistrationDialog
     */
    getDialogConfig(): MatDialogConfig<RegistrationDialogComponent> {
        return {...this.dialogConfig};
    }

    afterClosed(): Observable<any> | undefined {
        throw new Error("Method not implemented.");
    }
    afterOpened(): Observable<any> | undefined {
        throw new Error("Method not implemented.");
    }
}