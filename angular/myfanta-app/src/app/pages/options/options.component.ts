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
  private _subscribeToLeagueObservable : Subscription | undefined;

  /*
   * ============================
   * CONSTRUCTOR, INIT & DESTROY 
   * ============================
   */
  constructor(private internalDataService: InternalDataService,
    public breakpointsService:BreakpointsService) { 

      console.log("Construct Option component");
      this._subscribeToLeagueObservable = this.observeLeagueSelected();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // this.internalDataService.setLoadingData(false);
  }

  ngOnDestroy(): void {
    console.log("Destroy option component");

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

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

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