import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recovery-password-dialog',
  templateUrl: './recovery-password-dialog.component.html',
  styleUrls: ['./recovery-password-dialog.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class RecoveryPasswordDialogComponent implements OnInit {

  nameControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required]
  });

  surnameControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required]
  });

  usernameControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required]
  });

  private disableRecoveryPasswordBtn:boolean = true;
  private password:string | undefined;
  private showRecoveryPasswordError:boolean = false;

  constructor(private _userService:UserService,
    private dialogService:DialogService) { }

  ngOnInit(): void { }

  /* Getter */

  getPassword() : string | undefined {
    return this.password;
  }

  /* Setter */

  disableRecoveryPassword() : void {
    this.areInputsValid() ? this.disableRecoveryPasswordBtn = false : this.disableRecoveryPasswordBtn = true;
  }

  /* Visibilità */

  hasInputNameErrors() : boolean {
    return !this.nameControl.valid;
  }

  hasInputSurnameErrors() : boolean {
    return !this.surnameControl.valid;
  }

  hasInputUsernameErrors() : boolean {
    return !this.usernameControl.valid;
  }

  private areInputsValid() : boolean {
    return this.nameControl.valid && this.surnameControl.valid && this.usernameControl.valid;
  }

  isRecoveryPasswordBtnDisabled() : boolean {
    return this.disableRecoveryPasswordBtn;
  }

  isRecoveryPasswordComplete() : boolean {
    return this.password != undefined;
  }

  showRecoveryPasswordErrorMessage() : boolean {
    return this.showRecoveryPasswordError;
  }

  /* Metodi comunicazione con servizi */

  recoveryPassword() : void {
    this.password = undefined;
    if(this.areInputsValid()) {
      // Siamo sicuri che siano presenti valori dal controllo precedente
      this.password = this._userService.recoveryPassword(
        this.nameControl.value!, this.surnameControl.value!, this.usernameControl.value!);
    }
    !this.password ? this.showRecoveryPasswordError = true : this.showRecoveryPasswordError = false;
  } 

  /**
   * Listener per la chiusura della RecoveryPasswordDialog ed
   * apertura della LoginDialog
   */
  openLoginDialog() : void {
    this.dialogService.getRecoveryPasswordDialogHelper().closeDialog();
    this.dialogService.getLoginHelper().openDialog();
  }

  /**
   * Listener per la chiusura della dialog
   */
  closeDialog() : void {
    this.dialogService.getRecoveryPasswordDialogHelper().closeDialog();
  }
}
