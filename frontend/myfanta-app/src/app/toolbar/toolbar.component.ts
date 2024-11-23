import { Component, OnInit, OnDestroy } from '@angular/core';
import { InternalDataService } from '../service/internal-data.service';
import { FilterDataService } from '../service/filter-data.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { RouterService } from '../service/router.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { UserService } from '../service/user.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { Subscription } from 'rxjs';
import { UserEntity } from 'src/model/userEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { SnackBarService } from '../service/snack-bar.service';
import { BreakpointsService } from '../service/breakpoints.service';
import { LoginDialogComponent } from '../Dialog/login-dialog/login-dialog.component';
import { User } from 'src/decorator/user';
import { LoginDialogHelper } from '../Dialog/login-dialog/login-dialog-helper';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { MessageBuilderImpl } from 'src/utility/message/MessageBuilderImpl';
import { MessageSeverityEnum } from 'src/enum/MessageSeverityEnum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [DialogService, MessageService],
})
export class ToolbarComponent implements OnInit, OnDestroy {

  /**
   * ==========
   * VARIABILI
   * ==========
   */

  ref!: DynamicDialogRef;

  private _userLogged: boolean = false;
  private _user!: UserEntity;
  private _items: MenuItem[] = [];  

  private _sportSelected: number = -1;
  private _leagueSelected!: LeagueEntity | null;
  private _playerSelected: PlayerEntity | null = null;

  // Registrazioni degli observer
  private _subscriptionUserObservable: Subscription | undefined;
  private _subscriptionLeagueSelectedObservable: Subscription | undefined;
  private _subscriptionPlayerSelected: Subscription | undefined;

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
    public dialogService: DialogService,
    public messageService: MessageService,
    public breakpointsService: BreakpointsService) {

    console.log("Construct the Toolbar component");
  }

  ngOnInit(): void { 
    this._subscriptionUserObservable = this.observeUserLogged();
    this._subscriptionLeagueSelectedObservable = this.observeLeagueSelected();
    this._subscriptionPlayerSelected = this.observePlayerSelected();

    this.items = [
      {
        label: 'Mio Profilo',
        icon: 'pi pi-user',
        command: () => this.routerService.goToMyProfilePage(),
      },
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      }
    ]
  }

  ngOnDestroy(): void {
    console.log("Destroy the Toolbar component");
    this._subscriptionUserObservable != undefined ? this._subscriptionUserObservable.unsubscribe() : undefined;
    this._subscriptionLeagueSelectedObservable != undefined ? this._subscriptionLeagueSelectedObservable.unsubscribe() : undefined;
    this._subscriptionPlayerSelected != undefined ? this._subscriptionPlayerSelected.unsubscribe() : undefined;
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private observeUserLogged() : Subscription | undefined {    
    return this.userService.addObserverForUser(new ObserverStepBuilder<User>()
      .next((user : User) => {
        this._user = user.entity;
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

  public get items(): MenuItem[] {
    return this._items;
  }

  public set items(value: MenuItem[]) {
    this._items = value;
  }

  getUsername() : string {
    if(this.isMobileView()) {
      return this.user.username.length > 10 ? this.user.username.substring(0, 8) + "..." : this.user.username;        
    } else {
      return this.user.username.length > 20 ? this.user.username.substring(0, 18) + "..." : this.user.username; 
    }
  }

  /*
   * ===================
   * METODI VISIBILITA'
   * ===================
   */

  isSecondToolbarRowHidden() {
    return BreakpointsService.isEqualOrGreaterThanLaptopBreakpoint(window.innerWidth);
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

  isMobileView() : boolean {
    return BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);
  }

  /*
   * =========
   * LISTENER
   * =========
   */

  openLoginDialog() : void {
    let helper:LoginDialogHelper = new LoginDialogHelper();
    let width:string;
    let height:string 
    if(this.isMobileView()) {
      width = "100%";
      height = "100%";        
    } else {
      width = LoginDialogHelper.DEFAULT_WIDTH;
      height = LoginDialogHelper.DEFAULT_HEIGHT;
    }
    this.ref = this.dialogService.open(LoginDialogComponent, 
      helper.getDynamicDialogConfig(width, height));

      this.ref.onClose.subscribe((user: User) => {
        if(user) {
          this.messageService.add(new MessageBuilderImpl().Build()
            .setSeverity(MessageSeverityEnum.INFO)
            .setText("Benvenuto " + user.username)
            .build())
        }
      });
  }

  logout() : void {    
    this.userService.logout();
    if(this.routerService.currentPageIsMyProfile()) {
      this.routerService.goToHomePage();
    }
    this.snackbarService.openInfoSnackBar("Ti sei scollegato dal tuo account");    
  }
}
