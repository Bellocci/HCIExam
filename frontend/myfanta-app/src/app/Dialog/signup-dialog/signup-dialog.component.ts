import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { User } from 'src/decorator/user';
import { Message, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginDialogHelper } from '../login-dialog/login-dialog-helper';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'],
  providers: [MessageService],
})
export class SignupDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI
   * ==========
   */
  signupFormGroup!: FormGroup;
  messages:Message[] = [];

  // Verifica se la parola inizia con uno spazio, tab o nuova linea
  blockSpaceTabAndNewLineRe:RegExp = /^[^\s]/;

  // Verifica se la parola contiene un numero o un carattere speciale
  private blockNumberAndSpecialCharsRe:RegExp = /[^a-zA-Z]/;

  // Verifica se la parola contiene un carattere speciale
  private blockSpecialCharsRe:RegExp = /[^a-zA-Z0-9]/;

  /* 
     - (?=.*[a-z]) : Cerca in avanti nella parola e matcha se trova almeno una lettera minuscola
     - (?=.*[A-Z]) : Cerca in avanti nella parola e matcha se trova almeno una lettera maiuscola
     - (?=.*\d) : Cerca in avanti nella parola e matcha se trova almeno un numero
     - (?=.*[-+_!@#$%^&*.,?]) : Cerca in avanti nella parola e matcha se trova almeno un carattere speciale
     - (?!.*[\s\n]) : cerca in avanti e assicura che non ci siano spazi o invii
  */
  private passwordRe = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?!.*[\s\n])/);

  private minLength:number = 3;
  private maxLength:number = 50;
  private minLengthPassword:number = 8;
  private maxLengthPassword:number = 64;

  // Attributi visibilità  
  private _createdNewUser: boolean = false;  

  // Mapping dei messagi di errore
  private errorMessageMap:Map<string,string> = new Map<string,string>([
    ["required", "Campo obbligatorio"],
    ["minlength", "Il campo deve contenere almeno "],
    ["maxlength", "Il campo può contenere al massimo "],
    ["digitOrSpecialCharacters", "Numeri, caratteri accentati e caratteri speciali non sono consentiti"],
    ["specialCharacters", "I caratteri speciali non sono consentiti"],
    ["passwordCharacters", "La password deve contenere almeno una lettera minuscola, una lettera maiuscola, " + 
      "un numero ed un carattere speciale."],
    ["undefined", "Errore di validazione"]    
  ]);

  constructor(private _userService:UserService, 
    public dialogService: DialogService,
    private messageService: MessageService,
    public breakpointsService:BreakpointsService,
    public ref: DynamicDialogRef) {
      console.log("Construct Signup dialog component");
  }  

  ngOnInit(): void {
    this.signupFormGroup = new FormGroup({
      name :  new FormControl<string | null>(null, {
        validators : [Validators.required, Validators.minLength(this.minLength), 
          Validators.maxLength(this.maxLength), this.nameAndSurnameValidator()]
      }),
      lastName : new FormControl<string | null>(null, {
        validators : [Validators.required, Validators.minLength(this.minLength), 
          Validators.maxLength(this.maxLength), this.nameAndSurnameValidator()]
      }),
      username : new FormControl<string | null>('', {
        validators : [Validators.required, Validators.minLength(this.minLength), 
          Validators.maxLength(this.maxLength), this.usernameValidator()]
      }),
      password : new FormControl<string | null>('', {
        validators : [Validators.required, Validators.minLength(this.minLengthPassword), 
          Validators.maxLength(this.maxLengthPassword), this.passwordValidator()]
      })
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy Signup dialog component");
  }

  /*
   * ================
   * GETTER & SETTER
   * ================
   */

  public get createdNewUser(): boolean {
    return this._createdNewUser;
  }
  
  public set createdNewUser(value: boolean) {
    this._createdNewUser = value;
  }

  getUsername() : string {
    return this.signupFormGroup.get('username')?.value;
  }

  getErrorInputNameMessage() : string {
    let nameFormControl = this.signupFormGroup.get('name');
    let errors = nameFormControl?.errors;
    if(nameFormControl && errors) {
      for(let error of Object.keys(errors)) {
        return this.getErrorMessage(nameFormControl, error);
      }
    }
    return "";
  }

  getErrorInputLastNameMessage() : string {
    let lastNameFormControl = this.signupFormGroup.get('lastName');
    let errors = lastNameFormControl?.errors;
    if(lastNameFormControl && errors) {
      for(let error of Object.keys(errors)) {
        return this.getErrorMessage(lastNameFormControl, error);
      }
    }
    return "";
  }

  getErrorInputUsernameMessage() : string {
    let usernameFormControl = this.signupFormGroup.get('username');
    let errors = usernameFormControl?.errors;
    if(usernameFormControl && errors) {
      for(let error of Object.keys(errors)) {
        return this.getErrorMessage(usernameFormControl, error);
      }
    }
    return "";
  }

  getErrorInputPasswordMessage() : string {
    let passwordFormControl = this.signupFormGroup.get('password');
    let errors = passwordFormControl?.errors;
    if(passwordFormControl && errors) {
      for(let error of Object.keys(errors)) {
        return this.getErrorMessage(passwordFormControl, error);
      }
    }
    return "";
  }

  getSignUpImageStyleWidth() : string {
    if(this.isMobileView()) {
      return "max-width-16rem";
    } else if(this.isTabletView()) {
      return "max-width-20rem";
    } else {
      return "max-width-22rem";
    }
  }

  /*
  * ============
  * VISIBILITA'
  * ============
  */

  isMobileView() : boolean {
    return BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);
  }

  isTabletView() : boolean {
    return BreakpointsService.isTabletBreakpointActive(window.innerWidth);
  }

  hasInputNameErrors() : boolean {
    let result = this.signupFormGroup.get('name')?.invalid;
    return result ? result : false;
  }

  hasInputLastNameErrors() : boolean {
    let result = this.signupFormGroup.get('lastName')?.invalid;
    return result ? result : false;
  }

  hasInputUsernameErrors() : boolean {
    let result = this.signupFormGroup.get('username')?.invalid;
    return result ? result : false;
  }

  hasInputPasswordErrors() : boolean {
    let result = this.signupFormGroup.get('password')?.invalid;
    return result ? result : false;
  }

  /*
   * =========
   * LISTENER
   * =========
   */

  signUp() : void {
    let user:User | undefined = undefined;    
    if(this.canCompleteSignUp()) {
      // Siamo sicuri che contengono valori dal controllo precedente
      let name = this.signupFormGroup.get('name')?.value as string;
      let lastName = this.signupFormGroup.get('lastName')?.value as string;
      let username = this.signupFormGroup.get('username')?.value as string;
      let password = this.signupFormGroup.get('password')?.value as string;
      this._userService.createNewUser(name, lastName, username, password)
        .subscribe((user) => {
          if(user == undefined) {
            this.messages = [{severity: 'error', detail: 'Username già esistente'}]
          }
          this.createdNewUser = user != undefined;
        });
    }
  }

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

  canCompleteSignUp() : boolean {
    return !(this.hasInputNameErrors() || this.hasInputLastNameErrors() || 
      this.hasInputUsernameErrors() || this.hasInputPasswordErrors());
  }

  getSignUpTooltip() : string {
    if(this.canCompleteSignUp()) {
      return "Crea un nuovo account";
    } else {
      return "Inserisci correttamente i dati nei campi per procedere con la registrazione";
    }
  }

  /*
   * ===============
   * METODI PRIVATI
   * ===============
   */

  private nameAndSurnameValidator() : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {    
      const forbidden:boolean = this.blockNumberAndSpecialCharsRe.test(control.value);     
      return forbidden ? {digitOrSpecialCharacters: control.value} : null;
    };
  }

  private usernameValidator() : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const forbidden:boolean = this.blockSpecialCharsRe.test(control.value);
      return forbidden ? {specialCharacters: control.value} : null;
    };
  }

  private passwordValidator() : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const match:boolean = this.passwordRe.test(control.value);
      return !match ? {passwordCharacters: control.value} : null;
    }
  }

  private getErrorMessage(formControl:AbstractControl<any, any>, typeError:string) : string {
    let message:string | undefined = this.errorMessageMap.get(typeError);
    if(message == undefined) {
      return this.errorMessageMap.get("undefined")!;
    } else if(typeError == 'minlength') {      
        return message + formControl.errors?.[typeError].requiredLength + " caratteri";
    } else if(typeError == 'maxlength') {
        return message + formControl.errors?.[typeError].requiredLength + " caratteri";
    } else {
      return message;
    }
  }
}