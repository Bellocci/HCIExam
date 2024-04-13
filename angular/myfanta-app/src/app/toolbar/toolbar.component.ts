import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { InternalDataService } from '../service/internal-data.service';
import { FilterDataService } from '../service/filter-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { RouterService } from '../service/router.service';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { UserService } from '../service/user.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { Subscription } from 'rxjs';
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

  private _isMobileBreakpointActive: boolean = false;
  private _isMobileOrTabletBreakpointActive: boolean = false;  
  private _userLogged: boolean = false;
  private _user!: UserEntity;

  private _sportSelected: number = -1;
  private _leagueSelected!: LeagueEntity | null;
  private _playerSelected: PlayerEntity | null = null;

  // Registrazioni degli observer
  private _subscriptionUserObservable: Subscription | undefined;
  private _subscriptionLeagueSelectedObservable: Subscription | undefined;
  private _subscriptionPlayerSelected: Subscription | undefined;
  private _subscriptionMobileBreakpoint:Subscription;
  private _subscriptionToMobileOrTabletBreakpointObservable:Subscription;

  // Lista dei link navigabili
  linkEnum: typeof LinkEnum = LinkEnum;

  /*
   * ============================================
   * COSTRUTTORE - INIZIALIZZATORE - DISTRUTTORE
   * ============================================
   */

  constructor(private filterDataService: FilterDataService,
    private internalDataService: InternalDataService,
    public routerService: RouterService,
    private userService: UserService,
    private snackbarService: SnackBarService,
    private dialogService: DialogService,
    public breakpointsService: BreakpointsService) {

    console.log("Construct the Toolbar component");

    let windowWidth:number = window.innerWidth;
    this.isMobileBreakpointActive = BreakpointsService.isMobileBreakpointActive(windowWidth);
    this.isMobileOrTabletBreakpointActive = BreakpointsService.isMobileOrTabletBreakpointActive(windowWidth);
    
    this._subscriptionUserObservable = this.observeUserLogged();
    this._subscriptionLeagueSelectedObservable = this.observeLeagueSelected();
    this._subscriptionPlayerSelected = this.observePlayerSelected();
    this._subscriptionMobileBreakpoint = this.observeMobileBreakpoint();
    this._subscriptionToMobileOrTabletBreakpointObservable = this.observeMobileOrTabletBreakpoint();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    console.log("Destroy the Toolbar component");
    this._subscriptionUserObservable != undefined ? this._subscriptionUserObservable.unsubscribe() : undefined;
    this._subscriptionLeagueSelectedObservable != undefined ? this._subscriptionLeagueSelectedObservable.unsubscribe() : undefined;
    this._subscriptionPlayerSelected != undefined ? this._subscriptionPlayerSelected.unsubscribe() : undefined;
    this._subscriptionMobileBreakpoint.unsubscribe();
    this._subscriptionToMobileOrTabletBreakpointObservable.unsubscribe();
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private observeUserLogged() : Subscription | undefined {    
    return this.userService.addObserverForUser(new ObserverStepBuilder<UserEntity>()
      .next((user : UserEntity) => {
        this._user = user;
        this._userLogged = user.isUserDefined();
      })
      .error((error : any) => console.error("Error to get user: " + error))
      .complete( () => console.log("User observer completed"))
      .build()
    );
  }

  private observeLeagueSelected() : Subscription | undefined {
    return this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
      .next((league : LeagueEntity | null) => this._leagueSelected = league)
      .error((error : any) => console.error("Error to get league: " + error))
      .complete( () => console.log("League selected observer completed"))
      .build()
    );
  }

  private observePlayerSelected() : Subscription | undefined {
    return this.internalDataService.addObserverToPlayerSelected(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => this._playerSelected = player)
      .error((error : any) => console.error("Error to get player selected: " + error))
      .complete( () => console.log("Player selected observer completed"))
      .build());
  }

  private observeMobileBreakpoint() : Subscription {
    return this.breakpointsService.mobileObservable
        .subscribe(new ObserverStepBuilder<boolean>()
        .next((isMobile : boolean) => this._isMobileBreakpointActive = isMobile)
        .error((error : any) => console.error("Error to get mobile breakpoint: " + error))
        .complete( () => console.log("Mobile breakpoint observer completed"))
        .build());
  }

  private observeMobileOrTabletBreakpoint() : Subscription {
    return this.breakpointsService.mobileOrTabletObservable
        .subscribe(new ObserverStepBuilder<boolean>()
        .next((isActive : boolean) => this.isMobileOrTabletBreakpointActive = isActive)
        .error((error : any) => console.error("Error to get mobile breakpoint: " + error))
        .complete( () => console.log("Mobile breakpoint observer completed"))
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

  public get isMobileBreakpointActive(): boolean {
    return this._isMobileBreakpointActive;
  }

  private set isMobileBreakpointActive(value: boolean) {
    this._isMobileBreakpointActive = value;
  }

  public get isMobileOrTabletBreakpointActive(): boolean {
    return this._isMobileOrTabletBreakpointActive;
  }
  
  private set isMobileOrTabletBreakpointActive(value: boolean) {
    this._isMobileOrTabletBreakpointActive = value;
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
    return !this.routerService.currentPageIsHome() && (this.isLeagueSelected() || this.routerService.currentPageIsMyProfile());
  }

  isCreateTeamLinkSelected() : boolean {
    return this.routerService.currentPageIsMyTeam() || 
      this.routerService.currentPageIsFavoritList() || 
      this.routerService.currentPageIsBlacklist();
  }

  isBackBtnRendered() : boolean {
    return this._playerSelected != null ? this.routerService.currentPageIsPlayerProfile(this._playerSelected) : false;
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
    this.leagueSelected = league;
    this.closeSidenav();
    this.routerService.goToMyTeamPage();
  }

  openLoginDialog() : void {
    let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();
    if(this._isMobileBreakpointActive) {     
      dialogHelper.setWidth("100%");
      dialogHelper.setHeight("100%");
    } 
    dialogHelper.openDialog(LoginDialogComponent);
  }

  logout() : void {    
    this.userService.logout();
    if(this.routerService.currentPageIsMyProfile()) {
      this.routerService.goToHomePage();
    }
    this.snackbarService.openInfoSnackBar("Ti sei scollegato dal tuo account");    
  }
}
