import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0
      })),
      transition('visible => hidden', [
        animate('0.8s')
      ]),
      transition('hidden => visible', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class CustomSnackbarComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI
   * ==========
   */

  message!: String;
  type!: SnackBarDataTypeEnum;
  private _isSnackbarVisible: boolean = false;  

  private _subscriptionMessage:Subscription | undefined;
  private _subscriptionType:Subscription | undefined;
  private _subscriptionToSnackbarVisibleObservable : Subscription | undefined;

  /*
   * ================================
   * COSTRUTTORE, INIT E DISTRUTTORE
   * ================================
   */

  constructor(private _snackBarService: SnackBarService) {
    console.log("Construct Snack Bar Component");
    this._subscriptionMessage = this.observeMessage();
    this._subscriptionType = this.observeType();
    this._subscriptionToSnackbarVisibleObservable = this.observeSnackbarVisible();
  }  

  ngOnInit(): void {
    console.log("Init Snack Bar Component");        
  }

  ngOnDestroy(): void {
    console.log("Destroy Snack Bar component");
    this._subscriptionMessage != undefined ? this._subscriptionMessage.unsubscribe() : null;
    this._subscriptionType != undefined ? this._subscriptionType.unsubscribe() : null;    
    this._subscriptionToSnackbarVisibleObservable != undefined ? this._subscriptionToSnackbarVisibleObservable.unsubscribe() : null;
  }

  /*
   * ===============
   * METODI PRIVATI 
   * ===============
   */

  private observeMessage(): Subscription | undefined {
    return this._snackBarService.addObserverToMessage(new ObserverStepBuilder<String>()
      .next((value: String) => this.message = value)
      .error(error => console.log("Error while retrieving message from snack bar service: " + error))
      .build());

  }

  private observeType() : Subscription | undefined {
    return this._snackBarService.addObserverToType(new ObserverStepBuilder<SnackBarDataTypeEnum>()
        .next((value: SnackBarDataTypeEnum) => this.type = value)
        .error(error => "Error while retrieving type from SnackBar service: " + error)
        .build());
  }

  private observeSnackbarVisible() : Subscription | undefined {
    return this._snackBarService.addObserverToSnackBarVisible(
      new ObserverStepBuilder<boolean>()
        .next(isVisible => this.isSnackbarVisible = isVisible)
        .error(err => console.log("Error while retriving Snackbar visible observable : " + err))
        .build()
    )
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  public get isSnackbarVisible(): boolean {
    return this._isSnackbarVisible;
  }

  private set isSnackbarVisible(value: boolean) {
    this._isSnackbarVisible = value;
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  closeSnackBarMessage() {
    this._snackBarService.setSnackBarVisible(false);
  }

}
