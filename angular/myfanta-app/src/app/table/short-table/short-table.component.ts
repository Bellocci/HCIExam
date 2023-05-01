import { Component } from '@angular/core';
import { TeamDataService } from 'src/app/service/team-data.service';
import { TableComponent } from '../table.component';

@Component({
  selector: 'app-short-table',
  templateUrl: './short-table.component.html',
  styleUrls: [
    './short-table.component.css',
    '../table.component.css'
  ]
})
export class ShortTableComponent extends TableComponent {

  private _columns_name = ['Name', 'Team', 'Role', 'Cost', 'Favorit'];

  constructor(private _team_data:TeamDataService){ 
    super(_team_data);
  }

  override getColumns(): string[] {
    return this._columns_name;
  }

  override getPageSize(): number {
    return this.getInnerWidth() <= 500 ? 5 : 10;
  }
}
