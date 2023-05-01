import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { LoadDataService } from 'src/app/service/load-data.service';
import { SharedService } from 'src/app/service/shared.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { ToolbarComponent } from '../toolbar.component';

@Component({
  selector: 'app-toolbar-mobile',
  templateUrl: './toolbar-mobile.component.html',
  styleUrls: ['./toolbar-mobile.component.css']
})
export class ToolbarMobileComponent extends ToolbarComponent implements OnInit {

  @Output() sidenav_emit = new EventEmitter();

  constructor(private shared:SharedService, private loadService:LoadDataService,
    private filterService:FilterDataService, private data_service: InternalDataService, private team_service:TeamDataService) {
    super(shared, loadService, filterService, data_service, team_service);
  }

  openSidenavFromChild() {
    this.sidenav_emit.emit();
  }
}
