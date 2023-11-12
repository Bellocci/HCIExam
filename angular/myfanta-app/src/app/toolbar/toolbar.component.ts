import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { InternalDataService } from '../service/internal-data.service';
import { TeamDataService } from '../service/team-data.service';
import { FilterDataService } from '../service/filter-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { RouterService } from '../service/router.service';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { UserService } from '../service/user.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { Observable, Subscription } from 'rxjs';
import { UserEntity } from 'src/model/userEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { SnackBarService } from '../service/snack-bar.service';
import { DialogService } from '../service/dialog.service';
import { BreakpointsService } from '../service/breakpoints.service';
import { LoginDialogComponent } from '../Dialog/login-dialog/login-dialog.component';
import { DialogHelper } from '../Dialog/dialogHelper.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  /**
   * ==========
   * VARIABILI
   * ==========
   */

  // Permette di interagire direttamente con la componente mat-sidenav
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('toolbarFirstRow', { static : true}) toolbarFirstRowEl: any;

  // Observable breakpoints
  private _isMobileOrTablet: Observable<boolean> = this.breakpointsService.mobileOrTabletObservable;
  private _isMobile: Observable<boolean> = this.breakpointsService.mobileObservable;  

  private _isMobileBreakpointActive:boolean = false;

  private _userLogged: boolean = false;
  private _user!: UserEntity;

  private _sportSelected: number = -1;
  private _leagueSelected!: LeagueEntity | null;
  private _playerSelected: PlayerEntity | null = null;

  private _subscriptionUserObservable: Subscription | undefined;
  private _subscriptionLeagueSelectedObservable: Subscription | undefined;
  private _subscriptionPlayerSelected: Subscription | undefined;
  private _subscriptionMobileBreakpoint:Subscription;

  linkEnum: typeof LinkEnum = LinkEnum;

  /*
   * ==============================
   * CONSTRUCTOR INIT & DESTROYER
   * ==============================
   */

  constructor(private filterDataService: FilterDataService,
    private internalDataService: InternalDataService,
    private teamDataService: TeamDataService,
    public routerService: RouterService,
    private userService: UserService,
    private snackbarService: SnackBarService,
    private dialogService: DialogService,
    private breakpointsService: BreakpointsService) {

    this._subscriptionUserObservable = this.observeUserLogged();
    this._subscriptionLeagueSelectedObservable = this.observeLeagueSelected();
    this._subscriptionPlayerSelected = this.observePlayerSelected();
    this._subscriptionMobileBreakpoint = this.observeMobileBreakpoint();
  }

  ngOnInit(): void {
    console.log("Construct the Toolbar component");
  }

  ngOnDestroy(): void {
    console.log("Destroy the Toolbar component");
    this._subscriptionUserObservable != undefined ? this._subscriptionUserObservable.unsubscribe() : undefined;
    this._subscriptionLeagueSelectedObservable != undefined ? this._subscriptionLeagueSelectedObservable.unsubscribe() : undefined;
    this._subscriptionPlayerSelected != undefined ? this._subscriptionPlayerSelected.unsubscribe() : undefined;
    this._subscriptionMobileBreakpoint.unsubscribe();
  }

  /*
   * ==========
   * OBSERVER 
   * ==========
   */

  private observeUserLogged() : Subscription | undefined {    
    return this.userService.addObserverForUser(new ObserverStepBuilder<UserEntity>()
      .next(user => {
        this._user = user;
        this._userLogged = user.isUserDefined();
      })
      .build()
    );
  }

  private observeLeagueSelected() : Subscription | undefined {
    return this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
      .next(league => this._leagueSelected = league)
      .build()
    );
  }

  private observePlayerSelected() : Subscription | undefined {
    return this.internalDataService.addObserverToPlayerSelected(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => this._playerSelected = player)
      .build());
  }

  private observeMobileBreakpoint() : Subscription {
    return this.breakpointsService
        .mobileObservable
        .subscribe(new ObserverStepBuilder<boolean>()
        .next(isMobile => this._isMobileBreakpointActive = isMobile)
        .build());
  }

  /**
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

  public get isMobile(): Observable<boolean> {
    return this._isMobile;
  }

  public get leagueSelected(): LeagueEntity | null {
    return this._leagueSelected;
  }

  public set leagueSelected(value : LeagueEntity | null) {
    this._leagueSelected = value;
  }

  public get sportSelected(): number {
    return this._sportSelected;
  }

  public set sportSelected(value: number) {
    this._sportSelected = value;
  }

  getSports(): SportEnum[] {
    return SportEnum.getAllSport();
  }

  getChampionships(sport: SportEnum): ChampionshipEnum[] {
    return this.filterDataService.filterChampionshipsBySport(sport);
  }

  getLeagues(sport: SportEnum, championship: ChampionshipEnum): LeagueEntity[] {
    return this.filterDataService.filterLeaguesByChampionshipAndSport(sport, championship);
  }

  getLoadingDataObservable() : Observable<boolean> {
    return this.internalDataService.getLoadingDataObservable();
  }

  /*
   * ===================
   * METODI VISIBILITA'
   * ===================
   */

  isPanelSportOpen(index: number): boolean {
    return this.sportSelected == index;
  }

  isLeagueSelected() : boolean {
    return this.leagueSelected != null;
  }

  isBtnHomeRendered() : boolean {
    return !this.routerService.currentPageIsHome(LinkEnum.HOME) && 
      (this.isLeagueSelected() || this.routerService.currentPageIsMyProfile(LinkEnum.USER_PROFILE));
  }

  isCreateTeamLinkSelected() : boolean {
    return this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM) || this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) || this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST);
  }

  isBackBtnRendered() : boolean {
    return this._playerSelected != null ? this.routerService.currentPageIsPlayerProfile(this._playerSelected) : false;
  }

  isPageSelected(link:LinkEnum) : boolean {
    return this.routerService.isLinkActivated(link);
  }

  /*
   * =========
   * LISTENER
   * =========
   */

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  openedPanelSportListener(index: number): void {
    this.sportSelected = index;
  }

  closedPanelSportListener(): void {
    this.sportSelected = -1;
    // Permette di rimuovere il focus dall'elemento attivo
    const activeElement = document.activeElement as HTMLElement;
    activeElement.blur();
  }

  selectedLeagueListener(league: LeagueEntity) {
    this.clearData();
    this.leagueSelected = league;
    this.closeSidenav();
    this.routerService.goToMyTeamPage(LinkEnum.MYTEAM);
  }

  openLoginDialog() : void {
    console.log("Open login dialog");
    if(this._isMobileBreakpointActive) {     
      let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();
      dialogHelper.setWidth("100%");
      dialogHelper.setHeight("100%");
      dialogHelper.openDialog(LoginDialogComponent);
    } else {
      this.dialogService.getDialogHelper().openDialog(LoginDialogComponent);
    }
  }

  logout() : void {    
    this.userService.logout();
    if(this.routerService.currentPageIsMyProfile(LinkEnum.USER_PROFILE)) {
      this.routerService.goToHomePage(LinkEnum.HOME);
    }
    this.snackbarService.openInfoSnackBar("Ti sei scollegato dal tuo account");    
  }

  private clearData(): void {
    this.userService.setSelectedTeam(undefined);
    this.teamDataService.clearAllList();
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
