import { OnInit, Component, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TeamDataService } from '../../service/team-data.service';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InternalDataService } from '../../service/internal-data.service';
import { TableHelper } from './table-helper';
import { RouterService } from '../../service/router.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { TableFilterOption } from './table-filter';
import { ObservableHelper } from 'src/utility/observable-helper';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { PlayerSearchRequestService } from 'src/app/service/player-search-request.service';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class TableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  /*
   * ==========
   * ATTRIBUTI 
   * ==========
   */

  @Input()
  playersList:PlayerEntity[] = [];

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PlayerEntity>;
  dataSource!:MatTableDataSource<PlayerEntity>;

  private _pageIndex: number = 0;  
  private _pageSizeOptions: number[] = [10, 20, 50];

  private _tableHelper:TableHelper;
  private _isTableEmpty: boolean = true;  
  private _leagueSelected: LeagueEntity | null = null;  
  public searchPlayerString:string = "";
  private _expandedPlayer: PlayerEntity | null = null;
  private _displayedColumns: string[] = [];  
  private _isMobileBreakpointActive: boolean = false;
  private _isMobileOrMobileXLBreakpointActive: boolean = false;  

  private _filtersOption:ObservableHelper<string> = new ObservableHelper("");

  private _subscriptionToLeagueObservable:Subscription | undefined;
  private _subscriptionToTableFilterOptionObservable: Subscription | undefined;
  private _subscriptionToMobileObservable: Subscription;
  private _subscriptionToMobileOrMobileXLObservable: Subscription;

  /*
   * ===================================
   * CONSTRUCTOR, INIT, CHANGE, DESTROY
   * ===================================
   */

  constructor(private teamDataService: TeamDataService,
    private internalDataService:InternalDataService,
    public routerService:RouterService,
    private playerSearchRequest:PlayerSearchRequestService,
    private snackbarService:SnackBarService,
    private breakpointsService:BreakpointsService) { 

      console.log("Construct table component");      

      let windowWidth:number = window.innerWidth;    
      this.isMobileBreakpointActive = BreakpointsService.isMobileBreakpointActive(windowWidth);
      this.isMobileOrMobileXLBreakpointActive = BreakpointsService.isMobileOrMobileXLBreakpointActive(windowWidth);

      this._tableHelper = new TableHelper(teamDataService, routerService, playerSearchRequest);
      this.displayedColumns = this._tableHelper.getDisplayedColumns(this.isMobileBreakpointActive);
      this._expandedPlayer = this.isMobileBreakpointActive ? this._expandedPlayer : null;
      this.dataSource = new MatTableDataSource<PlayerEntity>();

      this._subscriptionToLeagueObservable = this.observeLeagueSelected();
      this._subscriptionToTableFilterOptionObservable = this.observeTableFilterOption();
      this._subscriptionToMobileObservable = this.addObserverToMobileObservable();
      this._subscriptionToMobileOrMobileXLObservable = this.observeMobileOrMobileXLBreakpoint();
  }  

  ngOnInit(): void {
    this.dataSource.sortData = this.sortData();
    this.dataSource.filterPredicate = this.filterPlayers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.addObserverToFilter();
  }  

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes['playersList'].currentValue;
  }

  ngOnDestroy(): void {
    console.log("Destroy table component");
    
    this._subscriptionToLeagueObservable != undefined ? this._subscriptionToLeagueObservable?.unsubscribe() : null;
    this._subscriptionToTableFilterOptionObservable != undefined ? this._subscriptionToTableFilterOptionObservable.unsubscribe() : null;
    this._subscriptionToMobileObservable.unsubscribe();
    this._subscriptionToMobileOrMobileXLObservable.unsubscribe();
    this._filtersOption.complete();
  }

  /* 
   * =========
   * OBSERVER
   * =========
   */

  private observeLeagueSelected() : Subscription | undefined {
    return this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
        .next(league => this.leagueSelected = league)
        .error(error => console.log("Error while retriving league selected :" + error))  
        .build());
  }

  private observeTableFilterOption() : Subscription | undefined {
    return this.teamDataService.addObserverToTableFilterOption(new ObserverStepBuilder<TableFilterOption | null>()
      .next(filter => {
        // Impostazione del filtro
        let serialize = JSON.stringify(filter);
        this._filtersOption.setValue(serialize);
      })
      .error(error => console.log("Error while retriving filter option :" + error))
      .build());
  }

  private addObserverToFilter() : Subscription | undefined {
    return this._filtersOption.addObserver(new ObserverStepBuilder<string>()
        .next(filters => this.dataSource.filter = filters)
        .error(error => console.log("Error while retriving filter :" + error))
        .build());
  }

  private addObserverToMobileObservable() : Subscription {
    return this.breakpointsService.mobileObservable.subscribe(new ObserverStepBuilder<boolean>()
        .next(isMobile => {
          this.displayedColumns = this._tableHelper.getDisplayedColumns(isMobile);
          this._isMobileBreakpointActive = isMobile;
          this._expandedPlayer = isMobile ? this._expandedPlayer : null;
        })
        .error(error => console.log("Error while retriving mobile breakpoint : " + error))
        .build());
  }

  private observeMobileOrMobileXLBreakpoint() : Subscription {
    return this.breakpointsService.mobileOrMobileXLObservable.subscribe(new ObserverStepBuilder<boolean>()
        .next(isActive => this.isMobileOrMobileXLBreakpointActive = isActive)
        .error(error => console.log("Error while retriving mobile or mobile XL breakpoint : " + error))
        .build());
  }

  /*
   * ================
   * GETTER & SETTER
   * ================
   */

  public get pageIndex(): number {
    return this._pageIndex;
  }

  public set pageIndex(value: number) {
    this._pageIndex = value;
  }

  public get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }

  public set pageSizeOptions(value: number[]) {
    this._pageSizeOptions = value;
  }

  public get isTableEmpty(): boolean {
    return this._isTableEmpty;
  }

  public set isTableEmpty(value: boolean) {
    this._isTableEmpty = value;
  }

  public get leagueSelected(): LeagueEntity | null {
    return this._leagueSelected;
  }

  private set leagueSelected(value: LeagueEntity | null) {
    this._leagueSelected = value;
  }

  public get expandedPlayer(): PlayerEntity | null {
    return this._expandedPlayer;
  }

  public set expandedPlayer(value: PlayerEntity | null) {
    this._expandedPlayer = value;
  }

  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  public set displayedColumns(value: string[]) {
    this._displayedColumns = value;
  }

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

  getFavoriteMessageTooltip(player:PlayerEntity) : string {
    if(this.teamDataService.blacklistHasPlayer(player)) {
      return "Giocatore già presente nella lista dei giocatori da escludere";
    } else if(this.teamDataService.favoriteListHasPlayer(player)) {
      return "Rimuovi dalla lista dei preferiti";
    } else {
      return "Aggiungi alla lista dei preferiti";
    }
  }

  getBlacklistMessageTooltip(player:PlayerEntity) : string {
    if(this.teamDataService.favoriteListHasPlayer(player)) {
      return "Giocatore già presente nella lista dei preferiti";
    } else if(this.teamDataService.blacklistHasPlayer(player)) {
      return "Rimuovi dalla lista dei giocatori da escludere";      
    } else {
      return "Aggiungi alla lista dei giocatori da escludere";
    }
  }

  /*
   * ======================
   * METODI DI VISIBILITA' 
   * ======================
   */

  isClearSearchPlayerInputButtonRendered() : boolean {
    return this.searchPlayerString.trim().length > 0;
  }

  isRowExpanded(player:PlayerEntity) : boolean {
    return player.equals(this.expandedPlayer);
  }

  isClearTableRendered() : boolean {
    return !this.routerService.currentPageIsPlayerList();
  }

  isClearTableDisabled() : boolean {
    return this.isTableEmpty;
  }  

  isFavoritePlayer(player:PlayerEntity) : boolean {
    return this.teamDataService.favoriteListHasPlayer(player);
  }

  isFavoriteBtnDisabled(player:PlayerEntity) : boolean {
    return this.teamDataService.blacklistHasPlayer(player);
  }

  isPlayerIntoBlacklist(player:PlayerEntity) : boolean {
    return this.teamDataService.blacklistHasPlayer(player);
  }

  isBlacklistBtnDisabled(player:PlayerEntity) : boolean {
    return this.teamDataService.favoriteListHasPlayer(player);
  }

  isFilterPlayerRendered() : boolean {
    return !this.routerService.currentPageIsMyTeam();
  }

  private canRowsBeExpand() : boolean {
    return this._isMobileBreakpointActive;
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  clearSearchPlayerInput() : void {
    this.searchPlayerString = "";
    this.teamDataService.filterPlayersByName(this.searchPlayerString);
  }

  /**
   * Funzione di filtraggio dei giocatori nella tabella
   * 
   * @returns (player:Player, filter:string) => boolean
   */
  filterPlayers() {
    let filterPredicate = function (player:PlayerEntity, filter:string) : boolean {
      const tableFilters:TableFilterOption = TableFilterOption.fromJSON(JSON.parse(filter));

      // Filtro nome
      if(player.playerName.trim().toLowerCase().includes(tableFilters.getPlayerName().trim().toLowerCase())) {

        // Filtro partite giocate
        if(player.matchPlayed >= tableFilters.calculateMatchPlayedFilter(player.team.league.sport)) {

          // Filtro ruoli
          if(tableFilters.getRoles().length > 0) {
            if(tableFilters.getRoles().filter(role => player.role.roleId == role.roleId).length == 0) {
              return false;
            }
          }

          // Filtro team
          if(tableFilters.getTeams().length > 0) {
            if(tableFilters.getTeams().filter(team => player.team.teamId == team.teamId).length == 0) {
              return false;
            }
          }

          return true;
        }
      }

      return false;
    }

    return filterPredicate;
  }

  /**
   * Funzione per l'ordinamento dei dati
   * 
   * @returns function
   */
  sortData() {
    let sorting = function(playerList:PlayerEntity[], sort:MatSort) : PlayerEntity[] {
      if (!sort.active || sort.direction === '') {
        return playerList;
      }

      return playerList.sort((playerA:PlayerEntity, playerB:PlayerEntity) => {
        let comparatorResult = 0;
        switch (sort.active) {
          case 'name':
            comparatorResult = playerA.playerName.localeCompare(playerB.playerName);
            break;
          case 'team':
            comparatorResult = playerA.team.teamName.localeCompare(playerB.team.teamName);
            break;
          case 'role':
            comparatorResult = playerA.role.shortDescription.localeCompare(playerB.role.shortDescription);
            break;
          default:
            comparatorResult = playerA.playerName.localeCompare(playerB.playerName);
            break;
        } 

        return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
      });
    };

    return sorting;
  }

  updateExpandedPlayer(player:PlayerEntity) : void {
    if(this.canRowsBeExpand()) {
      this.expandedPlayer = player.equals(this.expandedPlayer) ? null : player;
    }
  }  

  handlePageEvent(event: PageEvent) : void {
    this._pageIndex = event.pageIndex;
  }

  clearTable() : void {
    this._tableHelper.clearList();
  }

  removePlayer(player:PlayerEntity) : void {
    const validationProblem:ValidationProblem | null = this._tableHelper.removePlayer(player);
    if(validationProblem != null) {
      this.snackbarService.openSnackBar(validationProblem);
    }
  }

  goToPlayerPage(player:PlayerEntity) : void {
    this.internalDataService.setPlayerSelected(player);
    this.routerService.goToPlayerPage(player);
  }

  applyFilter(event: Event) {
    this.teamDataService.filterPlayersByName(this.searchPlayerString);
  }

  updateFavoriteList(player:PlayerEntity) : void {
    let validationProblem:ValidationProblem | null = null;
    if(!this.teamDataService.favoriteListHasPlayer(player)) {
      validationProblem = this.teamDataService.addPlayerToFavoriteList(player);
    } else {
      validationProblem = this.teamDataService.removePlayerFromFavoriteList(player);
    }

    if(validationProblem != null) {
      this.snackbarService.openSnackBar(validationProblem);
    }
  }

  updateBlacklist(player:PlayerEntity) : void {
    let validationProblem:ValidationProblem | null = null;
    if(!this.teamDataService.blacklistHasPlayer(player)) {
      validationProblem = this.teamDataService.addPlayerToBlacklist(player);
    } else {
      validationProblem = this.teamDataService.removePlayerFromBlacklist(player);
    }

    if(validationProblem != null) {
      this.snackbarService.openSnackBar(validationProblem);
    }
  }

}