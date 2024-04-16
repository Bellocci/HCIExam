import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { Subscription } from 'rxjs';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionsFootballComponent } from './options-football/options-football.component';
import { IdMatCard } from './IdMatCardInterface';
import { OptionsVolleyballComponent } from './options-volleyball/options-volleyball.component';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { OptionsBasketballComponent } from './options-basketball/options-basketball.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, AfterViewInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private _sportSelected: SportEnum | null = null;
  private _isMobileOrTabletBreakpointActive: boolean = false;  

  private _subscribeToLeagueObservable: Subscription | undefined;
  private _subscriptionToMobileOrTabletBreakpointObservable: Subscription;

  /*
   * ============================
   * CONSTRUCTOR, INIT & DESTROY 
   * ============================
   */
  constructor(private internalDataService: InternalDataService,
    private breakpointsService:BreakpointsService) { 

      console.log("Construct Option component");

      this.isMobileOrTabletBreakpointActive = BreakpointsService.isMobileOrTabletBreakpointActive(window.innerWidth); 
      this._subscribeToLeagueObservable = this.observeLeagueSelected();
      this._subscriptionToMobileOrTabletBreakpointObservable = this.observeMobileOrTabletBreakpoint();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // this.internalDataService.setLoadingData(false);
  }

  ngOnDestroy(): void {
    console.log("Destroy option component");

    this._subscriptionToMobileOrTabletBreakpointObservable.unsubscribe();
    this._subscribeToLeagueObservable != undefined ? this._subscribeToLeagueObservable.unsubscribe() : null;
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private observeLeagueSelected() : Subscription | undefined {
    return this.internalDataService.getObservableLeagueSelected()
        .subscribe(new ObserverStepBuilder<LeagueEntity | null>()
          .next(league => this._sportSelected = league != undefined ? league.sport : null)
          .error(err => console.log("Error while retriving League selected: " + err))
          .build());
  }

  private observeMobileOrTabletBreakpoint() : Subscription {
    return this.breakpointsService.mobileOrTabletObservable.subscribe(new ObserverStepBuilder<boolean>()
      .next(isActive => this.isMobileOrTabletBreakpointActive = isActive)
      .error(err => console.log("Error while retriving mobile or tablet breakpoint : " + err))
      .build());
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  public get isMobileOrTabletBreakpointActive(): boolean {
    return this._isMobileOrTabletBreakpointActive;
  }

  private set isMobileOrTabletBreakpointActive(value: boolean) {
    this._isMobileOrTabletBreakpointActive = value;
  }

  getIds() : IdMatCard[] {
    if(this.isFootballOptionsRendered()) {
      return OptionsFootballComponent.getIds();
    } else if(this.isVolleyballOptionsRendered()) {
      return OptionsVolleyballComponent.getIds();
    } else if(this.isBasketballOptionsRendered()) {
      return OptionsBasketballComponent.getIds();
    } else {
      return [];
    }
  }

  /*
   * ============
   * VISIBILITA' 
   * ============
   */

  isFootballOptionsRendered(): boolean {
    return this._sportSelected != null && this._sportSelected.code == SportEnum.FOOTBALL_SOCCER.code;
  }

  isVolleyballOptionsRendered() : boolean {
    return this._sportSelected != null && this._sportSelected.code == SportEnum.VOLLEYBALL.code;
  }

  isBasketballOptionsRendered() : boolean {
    return this._sportSelected != null && this._sportSelected.code == SportEnum.BASKETBALL.code;
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  scrollToCard(idCard: string) {
    // Effettua lo scroll della pagina fino alla card passata come parametro    
    !idCard.startsWith('#') ? idCard = '#' + idCard : null;
    let card: Element | null = document.querySelector(idCard);
    card?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

}