import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { FilterDataService } from '../../service/filter-data.service';
import { StandardOption } from 'src/decorator/option/standard-option.model';
import { TeamEntity } from 'src/model/teamEntity.model';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { Subscription } from 'rxjs';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

/*
Metodo da utilizzare soprattutto per lo scroll della pagina quando si genera la squadra
createTeam(): void {
    if (!this.simpleOption.includeAdvancedFilter) {
      this.externalService.createTeamWithSimpleOption(this.simpleOption);
    } else if (this.option != null && this.leagueSelected != null) {
      this.externalService.createTeamWithAdvancedOption(this.option, this.leagueSelected.sport);
    }

    // Effettua lo scroll della pagina fino alla tabella dei giocatori
    const tableContainer = document.querySelector('#tableContainer');
    tableContainer?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });

    // TODO: Una volta terminato la creazione del team si visualizza un messaggio
    this.snackbarService.openInfoSnackBar("Generazione del team terminata!");
  }
*/

@Component({
  selector: 'app-option-filter',
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.scss'],
})
export class OptionFilterComponent implements OnInit, OnDestroy {
    
  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  @Output() 
  private optionToSend:EventEmitter<StandardOption> = new EventEmitter<StandardOption>();

  private _option!: StandardOption;  
  private _isMobileOrMobileXLBreakpointActive: boolean = false;  
  private _subscriptionToMobileOrMobileXLBreakpointObservable: Subscription;
  private _subscriptionToLeagueSelectedObservable:Subscription | undefined;

  /*
   * ============================
   * CONSTRUCT - INIT - DESTROYER 
   * ============================
   */

  constructor(private internalDataService:InternalDataService,
    private filterDataService:FilterDataService,
    private breakpointsService:BreakpointsService) {

    console.log("Construct Option filter component");
    
    this.option = new StandardOption();
    this.isMobileOrMobileXLBreakpointActive = BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);

    this._subscriptionToMobileOrMobileXLBreakpointObservable = this.observeMobileOrMobileXLBreakpoint();
  }  
  
  ngOnInit(): void {
    this.optionToSend.emit(this.option);
  }

  ngOnDestroy(): void {
    console.log("Destroy option filter component");

    this._subscriptionToMobileOrMobileXLBreakpointObservable.unsubscribe();
    this._subscriptionToLeagueSelectedObservable != undefined ? this._subscriptionToLeagueSelectedObservable.unsubscribe() : null;
  }  

  /*
   * ===========
   * OBSERVABLE 
   * ===========
   */

  private observeMobileOrMobileXLBreakpoint() : Subscription {
    return this.breakpointsService.mobileOrMobileXLObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(isActive => this.isMobileOrMobileXLBreakpointActive = isActive)
        .error(err => console.log("Error while retriving mobile or mobile xl breakpoint : " + err))
        .build()
    );
  }

  /*
   * ================
   * GETTER & SETTER  
   * ================
   */

  public get option(): StandardOption {
    return this._option;
  }

  public set option(value: StandardOption) {
    this._option = value;
  }

  public get isMobileOrMobileXLBreakpointActive(): boolean {
    return this._isMobileOrMobileXLBreakpointActive;
  }

  private set isMobileOrMobileXLBreakpointActive(value: boolean) {
    this._isMobileOrMobileXLBreakpointActive = value;
  }

  /*
   * ============
   * VISIBILITA'  
   * ============
   */

  isTeamSelected(team:TeamEntity) : boolean {
    return this.option.selectedTeams.has(team);
  }

  isClearSelectedTeamsEnabled() : boolean {
    // TODO: da implementare
    return false;
  }

  /*
   * =========
   * LISTENER  
   * =========
   */

  changeSelectedList(team:TeamEntity) : void {    
    this.option.selectedTeams.has(team) ? this.option.selectedTeams.delete(team) : this.option.selectedTeams.add(team);
    this.optionToSend.emit(this.option);
  }

  checkBudgetValue() : void {
    this.option.budget < 0 ? this.option.budget = 0 : this.option.budget = Math.trunc( this.option.budget );
    this.optionToSend.emit(this.option);
  }

  checkMinAgeValue() : void {
    if(this.option.minAge < 18) {
      this.option.minAge = 18;
    } else if(this.option.minAge > this.option.maxAge) {
      this.option.minAge = this.option.maxAge;
    } else {
      this.option.minAge = Math.trunc(this.option.minAge);
    }
    this.optionToSend.emit(this.option);
  }

  checkMaxAgeValue() : void {
    if(this.option.maxAge > 100) {
      this.option.maxAge = 99;
    } else if(this.option.maxAge < this.option.minAge) {
      this.option.maxAge = this.option.minAge;
    } else {
      this.option.maxAge = Math.trunc(this.option.maxAge);
    }
    this.optionToSend.emit(this.option);
  }

  checkFavoritePlayersAreIncluded(included:boolean) : void {
    this.option.includeFavorite = included;
    this.optionToSend.emit(this.option);
  }

  checkBlacklistPlayersAreIncluded(included:boolean) : void {
    this.option.includeBlacklist = included;
    this.optionToSend.emit(this.option);
  }

  checkAdvancedFilterAreIncluded(included:boolean) : void {
    this.option.includeAdvancedFilter = included;
    this.optionToSend.emit(this.option);
  }  

  updateSelectedTeamsList(team: TeamEntity): void {
    // TODO: da implementare
  }
}
