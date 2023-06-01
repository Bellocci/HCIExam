import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar:MatSnackBar) { }
  
  private _action:string = 'Close';
  private _config:MatSnackBarConfig = {
    duration : 5 * 1000,
    horizontalPosition : 'center',
    verticalPosition : 'top'
  }

  openInfoSnackBar(textMessage:string) {
    this._config.panelClass = ['white-snackbar', 'snackbar'];
    this._snackBar.open(textMessage, this._action, this._config);
  }

  openSnackBarError(textMessage:string) {
    
  }
}
