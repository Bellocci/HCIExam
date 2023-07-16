import { Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { DialogService } from 'src/app/service/dialog.service';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { RecoveryPasswordDialogComponent } from '../recovery-password-dialog/recovery-password-dialog.component';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { User } from 'src/decorator/user.model';

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

  constructor(private userService:UserService,
    private dialogService:DialogService) {}
  
  ngOnInit(): void {
    this.subscribeUser();
    this.firstLogin = true;
  }

  private subscribeUser() : void {
    this.userService.addObserverForUser(new ObserverStepBuilder<User>()
      .next(user => {
        if(user.isUserDefined()) {
          this.setLoginErrorMessageVisibility(false)
          this.dialogService.getDialogHelper().closeDialog();
        } else {
          this.setLoginErrorMessageVisibility(true)
        }
      })
      .build()
    );
  }

  /* Metodi di visibilità */

  isLoginErrorMessageVisible() : boolean {
    return this.showLoginErrorMessage && !this.firstLogin;
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
    this.dialogService.getDialogHelper().closeDialog();
    this.dialogService.getDialogHelper().openDialog(RecoveryPasswordDialogComponent);
  }

   /* Login */

   login() : void {
    if(this.firstLogin) {
      this.firstLogin = false;
    }
    this.userService.login(this.usernameControl.value as string, this.passwordControl.value as string);    
   }

   /* Apertura dialog */

   openRegistrationDialog() : void {
    this.dialogService.getDialogHelper().closeDialog();
    this.dialogService.getDialogHelper().openDialog(RegistrationDialogComponent);
   }

  closeAllDialog() : void {
    this.dialogService.getDialogHelper().closeDialog();
  }
}
