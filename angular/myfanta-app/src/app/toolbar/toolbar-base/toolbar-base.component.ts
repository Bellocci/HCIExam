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
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { Player } from 'src/decorator/player.model';

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
  private playerSelected : Player | null = null;

  constructor(
    private filterService:FilterDataService,
    private _internalDataService:InternalDataService,
    private _teamDataService:TeamDataService,
    private _userService:UserService,
    private snackbarService:SnackBarService,
    override routerService:RouterService,
    private dialogService:DialogService) 
  { 
    super(filterService, _internalDataService, _teamDataService, routerService, _userService);

    this.observeUserLogged();
    this.observeLeagueSelected();
    this.observePlayerSelected();
  }

  override ngOnInit(): void { }

  /* INIZIALIZZAZIONE OBSERVER */

  private observeUserLogged() {

    this._userService.addObserverForUser(new ObserverStepBuilder<User>()
      .next(user => {
        if(user.isUserDefined()) {
          this.userLogged = true;
          this.user = user;
        } else {
          this.userLogged = false;
          this.user = undefined;
        }
      })
      .build()
    );
  }

  private observeLeagueSelected() : void {
    this._internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<League | null>()
        .next(league => this.league = league)
        .build()
    );
  }

  private observePlayerSelected() : void {
    this._internalDataService.addObserverToPlayerSelected(new ObserverStepBuilder<Player | null>()
      .next(player => this.playerSelected = player)
      .build());
  }

  /* FINE OBSERVER */

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

  isBtnHomeRendered() : boolean {
    return !this.routerService.currentPageIsHome() && (this.isLeagueSelected() || this.routerService.currentPageIsMyProfile());
  }

  isSecondToolbarRowRendered() : boolean {
    return (this.userLogged && !this.routerService.currentPageIsHome() && !this.routerService.currentPageIsMyProfile()) || 
      (!this.userLogged && 
        (this.routerService.currentPageIsMyTeam() || this.routerService.currentPageIsFavoritList() || this.routerService.currentPageIsBlacklist())) ||
      this.isBackBtnRendered();
  }

  isCreateTeamLinkSelected() : boolean {
    return this.routerService.currentPageIsMyTeam() || this.routerService.currentPageIsFavoritList() || this.routerService.currentPageIsBlacklist();
  }

  isBackBtnRendered() : boolean {
    return this.playerSelected != null ? this.routerService.currentPageIsPlayerProfile(this.playerSelected) : false;
  }

  /* Metodi funzionalità */

  openSidenavFromChild(): void {
    this.sidenav_emit.emit();
  }

  openLoginDialog() : void {
    this.dialogService.getDialogHelper().openDialog(LoginDialogComponent);
  }

  logout() : void {    
    this._userService.logout();
    if(this.routerService.currentPageIsMyProfile()) {
      this.routerService.goToHomePage();
    }
    this.snackbarService.openInfoSnackBar("Ti sei scollegato dal tuo account");    
  }
}
