import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { ToolbarComponent } from '../toolbar.component';

import { UserService } from 'src/app/service/user.service';
import { User } from 'src/decorator/user.model';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { League } from 'src/decorator/League.model';
import { RouterService } from 'src/app/service/router.service';
import { DialogService } from 'src/app/service/dialog.service';
import { LoginDialogComponent } from 'src/app/Dialog/login-dialog/login-dialog.component';

@Component({
  selector: 'app-toolbar-base',
  templateUrl: './toolbar-base.component.html',
  styleUrls: ['./toolbar-base.component.css']
})
export class ToolbarBaseComponent extends ToolbarComponent implements OnInit {

  @Output() sidenav_emit = new EventEmitter();

  private userLogged:boolean = false;
  private user:User | undefined;
  private league!:League | null;  
  private link:string = "";

  constructor(
    private filterService:FilterDataService,
    private internalDataService:InternalDataService,
    private teamDataService:TeamDataService,
    private userService:UserService,
    private snackbarService:SnackBarService,
    override routerService:RouterService,
    private dialogService:DialogService) 
  { 
    super(filterService, internalDataService, teamDataService, routerService);
  }

  override ngOnInit(): void {
    this.subscribeUser();
    this.subscribeLeague();
    this.subscribeLink();
  }

  /* INIZIALIZZAZIONE OBSERVER */

  private subscribeUser() {
    this.userService.getUser().subscribe(user => {
      if(user.isUserDefined()) {
        this.userLogged = true;
        this.user = user;
      } else {
        this.userLogged = false;
        this.user = undefined;
      }
    });
  }

  private subscribeLeague() : void {
    this.internalDataService.getLeagueSelected().subscribe(league => {
      this.league = league;
    })
  }

  private subscribeLink() {
    this.internalDataService.getActiveLink().subscribe(link => {
      this.link = link;
    });
  }

  /* FINE OBSERVER */

  openSidenavFromChild(): void {
    this.sidenav_emit.emit();
  }

  openLoginDialog() : void {
    this.dialogService.getDialogHelper().openDialog(LoginDialogComponent);
  }

  /* Getter */

  getUser() : User | undefined {
    return this.user;
  }

  /* Metodi visibilità */

  isLeagueSelected() : boolean {
    return this.league != null;
  }

  isUserLogged() : boolean {
    return this.userLogged;
  }

  /* Metodi funzionalità */

  logout() : void {    
    this.userService.logout();
    if(this.routerService.currentPageisMyProfile()) {
      this.routerService.goToHomePage();
    }
    this.snackbarService.openInfoSnackBar("Ti sei scollegato dal tuo account");    
  }

  /* Routing */

  goToHome() : void {
    this.setLeagueSelected(null);
    this.routerService.goToHomePage();
  }

  goToCreateTeam() : void {
    this.routerService.goToCreateTeamPage();
  }

  goToPlayerList() : void {
    this.routerService.goToPlayerListPage();
  }

  goToFavoritList() : void {
    this.routerService.goToFavoritListPage();
  }

  goToBlacklist() : void {
    this.routerService.goToBlacklistPage();
  }

  goToMyProfile() : void {
    this.routerService.goToMyProfilePage();
  }

  override isActiveLink(link_name:string) : boolean {
    return this.link === link_name;
  }
}
