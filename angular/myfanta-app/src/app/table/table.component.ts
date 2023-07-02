import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TeamDataService } from '../service/team-data.service';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InternalDataService } from '../service/internal-data.service';
import { Player } from 'src/decorator/player.model';
import { Observable } from 'rxjs';
import { TableHelper } from './table-helper';
import { RouterService } from '../service/router.service';
import { LoadDataService } from '../service/load-data.service';
import { UserService } from '../service/user.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { UserTeam } from 'src/decorator/userTeam.model';

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
  private userTeamSelected:boolean = false;

  private _playerSelected : any;
  expanded_player : any | null;

  private dataSource!:MatTableDataSource<Player>;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Player>;
  private pageIndex:number = 0;
  private pageSize:number = 10;
  private pageSizeOptions:number[] = [5, 10, 20]

  constructor(private teamDataService: TeamDataService,
    private internalDataService:InternalDataService,
    private routerService:RouterService,
    private loadDataService:LoadDataService,
    private userService:UserService) { 

      this.tableHelper = new TableHelper(teamDataService, routerService, loadDataService);
      this.subscribeSelectedUserTeam();
  }

  private subscribeSelectedUserTeam() {
    this.userService.addSelectedTeamObserver(new ObserverStepBuilder<UserTeam | undefined>()
      .next(team => this.userTeamSelected = team != undefined)
      .build()  
    );
  }

  ngOnInit(): void {
    this.setColumns();
    this.dataSource = new MatTableDataSource<Player>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /* GETTER */

  getPlayers() : Observable<Player[]> | Player[] {
    return this.tableHelper.getPlayerList();
  }

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

  /* VISIBILITA' */

  isFavoriteColumnRendered() : boolean {
    if(this.routerService.currentPageIsFavoritList() || this.routerService.currentPageIsPlayerList()) {
        return true;
    }
    return false;
  }

  isBlacklistColumnRendered() : boolean {
    if(this.routerService.currentPageIsBlacklist() || this.routerService.currentPageIsPlayerList()) {
      return true;
    }
    return false;
  }

  isSaveBtnRendered() : boolean {
    return !this.routerService.currentPageIsPlayerList();
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
    this.tableHelper.removePlayer(player);
  }

  savePlayerList() : void {

  }

  /*
  VECCHI METODI (DA RIVEDERE)
  */


  /* GETTER */

  getInnerWidth() : number {
    return window.innerWidth;
  }

  /* SETTER */

  setColumns() : void {
    /*
    if(!this.isLayoutMobile()) {
      if(this.columns.length != 6) {
        this.columns.pop();
        this.columns.push('Favorit');
        this.columns.push('Blacklist');
        this.expanded_player = null;
      }
    }
    else {
      if(this.columns.length != 5) {
        this.columns.pop();
        this.columns.pop();
        this.columns.push('Expand')
      }
    }
    */
  }

  /* METHODS */

  isLayoutMobile() : boolean {
    return this.getInnerWidth() <= 400 ? true : false;
  }

  setPlayerSelected(player:any) {
    
  }

  expandedPlayer(player:any) : void {
    this.expanded_player = this.expanded_player === player ? null : player
  }

  isPlayerExpanded(player:any) : boolean {
    return this.expanded_player === player ? true : false;
  }

  isFavoritePlayer(player:any) : boolean {
    return false
  }

  setPlayerAsFavorite(player:any) : void {

  }

  removePlayerAsFavorite(player:any) : void {
    
  }

  isPlayerIntoBlacklist(player:any) : boolean {
    return false
  }

  addPlayerIntoBlacklist(player:any) : void {
    
  }

  removePlayerFromBlacklist(player:any) : void {
    
  }

  isPlayerSelected(player:any) : boolean {
    return player == this._playerSelected
  }
}