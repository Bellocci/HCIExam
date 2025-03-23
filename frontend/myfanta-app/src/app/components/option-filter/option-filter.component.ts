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
  styleUrls: ['./option-filter.component.scss']
})
export class OptionFilterComponent implements OnInit, AfterViewInit, OnDestroy {
    
  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  @Output() 
  private optionToSend:EventEmitter<PlayerSearchRequest> = new EventEmitter<PlayerSearchRequest>();

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
    this.optionToSend.emit(this.option);
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

  isTeamSelected(team:TeamEntity) : boolean {
    return this.option.teams.has(team);
  }

  isClearSelectedTeamsEnabled() : boolean {
    // TODO: da implementare
    return false;
  }

  isMobileView() : boolean {
    return BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);
  }

  /*
   * =========
   * LISTENER  
   * =========
   */

  changeSelectedList(team:TeamEntity) : void {    
    this.option.teams.has(team) ? this.option.teams.delete(team) : this.option.teams.add(team);
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
    this.optionToSend.emit(this.option);
  }

  checkBlacklistPlayersAreIncluded(included:boolean) : void {
    this.optionToSend.emit(this.option);
  }

  checkAdvancedFilterAreIncluded() : void {
    this.optionToSend.emit(this.option);
  }  

  updateSelectedTeamsList(team: TeamEntity): void {
    // TODO: da implementare
  }
}
