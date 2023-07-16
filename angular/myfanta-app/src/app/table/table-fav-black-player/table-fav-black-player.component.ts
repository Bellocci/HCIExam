import { Component, OnInit } from '@angular/core';
import { TeamDataService } from 'src/app/service/team-data.service';
import { TableComponent } from '../table.component';
import { InternalDataService } from 'src/app/service/internal-data.service';

@Component({
  selector: 'app-table-fav-black-player',
  templateUrl: './table-fav-black-player.component.html',
  styleUrls: [
    './table-fav-black-player.component.css',
    '../table.component.css'
  ]
})
export class TableFavBlackPlayerComponent {

  private _columns_name : string[] = ['Name', 'Team', 'Role', 'Cost', 'Remove']

  constructor(private _team_service:TeamDataService, private internal:InternalDataService) {

  }

  getColumns(): string[] {
    return this._columns_name;
  }

  removePlayer(player:string) : void {
    
  }

  clearAll() : void {
    
  }
}
