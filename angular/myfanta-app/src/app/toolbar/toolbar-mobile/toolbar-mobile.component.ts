import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { ToolbarComponent } from '../toolbar.component';
import { RouterService } from 'src/app/service/router.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-toolbar-mobile',
  templateUrl: './toolbar-mobile.component.html',
  styleUrls: ['./toolbar-mobile.component.css']
})
export class ToolbarMobileComponent extends ToolbarComponent implements OnInit {

  @Output() sidenav_emit = new EventEmitter();

  constructor(private filterService:FilterDataService, 
    private data_service: InternalDataService, 
    private team_service:TeamDataService,
    override routerService:RouterService,
    private _userService:UserService) {
    super(filterService, data_service, team_service, routerService, _userService);
  }

  openSidenavFromChild() {
    this.sidenav_emit.emit();
  }

  getLeagueSelected() {
    return this.leagueSelected;
  }
}
