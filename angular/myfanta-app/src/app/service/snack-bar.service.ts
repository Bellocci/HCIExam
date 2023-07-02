import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar:MatSnackBar) { }
  
  private _action:string = 'X';
  private _config:MatSnackBarConfig = {
    duration : 5 * 1000,
    horizontalPosition : 'right',
    verticalPosition : 'top',
  }

  openInfoSnackBar(textMessage:string) {
    this._config.panelClass = ['white-snackbar', 'snackbar'];
    this._snackBar.open(textMessage, this._action, this._config);
  }

  openInfoWithCustomDurationSnackBar(textMessage:string, duration:number) {
    this._config.panelClass = ['white-snackbar', 'snackbar'];
    this._config.duration = duration;
    this._snackBar.open(textMessage, this._action, this._config);
  }

  openErrorSnackBar(textMessage:string) {
    this._config.panelClass = ['red-snackbar', 'snackbar'];
    this._snackBar.open(textMessage, this._action, this._config);
  }
}
