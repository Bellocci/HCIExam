import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TeamDataService } from '../service/team-data.service';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

  private _playerSelected : any;
  expanded_player : any | null;

  private _dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) private _paginator!: MatPaginator;
  @ViewChild(MatSort) private _sort!: MatSort;
  private _pageIndex:number = 0;
  private _pageSize:number = 10;
  private _pageSizeOptions:number[] = [5, 10, 20]

  private _columns:string[] = ['Name', 'Team', 'Role', 'Cost', 'Favorit', 'Blacklist'];

  constructor(private _team_data_service: TeamDataService) { }

  ngOnInit(): void {
    this.setColumns();
    this._dataSource = new MatTableDataSource<any>();
    this.subscribePlayerList();
    this.subscribePlayerSelected();
  }

  ngAfterViewInit() {
    this._dataSource.paginator = this._paginator;
    this._dataSource.sort = this._sort;
  }

  private subscribePlayerList() : void {
    this._team_data_service.getPlayerList().subscribe((list) => {
      this._dataSource.data = list;
    });
  }

  private subscribePlayerSelected() : void {
    this._team_data_service.getPlayerSelected().subscribe((player) => {
      this._playerSelected = player;
    });
  }

  /* GETTER */

  getInnerWidth() : number {
    return window.innerWidth;
  }

  getColumns() : string[] {
    return this._columns;
  }

  getDataSource() : MatTableDataSource<any> {
    return this._dataSource;
  }

  getPageIndex() : number {
    return this._pageIndex;
  }

  getPageSize() : number {
    return this._pageSize;
  }

  getPageSizeOptions() : number[] {
    return this._pageSizeOptions;
  }

  /* SETTER */

  setColumns() : void {
    if(!this.isLayoutMobile()) {
      if(this._columns.length != 6) {
        this._columns.pop();
        this._columns.push('Favorit');
        this._columns.push('Blacklist');
        this._team_data_service.setPlayerSelected(null);
        this.expanded_player = null;
      }
    }
    else {
      if(this._columns.length != 5) {
        this._columns.pop();
        this._columns.pop();
        this._columns.push('Expand')
        this._team_data_service.setPlayerSelected(null);
      }
    }
  }

  /* METHODS */

  isLayoutMobile() : boolean {
    return this.getInnerWidth() <= 400 ? true : false;
  }

  setPlayerSelected(player:any) {
    if(this._playerSelected != player)
      this._team_data_service.setPlayerSelected(player);
    else
      this._team_data_service.setPlayerSelected(null);
  }

  expandedPlayer(player:any) : void {
    this.expanded_player = this.expanded_player === player ? null : player
  }

  isPlayerExpanded(player:any) : boolean {
    return this.expanded_player === player ? true : false;
  }

  isFavoritePlayer(player:any) : boolean {
    return this._team_data_service.isPlayerIntoFavoriteList(player);
  }

  setPlayerAsFavorite(player:any) : void {
    this._team_data_service.addPlayerIntoFavoriteList(player);
  }

  removePlayerAsFavorite(player:any) : void {
    this._team_data_service.removePlayerFromFavoriteList(player);
  }

  isPlayerIntoBlacklist(player:any) : boolean {
    return this._team_data_service.isPlayerIntoBlacklist(player);
  }

  addPlayerIntoBlacklist(player:any) : void {
    this._team_data_service.removePlayerFromFavoriteList(player);
    this._team_data_service.addPlayerIntoBlacklist(player);
  }

  removePlayerFromBlacklist(player:any) : void {
    this._team_data_service.removePlayerFromBlacklist(player);
  }

  handlePageEvent(event: PageEvent) : void {
    this._pageIndex = event.pageIndex;
    this._pageSize = event.pageSize;
  }

  isPlayerSelected(player:any) : boolean {
    return player == this._playerSelected
  }
}