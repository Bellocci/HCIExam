import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { PlayerSearchFilter } from 'src/app/service/player-search-filter';
import { StandardMatchPlayedEnum } from 'src/enum/optionEnum/StandardMatchPlayedEnum';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { RolePlayerEntity } from 'src/model/rolePlayerEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';
import { ObservableHelper } from 'src/utility/observable-helper';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

@Component({
  selector: 'app-option-player-search',
  templateUrl: './option-player-search.component.html',
  styleUrls: ['./option-player-search.component.scss']
})
export class OptionPlayerSearchComponent implements OnDestroy {

  /*
   * ==========
   * VARIABILI
   * ==========
   */

  @ViewChild("roleSelect") roleSelect!:MatSelect;
  @ViewChild("matchPlayedPercSelect") matchPlayedPercSelect!:MatSelect;

  standardMatchPlayedEnum: typeof StandardMatchPlayedEnum = StandardMatchPlayedEnum;

  private _playerSearchFilterObservable:ObservableHelper<PlayerSearchFilter> = new ObservableHelper<PlayerSearchFilter>(new PlayerSearchFilter());
  private _roles: RolePlayerEntity[] = [];
  private _teams: TeamEntity[] = [];
  private _isMobileOrMobileXLBreakpointActive: boolean = false;    
  private _isMobileBreakpointActive: boolean = false;   

  private _subscriptionToMobileOrMobileXLBreakpointObservable: Subscription;
  private _subscriptionToMobileBreakpointObservable : Subscription;
  private _subscriptionObserverToLeague: Subscription | undefined;

  /**
   * =======================
   * CONSTRUCTOR & DESTROY
   * =======================
   */

  constructor(public breakpointsService:BreakpointsService, 
    private internalDataService:InternalDataService,
    private filterDataService:FilterDataService) {

    console.log("Construct option player search component");
    
    let windowWidth:number = window.innerWidth;
    this.isMobileOrMobileXLBreakpointActive = BreakpointsService.isMobileOrMobileXLBreakpointActive(windowWidth);
    this.isMobileBreakpointActive = BreakpointsService.isMobileBreakpointActive(windowWidth);

    this._subscriptionToMobileOrMobileXLBreakpointObservable = this.observeMobileOrMobileXLBreakpoint();
    this._subscriptionToMobileBreakpointObservable = this.observeMobileBreakpoint();
    this._subscriptionObserverToLeague = this.addObserverToLeague();
  }
  
  ngOnDestroy(): void {
    console.log("Destroy option player search component");
    
    this._subscriptionToMobileBreakpointObservable.unsubscribe();
    this._subscriptionToMobileOrMobileXLBreakpointObservable.unsubscribe();
    this._subscriptionObserverToLeague != undefined ? this._subscriptionObserverToLeague.unsubscribe() : null;
  }

  /*
   * =========
   * OBSERVER
   * =========
   */

  private observeMobileBreakpoint() : Subscription {
    return this.breakpointsService.mobileObservable.subscribe(new ObserverStepBuilder<boolean>()
        .next(isMobile => this.isMobileBreakpointActive = isMobile)
        .error(error => console.log("Error while retriving mobile breakpoint: " + error))
        .build())
  }

