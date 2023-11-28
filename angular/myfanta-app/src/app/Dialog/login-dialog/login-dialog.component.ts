import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { DialogService } from 'src/app/service/dialog.service';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { RecoveryPasswordDialogComponent } from '../recovery-password-dialog/recovery-password-dialog.component';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { UserEntity } from 'src/model/userEntity.model';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { DialogHelper } from '../dialogHelper.interface';

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

  private _disableLoginBtn: boolean = true;  
  private showLoginErrorMessage: boolean = false;
  private _showPassword: boolean = false;  
  // Variabile per determinare se il metodo login() è stato invocato almeno una volta
  private firstLogin: boolean = true;

  private _isMobileBreakpointActive:boolean = false;

  private _subscriptionUserObservable: Subscription | undefined;
  private _subscriptionMobileBreakpoint:Subscription;

  /* 
  * ==============================
  * CONSTRUCTOR, INIT & DESTROYER
  * ============================== 
  */

  constructor(private userService: UserService,
    private dialogService: DialogService,
    private breakpointsService: BreakpointsService) {
      
    console.log("Construct login dialog");
    this.firstLogin = true;
    this._subscriptionUserObservable = this.observeUser();
    this._subscriptionMobileBreakpoint = this.observeMobileBreakpoint();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    console.log("Destroy login dialog");
    this._subscriptionUserObservable != undefined ? this._subscriptionUserObservable?.unsubscribe() : null;
    this._subscriptionMobileBreakpoint.unsubscribe();
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
      .error((error : any) => console.error("Error to get user: " + error))
      .complete( () => console.log("User observer completed"))
      .build()
    );
  }

  private observeMobileBreakpoint() : Subscription {
    return this.breakpointsService.mobileObservable
        .subscribe(new ObserverStepBuilder<boolean>()
        .next((isMobile : boolean) => this._isMobileBreakpointActive = isMobile)
        .error((error : any) => console.error("Error to get mobile breakpoint: " + error))
        .complete( () => console.log("Mobile breakpoint observer completed"))
        .build());
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  /* Metodi di visibilità */

  public get disableLoginBtn(): boolean {
    return this._disableLoginBtn;
  }

  public set disableLoginBtn(value: boolean) {
    this._disableLoginBtn = value;
  }

  public get showPassword(): boolean {
    return this._showPassword;
  }
  public set showPassword(value: boolean) {
    this._showPassword = value;
  }

  isLoginErrorMessageVisible(): boolean {
    return this.showLoginErrorMessage && !this.firstLogin;
  }

  hasInputUsernameErrors(): boolean {
    return !this.usernameControl.valid;
  }

  hasInputPasswordErrors(): boolean {
    return !this.passwordControl.valid;
  }

  setLoginErrorMessageVisibility(visible: boolean) {
    this.showLoginErrorMessage = visible;
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  disableLogin(): void {
    this._disableLoginBtn = this.usernameControl.hasError('required') || this.passwordControl.hasError('required');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  recoveryPassword(): void {
    let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();
    dialogHelper.closeDialog();
    if(this._isMobileBreakpointActive) {     
      dialogHelper.setWidth("100%");
      dialogHelper.setHeight("100%");
    }
    dialogHelper.openDialog(RecoveryPasswordDialogComponent);
  }

  /* Login */

  login(): void {
    this.firstLogin = false;
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
