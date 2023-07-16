import { Component } from '@angular/core';
import { TeamDataService } from 'src/app/service/team-data.service';
import { TableComponent } from '../table.component';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { RouterService } from 'src/app/service/router.service';

@Component({
  selector: 'app-short-table',
  templateUrl: './short-table.component.html',
  styleUrls: [
    './short-table.component.css',
    '../table.component.css'
  ]
})
export class ShortTableComponent {

  private _columns_name = ['Name', 'Team', 'Role', 'Cost', 'Favorit'];

  constructor(private _team_data:TeamDataService, private internal:InternalDataService, private routerService:RouterService){ 

  }

  getColumns(): string[] {
    return this._columns_name;
  }

  getPageSize(): number {
    return 10;
  }
}
