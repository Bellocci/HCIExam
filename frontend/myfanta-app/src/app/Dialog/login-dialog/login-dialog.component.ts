import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { DialogService } from 'src/app/service/dialog.service';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { RecoveryPasswordDialogComponent } from '../recovery-password-dialog/recovery-password-dialog.component';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { DialogHelper } from '../dialogHelper.interface';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/decorator/user';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  providers: [MessageService]
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI
   * ==========
  */

  // Parametri in uscita verso il parent
  @Output() recoveryPasswordView = new EventEmitter<boolean>();

  messages:Message[] = [];
  formGroup!: FormGroup;

  private _firstLogin: boolean = true;  
  private _disableLoginBtn: boolean = true;  
  private _subscriptionUserObservable!: Subscription | undefined; 

  /* 
  * ==============================
  * CONSTRUCTOR, INIT & DESTROYER
  * ============================== 
  */

  constructor(private userService: UserService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private breakpointsService: BreakpointsService,
    public ref: DynamicDialogRef) {
      
    console.log("Construct login dialog");
  }

  ngOnInit(): void { 
    
    this._subscriptionUserObservable = this.observeUser();

    this.formGroup = new FormGroup({
      username: new FormControl<string | null>(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      password : new FormControl<string | null>(null, {
        validators: [Validators.required, Validators.nullValidator],
      }), 
    })
  }

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
    return this.userService.addObserverForUser(new ObserverStepBuilder<User>()
      .next(user => {
        if (user.isUserDefined()) {
          this.ref.close(user);
        } else if(!this.firstLogin) {
          this.showErrorMessage();
        }
      })
      .error((error : any) => console.error("Error to get user: " + error))
      .complete( () => console.log("User observer completed"))
      .build()
    );
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

  public get firstLogin(): boolean {
    return this._firstLogin;
  }
  
  public set firstLogin(value: boolean) {
    this._firstLogin = value;
  }

  isMobileView() : boolean {
    return BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);
  }

  hasInputUsernameErrors(): boolean {
    let result: boolean | undefined = this.formGroup.get("username")?.invalid;
    return result ? result : false;
  }

  hasInputPasswordErrors(): boolean {
    let result: boolean | undefined = this.formGroup.get("password")?.invalid;
    return result ? result : false;
  }

  showErrorMessage() : void {
    this.messages = [
      {severity: 'error', detail: 'Username o password errati'}
    ]
  }

  getLoginTooltip() : string {
    if(this.hasInputUsernameErrors()) {
      return "Inserisci username";
    } else if(this.hasInputPasswordErrors()) {
      return "Inserisci password";
    } else {
      return "Accedi a FantasyTeam";
    }
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  disableLogin(): void {
    this._disableLoginBtn = this.hasInputUsernameErrors() || this.hasInputPasswordErrors();
  }

  recoveryPassword(): void {
    let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();
    dialogHelper.closeDialog();
    if(BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth)) {     
      dialogHelper.setWidth("100%");
      dialogHelper.setHeight("100%");
    }
    dialogHelper.openDialog(RecoveryPasswordDialogComponent);
  }

  /* Login */

  login(): void {
    this.firstLogin = false;
    let username = this.formGroup.get("username")?.value as string;
    let password = this.formGroup.get("password")?.value as string;
    this.userService.login(username, password);  
  }

  /* Apertura dialog */

  openRegistrationDialog(): void {
    let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();
    dialogHelper.closeDialog();
    if(BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth)) {     
      dialogHelper.setWidth("100%");
      dialogHelper.setHeight("100%");
    }
    dialogHelper.openDialog(SignupDialogComponent);
  }

}