  private observeMobileOrMobileXLBreakpoint() : Subscription {
    return this.breakpointsService.mobileOrMobileXLObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(isActive => this.isMobileOrMobileXLBreakpointActive = isActive)
        .error(err => console.log("Error while retriving mobile or mobile xl breakpoint : " + err))
        .build()
    );
  }

  private addObserverToLeague(): Subscription | undefined {
    return this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
      .next(league => {
        if (league != null) {
          this.roles = this.filterDataService.filterRolesBySport(league.sport);
          this.teams = this.filterDataService.filterTeamsByLeague(league);
          let filter:PlayerSearchFilter = this._playerSearchFilterObservable.getValue();
          filter.league = league;
          this._playerSearchFilterObservable.setValue(filter);
        }
      })
      .error(error => console.log("Error while retriving league: " + error))
      .build()
    )
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  public get isMobileBreakpointActive(): boolean {
    return this._isMobileBreakpointActive;
  }

  private set isMobileBreakpointActive(value: boolean) {
    this._isMobileBreakpointActive = value;
  }

  public get isMobileOrMobileXLBreakpointActive(): boolean {
    return this._isMobileOrMobileXLBreakpointActive;
  }

  private set isMobileOrMobileXLBreakpointActive(value: boolean) {
    this._isMobileOrMobileXLBreakpointActive = value;
  }

  public get roles(): RolePlayerEntity[] {
    return this._roles;
  }

  private set roles(roles: RolePlayerEntity[]) {
    this._roles = roles;
  }

  public get teams(): TeamEntity[] {
    return this._teams;
  }

  private set teams(value: TeamEntity[]) {
    this._teams = value;
  }

  getSelectedRoles() : RolePlayerEntity[] {
    return this._playerSearchFilterObservable.getValue().rolesList;
  }

  getMatchPlayedPerc() : StandardMatchPlayedEnum {
    return this._playerSearchFilterObservable.getValue().matchPlayedPerc;
  }

  /*
   * ============
   * VISIBILITA'
   * ============
   */

  isRoleSelected(role: RolePlayerEntity): boolean {
    return this._playerSearchFilterObservable.getValue().rolesList.find(r => r.equals(role)) != undefined;
  }

  isMatchFilterSelected(filter: StandardMatchPlayedEnum): boolean {
    return this._playerSearchFilterObservable.getValue().matchPlayedPerc.value == filter.value;
  }

  isTeamSelected(team: TeamEntity) : boolean {
    return this._playerSearchFilterObservable.getValue().teamsList.find(t => t.equals(team)) != undefined;
  }

  isClearSelectedTeamsEnabled() : boolean {
    return this._playerSearchFilterObservable.getValue().teamsList.length == 0;
  }

  /*
   * ========= 
   * LISTENER
   * =========
   */

  updateRolesSelectedList(role: RolePlayerEntity): void {
    let filter:PlayerSearchFilter = this._playerSearchFilterObservable.getValue();
    filter.addOrRemoveRole(role);
    this._playerSearchFilterObservable.setValue(filter);
  }

  updateMatchFilterSelected(matchPlayedPerc: StandardMatchPlayedEnum): void {
    let filter:PlayerSearchFilter = this._playerSearchFilterObservable.getValue();
    filter.matchPlayedPerc = matchPlayedPerc;
    this._playerSearchFilterObservable.setValue(filter);
  }

  updateSelectedTeamsList(team: TeamEntity): void {
    let filter:PlayerSearchFilter = this._playerSearchFilterObservable.getValue();
    filter.addOrRemoveTeam(team)
    this._playerSearchFilterObservable.setValue(filter);
  }

  clearSearchFilter(): void {    
    let filter:PlayerSearchFilter = this._playerSearchFilterObservable.getValue();
    filter.clearSearchFilter();
    this._playerSearchFilterObservable.setValue(filter);

    // Rimozione ruoli selezionati dalla componente MatSelect
    this.clearRolesFromMatSelect();

    // Rimozione il numero di partite giocate (in percentuale) dalla componente MatSelect
    this.clearMatchPlayedPercMatSelect();
  }

   /*
   * ===============
   * METODI PRIVATI
   * ===============
   */

   private clearRolesFromMatSelect() {
    if(this.isMobileBreakpointActive) {
      /*
       * Deseleziono tutti gli elementi dal select 
       */ 
      let selected:MatOption<any>[];
      if(this.roleSelect.selected instanceof Array) {
        selected = this.roleSelect.selected;
      } else {
        selected = [this.roleSelect.selected];
      }
      selected.forEach(option => option.deselect());
    }
  }

  private clearMatchPlayedPercMatSelect() {
    if(this.isMobileBreakpointActive) {
      /*
       * Deseleziono l'elemento selezionato dal select 
       */ 
      let optionSelected:MatOption<any>;
      if(this.matchPlayedPercSelect.selected instanceof Array) {
        optionSelected = this.matchPlayedPercSelect.selected.pop()!;
      } else {
        optionSelected = this.matchPlayedPercSelect.selected;
      }
      optionSelected.deselect();
      this.matchPlayedPercSelect.value = StandardMatchPlayedEnum.ALL_PLAYERS;
    }
  }
}
