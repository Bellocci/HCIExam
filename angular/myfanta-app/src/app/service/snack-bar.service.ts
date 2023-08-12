import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

export interface SnackBarData {
  type : SnackBarDataTypeEnum;
  message : string;
}

class SnackBarDataImpl implements SnackBarData {

  type: SnackBarDataTypeEnum;
  message: string;

  constructor(private _type:SnackBarDataTypeEnum, private _message:string) {
    this.type = _type;
    this.message = _message;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar:MatSnackBar) { }
  
  private _config:MatSnackBarConfig = {
    duration : 5 * 1000,
    horizontalPosition : 'right',
    verticalPosition : 'top',
  }

  openSnackBar(message:ValidationProblem) : void {
    switch (message.getProblemType()) {
      case SnackBarDataTypeEnum.INFO_TYPE:
        this.openInfoSnackBar(message.getMessage());
        break;
      
      case SnackBarDataTypeEnum.WARNING_TYPE:
        this.openWarningSnackBar(message.getMessage());
        break;

      case SnackBarDataTypeEnum.ERROR_TYPE:
        this.openErrorSnackBar(message.getMessage());
        break;

      default:
        this.openInfoSnackBar(message.getMessage());
    } 
  }

  openInfoSnackBar(textMessage:string) {
    this._config.panelClass = ['snackbar', 'info-snackbar'];
    this._config.data = new SnackBarDataImpl(SnackBarDataTypeEnum.INFO_TYPE, textMessage);
    this._snackBar.openFromComponent(CustomSnackbarComponent, this._config);
  }

  openInfoWithCustomDurationSnackBar(textMessage:string, duration:number) {
    this._config.panelClass = ['snackbar', 'info-snackbar'];
    this._config.duration = duration;
    this._config.data = new SnackBarDataImpl(SnackBarDataTypeEnum.INFO_TYPE, textMessage);
    this._snackBar.openFromComponent(CustomSnackbarComponent, this._config);
  }

  openWarningSnackBar(textMessage:string) : void {
    this._config.panelClass = ['snackbar', 'warning-snackbar'];
    this._config.data = new SnackBarDataImpl(SnackBarDataTypeEnum.WARNING_TYPE, textMessage);
    this._snackBar.openFromComponent(CustomSnackbarComponent, this._config);
  }

  openErrorSnackBar(textMessage:string) {
    this._config.panelClass = ['snackbar', 'error-snackbar'];
    this._config.data = new SnackBarDataImpl(SnackBarDataTypeEnum.ERROR_TYPE, textMessage);
    this._snackBar.openFromComponent(CustomSnackbarComponent, this._config);
  }
}
