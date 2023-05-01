import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class RecoveryPasswordComponent implements OnInit {

  nameControl:FormControl = new FormControl('', {
    validators : [Validators.required]
  });

  surnameControl:FormControl = new FormControl('', {
    validators : [Validators.required]
  });

  usernameControl:FormControl = new FormControl('', {
    validators : [Validators.required]
  });

  private disableRecoveryPasswordBtn:boolean = true;
  private password:string | undefined;
  private showRecoveryPasswordError:boolean = false;

  constructor(private _userService:UserService) { }

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
    this.password = this._userService.recoveryPassword(
      this.nameControl.value, this.surnameControl.value, this.usernameControl.value);
    !this.password ? this.showRecoveryPasswordError = true : this.showRecoveryPasswordError = false;
  } 

}
