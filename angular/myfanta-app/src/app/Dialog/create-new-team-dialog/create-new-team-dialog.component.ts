import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogService } from 'src/app/service/dialog.service';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { UserService } from 'src/app/service/user.service';
import { UserTeamDecoratorFactoryService } from 'src/decorator-factory/user-team-decorator-factory.service';
import { League } from 'src/decorator/League.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { SportEnum } from 'src/enum/SportEnum.model';

@Component({
  selector: 'app-create-new-team-dialog',
  templateUrl: './create-new-team-dialog.component.html',
  styleUrls: ['./create-new-team-dialog.component.css'],
})
export class CreateNewTeamDialogComponent implements OnInit {

  constructor(private dialogService:DialogService,
    private filterDataService:FilterDataService,
    private userService:UserService,
    private userTeamDecoratorFactory:UserTeamDecoratorFactoryService) { }
  
  teamNameFormControl:FormControl = new FormControl('My team', { validators : [ Validators.required] });
  selectedSport:SportEnum | string = "";
  selectedChampionship:ChampionshipEnum | string = "";
  selectedLeague:League | null = null;

  private championshipsList:ChampionshipEnum[] = [];
  private leaguesList:League[] = [];

  ngOnInit(): void {
  }

  /* GETTER */

  getSports() : SportEnum[] {
    return SportEnum.getAllSport();
  }

  getChampionships() : ChampionshipEnum[] {
    return this.championshipsList;
  }

  getLeagues() : League[] {
    return this.leaguesList;
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

    return "Aggiungi la nuova squadra";
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

  updateSelectedLeague(league:League | null) {
    this.selectedLeague = league;
  }

  addNewTeam() : void {
    const newTeam:UserTeam = this.userTeamDecoratorFactory.createNewUserTeam(this.userService.getUserValue(), 
      this.teamNameFormControl.value, this.selectedLeague!);
    this.userService.addNewTeam(newTeam);
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
}
