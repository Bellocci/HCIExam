import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { UserService } from 'src/app/service/user.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { UserEntity } from 'src/model/userEntity.model';
import { DialogHelper } from '../dialogHelper.interface';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { Subscription } from 'rxjs';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class SignupDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI
   * ==========
   */

  /*
    - ^[\s] : se la parola inizia con uno spazio, tab o nuova linea allora abbiamo match    
    - [^a-zA-Z\h] : se la parola contiene un numero o un carattere speciale ad eccezione dello spazio allora abbiamo match
    - \h{2,} : se la parola ha due o più spazi consecutivi allora abbiamo match
  */
  private nameAndSurnameRe:RegExp = new RegExp(/^[\s]|[^a-zA-Z\h]|\h{2,}/);
  /*
    - [^a-zA-Z0-9] : Se la parola contiene un carattere non presente nel range definito allora viene catturato
    - (?!.*[\s\n]) : cerca in avanti e assicura che non ci siano spazi o invii
  */
  private usernameRe:RegExp = new RegExp(/[^a-zA-Z0-9](?!.*[\s\n])/);
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
  private _showErrorMessage: boolean = false;    
  private _signUpButtonDisabled: boolean = true;    
  private _showPassword: boolean = false;  
  private _createdNewUser: boolean = false;  

  private _isMobileBreakpointActive:boolean = false;
  private _subscriptionMobileBreakpoint:Subscription;
  
  /* FORM CONTROL */
  nameFormControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required, Validators.minLength(this.minLength), 
      Validators.maxLength(this.maxLength), this.nameAndSurnameValidator(this.nameAndSurnameRe)]
  });

  surnameFormControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required, Validators.minLength(this.minLength), 
      Validators.maxLength(this.maxLength), this.nameAndSurnameValidator(this.nameAndSurnameRe)]
  });

  usernameFormControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required, Validators.minLength(this.minLength), 
      Validators.maxLength(this.maxLength), this.usernameValidator(this.usernameRe)]
  });

  passwordFormControl:FormControl<string | null> = new FormControl<string | null>('', {
    validators : [Validators.required, Validators.minLength(this.minLengthPassword), 
      Validators.maxLength(this.maxLengthPassword), this.passwordValidator(this.passwordRe)]
  });

  /* Mapping dei messagi di errore */

  errorMessageMap:Map<string,string> = new Map<string,string>([
    ["required", "Campo obbligatorio"],
    ["minlength", "Il campo deve contenere almeno "],
    ["maxlength", "Il campo può contenere al massimo "],
    ["digitOrSpecialCharacters", "Numeri e caratteri speciali non sono consentiti"],
    ["specialCharacters", "I caratteri speciali non sono consentiti"],
    ["passwordCharacters", "La password deve contenere almeno una lettera minuscola, una lettera maiuscola, " + 
      "un numero ed un carattere speciale."],
    ["undefined", "Errore di validazione"]    
  ]);

  constructor(private _userService:UserService, private dialogService:DialogService, 
    public breakpointsService:BreakpointsService) {
      console.log("Construct Signup dialog component");
      this._subscriptionMobileBreakpoint = this.observeMobileBreakpoint();
  }  

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log("Destroy Signup dialog component");
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

  public get showErrorMessage(): boolean {
    return this._showErrorMessage;
  }

  public set showErrorMessage(value: boolean) {
    this._showErrorMessage = value;
  }

  public get signUpButtonDisabled(): boolean {
    return this._signUpButtonDisabled;
  }

  public set signUpButtonDisabled(value: boolean) {
    this._signUpButtonDisabled = value;
  }

  public get showPassword(): boolean {
    return this._showPassword;
  }

  public set showPassword(value: boolean) {
    this._showPassword = value;
  }

  public get createdNewUser(): boolean {
    return this._createdNewUser;
  }
  
  public set createdNewUser(value: boolean) {
    this._createdNewUser = value;
  }

  getErrorNameMessage() : string {
    if(this.nameFormControl.errors) {
      for(let error of Object.keys(this.nameFormControl.errors)) {
        return this.getErrorMessage(this.nameFormControl, error);
      }
    }

    return "";
  }

  getErrorSurnameMessage() : string {
    if(this.surnameFormControl.errors) {
      for(let error of Object.keys(this.surnameFormControl.errors)) {
        return this.getErrorMessage(this.surnameFormControl, error);
      }
    }

    return "";
  }

  getErrorUsernameMessage() : string {
    if(this.usernameFormControl.errors) {
      for(let error of Object.keys(this.usernameFormControl.errors)) {
        return this.getErrorMessage(this.usernameFormControl, error);
      }
    }

    return "";
  }

  getErrorPasswordMessage() : string {
    if(this.passwordFormControl.errors) {
      for(let error of Object.keys(this.passwordFormControl.errors)) {
        return this.getErrorMessage(this.passwordFormControl, error);
      }
    }

    return "";
  }

  private getErrorMessage(formControl:UntypedFormControl, typeError:string) : string {
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

  /**
   * =========
   * LISTENER
   * =========
   */

  toggleShowPassword() : void {
    this.showPassword = !this.showPassword;
  }

  disableRegistration() : void {
    this.canCompleteRegistration() ? this.signUpButtonDisabled = false : this.signUpButtonDisabled = true;
  }

  registration() : void {
    let user:UserEntity | undefined = undefined;    
    if(this.canCompleteRegistration()) {
      // Siamo sicuri che contengono valori dal controllo precedente
      user = this._userService.createNewUser(
        this.nameFormControl.value!, this.surnameFormControl.value!, this.usernameFormControl.value!, this.passwordFormControl.value!);
    }
    
    if(!user) {
      this.showErrorMessage = true;
      this.createdNewUser = false;
    } else {
      this.showErrorMessage = false;
      this.createdNewUser = true;
    }
  }

  openLoginDialog() : void {
    let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();
    dialogHelper.closeDialog();
    if(this._isMobileBreakpointActive) {     
      dialogHelper.setWidth("100%");
      dialogHelper.setHeight("100%");
    } 
    dialogHelper.openDialog(LoginDialogComponent);
  }

  closeDialog() : void {
    this.dialogService.getDialogHelper().closeDialog();
  }

  /**
   * ===============
   * METODI PRIVATI
   * ===============
   */


  /* Custom validator */

  private nameAndSurnameValidator(nameAndSurnameRe:RegExp) : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {    
      const forbidden:boolean = nameAndSurnameRe.test(control.value);     
      return forbidden ? {digitOrSpecialCharacters: control.value} : null;
    };
  }

  private usernameValidator(usernameRe:RegExp) : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const forbidden:boolean = usernameRe.test(control.value);
      return forbidden ? {specialCharacters: control.value} : null;
    };
  }

  private passwordValidator(passwordRe:RegExp) : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const match:boolean = passwordRe.test(control.value);
      return !match ? {passwordCharacters: control.value} : null;
    }
  }  

  private canCompleteRegistration() : boolean {
    return this.nameFormControl.valid && this.surnameFormControl.valid && 
      this.usernameFormControl.valid && this.passwordFormControl.valid;
  }
}