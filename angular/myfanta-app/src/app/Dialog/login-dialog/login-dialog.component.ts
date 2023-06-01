import { Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class LoginDialogComponent implements OnInit {

  // Parametri in uscita verso il parent
  @Output() recoveryPasswordView = new EventEmitter<boolean>();  

  usernameControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required],
  });

  passwordControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators: [Validators.required]
  });  

  // Attributi visibilità
  private disableLoginBtn:boolean = true;
  private showLoginErrorMessage:boolean = false;
  private showPassword:boolean = false;
  private firstLogin:boolean = true;

  constructor(private _userService:UserService,
    private dialogService:DialogService) {}
  
  ngOnInit(): void {
    this._userService.getUser().subscribe(user => {
      if(user.isUserDefined()) {
        this.setLoginErrorMessageVisibility(false)
      } else if(!this.firstLogin) {
        this.setLoginErrorMessageVisibility(true);
      }
    });
  }

  /* Metodi di visibilità */

  isLoginErrorMessageVisible() : boolean {
    return this.showLoginErrorMessage;
  }

  hasInputUsernameErrors() : boolean {
    return !this.usernameControl.valid;
  }

  hasInputPasswordErrors() : boolean {
    return !this.passwordControl.valid;
  }

  isLoginBtnDisabled() : boolean {
    return this.disableLoginBtn;
  }

  isPasswordVisible() : boolean {
    return this.showPassword;;
  }

  /* Setter */

  setLoginErrorMessageVisibility(visible:boolean) {
    this.showLoginErrorMessage = visible;
  }

  disableLogin() : void {
    if(!this.usernameControl.hasError('required') && !this.passwordControl.hasError('required')) {
      this.disableLoginBtn = false;
    } 
    else {
      this.disableLoginBtn = true;
    }
  }

  togglePasswordVisibility() : void {
    this.showPassword = !this.showPassword;
  }

  /* Metodi comunicazione con parent */  

  recoveryPassword() : void {
    this.dialogService.getLoginHelper().closeDialog();
    this.dialogService.getRecoveryPasswordDialogHelper().openDialog();
  }

   /* Login */

   login() : void {
    if(this.firstLogin) {
      this.firstLogin = false;
    }
    this._userService.login(this.usernameControl.value as string, this.passwordControl.value as string);
    this.dialogService.getLoginHelper().closeDialog();
   }

   /* Apertura dialog */

   openRegistrationDialog() : void {
    this.dialogService.getLoginHelper().closeDialog();
    this.dialogService.getRegistrationDialogHelper().openDialog();
   }

  closeAllDialog() : void {
    this.dialogService.closeAllDialog();
  }
}
