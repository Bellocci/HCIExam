import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI
   * ==========
   */

  message!: String;
  type!: SnackBarDataTypeEnum;

  private _subscriptionMessage:Subscription | undefined;
  private _subscriptionType:Subscription | undefined;

  /*
   * ================================
   * COSTRUTTORE, INIT E DISTRUTTORE
   * ================================
   */

  constructor(private _snackBarService: SnackBarService) {
    console.log("Construct Snack Bar Component");
    this._subscriptionMessage = this.observeMessage();
    this._subscriptionType = this.observeType();
  }  

  ngOnInit(): void {
    console.log("Init Snack Bar Component");    
    setTimeout(() => this._snackBarService.setSnackBarVisible(false), 50000);
  }

  ngOnDestroy(): void {
    console.log("Destroy Snack Bar component");
    this._subscriptionMessage != undefined ? this._subscriptionMessage.unsubscribe() : null;
    this._subscriptionType != undefined ? this._subscriptionType.unsubscribe() : null;
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

  /*
   * =========
   * LISTENER 
   * =========
   */

  closeSnackBarMessage() {
    this._snackBarService.setSnackBarVisible(false);
  }

}
