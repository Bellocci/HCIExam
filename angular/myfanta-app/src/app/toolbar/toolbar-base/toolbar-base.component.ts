import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
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
import { Observable, Subject, Subscription} from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';

@Component({
  selector: 'app-toolbar-base',
  templateUrl: './toolbar-base.component.html',
  styleUrls: ['./toolbar-base.component.scss']
})
export class ToolbarBaseComponent implements OnInit, OnDestroy {

  /*
   * ===========
   * VARIABILI 
   * ===========
   */

  // Evento per gestire l'apertura e la chiusura del menu
  @Output() sidenav_emit = new EventEmitter();  

  // Observable breakpoints
  private _isMobileOrTablet: Observable<boolean> = this.breakpointsService.mobileOrTabletObservable;

  private _userLogged: boolean = false;  
  private _user!: UserEntity;  
  private league!:LeagueEntity | null;  
  private playerSelected : PlayerEntity | null = null;  

  private _subscriptionUserObservable : Subscription | undefined;
  private _subscriptionLeagueSelectedObservable : Subscription | undefined;
  private _subscriptionPlayerSelected : Subscription | undefined;

  linkEnum: typeof LinkEnum = LinkEnum;
  /*
   * ==============================
   * CONSTRUCTOR INIT & DESTROYER
   * ==============================
   */

  constructor(
    private filterService:FilterDataService,
    private _internalDataService:InternalDataService,
    private _teamDataService:TeamDataService,
    private _userService:UserService,
    private snackbarService:SnackBarService,
    private routerService:RouterService,
    private dialogService:DialogService,
    private breakpointsService:BreakpointsService) 
  {   

    this._subscriptionUserObservable = this.observeUserLogged();
    this._subscriptionLeagueSelectedObservable = this.observeLeagueSelected();
    this._subscriptionPlayerSelected = this.observePlayerSelected();
  }  

  ngOnInit(): void { 
    console.log("Construct the Toolbar component");
  }

  ngOnDestroy(): void {
    console.log("Destroy the Toolbar component");
    this._subscriptionUserObservable != undefined ? this._subscriptionUserObservable.unsubscribe() : null;
    this._subscriptionLeagueSelectedObservable != undefined ? this._subscriptionLeagueSelectedObservable.unsubscribe() : null;
    this._subscriptionPlayerSelected != undefined ? this._subscriptionPlayerSelected.unsubscribe() : null;
  }

  /*
   * ==========
   * OBSERVER 
   * ==========
   */

  private observeUserLogged() : Subscription | undefined {
    return this._userService.addObserverForUser(new ObserverStepBuilder<UserEntity>()
      .next(user => {
        this._user = user;
        this.userLogged = user.isUserDefined();
      })
      .build()
    );
  }

  private observeLeagueSelected() : Subscription | undefined {
    return this._internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
        .next(league => this.league = league)
        .build()
    );
  }

  private observePlayerSelected() : Subscription | undefined {
    return this._internalDataService.addObserverToPlayerSelected(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => this.playerSelected = player)
      .build());
  }  

  /*
   * ================
   * GETTER & SETTER
   * ================
   */

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

  public get isMobileOrTablet(): Observable<boolean> {
    return this._isMobileOrTablet;
  }

  /*
   * ===================
   * METODI VISIBILITA'
   * ===================
   */

  isLeagueSelected() : boolean {
    return this.league != null;
  }

  isBtnHomeRendered() : boolean {
    return !this.routerService.currentPageIsHome() && 
      (this.isLeagueSelected() || this.routerService.currentPageIsMyProfile());
  }

  isCreateTeamLinkSelected() : boolean {
    return this.routerService.currentPageIsMyTeam() || this.routerService.currentPageIsFavoritList() || this.routerService.currentPageIsBlacklist();
  }

  isBackBtnRendered() : boolean {
    return this.playerSelected != null ? this.routerService.currentPageIsPlayerProfile(this.playerSelected) : false;
  }

  isPageSelected(link:LinkEnum) : boolean {
    return this.routerService.isLinkActivated(link);
  }

  /*
   * =========
   * LISTENER
   * =========
   */

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

  /*
   * ============
   * NAVIGAZIONE
   * ============
   */
  goToPage(link:LinkEnum) : void {
    this.routerService.goToLink(link);
  }  
}
