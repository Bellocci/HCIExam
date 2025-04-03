import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TeamEntity } from 'src/model/teamEntity.model';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { PlayerSearchRequest } from 'src/rest-client/PlayerSearchRequest';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { SportEnum } from 'src/enum/SportEnum.model';
import { SportEnumPlayerSearchCreatorVisitor } from 'src/visitor/sport-enum/SportEnumPlayerSearchRequestCreatorVisitor';
import { Subscription } from 'rxjs';
import { LoadDataService } from 'src/app/service/load-data.service';
import { UserTeamService } from 'src/app/service/user-team.service';

@Component({
  selector: 'app-option-filter',
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.scss']
})
export class OptionFilterComponent implements OnInit, AfterViewInit, OnDestroy {
    
  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  @Output() 
  private playerSearchFilter:EventEmitter<PlayerSearchRequest> = new EventEmitter<PlayerSearchRequest>();

  private _option!: PlayerSearchRequest;
  private _applyAdvancedSearch: boolean = false;  
  
  private _teams: TeamEntity[] = [];
  private _selectedTeams: Set<TeamEntity> = new Set();
  private _subscriptionTeamsObservable: Subscription | undefined;

  /*
   * ============================
   * CONSTRUCT - INIT - DESTROYER 
   * ============================
   */

  constructor(private breakpointsService:BreakpointsService, 
      private internalDataService:InternalDataService,
      private loadData:LoadDataService,
      private userTeamService:UserTeamService,
      private cdr: ChangeDetectorRef) {
    console.log("Construct Option filter component");
    
    let selectedLeague:LeagueEntity|null = this.internalDataService.getSelectedLeague();
    if(selectedLeague != null) {
      this.option = SportEnum.visitAndReturn(selectedLeague.sport, new SportEnumPlayerSearchCreatorVisitor());
      this._subscriptionTeamsObservable = loadData.getTeams(selectedLeague).subscribe(result => this.teams = result);
    } else {
      this.option = new PlayerSearchRequest();
    }
  }  
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Forza Angular a controllare la vista corrente e aggiornare il DOM se ci sono cambiamenti.
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    console.log("Destroy option filter component");
    this._subscriptionTeamsObservable != undefined ? this._subscriptionTeamsObservable.unsubscribe() : null;
  }  

  /*
   * ================
   * GETTER & SETTER  
   * ================
   */

  public get option(): PlayerSearchRequest {
    return this._option;
  }

  public set option(value: PlayerSearchRequest) {
    this._option = value;
  }

  public get applyAdvancedSearch(): boolean {
    return this._applyAdvancedSearch;
  }

  public set applyAdvancedSearch(value: boolean) {
    this._applyAdvancedSearch = value;
  }

  public get teams(): TeamEntity[] {
    return this._teams;
  }

  private set teams(value: TeamEntity[]) {
    this._teams = value;
  }

  public get selectedTeams(): Set<TeamEntity> {
    return this._selectedTeams;
  }

  public set selectedTeams(value: Set<TeamEntity>) {
    this._selectedTeams = value;
  }

  /*
   * ============
   * VISIBILITA'  
   * ============
   */

  isMobileView() : boolean {
    return BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);
  }

  /*
   * =========
   * LISTENER  
   * =========
   */

  searchPlayers() : void {
    if(this.applyAdvancedSearch) {
      this.playerSearchFilter.emit(this.userTeamService.createPlayerSearchRequestFromUserOption());
    } else {
      this.playerSearchFilter.emit(this.option);
    }
  }

  
}
