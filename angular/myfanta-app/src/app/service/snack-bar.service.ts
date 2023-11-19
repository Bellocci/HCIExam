import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';
import { ObservableHelper } from 'src/utility/observable-helper';
import { Observable, Observer, Subscription } from 'rxjs';

export interface SnackBarData {
  type: SnackBarDataTypeEnum;
  message: string;
}

class SnackBarDataImpl implements SnackBarData {

  type: SnackBarDataTypeEnum;
  message: string;

  constructor(private _type: SnackBarDataTypeEnum, private _message: string) {
    this.type = _type;
    this.message = _message;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService implements OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private _isSnackBarVisible: ObservableHelper<boolean> = new ObservableHelper<boolean>(false);
  private _message: ObservableHelper<String> = new ObservableHelper<String>("");
  private _type: ObservableHelper<SnackBarDataTypeEnum> = new ObservableHelper<SnackBarDataTypeEnum>(SnackBarDataTypeEnum.INFO_TYPE);
  private _config: MatSnackBarConfig = {
    duration: 500 * 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }

  /*
   * ==========================
   * COSTRUTTORE E DISTRUTTORE
   * ==========================
   */

  constructor(private _snackBar: MatSnackBar) {
    console.log("Construct Snack Bar service");
  }

  ngOnDestroy(): void {
    console.log("Destroy Snack Bar service");
    this._isSnackBarVisible.destroy();
    this._message.destroy();
    this._type.destroy();
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  addObserverToSnackBarVisible(observer: Observer<boolean>): Subscription | undefined {
    return this._isSnackBarVisible.addObserver(observer);
  }

  getSnackBarVisibleObservable(): Observable<boolean> {
    return this._isSnackBarVisible.getObservable();
  }

  isSnackBarVisible(): boolean {
    return this._isSnackBarVisible.getValue();
  }

  setSnackBarVisible(isVisible: boolean): void {
    this._isSnackBarVisible.setValue(isVisible);
  }  

  addObserverToMessage(observer: Observer<String>) : Subscription | undefined {
    return this._message.addObserver(observer);
  }

  getMessageObservable() : Observable<String> {
    return this._message.getObservable();
  }

  getMessage() : String {
    return this._message.getValue();
  }

  setMessage(message:String) {
    this._message.setValue(message);
  }

  addObserverToType(observer: Observer<SnackBarDataTypeEnum>) : Subscription | undefined {
    return this._type.addObserver(observer);
  }

  getTypeObservable() : Observable<SnackBarDataTypeEnum> {
    return this._type.getObservable();
  }

  getType() : SnackBarDataTypeEnum {
    return this._type.getValue();
  }

  setType(type:SnackBarDataTypeEnum) {
    this._type.setValue(type);
  }

  openSnackBar(message: ValidationProblem): void {
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

  openInfoSnackBar(textMessage: string) {
    this._message.setValue(textMessage);
    this._type.setValue(SnackBarDataTypeEnum.INFO_TYPE);
    this._isSnackBarVisible.setValue(true);
  }

  openInfoWithCustomDurationSnackBar(textMessage: string, duration: number) {
    this._config.panelClass = ['snackbar', 'info-snackbar'];
    this._config.duration = duration;
    this._config.data = new SnackBarDataImpl(SnackBarDataTypeEnum.INFO_TYPE, textMessage);
    this._snackBar.openFromComponent(CustomSnackbarComponent, this._config);
  }

  openWarningSnackBar(textMessage: string): void {
    this._message.setValue(textMessage);
    this._type.setValue(SnackBarDataTypeEnum.WARNING_TYPE);
    this._isSnackBarVisible.setValue(true);
  }

  openErrorSnackBar(textMessage: string) {
    this._message.setValue(textMessage);
    this._type.setValue(SnackBarDataTypeEnum.ERROR_TYPE);
    this._isSnackBarVisible.setValue(true);
  }
}
