import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { TeamDataService } from '../../service/team-data.service';
import { RouterService } from '../../service/router.service';
import { InternalDataService } from '../../service/internal-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { CreateNewTeamDialogComponent } from '../../Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { DialogService } from '../../service/dialog.service';
import { DialogHelper } from '../../Dialog/dialogHelper.interface';
import { UserEntity } from 'src/model/userEntity.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { Subscription } from 'rxjs';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { DialogDataAbstract } from 'src/app/Dialog/dialog-data.abstract';
import { UserTeamDialogDataBuilder } from 'src/app/Dialog/create-new-team-dialog/user-team-dialog-data-builder';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private dialogHelper!:DialogHelper;

  private myTeams:UserTeamEntity[] = [];
  private removedTeams:UserTeamEntity[] = [];

  private _isMobileBreakpointActive: boolean = false;
  private _subscriptionToMobileObservable: Subscription;

  private _isMobileOrMobileXLBreakpointActive: boolean = false;
  private _subscriptionToMobileOrMobileXLObservable : Subscription;

  private _isLargeDeviceBreakpointActive: boolean = false;
  private _subscriptionToLargeDeviceBreakpointObservable : Subscription;

  private _isXLDeviceBreakpointActive: boolean = false;  
  private _subscriptionToXLDeviceBreakpointObservable : Subscription;
  

  /*
   * ==============================
   * CONSTRUCTOR, INIT & DESTROYER 
   * ==============================
   */

  constructor(private userService:UserService,
    private teamDataService:TeamDataService, 
    private routerService:RouterService,
    private internalDataService:InternalDataService,
    private dialogService:DialogService,
    public breakpointsService:BreakpointsService) { 

    console.log("Construct User profile page");
    this._subscriptionToMobileObservable = this.observeMobileBreakpoints();
    this._subscriptionToMobileOrMobileXLObservable = this.observeMobileOrMobileXLBreakpoints();
    this._subscriptionToLargeDeviceBreakpointObservable = this.observeLargeDeviceBreakpoints();
    this._subscriptionToXLDeviceBreakpointObservable = this.observeXLDeviceBreakpoints();
    this.dialogHelper = this.dialogService.getDialogHelper();
  }  

  ngOnInit(): void {    
    //this.internalDataService.setLoadingData(false);
  }

  ngOnDestroy(): void {
    console.log("Destroy User profile page");

    this._subscriptionToMobileObservable.unsubscribe();
    this._subscriptionToMobileOrMobileXLObservable.unsubscribe();
    this._subscriptionToLargeDeviceBreakpointObservable.unsubscribe();
    this._subscriptionToXLDeviceBreakpointObservable.unsubscribe();
  }

  /*
   * ==========
   * OBSERVERS 
   * ==========
   */

  private observeMobileBreakpoints() : Subscription {
    return this.breakpointsService.mobileObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(active => this.isMobileBreakpointActive = active)
        .error(err => console.log("Error while retriving mobile breakpoint : " + err))
        .build()
    );
  }

  private observeMobileOrMobileXLBreakpoints() : Subscription {
    return this.breakpointsService.mobileOrMobileXLObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(active => this.isMobileOrMobileXLBreakpointActive = active)
        .error(err => console.log("Error while retriving mobile or mobile XL breakpoint : " + err))
        .build()
    );
  }

  private observeLargeDeviceBreakpoints() : Subscription {
    return this.breakpointsService.largeDeviceObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(active => this.isLargeDeviceBreakpointActive = active)
        .error(err => console.log("Error while retriving large device breakpoint : " + err))
        .build()
    );
  }

  private observeXLDeviceBreakpoints() : Subscription {
    return this.breakpointsService.xlDeviceObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(active => this.isXLDeviceBreakpointActive = active)
        .error(err => console.log("Error while retriving XL Device breakpoint : " + err))
        .build()
    );
  }

  /*
   * ================
   * GETTER & SETTER
   * ================
   */

  public get isMobileOrMobileXLBreakpointActive(): boolean {
    return this._isMobileOrMobileXLBreakpointActive;
  }

  private set isMobileOrMobileXLBreakpointActive(value: boolean) {
    this._isMobileOrMobileXLBreakpointActive = value;
  }

  public get isLargeDeviceBreakpointActive(): boolean {
    return this._isLargeDeviceBreakpointActive;
  }

  private set isLargeDeviceBreakpointActive(value: boolean) {
    this._isLargeDeviceBreakpointActive = value;
  }

  public get isXLDeviceBreakpointActive(): boolean {
    return this._isXLDeviceBreakpointActive;
  }

  private set isXLDeviceBreakpointActive(value: boolean) {
    this._isXLDeviceBreakpointActive = value;
  }

  public get isMobileBreakpointActive(): boolean {
    return this._isMobileBreakpointActive;
  }
  
  private set isMobileBreakpointActive(value: boolean) {
    this._isMobileBreakpointActive = value;
  }

  getUser() : UserEntity {
    return this.userService.getUser();
  }

  getTeams(sport:SportEnum) : UserTeamEntity[] {
    return this.userService.loadTeams(sport);
  }

  getSports() : SportEnum[] {
    return SportEnum.getAllSport();
  }

  getNumberOfPlayerIntoFavoritList(team:UserTeamEntity) : number {
    return team.favoriteList.length;
  }

  getNumberOfPlayerIntoBlacklist(team:UserTeamEntity) : number {
    return team.blacklist.length;
  }

  /*
   * ===========
   * VISIBILITA' 
   * ===========
   */

  /**
   * Verifica se alla chiave nella mappa sono associati team attivi.
   * 
   * @param sport 
   * @returns true se presenti team attivi per lo sport, false altrimenti
   */
  hasTeam(sport:SportEnum) : boolean {
    return this.userService.hasActiveTeam(sport);
  }

  /*
   * =========
   * LISTENER
   * =========
   */

  removeTeam(team:UserTeamEntity) : void {
    this.userService.removeTeam(team);
  }

  loadTeam(team:UserTeamEntity) : void {
    this.teamDataService.loadTeam(team);
    this.routerService.goToMyTeamPage();
    this.internalDataService.setLeagueSelected(team.league);
  }

  /**
   * Listener per l'apertura della dialog CreateNewTeamDialog
   */
  openCreateNewTeamDialog() {
    let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();

    let dialogData : DialogDataAbstract = new UserTeamDialogDataBuilder()
      .setCreateMode(true)
      .build();
    dialogHelper.setData(dialogData);

    this.dialogHelper.afterClosed()?.subscribe(result => {
      if(result instanceof UserTeamEntity) {
        this.userService.addNewTeam(result);
      }
    });

    this.openUserTeamDialog(dialogHelper);
  }

  openEditUserTeamDialog(userTeam:UserTeamEntity) {
    let dialogHelper:DialogHelper = this.dialogService.getDialogHelper();
    let dialogData : DialogDataAbstract = new UserTeamDialogDataBuilder()
      .setCreateMode(false)
      .setUserTeam(userTeam)
      .build();
    dialogHelper.setData(dialogData);
    this.openUserTeamDialog(dialogHelper);        
  }

  /*
   * ===============
   * METODI PRIVATI 
   * ===============
   */

  private openUserTeamDialog(dialogHelper:DialogHelper) {
    if(this.isMobileBreakpointActive) {     
      dialogHelper.setWidth("100%");
      dialogHelper.setHeight("100%");
    } 
    dialogHelper.openDialog(CreateNewTeamDialogComponent);
  }
}
