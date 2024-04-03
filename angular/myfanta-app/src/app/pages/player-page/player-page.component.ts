import { Component, OnDestroy, OnInit } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private _playerSelected: PlayerEntity | null = null;
  private _subscriptionPlayerSelectedObservable:Subscription | undefined;
  private _isMobileBreakpointActive: boolean = false;  
  private _subscriptionMobileBreakpointObservable:Subscription;

  /*
   * ============================
   * CONSTRUCTOR, INIT & DESTROY 
   * ============================
   */
  constructor(private internalDataService:InternalDataService,
    private breakpointsService:BreakpointsService) {

    console.log("Construct Player page component");
    this._subscriptionMobileBreakpointObservable = this.observeMobileBreakpoint();
    this._subscriptionPlayerSelectedObservable = this.observePlayerSelected();
  }  

  ngOnInit(): void {
    //this.internalDataService.setLoadingData(false);
  }

  ngOnDestroy(): void {
    console.log("Destroy Player page component");
    this._subscriptionMobileBreakpointObservable.unsubscribe();
    this._subscriptionPlayerSelectedObservable != undefined ? this._subscriptionPlayerSelectedObservable.unsubscribe() : null;
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private observePlayerSelected() : Subscription | undefined {
    return this.internalDataService.addObserverToPlayerSelected(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => this.playerSelected = player)
      .build());
  }

  private observeMobileBreakpoint() : Subscription {
    return this.breakpointsService.mobileObservable.subscribe(new ObserverStepBuilder<boolean>()
      .next(isActive => this.isMobileBreakpointActive = isActive)
      .error(err => console.log("Error while retriving mobile breakpoint : " + err))
      .build());
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  public get playerSelected(): PlayerEntity | null {
    return this._playerSelected;
  }

  private set playerSelected(value: PlayerEntity | null) {
    this._playerSelected = value;
  }

  public get isMobileBreakpointActive(): boolean {
    return this._isMobileBreakpointActive;
  }

  private set isMobileBreakpointActive(value: boolean) {
    this._isMobileBreakpointActive = value;
  }
}
