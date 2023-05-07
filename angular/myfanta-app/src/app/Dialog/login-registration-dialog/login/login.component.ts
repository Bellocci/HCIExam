import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { UserEntity } from 'src/model/userEntity.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  // Parametri in uscita verso il parent
  @Output() recoveryPasswordView = new EventEmitter<boolean>();  

  usernameControl:FormControl = new FormControl('', {
    validators : [Validators.required],
  });

  passwordControl:FormControl = new FormControl('', {
    validators: [Validators.required]
  });  

  // Attributi visibilità
  private disableLoginBtn:boolean = true;
  private showLoginErrorMessage:boolean = false;
  private showPassword:boolean = false;
  private firstLogin:boolean = true;

  constructor(private _userService:UserService) {
  }
  
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
    this.recoveryPasswordView.emit(true);
  }

   /* Login */

   login() : void {
    if(this.firstLogin) {
      this.firstLogin = false;
    }
    this._userService.login(this.usernameControl.value as string, this.passwordControl.value as string);
   }
}
