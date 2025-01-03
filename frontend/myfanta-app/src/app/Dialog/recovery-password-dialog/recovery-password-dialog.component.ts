import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { Message, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginDialogHelper } from '../login-dialog/login-dialog-helper';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-recovery-password-dialog',
  templateUrl: './recovery-password-dialog.component.html',
  styleUrls: ['./recovery-password-dialog.component.scss'],
  providers: [MessageService],
})
export class RecoveryPasswordDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */
  messages:Message[] = [];
  recoveryPasswordFormGroup!: FormGroup;

  // Verifica se la parola inizia con uno spazio, tab o nuova linea
  blockSpaceTabAndNewLineRe:RegExp = /^[^\s]/;

  private _password: string | undefined;  

  /*
   * =============================
   * CONSTRUCTOR - INIT - DESTROY
   * =============================
   */

  constructor(private _userService:UserService,
    private messageService: MessageService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef) { 
    console.log("Construct recovery password dialog component");
  }  

  ngOnInit(): void { 
    this.recoveryPasswordFormGroup = new FormGroup({
      name : new FormControl<string | null>(null, {validators : [Validators.required]}),
      lastName : new FormControl<string | null>(null, {validators : [Validators.required]}),
      username : new FormControl<string | null>(null, {validators : [Validators.required]})
    })
  }

  ngOnDestroy(): void {
    console.log("Destroy recovery password dialog component");
  }

  /*
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

  getUsername() : String {
    let username = this.recoveryPasswordFormGroup.get('username')?.value;
    return username != undefined ? username : "";
  }

  getRecoveryPasswordBtnTooltip() : string {
    if(this.isRecoveryPasswordBtnDisabled()) {
      return "Inserisci correttamente i dati nei campi per procedere con la registrazione";      
    } else {
      return "Recupera password";
    }
  }

  getRecoveryPasswordImageStyleWidth() : string {
    if(this.isMobileView()) {
      return "max-width-16rem";
    } else if(this.isTabletView()) {
      return "max-width-20rem";
    } else {
      return "max-width-22rem";
    }
  }

  /*
   * ===================
   * METODI VISIBILITA' 
   * ===================
   */

  hasInputNameErrors() : boolean {
    let result = this.recoveryPasswordFormGroup.get('name')?.invalid;
    return result != undefined ? result : true;
  }

  hasInputLastNameErrors() : boolean {
    let result = this.recoveryPasswordFormGroup.get('lastName')?.invalid;
    return result != undefined ? result : true;
  }

  hasInputUsernameErrors() : boolean {
    let result = this.recoveryPasswordFormGroup.get('username')?.invalid;
    return result != undefined ? result : true;
  }  

  isRecoveryPasswordBtnDisabled() : boolean {
    return !this.areInputsValid();
  }

  isRecoveryPasswordComplete() : boolean {
    return this.password != undefined;
  }

  isMobileView() : boolean {
    return BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);
  }

  isTabletView() : boolean {
    return BreakpointsService.isTabletBreakpointActive(window.innerWidth);
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  /*
   * Verifica se gli input sono validi e ricerca la password
   * per i parametri inseriti
   */
  recoveryPassword() : void {
    this.password = undefined;
    if(this.areInputsValid()) {
      // Siamo sicuri che siano presenti valori dal controllo precedente
      let name:string = this.recoveryPasswordFormGroup.get('name')?.value as string;
      let lastName = this.recoveryPasswordFormGroup.get('lastName')?.value as string;
      let username = this.recoveryPasswordFormGroup.get('username')?.value as string;
      this._userService.recoveryPassword(name, lastName, username)
      .subscribe((psw) => {
          this.password = psw;
          if(psw == undefined) {
            this.messages = [{severity: 'error', detail: "Nessuna password trovata"}]
          }          
      });
    }    
  } 

  /**
   * Listener per la chiusura della RecoveryPasswordDialog ed
   * apertura della LoginDialog
   */
  openLoginDialog() : void {
    this.ref.close();
    let helper:LoginDialogHelper = new LoginDialogHelper();
    let width:string;
    let height:string 
    if(this.isMobileView()) {
      width = "100%";
      height = "100%";        
    } else {
      width = LoginDialogHelper.DEFAULT_WIDTH;
      height = LoginDialogHelper.DEFAULT_HEIGHT;
    }
    this.ref = this.dialogService.open(LoginDialogComponent, 
      helper.getDynamicDialogConfig(width, height));
  }

  /*
   * ===============
   * METODI PRIVATI 
   * ===============
   */

  private areInputsValid() : boolean {
    return !(this.hasInputNameErrors() || this.hasInputLastNameErrors() || this.hasInputUsernameErrors());
  }
}
