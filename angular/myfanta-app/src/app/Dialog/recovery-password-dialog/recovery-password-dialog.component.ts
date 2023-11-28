import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { UserService } from 'src/app/service/user.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { DialogHelper } from '../dialogHelper.interface';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

@Component({
  selector: 'app-recovery-password-dialog',
  templateUrl: './recovery-password-dialog.component.html',
  styleUrls: ['./recovery-password-dialog.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class RecoveryPasswordDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  nameControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required]
  });

  surnameControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required]
  });

  usernameControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required]
  });

  private _disableRecoveryPasswordBtn: boolean = true;  
  private _password: string | undefined;  
  private _showRecoveryPasswordError: boolean = false;  

  private _isMobileBreakpointActive:boolean = false;
  private _subscriptionMobileBreakpoint:Subscription;

  /**
   * =============================
   * CONSTRUCTOR - INIT - DESTROY
   * =============================
   */

  constructor(private _userService:UserService,private dialogService:DialogService, private breakpointsService:BreakpointsService) { 
    console.log("Construct recovery password dialog component");
    this._subscriptionMobileBreakpoint = this.observeMobileBreakpoint();
  }  

  ngOnInit(): void { }

  ngOnDestroy(): void {
    console.log("Destroy recovery password dialog component");
    this._subscriptionMobileBreakpoint.unsubscribe();
  }

  /**
   * =========
   * OBSERVER
   * =========
   */

  private observeMobileBreakpoint() : Subscription {
    return this.breakpointsService.mobileObservable
        .subscribe(new ObserverStepBuilder<boolean>()
        .next((isMobile : boolean) => this._isMobileBreakpointActive = isMobile)
        .error((error : any) => console.error("Error to get mobile breakpoint: " + error))
        .complete( () => console.log("Mobile breakpoint observer completed"))
        .build());
  }

  /**
   * ================
   * GETTER & SETTER
   * ================
   */

  public get password(): string | undefined {
    return this._password;
  }

  private set password(value: string | undefined) {
    this._password = value;
  }

  public get showRecoveryPasswordError(): boolean {
    return this._showRecoveryPasswordError;
  }
  
  public set showRecoveryPasswordError(value: boolean) {
    this._showRecoveryPasswordError = value;
  }

  public get disableRecoveryPasswordBtn(): boolean {
    return this._disableRecoveryPasswordBtn;
  }

  public set disableRecoveryPasswordBtn(value: boolean) {
    this._disableRecoveryPasswordBtn = value;
  }

  /*
   * ===================
   * METODI VISIBILITA' 
   * ===================
   */

  hasInputNameErrors() : boolean {
    return !this.nameControl.valid;
  }

  hasInputSurnameErrors() : boolean {
    return !this.surnameControl.valid;
  }

  hasInputUsernameErrors() : boolean {
    return !this.usernameControl.valid;
  }  

  isRecoveryPasswordComplete() : boolean {
    return this.password != undefined;
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  disableRecoveryPassword() : void {
    this.disableRecoveryPasswordBtn = !this.areInputsValid();
  }

  /**
   * Verifica se gli input sono validi e ricerca la password
   * per i parametri inseriti
   */
  recoveryPassword() : void {
    this.password = undefined;
    if(this.areInputsValid()) {
      // Siamo sicuri che siano presenti valori dal controllo precedente
      this.password = this._userService.recoveryPassword(
        this.nameControl.value!, this.surnameControl.value!, this.usernameControl.value!);
    }
    this.showRecoveryPasswordError = !this.password;
  } 

  /**
   * Listener per la chiusura della RecoveryPasswordDialog ed
   * apertura della LoginDialog
   */
  openLoginDialog() : void {
    let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();
    dialogHelper.closeDialog();
    if(this._isMobileBreakpointActive) {     
      dialogHelper.setWidth("100%");
      dialogHelper.setHeight("100%");
    } 
    dialogHelper.openDialog(LoginDialogComponent);
  }

  /**
   * Listener per la chiusura della dialog
   */
  closeDialog() : void {
    this.dialogService.getDialogHelper().closeDialog();
  }

  /*
   * ===============
   * METODI PRIVATI 
   * ===============
   */

  private areInputsValid() : boolean {
    return this.nameControl.valid && this.surnameControl.valid && this.usernameControl.valid;
  }
}
