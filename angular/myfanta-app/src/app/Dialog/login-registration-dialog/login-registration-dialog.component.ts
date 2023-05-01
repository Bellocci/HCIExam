import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-registration-dialog',
  templateUrl: './login-registration-dialog.component.html',
  styleUrls: ['./login-registration-dialog.component.css']
})
export class LoginRegistrationDialogComponent implements OnInit  {

  // Attributi visualizzazione dialog
  private showRegistration:boolean = false;
  private showRecoveryPassword:boolean = false;

  // Attributi disabilitare bottoni
  disableRecoveryPasswordBtn:boolean = true;

  constructor() { }

  ngOnInit(): void { }

  /* METODI VISIBILITA' */

  isLoginViewShowed() : boolean {
    return !this.showRegistration && !this.showRecoveryPassword;
  }

  isRegistrationViewShowed() : boolean {
    return this.showRegistration;
  }

  isRecoveryPasswordViewShowed() : boolean {
    return this.showRecoveryPassword;
  }

  /* SETTER */

  showLoginView() : void {
    this.showRegistration = false;
    this.showRecoveryPassword = false;
  }

  showRegistrationView() : void {
    this.showRegistration = true;
    this.showRecoveryPassword = false;
  }

  showRecoveryPasswordView() : void {
    this.showRecoveryPassword = true;
    this.showRegistration = false;
  }
}
