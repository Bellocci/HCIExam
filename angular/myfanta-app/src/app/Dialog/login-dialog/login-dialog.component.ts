import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { DialogService } from 'src/app/service/dialog.service';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { RecoveryPasswordDialogComponent } from '../recovery-password-dialog/recovery-password-dialog.component';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { UserEntity } from 'src/model/userEntity.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI
   * ==========
  */

  // Parametri in uscita verso il parent
  @Output() recoveryPasswordView = new EventEmitter<boolean>();

  usernameControl: FormControl<string | null> = new FormControl<string | null>('', {
    validators: [Validators.required],
  });

  passwordControl: FormControl<string | null> = new FormControl<string | null>('', {
    validators: [Validators.required]
  });

  private disableLoginBtn: boolean = true;
  private showLoginErrorMessage: boolean = false;
  private showPassword: boolean = false;
  // Variabile per determinare se il metodo login() è stato invocato almeno una volta
  private firstLogin: boolean = true;

  private _subscriptionUserObservable: Subscription | undefined;

  /* 
  * ==============================
  * CONSTRUCTOR, INIT & DESTROYER
  * ============================== 
  */

  constructor(private userService: UserService,private dialogService: DialogService) {
    console.log("Construct login dialog");
    this._subscriptionUserObservable = this.observeUser();
    this.firstLogin = true;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    console.log("Destroy login dialog");
    this._subscriptionUserObservable != undefined ? this._subscriptionUserObservable?.unsubscribe() : null;
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private observeUser(): Subscription | undefined {
    return this.userService.addObserverForUser(new ObserverStepBuilder<UserEntity>()
      .next(user => {
        if (user.isUserDefined()) {
          this.setLoginErrorMessageVisibility(false)
          this.dialogService.getDialogHelper().closeDialog();
        } else {
          this.setLoginErrorMessageVisibility(true)
        }
      })
      .build()
    );
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  /* Metodi di visibilità */

  isLoginErrorMessageVisible(): boolean {
    return this.showLoginErrorMessage && !this.firstLogin;
  }

  hasInputUsernameErrors(): boolean {
    return !this.usernameControl.valid;
  }

  hasInputPasswordErrors(): boolean {
    return !this.passwordControl.valid;
  }

  isLoginBtnDisabled(): boolean {
    return this.disableLoginBtn;
  }

  isPasswordVisible(): boolean {
    return this.showPassword;;
  }

  /* Setter */

  setLoginErrorMessageVisibility(visible: boolean) {
    this.showLoginErrorMessage = visible;
  }

  disableLogin(): void {
    if (!this.usernameControl.hasError('required') && !this.passwordControl.hasError('required')) {
      this.disableLoginBtn = false;
    }
    else {
      this.disableLoginBtn = true;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /* Metodi comunicazione con parent */

  recoveryPassword(): void {
    this.dialogService.getDialogHelper().closeDialog();
    this.dialogService.getDialogHelper().openDialog(RecoveryPasswordDialogComponent);
  }

  /* Login */

  login(): void {
    if (this.firstLogin) {
      this.firstLogin = false;
    }
    this.userService.login(this.usernameControl.value as string, this.passwordControl.value as string);
  }

  /* Apertura dialog */

  openRegistrationDialog(): void {
    this.dialogService.getDialogHelper().closeDialog();
    this.dialogService.getDialogHelper().openDialog(RegistrationDialogComponent);
  }

  closeAllDialog(): void {
    this.dialogService.getDialogHelper().closeDialog();
  }
}
