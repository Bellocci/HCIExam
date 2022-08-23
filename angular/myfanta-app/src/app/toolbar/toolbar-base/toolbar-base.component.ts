import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { SharedService } from 'src/app/service/shared.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { ToolbarComponent } from '../toolbar.component';

@Component({
  selector: 'app-toolbar-base',
  templateUrl: './toolbar-base.component.html',
  styleUrls: ['./toolbar-base.component.css']
})
export class ToolbarBaseComponent extends ToolbarComponent implements OnInit {

  @Output() sidenav_emit = new EventEmitter();

  constructor(private shared_service:SharedService, 
    private data_service:InternalDataService, 
    private team_service:TeamDataService) 
  { 
    super(shared_service, data_service, team_service);
  }

  openSidenavFromChild(): void {
    this.sidenav_emit.emit();
  }

}
