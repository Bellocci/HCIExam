import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { LoadDataService } from 'src/app/service/load-data.service';
import { SharedService } from 'src/app/service/shared.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { ToolbarComponent } from '../toolbar.component';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginRegistrationDialogComponent } from 'src/app/Dialog/login-registration-dialog/login-registration-dialog.component';

@Component({
  selector: 'app-toolbar-base',
  templateUrl: './toolbar-base.component.html',
  styleUrls: ['./toolbar-base.component.css']
})
export class ToolbarBaseComponent extends ToolbarComponent implements OnInit {

  @Output() sidenav_emit = new EventEmitter();

  constructor(private shared_service:SharedService, 
    private loadService:LoadDataService,
    private filterService:FilterDataService,
    private data_service:InternalDataService, 
    private team_service:TeamDataService,
    public dialog:MatDialog) 
  { 
    super(shared_service, loadService, filterService, data_service, team_service);
  }

  openSidenavFromChild(): void {
    this.sidenav_emit.emit();
  }

  openLoginDialog() : void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "800px";
    dialogConfig.maxHeight = "100vh";
    dialogConfig.width = "auto";
    dialogConfig.height = "auto";

    const dialogRef = this.dialog.open(LoginRegistrationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closeDialog() : void {
    this.dialog.closeAll();
  }
}
