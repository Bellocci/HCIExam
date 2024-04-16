import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';
import { ObservableHelper } from 'src/utility/observable-helper';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

/*
 * ===========
 * Animazioni 
 * ===========
 */

// Selezione team
const teamSelect = trigger('teamSelect', [
  state('unselected', style({
    width: '50px',
  })),
  state('selected', style({
    width: '100px',
  })),  
  transition('unselected => selected', [animate('0.3s ease')]),
  transition('selected => unselected', [animate('0.3s ease')]),
]); 

@Component({
  selector: 'app-team-list-responsive',
  templateUrl: './team-list-responsive.component.html',
  styleUrls: ['./team-list-responsive.component.scss'],
  animations: [teamSelect]
})
export class TeamListResponsiveComponent implements OnInit, OnDestroy, OnChanges {

  /*
   * ==========
   * VARIABILI
   * ==========
   */

  @Input()
  clearTeams:boolean = false;

  @Output()
  updateSelectedTeamEvent: EventEmitter<TeamEntity> = new EventEmitter();
  
  @ViewChild("teamSelect") 
  teamSelect!:MatSelect;
  
  private _selectedTeams: Set<TeamEntity> = new Set();  
  private _teams: TeamEntity[] = [];  
  private _isMobileBreakpointActive: boolean = false;  

  private _subscriptionToLeagueObservable: Subscription | undefined;
  private _subscriptionMobileObservable!:Subscription;

  private _observableSelectedTeams:ObservableHelper<TeamEntity[]> = new ObservableHelper<TeamEntity[]>([]);

  /*
   * ===========================
   * CONSTRUCTOR, INIT, DESTROY
   * ===========================
   */
  constructor(private internalDataService: InternalDataService, 
    private filterDataService: FilterDataService,
    public breakpointsService: BreakpointsService) {

    console.log("Construct Custom chip listbox component");

    this.isMobileBreakpointActive = BreakpointsService.isMobileBreakpointActive(window.innerWidth);

    this._subscriptionToLeagueObservable = this.addObserverToLeague();
    this._subscriptionMobileObservable = this.addObserverToMobileBreakpoints();
  }  

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['clearTeams'].currentValue) {
      this.clearSelectedTeams();
    }
    this.clearTeams = false;
  }

  ngOnDestroy(): void {
    console.log("Destroy Custom Chip Listbox component");
    this._subscriptionToLeagueObservable != undefined ? this._subscriptionToLeagueObservable.unsubscribe() : null;
    this._subscriptionMobileObservable.unsubscribe();
    this._observableSelectedTeams.complete();
  }

  /*
   * =========
   * OBSERVER
   * =========
   */
  private addObserverToLeague(): Subscription | undefined {
    return this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
      .next(league => {
        this.teams = league != null ? this.filterDataService.filterTeamsByLeague(league) : [];
      })
      .error(error => console.log("Error while retriving league: " + error))
      .build()
    )
  }

  private addObserverToMobileBreakpoints() : Subscription {
    return this.breakpointsService.mobileObservable.subscribe(new ObserverStepBuilder<boolean>()
        .next(isMobileBreakpointActive => this.isMobileBreakpointActive = isMobileBreakpointActive)
        .error(error => console.log("Error while retriving mobile breakpoints :" + error))
        .build());
  }

  /*
   * ==================
   * GETTER AND SETTER
   * ==================
   */

  public get teams(): TeamEntity[] {
    return this._teams;
  }

  private set teams(value: TeamEntity[]) {
    this._teams = value;
  }

  public get selectedTeams(): Set<TeamEntity> {
    return this._selectedTeams;
  }

  private set selectedTeams(value: Set<TeamEntity>) {
    this._selectedTeams = value;
  }

  public get isMobileBreakpointActive(): boolean {
    return this._isMobileBreakpointActive;
  }
  
  private set isMobileBreakpointActive(value: boolean) {
    this._isMobileBreakpointActive = value;
  }

  getSelectedTeams() : TeamEntity[] {
    return [... this.selectedTeams.values()];
  }

  /*
   * ============
   * VISIBILITA'
   * ============
   */

  isTeamSelected(team: TeamEntity): boolean {
    return this.selectedTeams.has(team);
  }

  /*
   * =========
   * LISTENER
   * =========
   */

  updateSelectedTeams(team: TeamEntity): void {
    this.selectedTeams.has(team) ? this.selectedTeams.delete(team) : this.selectedTeams.add(team);
    this.updateSelectedTeamEvent.emit(team);
  }

  /*
   * ===============
   * METODI PRIVATI
   * ===============
   */

  private clearSelectedTeams() : void {  
    if(this.isMobileBreakpointActive) {
      /*
       * Deseleziono tutti gli elementi dal select 
       */ 
      let selected:MatOption<any>[];
      if(this.teamSelect.selected instanceof Array) {
        selected = this.teamSelect.selected;
      } else {
        selected = [this.teamSelect.selected];
      }
      selected.forEach(option => option.deselect());

    }

    this.selectedTeams.clear();

  }
}
