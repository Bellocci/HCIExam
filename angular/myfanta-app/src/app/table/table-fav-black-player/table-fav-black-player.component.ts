import { Component, OnInit } from '@angular/core';
import { TeamDataService } from 'src/app/service/team-data.service';
import { TableComponent } from '../table.component';

@Component({
  selector: 'app-table-fav-black-player',
  templateUrl: './table-fav-black-player.component.html',
  styleUrls: [
    './table-fav-black-player.component.css',
    '../table.component.css'
  ]
})
export class TableFavBlackPlayerComponent extends TableComponent implements OnInit {

  private _columns_name : string[] = ['Name', 'Team', 'Role', 'Cost', 'Remove']

  constructor(private _team_service:TeamDataService) {
    super(_team_service);
  }

  override getColumns(): string[] {
    return this._columns_name;
  }

  removePlayer(player:string) : void {
    this._team_service.removePlayer(player);
  }

  clearAll() : void {
    this._team_service.clearAllPlayers();
  }
}
