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

  constructor(private _team_data:TeamDataService){ 
    super(_team_data);
  }

}
