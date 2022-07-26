import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TeamDataService } from '../service/team-data.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {

  private _dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) private _paginator!: MatPaginator;
  @ViewChild(MatSort) private _sort!: MatSort;
  private _pageIndex:number = 0;
  private _pageSize:number = 10;
  private _pageSizeOptions:number[] = [5, 10, 20]

  private _columns:string[] = ['Name', 'Team', 'Cost', 'favoritePlayer'];

  constructor(private _team_data_service: TeamDataService) { }

  ngOnInit(): void { 
    this._dataSource = new MatTableDataSource<any>();
    this.subscribePlayerList();
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

  /* GETTER */

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

  /* METHODS */

  isFavoritePlayer(player:any) : boolean {
    return this._team_data_service.isPlayerIntoFavoriteList(player);
  }

  setPlayerAsFavorite(player:any) : void {
    this._team_data_service.addPlayerIntoFavoriteList(player);
  }

  removePlayerAsFavorite(player:any) : void {
    this._team_data_service.removePlayerFromFavoriteList(player);
  }

  handlePageEvent(event: PageEvent) : void {
    this._pageIndex = event.pageIndex;
    this._pageSize = event.pageSize;
  }
}