import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/decorator/user.model';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationDialogComponent implements OnInit {

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
  private showError:boolean = false;
  private disableRegistrationBtn:boolean = true;
  private showPassword:boolean = false;

  private createdNewUser:boolean = false;
  
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

  constructor(private _userService:UserService, 
    private dialogService:DialogService) {    
  }

  ngOnInit(): void {}

  /* Custom validator */

  nameAndSurnameValidator(nameAndSurnameRe:RegExp) : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {    
      const forbidden:boolean = nameAndSurnameRe.test(control.value);     
      return forbidden ? {digitOrSpecialCharacters: control.value} : null;
    };
  }

  usernameValidator(usernameRe:RegExp) : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const forbidden:boolean = usernameRe.test(control.value);
      return forbidden ? {specialCharacters: control.value} : null;
    };
  }

  passwordValidator(passwordRe:RegExp) : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const match:boolean = passwordRe.test(control.value);
      return !match ? {passwordCharacters: control.value} : null;
    }
  }

  checkEqualsPasswordValidator() : ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const password:string = control.parent?.value.password;
      return password != control.value ? {checkEqualsPassword: control.value} : null;
    }
  }

  /* Metodi visibilità */
  showErrorMessage() : boolean {
    return this.showError;
  }

  isRegistrationBtnDisabled() : boolean {
    return this.disableRegistrationBtn;
  }

  isPasswordVisible() : boolean {
    return this.showPassword;
  }

  hasInputNameErrors() : boolean {
    return !this.nameFormControl.valid;
  }

  hasInputSurnameErrors() : boolean {
    return !this.surnameFormControl.valid;
  }

  hasInputUsernameErrors() : boolean {
    return !this.usernameFormControl.valid;
  }

  hasInputPasswordErrors() : boolean {
    return !this.passwordFormControl.valid;
  }

  hasNewUserBeenCreated() : boolean {
    return this.createdNewUser;
  }

  /* Getter */

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
    let msg:string | undefined = this.errorMessageMap.get(typeError);
    if(!msg) {
      return this.errorMessageMap.get("undefined")!;
    } else if(typeError == 'minlength') {      
        return msg + formControl.errors?.[typeError].requiredLength + " caratteri";
    } else if(typeError == 'maxlength') {
        return msg + formControl.errors?.[typeError].requiredLength + " caratteri";
    } else {
      return msg;
    }
  }

  /* Setter */

  toggleShowPassword() : void {
    this.showPassword = !this.showPassword;
  }

  /* Metodi generici */

  canCompleteRegistration() : boolean {
    return this.nameFormControl.valid && this.surnameFormControl.valid && 
      this.usernameFormControl.valid && this.passwordFormControl.valid;
  }

  disableRegistration() : void {
    this.canCompleteRegistration() ? this.disableRegistrationBtn = false : this.disableRegistrationBtn = true;
  }

    registration() : void {
    let user:User | undefined = undefined;    
    if(this.canCompleteRegistration()) {
      // Siamo sicuri che contengono valori dal controllo precedente
      user = this._userService.createNewUser(
        this.nameFormControl.value!, this.surnameFormControl.value!, this.usernameFormControl.value!, this.passwordFormControl.value!);
    }
    
    if(!user) {
      this.showError = true;
      this.createdNewUser = false;
    } else {
      this.showError = false;
      this.createdNewUser = true;
    }
  }

  openLoginDialog() : void {
    this.dialogService.getRegistrationDialogHelper().closeDialog();
    this.dialogService.getLoginHelper().openDialog();
  }

  closeDialog() : void {
    this.dialogService.getRegistrationDialogHelper().closeDialog();
  }
}