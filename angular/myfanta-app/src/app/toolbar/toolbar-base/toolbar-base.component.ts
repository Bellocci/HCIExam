import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { ToolbarComponent } from '../toolbar.component';

import { UserService } from 'src/app/service/user.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { RouterService } from 'src/app/service/router.service';
import { DialogService } from 'src/app/service/dialog.service';
import { LoginDialogComponent } from 'src/app/Dialog/login-dialog/login-dialog.component';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { UserEntity } from 'src/model/userEntity.model';

@Component({
  selector: 'app-toolbar-base',
  templateUrl: './toolbar-base.component.html',
  styleUrls: ['./toolbar-base.component.css']
})
export class ToolbarBaseComponent extends ToolbarComponent implements OnInit {

  @Output() sidenav_emit = new EventEmitter();

  private _userLogged: boolean = false;  
  private _user!: UserEntity;  
  private league!:LeagueEntity | null;  
  private playerSelected : PlayerEntity | null = null;

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
    this._userService.addObserverForUser(new ObserverStepBuilder<UserEntity>()
      .next(user => {
        this._user = user;
        this.userLogged = user.isUserDefined();
      })
      .build()
    );
  }

  private observeLeagueSelected() : void {
    this._internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
        .next(league => this.league = league)
        .build()
    );
  }

  private observePlayerSelected() : void {
    this._internalDataService.addObserverToPlayerSelected(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => this.playerSelected = player)
      .build());
  }

  /* FINE OBSERVER */

  /* GETTER & SETTER */

  public get userLogged(): boolean {
    return this._userLogged;
  }

  private set userLogged(value: boolean) {
    this._userLogged = value;
  }

  public get user(): UserEntity {
    return this._user;
  }

  private set user(value: UserEntity) {
    this._user = value;
  }

  /* Metodi visibilità */

  isLeagueSelected() : boolean {
    return this.league != null;
  }

  isBtnHomeRendered() : boolean {
    return !this.routerService.currentPageIsHome(LinkEnum.HOME) && 
      (this.isLeagueSelected() || this.routerService.currentPageIsMyProfile(LinkEnum.USER_PROFILE));
  }

  isCreateTeamLinkSelected() : boolean {
    return this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM) || this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) || this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST);
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
    if(this.routerService.currentPageIsMyProfile(LinkEnum.USER_PROFILE)) {
      this.routerService.goToHomePage(LinkEnum.HOME);
    }
    this.snackbarService.openInfoSnackBar("Ti sei scollegato dal tuo account");    
  }  

  goToPage(link:LinkEnum) : void {
    this.routerService.goToLink(link);
  }

  isPageSelected(link:LinkEnum) : boolean {
    return this.routerService.isLinkActivated(link);
  }
}
