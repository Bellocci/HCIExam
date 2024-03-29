import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TeamDataService } from '../../service/team-data.service';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InternalDataService } from '../../service/internal-data.service';
import { Player } from 'src/decorator/player.model';
import { TableHelper } from './table-helper';
import { RouterService } from '../../service/router.service';
import { LoadDataService } from '../../service/load-data.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { League } from 'src/decorator/League.model';
import { TableFilterOption } from './table-filter';
import { ObserverHelper } from 'src/utility/observer-helper';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '80px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class TableComponent implements OnInit, AfterViewInit {

  private tableHelper:TableHelper;
  private isTableEmpty : boolean = true;
  private leagueSelected : League | null = null;

  dataSource!:MatTableDataSource<Player>;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Player>;
  private pageIndex:number = 0;
  private pageSize:number = 10;
  private pageSizeOptions:number[] = [5, 10, 20]

  private filtersOption:ObserverHelper<string> = new ObserverHelper("");
  private static readonly SEPARATOR_FILTER_CHARACTER:string= "|";
  private static readonly SEPARATOR_FILTER_VALUE_CHARACTER:string = "-";

  constructor(private teamDataService: TeamDataService,
    private internalDataService:InternalDataService,
    public routerService:RouterService,
    private loadDataService:LoadDataService,
    private snackbarService:SnackBarService) { 

      this.tableHelper = new TableHelper(teamDataService, routerService, loadDataService);
      this.subscribeTableSize();            
      this.observeLeagueSelected();
      this.observeTableFilterOption();
      this.dataSource = new MatTableDataSource<Player>();
      
      this.tableHelper.getPlayerList(this.leagueSelected).subscribe(list => {        
        this.dataSource.data = list;
      })
  }

  /*
   * METODI PRIVATI 
   */

  private observeLeagueSelected() : void {
    this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<League | null>()
        .next(league => this.leagueSelected = league)
        .build());
  }

  private subscribeTableSize() : void {
    this.tableHelper.getPlayerList(this.leagueSelected).subscribe(list => this.isTableEmpty = list.length == 0);
  }

  private observeTableFilterOption() : void {
    this.teamDataService.addObserverToTableFilterOption(
      new ObserverStepBuilder<TableFilterOption | null>().next(filter => {
        // Impostazione del filtro
        let serialize = JSON.stringify(filter);
        this.filtersOption.setValue(serialize);
      }).build());
  }

  ngOnInit(): void {
    this.dataSource.sortData = this.sortData();
    this.dataSource.filterPredicate = this.filterPlayers();
  }

  /**
   * Funzione di filtraggio dei giocatori nella tabella
   * 
   * @returns (player:Player, filter:string) => boolean
   */
  filterPlayers() {
    let filterPredicate = function (player:Player, filter:string) : boolean {
      const tableFilters:TableFilterOption = TableFilterOption.fromJSON(JSON.parse(filter));

      // Filtro nome
      if(player.getName().trim().toLowerCase().includes(tableFilters.getPlayerName().trim().toLowerCase())) {

        // Filtro partite giocate
        if(player.getMatchPlayed() >= tableFilters.calculateMatchPlayedFilter(player.getTeam().getLeague().getSport())) {

          // Filtro ruoli
          if(tableFilters.getRoles().length > 0) {
            if(tableFilters.getRoles().filter(role => player.getRole().getId() == role.getId()).length == 0) {
              return false;
            }
          }

          // Filtro team
          if(tableFilters.getTeams().length > 0) {
            if(tableFilters.getTeams().filter(team => player.getTeam().getId() == team.getId()).length == 0) {
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
    let sorting = function(playerList:Player[], sort:MatSort) : Player[] {
      if (!sort.active || sort.direction === '') {
        return playerList;
      }

      return playerList.sort((playerA:Player, playerB:Player) => {
        let comparatorResult = 0;
        switch (sort.active) {
          case 'name':
            comparatorResult = playerA.getName().localeCompare(playerB.getName());
            break;
          case 'team':
            comparatorResult = playerA.getTeam().getName().localeCompare(playerB.getTeam().getName());
            break;
          case 'role':
            comparatorResult = playerA.getRole().getShortDescription().localeCompare(playerB.getRole().getShortDescription());
            break;
          default:
            comparatorResult = playerA.getName().localeCompare(playerB.getName());
            break;
        } 

        return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
      });
    };

    return sorting;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.addObserverToFilter();
  }

  private addObserverToFilter() : void {
    this.filtersOption.addObserver(new ObserverStepBuilder<string>()
        .next(filters => this.dataSource.filter = filters)
        .build());
  }

  /* GETTER */

  getColumns() : string[] {
    return this.tableHelper.getDisplayedColumns();
  }

  getPageIndex() : number {
    return this.pageIndex;
  }

  getPageSize() : number {
    return this.pageSize;
  }

  getPageSizeOptions() : number[] {
    return this.pageSizeOptions;
  }

  getFavoriteMessageTooltip(player:Player) : string {
    if(this.isFavoriteBtnDisabled(player)) {
      return "Giocatore già presente nella lista dei giocatori da escludere";
    } else if(!this.isFavoritePlayer(player)) {
      return "Aggiungi alla lista dei preferiti";
    } else {
      return "Rimuovi dalla lista dei preferiti";
    }
  }

  getBlacklistMessageTooltip(player:Player) : string {
    if(this.isBlacklistBtnDisabled(player)) {
      return "Giocatore già presente nella lista dei preferiti";
    } else if(!this.isPlayerIntoBlacklist(player)) {
      return "Aggiungi alla lista dei giocatori da escludere";
    } else {
      return "Rimuovi dalla lista dei giocatori da escludere";
    }
  }

  /* VISIBILITA' */

  isFavoriteColumnRendered() : boolean {
    if(this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) || this.routerService.currentPageIsPlayerList(LinkEnum.PLAYER_LIST)) {
        return true;
    }
    return false;
  }

  isBlacklistColumnRendered() : boolean {
    if(this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST) || this.routerService.currentPageIsPlayerList(LinkEnum.PLAYER_LIST)) {
      return true;
    }
    return false;
  }

  isClearTableRendered() : boolean {
    return !this.routerService.currentPageIsPlayerList(LinkEnum.PLAYER_LIST);
  }

  isClearTableDisabled() : boolean {
    return this.isTableEmpty;
  }

  isFavoritePlayer(player:Player) : boolean {
    return this.teamDataService.favoriteListHasPlayer(player);
  }

  isPlayerIntoBlacklist(player:Player) : boolean {
    return this.teamDataService.blacklistHasPlayer(player);
  }

  isFavoriteBtnDisabled(player:Player) : boolean {
    return this.teamDataService.blacklistHasPlayer(player);
  }

  isBlacklistBtnDisabled(player:Player) : boolean {
    return this.teamDataService.favoriteListHasPlayer(player);
  }

  /* LISTENER */

  handlePageEvent(event: PageEvent) : void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  clearTable() : void {
    this.tableHelper.clearList();
  }

  removePlayer(player:Player) : void {
    const validationProblem:ValidationProblem | null = this.tableHelper.removePlayer(player);
    if(validationProblem != null) {
      this.snackbarService.openSnackBar(validationProblem);
    }
  }

  goToPlayerPage(player:Player) : void {
    this.internalDataService.setPlayerSelected(player);
    this.routerService.goToPlayerPage(player);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.teamDataService.filterPlayersByName(filterValue.trim().toLowerCase());
  }

  updateFavoriteList(player:Player) : void {
    let validationProblem:ValidationProblem | null = null;
    if(!this.isFavoritePlayer(player)) {
      validationProblem = this.teamDataService.addPlayerToFavoriteList(player);
    } else {
      validationProblem = this.teamDataService.removePlayerFromFavoriteList(player);
    }

    if(validationProblem != null) {
      this.snackbarService.openSnackBar(validationProblem);
    }
  }

  updateBlacklist(player:Player) : void {
    let validationProblem:ValidationProblem | null = null;
    if(!this.isPlayerIntoBlacklist(player)) {
      validationProblem = this.teamDataService.addPlayerToBlacklist(player);
    } else {
      validationProblem = this.teamDataService.removePlayerFromBlacklist(player);
    }

    if(validationProblem != null) {
      this.snackbarService.openSnackBar(validationProblem);
    }
  }

}