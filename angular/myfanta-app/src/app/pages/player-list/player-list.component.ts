import { Component, OnDestroy, OnInit } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { TeamDataService } from '../../service/team-data.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { RouterService } from 'src/app/service/router.service';
import { StandardOption } from 'src/decorator/option/standard-option.model';
import { UserService } from 'src/app/service/user.service';
import { CreateNewTeamDataStructure } from 'src/app/Dialog/create-new-team-dialog/create-new-team-data-structure.interface';
import { DialogService } from 'src/app/service/dialog.service';
import { CreateNewTeamDialogComponent } from 'src/app/Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { UserEntity } from 'src/model/userEntity.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { Subscription } from 'rxjs';
import { DialogHelper } from 'src/app/Dialog/dialogHelper.interface';
import { StandardMatchPlayedEnum } from 'src/enum/optionEnum/StandardMatchPlayedEnum';
import { PlayerSearchFilter } from 'src/app/service/player-search-filter';
import { PlayerSearchRequestService } from 'src/app/service/player-search-request.service';
import { ObservableHelper } from 'src/utility/observable-helper';
import { PlayerEntity } from 'src/model/playerEntity.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */    

  // Lista dei link navigabili
  linkEnum: typeof LinkEnum = LinkEnum;  

  private _simpleOption!: StandardOption;
  private option: OptionEntity | null = null;
  private leagueSelected: LeagueEntity | null = null;
  private _user!: UserEntity;
  private _userTeam: UserTeamEntity | undefined = undefined;
 
  private _subscriptionObserverToLeague: Subscription | undefined;
  private _subscriptionObserverToOption: Subscription | undefined;
  private _subscriptionObserverToUser: Subscription | undefined;
  private _subscriptionObserverToUserTeam: Subscription | undefined;

  private _playerSearchFilterObservable:ObservableHelper<PlayerSearchFilter> = new ObservableHelper<PlayerSearchFilter>(new PlayerSearchFilter());
  private _playerFilteredList:PlayerEntity[] = [];

  /*
   * =============================
   * CONSTRUCTOR & INIT & DESTROY
   * =============================
   */

  constructor(private internalDataService: InternalDataService,
    private teamDataService: TeamDataService,
    public routerService: RouterService,
    private userService: UserService,
    private dialogService: DialogService,
    public breakpointsService: BreakpointsService,
    private playerSearchRequest:PlayerSearchRequestService) {

    console.log("Construct Player list component");

    this._subscriptionObserverToLeague = this.addObserverToLeague();
    this._subscriptionObserverToOption = this.observeOptionTeam();
    this._subscriptionObserverToUser = this.observeUser();
    this.observePlayerSearchFilter();

    /*
     * Inizializzazione filtro di ricerca
     */
    let playerSearchFilter = this._playerSearchFilterObservable.getValue();
    playerSearchFilter.matchPlayedPerc = StandardMatchPlayedEnum.ALL_PLAYERS;
    this._playerSearchFilterObservable.setValue(playerSearchFilter);
  }

  ngOnInit(): void {
    //this.internalDataService.setLoadingData(false);
  }

  ngOnDestroy(): void {
    console.log("Destroy Player list component");
    this._subscriptionObserverToLeague != undefined ? this._subscriptionObserverToLeague.unsubscribe() : null;
    this._subscriptionObserverToOption != undefined ? this._subscriptionObserverToOption.unsubscribe() : null;
    this._subscriptionObserverToUser != undefined ? this._subscriptionObserverToUser.unsubscribe() : null;
    this._subscriptionObserverToUserTeam != undefined ? this._subscriptionObserverToUserTeam.unsubscribe() : null;
    this._playerSearchFilterObservable.complete();
  }

  /**
   * =========
   * OBSERVER
   * =========
   */

  private addObserverToLeague(): Subscription | undefined {
    return this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
      .next(league => this.leagueSelected = league)
      .error(error => console.log("Error while retriving league: " + error))
      .build()
    )
  }

  private observeOptionTeam(): Subscription | undefined {
    return this.teamDataService.addObserverToOption(new ObserverStepBuilder<OptionEntity | null>()
      .next(o => this.option = o)
      .error(error => console.log("Error while retriving option: " + error))
      .build());
  }

  private observeUser(): Subscription | undefined {
    return this.userService.addObserverForUser(new ObserverStepBuilder<UserEntity>()
      .next(user => this.user = user)
      .error(error => console.log("Error while retriving User: " + error))
      .build());
  }

  private observePlayerSearchFilter() : Subscription | undefined {
    return this._playerSearchFilterObservable.addObserver(new ObserverStepBuilder<PlayerSearchFilter>()
        .next(filter => {
          filter.league = this.leagueSelected!;
          this._playerFilteredList = this.playerSearchRequest.byFilter(filter)
        })
        .error(error => console.log("Error while retriving Player search filter : " + error))
        .build());
  }

  /**
   * ================
   * GETTER & SETTER
   * ================
   */

  public get user(): UserEntity {
    return this._user;
  }

  private set user(value: UserEntity) {
    this._user = value;
  }

  public get userTeam(): UserTeamEntity | undefined {
    return this._userTeam;
  }

  private set userTeam(value: UserTeamEntity | undefined) {
    this._userTeam = value;
  }

  public get simpleOption(): StandardOption {
    return this._simpleOption;
  }

  private set simpleOption(value: StandardOption) {
    this._simpleOption = value;
  }

  getPlayersList() : PlayerEntity[] {
    return this._playerFilteredList;
  }

  /*
   * ============
   * VISIBILITA'
   * ============
   */

  isTableFilterRendered(): boolean {
    return this.routerService.currentPageIsFavoritList() ||
      this.routerService.currentPageIsBlacklist() ||
      this.routerService.currentPageIsPlayerList();
  }

  isOptionFilterRendered(): boolean {
    return this.routerService.currentPageIsMyTeam();
  }

  isSaveBtnRendered(): boolean {
    return this.user.isUserDefined() && this.userTeam != undefined;
  }

  isSaveNewTeamBtnRendered(): boolean {
    return this.user.isUserDefined();
  }  

  /*
   * ========= 
   * LISTENER
   * =========
   */

  updateOption(option: StandardOption): void {
    this.simpleOption = option;
  }

  saveTeam(): void {
    this.userService.saveTeam();
  }

  openCreateNewTeamDialog(): void {
    if (this.leagueSelected != null) {
      let dataStructure: CreateNewTeamDataStructure = {
        sport: this.leagueSelected.sport,
        championship: this.leagueSelected.championship,
        league: this.leagueSelected,
        teamName: '',
        importPlayer: true
      }
      let dialogHelper: DialogHelper = this.dialogService.getDialogHelper();
      dialogHelper.setData(dataStructure);
      dialogHelper.openDialog(CreateNewTeamDialogComponent);
    }
  }
}