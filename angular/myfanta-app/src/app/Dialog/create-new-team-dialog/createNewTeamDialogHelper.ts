import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogHelper } from "../dialogHelper.interface";
import { CreateNewTeamDialogComponent } from "./create-new-team-dialog.component";
import { Observable } from "rxjs";

/**
 * Classe a supporto per la visualizzazione della dialog CreateNewTeamDialogComponent
 */
export class CreateNewTeamDialogHelper implements DialogHelper<CreateNewTeamDialogComponent> {

    private static readonly ID:string = "createNewTeamDialog";

    private static readonly MAX_HEIGHT:string = "1000px";
    private static readonly MAX_WIDTH:string = "800px";

    private static readonly STANDARD_ENTER_ANIMATION = "300ms";
    private static readonly STANDARD_EXIT_ANIMATION = "400ms";

    private dialog!:MatDialog;
    private dialogConfig:MatDialogConfig<CreateNewTeamDialogComponent> = new MatDialogConfig();
    private dialogRef!:MatDialogRef<CreateNewTeamDialogComponent> | undefined;

    constructor(dialog:MatDialog) {
        if(!dialog) {
            throw new Error("MatDialog argument cannot be null!");
        }
        this.dialog = dialog;

        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = false;
        this.dialogConfig.maxWidth = CreateNewTeamDialogHelper.MAX_WIDTH;
        this.dialogConfig.width = "auto";
        this.dialogConfig.maxHeight = CreateNewTeamDialogHelper.MAX_HEIGHT;
        this.dialogConfig.height = "auto";
        this.dialogConfig.id= CreateNewTeamDialogHelper.ID;
        this.dialogConfig.enterAnimationDuration = CreateNewTeamDialogHelper.STANDARD_ENTER_ANIMATION;
        this.dialogConfig.exitAnimationDuration = CreateNewTeamDialogHelper.STANDARD_EXIT_ANIMATION;
    }

    /**
     * Listener per l'apertura della dialog
     * 
     * @param dialogConfig : Opzionale
     */
    openDialog(dialogConfig?: MatDialogConfig<CreateNewTeamDialogComponent | undefined> | undefined): void {
        if(dialogConfig != undefined) {
            this.dialogRef = this.dialog.open(CreateNewTeamDialogComponent, dialogConfig);
        } else {
            this.dialogRef = this.dialog.open(CreateNewTeamDialogComponent, this.dialogConfig);
        }  
    }

    /**
     * Listener per la chiusura della dialog
     */
    closeDialog(): void {
        this.dialogRef = this.dialog.getDialogById(CreateNewTeamDialogHelper.ID);
        if(!this.dialogRef) {
            throw new Error("CreateNewTeam dialogRef not found!");
        }
        this.dialogRef.close();
    }

    /**
     * Restituisce la configurazione utilizzata per la CreateNewTeamDialog
     */
    getDialogConfig(): MatDialogConfig<CreateNewTeamDialogComponent> {
        return {... this.dialogConfig};
    }

    afterClosed(): Observable<any> | undefined {
        return !this.dialogRef ? undefined : this.dialogRef.afterClosed();
    }
    
    afterOpened(): Observable<any> | undefined {
        return !this.dialogRef ? undefined : this.dialogRef.afterOpened();
    }
}