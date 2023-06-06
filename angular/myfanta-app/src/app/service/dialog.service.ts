import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogHelper } from '../Dialog/login-dialog/loginDialogHelper';
import { RegistrationDialogHelper } from '../Dialog/registration-dialog/registrationDialogHelper';
import { RecoveryPasswordDialogHelper } from '../Dialog/recovery-password-dialog/recoveryPasswordDialogHelper';
import { DialogHelper } from '../Dialog/dialogHelper.interface';
import { LoginDialogComponent } from '../Dialog/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../Dialog/registration-dialog/registration-dialog.component';
import { RecoveryPasswordDialogComponent } from '../Dialog/recovery-password-dialog/recovery-password-dialog.component';
import { CreateNewTeamDialogComponent } from '../Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { CreateNewTeamDialogHelper } from '../Dialog/create-new-team-dialog/createNewTeamDialogHelper';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private loginDialogHelper:DialogHelper<LoginDialogComponent> | null = null;
  private registrationDialogHelper:DialogHelper<RegistrationDialogComponent> | null = null;
  private recoveryPasswordDialogHelper:DialogHelper<RecoveryPasswordDialogComponent> | null = null;
  private createNewTeamDialogHelper:DialogHelper<CreateNewTeamDialogComponent> | null = null;

  constructor(private matDialog:MatDialog) { }

  getLoginHelper() : DialogHelper<LoginDialogComponent> {
    if(!this.loginDialogHelper) {
      this.loginDialogHelper = new LoginDialogHelper(this.matDialog);
    }
    return this.loginDialogHelper;
  }

  getRegistrationDialogHelper() : DialogHelper<RegistrationDialogComponent> {
    if(!this.registrationDialogHelper) {
      this.registrationDialogHelper = new RegistrationDialogHelper(this.matDialog);
    }
    return this.registrationDialogHelper;
  }

  getRecoveryPasswordDialogHelper() : DialogHelper<RecoveryPasswordDialogComponent> {
    if(!this.recoveryPasswordDialogHelper) {
      this.recoveryPasswordDialogHelper = new RecoveryPasswordDialogHelper(this.matDialog);
    }
    return this.recoveryPasswordDialogHelper;
  }

  getCreateNewTeamDialogHelper() : DialogHelper<CreateNewTeamDialogComponent> {
    if(!this.createNewTeamDialogHelper) {
      this.createNewTeamDialogHelper = new CreateNewTeamDialogHelper(this.matDialog);
    }
    return this.createNewTeamDialogHelper;
  }

  closeAllDialog() : void {
    this.matDialog.closeAll();
  }
}
