import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar:MatSnackBar) { }
  
  private _action:string = 'Close';
  private _config:MatSnackBarConfig = {
    duration : 3 * 1000,
    horizontalPosition : 'center',
    verticalPosition : 'bottom'
  }

  openSnackBar(textMessage:string) {
    this._snackBar.open(textMessage, this._action, this._config);
  }
}
