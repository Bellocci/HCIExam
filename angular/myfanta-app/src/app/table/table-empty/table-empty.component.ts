import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { TableComponent } from '../table.component';
import { InternalDimensionService } from 'src/app/service/internal-dimension.service';
import { TeamDataService } from 'src/app/service/team-data.service';

@Component({
  selector: 'app-table-empty',
  templateUrl: '../table.component.html',
  styleUrls: ['../table.component.css'],
  
})
export class TableEmptyComponent extends TableComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  @ViewChild(MatSort) sort!:MatSort;

  constructor(
    private _internal_dimension_service:InternalDimensionService,
    private _team_data:TeamDataService
    ) 
  {
    super(_internal_dimension_service);
  }
  
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = [];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTeam() {
    this._team_data.generateTeam().subscribe(players => {
      this.dataSource.data = players;
    });
  }

  getTeamWithFavoritPlayers() {
    this._team_data.generateTeamWithFavoritList().subscribe(favorit_players => {
      this.dataSource.data = favorit_players;
    });
  }
}


