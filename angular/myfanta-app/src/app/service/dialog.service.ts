import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogHelper } from '../Dialog/login-dialog/loginDialogHelper';
import { RegistrationDialogHelper } from '../Dialog/registration-dialog/registrationDialogHelper';
import { RecoveryPasswordDialogHelper } from '../Dialog/recovery-password-dialog/recoveryPasswordDialogHelper';
import { DialogHelper } from '../Dialog/dialogHelper.interface';
import { LoginDialogComponent } from '../Dialog/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../Dialog/registration-dialog/registration-dialog.component';
import { RecoveryPasswordDialogComponent } from '../Dialog/recovery-password-dialog/recovery-password-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private loginDialogHelper:DialogHelper<LoginDialogComponent> | null = null;
  private registrationDialogHelper:DialogHelper<RegistrationDialogComponent> | null = null;
  private recoveryPasswordDialogHelper:DialogHelper<RecoveryPasswordDialogComponent> | null = null;

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

  closeAllDialog() : void {
    this.matDialog.closeAll();
  }
}
