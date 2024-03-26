import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-create-new-team-dialog',
  templateUrl: './create-new-team-dialog.component.html',
  styleUrls: ['./create-new-team-dialog.component.scss'],
})
export class CreateNewTeamDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */  
  private showSelected:boolean = true;
  teamNameFormControl:FormControl = new FormControl('My team', { validators : [ Validators.required] });
  private selectedSport:SportEnum | string = "";
  private selectedChampionship:ChampionshipEnum | string = "";
  private selectedLeague:LeagueEntity | null = null;
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

      this._subscriptionToMobileBreakpointObservable = this.observeMobileBreakpoint();
  }    

  ngOnInit(): void {
    if(this.dialogData.isCreateMode && this.dialogData.userTeam != undefined) {
        this.teamNameFormControl.setValue(this.dialogData.userTeam.nameTeam);
        this.selectedSport = this.dialogData.userTeam.league.sport
        this.selectedChampionship = this.dialogData.userTeam.league.championship;
        this.selectedLeague = this.dialogData.userTeam.league;               
    } 
    else if(!this.dialogData.isCreateMode) {
      if(this.dialogData.userTeam == undefined) {
        throw Error("Unable to edit user team " + this.dialogData.userTeam);
      }

      this.teamNameFormControl.setValue(this.dialogData.userTeam.nameTeam);
        this.selectedSport = this.dialogData.userTeam.league.sport
        this.selectedChampionship = this.dialogData.userTeam.league.championship;
        this.selectedLeague = this.dialogData.userTeam.league;
    }
  }

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

  /* GETTER */

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

  getSportSelected() : string {
    return this.selectedSport instanceof SportEnum ? this.selectedSport.description : this.selectedSport;
  }

  getChampionshipSelected() : string {
    return this.selectedChampionship instanceof ChampionshipEnum ? this.selectedChampionship.description : this.selectedChampionship;
  }

  getLeagueSelected() : string {
    return this.selectedLeague != null ? this.selectedLeague.name : '';
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

  /* METODI LISTENER */

  closeDialog(dialogResult?:any) : void {
    this.dialogService.getDialogHelper().closeDialog(dialogResult);
  }

  updateSelectedSport(sport:SportEnum | string) {
    this.selectedSport = sport;
    sport instanceof SportEnum ? 
      this.championshipsList = this.filterDataService.filterChampionshipsBySport(sport) :
      this.championshipsList = [];
  }

  updateSelectedChampionship(championship:ChampionshipEnum | string) {
    this.selectedChampionship = championship;
    championship instanceof ChampionshipEnum ? 
      this.leaguesList = this.filterDataService.filterLeaguesByChampionshipAndSport(this.selectedSport as SportEnum, championship) :
      this.leaguesList = [];
  }

  updateSelectedLeague(league:LeagueEntity | null) {
    this.selectedLeague = league;
  }

  addNewTeam() : void {
    let newTeam:UserTeamEntity;
    if(this.importPlayer) {
      newTeam = this.userTeamDecoratorFactory.createNewUserTeam(this.userService.getUser(), 
        this.teamNameFormControl.value, this.selectedLeague!, this.teamDataService.getMyTeamList(), 
        this.teamDataService.getFavoritePlayersList(), this.teamDataService.getBlacklistPlayers());
    } else {
      newTeam = this.userTeamDecoratorFactory.createNewUserTeam(this.userService.getUser(), 
        this.teamNameFormControl.value, this.selectedLeague!);
    }
    this.userService.addNewTeam(newTeam);
    this.snackBarService.openInfoSnackBar("Nuova squadra creata con successo");
    this.closeDialog(newTeam);
  }

  /* Metodi visibilità */

  isTeamNameDefined() : boolean {
    return this.teamNameFormControl.valid;
  }

  isSportSelected() : boolean {
    return this.selectedSport instanceof SportEnum;
  }

  isChampionshipSelected() : boolean {
    return this.selectedChampionship instanceof ChampionshipEnum;
  }

  isLeagueSelected() : boolean {
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

  areSelectedRendered() : boolean {
    return this.showSelected;
  }
}
