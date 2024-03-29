import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/service/dialog.service';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { UserService } from 'src/app/service/user.service';
import { UserTeamDecoratorFactoryService } from 'src/decorator-factory/user-team-decorator-factory.service';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { SportEnum } from 'src/enum/SportEnum.model';
import { TeamDataService } from 'src/app/service/team-data.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { UserTeamDialogData } from './user-team-dialog-data';
import { FilterUtility } from 'src/utility/filter-utility';

@Component({
  selector: 'app-user-team-dialog',
  templateUrl: './user-team-dialog.component.html',
  styleUrls: ['./user-team-dialog.component.scss']
})
export class UserTeamDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */  

  private static readonly TEAM_NAME_DEFAULT: string = "Nome squadra";

  private _isCreateMode!: boolean;
  private _teamName: string;  
  private _selectedSport!: SportEnum | undefined;  
  private _selectedChampionship: ChampionshipEnum | undefined;
  private _selectedLeague: LeagueEntity | undefined;
  
  private importPlayer:boolean = false;

  private championshipsList:ChampionshipEnum[] = [];
  private leaguesList:LeagueEntity[] = [];

  private _isMobileBreakpointActive: boolean = false;  
  private _subscriptionToMobileBreakpointObservable:Subscription;

  /*
   * ===============================
   * CONSTRUCTOR - INIT - DESTROYER 
   * ===============================
   */

  constructor(private dialogService:DialogService, public breakpointsService:BreakpointsService,
    private filterDataService:FilterDataService,
    private userService:UserService,
    private userTeamDecoratorFactory:UserTeamDecoratorFactoryService,
    @Inject(MAT_DIALOG_DATA) private dialogData: UserTeamDialogData,
    private teamDataService:TeamDataService,
    private snackBarService:SnackBarService) { 

      console.log("Construct New Team dialog component");

      this._teamName = UserTeamDialogComponent.TEAM_NAME_DEFAULT;
      this._subscriptionToMobileBreakpointObservable = this.observeMobileBreakpoint();

      this.isCreateMode = this.dialogData.isCreateMode != undefined ? 
        this.dialogData.isCreateMode :
        true;
  
      if(this.dialogData.isCreateMode && this.dialogData.userTeam != undefined) {
          this.teamName = this.dialogData.userTeam.nameTeam;
          this.selectedSport = this.dialogData.userTeam.league.sport
          this.selectedChampionship = this.dialogData.userTeam.league.championship;
          this.selectedLeague = this.dialogData.userTeam.league;               
      } 
      else if(!this.dialogData.isCreateMode) {
        if(this.dialogData.userTeam == undefined) {
          throw Error("Unable to edit user team " + this.dialogData.userTeam);
        }
  
        this.teamName = this.dialogData.userTeam.nameTeam;
        this.selectedSport = this.dialogData.userTeam.league.sport
        this.selectedChampionship = this.dialogData.userTeam.league.championship;
        this.selectedLeague = this.dialogData.userTeam.league;
      }
  }    

  ngOnInit(): void { }

  ngOnDestroy(): void {
    console.log("Destroyer New Team Dialog");

    this._subscriptionToMobileBreakpointObservable.unsubscribe();
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private observeMobileBreakpoint() : Subscription {
    return this.breakpointsService.mobileObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(isActive => this.isMobileBreakpointActive = isActive)
        .error(err => console.log("Error while retriving mobile breakpoint observable : " + err))
        .build())    
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  public get isCreateMode(): boolean {
    return this._isCreateMode;
  }

  private set isCreateMode(value: boolean) {
    this._isCreateMode = value;
  }

  public get teamName(): string {
    return this._teamName;
  }

  public set teamName(value: string) {
    this._teamName = value;
  }

  public get selectedSport(): SportEnum | undefined {
    return this._selectedSport;
  }
  
  public set selectedSport(value: SportEnum | undefined) {
    this._selectedSport = value;
  }

  public get selectedChampionship(): ChampionshipEnum | undefined {
    return this._selectedChampionship;
  }

  public set selectedChampionship(value: ChampionshipEnum | undefined) {
    this._selectedChampionship = value;
  }

  public get selectedLeague(): LeagueEntity | undefined {
    return this._selectedLeague;
  }

  public set selectedLeague(value: LeagueEntity | undefined) {
    this._selectedLeague = value;
  }

  public get isMobileBreakpointActive(): boolean {
    return this._isMobileBreakpointActive;
  }
  
  private set isMobileBreakpointActive(value: boolean) {
    this._isMobileBreakpointActive = value;
  }

  getSports() : SportEnum[] {
    return SportEnum.getAllSport();
  }

  getChampionships() : ChampionshipEnum[] {
    return this.championshipsList;
  }

  getLeagues() : LeagueEntity[] {
    return this.leaguesList;
  }

  getSportDescription() : string {
    return this.selectedSport != undefined ? this.selectedSport.description : '';
  }

  getChampionshipDescription() : string {
    return this.selectedChampionship != undefined ? this.selectedChampionship.description : '';
  }

  getLeagueDescription() : string {
    return this.selectedLeague != undefined ? this.selectedLeague.name : '';
  }

  getAddTooltipMessage() : string {
    if(!this.isTeamNameDefined()) {
      return "Nome del team mancante";
    } else if(!this.isSportSelected()) {
      return "Nessuno sport selezionato";
    } else if(!this.isChampionshipSelected()) {
      return "Nessun campionato selezionato";
    } else if(!this.isLeagueSelected()) {
      return "Nessuna lega selezionata";
    }

    return "Crea nuova squadra";
  }

  /*
   * ===================
   * METODI VISIBILITA'
   * ===================
   */

  private isTeamNameDefined() : boolean {
    return !FilterUtility.isStringEmpty(this.teamName);
  }

  private isSportSelected() : boolean {
    return this.selectedSport instanceof SportEnum;
  }

  private isChampionshipSelected() : boolean {
    return this.selectedChampionship instanceof ChampionshipEnum;
  }

  private isLeagueSelected() : boolean {
    return this.selectedLeague != null;
  }

  isSelectChampionshipDisabled() : boolean {
    return !this.isSportSelected();
  }

  isSelectLeagueDisabled() : boolean {
    return !this.isChampionshipSelected();
  }

  isCreateBtnEnabled() : boolean {
    return this.isTeamNameDefined() && this.isSportSelected() && 
      this.isChampionshipSelected() && this.isLeagueSelected();
  }

  /*
   * ================ 
   * METODI LISTENER
   * ================
   */

  closeDialog(dialogResult?:any) : void {
    this.dialogService.getDialogHelper().closeDialog(dialogResult);
  }

  updateChampsionshipsList() : void {
    if(this.selectedSport != undefined) {
      this.championshipsList = this.filterDataService.filterChampionshipsBySport(this.selectedSport);
    }
  }

  resetChampionshipAndLeagueSelected() : void {
    this.championshipsList = [];
    this.leaguesList = [];
  }

  updateLeaguesList() : void {
    if(this.selectedSport != undefined && this.selectedChampionship != undefined) {
      this.leaguesList = this.filterDataService.filterLeaguesByChampionshipAndSport(this.selectedSport, this.selectedChampionship);
    }
  }

  resetLeagueSelected() : void {
    this.selectedLeague = undefined;
  }

  addNewTeam() : void {
    let newTeam:UserTeamEntity;
    if(this.importPlayer) {
      newTeam = this.userTeamDecoratorFactory.createNewUserTeam(this.userService.getUser(), 
        this.teamName, this.selectedLeague!, this.teamDataService.getMyTeamList(), 
        this.teamDataService.getFavoritePlayersList(), this.teamDataService.getBlacklistPlayers());
    } else {
      newTeam = this.userTeamDecoratorFactory.createNewUserTeam(this.userService.getUser(), 
        this.teamName, this.selectedLeague!);
    }
    this.userService.addNewTeam(newTeam);
    this.snackBarService.openInfoSnackBar("Nuova squadra creata con successo");
    this.closeDialog(newTeam);
  }

  updateTeam() : void {
    this.snackBarService.openInfoSnackBar("Modificato nome della squadra : " + this.teamName);
    this.dialogData.userTeam.nameTeam = this.teamName;
    this.closeDialog();
  }  
}
