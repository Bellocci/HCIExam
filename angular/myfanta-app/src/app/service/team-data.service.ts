import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, of } from 'rxjs';
import { MapHelper } from 'src/utility/map-helper';
import { ObservableHelper } from 'src/utility/observable-helper';
import { TableFilterOption } from '../components/table/table-filter';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { RouterService } from './router.service';
import { ValidationProblemBuilder } from 'src/utility/validation/ValidationProblemBuilder';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { RolePlayerEntity } from 'src/model/rolePlayerEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { LinkEnumIsCurrentPageVisitorWithReturn } from 'src/visitor/link-enum/LinkEnumIsCurrentPageVisitorWithReturn';
import { LinkEnumObservablePlayersVisitorWithReturn } from 'src/visitor/link-enum/LinkEnumObservablePlayersVisitorWithReturn';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService implements OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  // User Team selezionato
  private selectedUserTeam:ObservableHelper<UserTeamEntity | undefined> = new ObservableHelper<UserTeamEntity | undefined>(undefined);

  //  Opzioni di ricerca per la creazione della squadra 
  private option:ObservableHelper<OptionEntity | null> = new ObservableHelper<OptionEntity | null>(null);

  // Filtro dei giocatori presenti nella tabella 
  private tableFilterOption:ObservableHelper<TableFilterOption> = new ObservableHelper(new TableFilterOption());

  // Variabile che indica se sono presenti dei dati da salvare
  private saveData:ObservableHelper<boolean> = new ObservableHelper<boolean>(false);

  /*
   * ========================
   * CONSTRUCTOR & DESTROYER 
   * ========================
   */

  constructor(private routerService:RouterService) { 
    console.log("Construct team data service");    
  }
  
  ngOnDestroy(): void {
    console.log("Destroy team data service");
    this.selectedUserTeam.destroy();
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  setSelectedUserTeam(userTeam : UserTeamEntity | undefined) : void {
    this.selectedUserTeam.setValue(userTeam);
  }

  addSelectedUserTeamObserver(observer:Observer<UserTeamEntity | undefined>) : Subscription | undefined {
    return this.selectedUserTeam.addObserver(observer);
  }

  setSaveData(saveData : boolean) {
    this.saveData.setValue(saveData);
  }

  addSaveDataObserver(observer:Observer<boolean>) : Subscription | undefined {
    return this.saveData.addObserver(observer);
  }

  /*
   * ======================================================
   * METODI AGGIUNTA / RIMOZIONE GIOCATORI DALLA SQUADRA 
   * ======================================================
   */

  /**
   * Imposta il team selezionato
   * 
   * @param team 
   */
  loadTeam(userTeam:UserTeamEntity) : void {
    this.setSelectedUserTeam(userTeam);
  }

  /**
   * Svuota la lista dei giocatori
   */
  clearAllList() : void {
    let userTeam:UserTeamEntity = this.selectedUserTeam.getValue()!;
    
    for(let userTeamPlayer of userTeam.userTeamPlayerList) {
      userTeamPlayer.deleted = true;      
    }    
  }

  getObservableTeamsOfCurrentPage(page:LinkEnum) : Observable<PlayerEntity[]> {
    return LinkEnum.visitAndReturn(page, new LinkEnumObservablePlayersVisitorWithReturn(this));
  }

  getMyTeamList() : PlayerEntity[] {
    let userTeam:UserTeamEntity | undefined = this.selectedUserTeam.getValue();
    if(userTeam != undefined) {
      return userTeam.userTeamPlayerList.filter(teamPlayer => !teamPlayer.deleted)
          .filter(teamPlayer => teamPlayer.isIncludedInTeam)
          .map(teamPlayer => teamPlayer.player);
    }

    return [];
  }

  getObservableOfMyTeam() : Observable<PlayerEntity[]> {
    return of(this.getMyTeamList());
  }

  addPlayerToMyTeam(player:PlayerEntity) : ValidationProblem | null {
    // FIXME: invocazione API
    return null
  }

  myTeamHasPlayer(player:PlayerEntity) : boolean {
    return this.getMyTeamList().find(teamPlayer => teamPlayer.equals(player)) != undefined;
  }

  clearUserTeam() : void {
    // FIXME: invocazione API
  }

  removePlayerFromUserTeam(player:PlayerEntity) : ValidationProblem | null {
    // FIXME: invocazione API
    return null;
  }

  /* METODI LISTA GIOCATORI PREFERITI */

  getFavoritePlayersList() : PlayerEntity[] {
     // FIXME: invocazione API
    let userTeam:UserTeamEntity | undefined = this.selectedUserTeam.getValue();
    if(userTeam != undefined) {
      return userTeam.userTeamPlayerList.filter(teamPlayer => !teamPlayer.deleted)
          .filter(teamPlayer => teamPlayer.isIncludedInFavoriteList)
          .map(teamPlayer => teamPlayer.player);
    }

    return [];
  }

  getObservableOfFavoriteList() : Observable<PlayerEntity[]> {
    return of(this.getFavoritePlayersList());
  }

  addPlayerToFavoriteList(player:PlayerEntity) : ValidationProblem | null {
     // FIXME: invocazione API    
    return null;
  }

  favoriteListHasPlayer(player:PlayerEntity) {
    return this.getFavoritePlayersList().find(teamPlayer => teamPlayer.equals(player)) != undefined;
  }

  clearFavoritList() : void {
    // FIXME: invocazione API    
  }

  removePlayerFromFavoriteList(player:PlayerEntity) : ValidationProblem | null {
    // FIXME: invocazione API    
    return null;
  }

  /* METODI LISTA GIOCATORI ESCLUSI */

  getBlacklistPlayers() : PlayerEntity[] {
     // FIXME: invocazione API
     let userTeam:UserTeamEntity | undefined = this.selectedUserTeam.getValue();
     if(userTeam != undefined) {
       return userTeam.userTeamPlayerList.filter(teamPlayer => !teamPlayer.deleted)
           .filter(teamPlayer => teamPlayer.isIncludedInBlacklist)
           .map(teamPlayer => teamPlayer.player);
     }
 
     return [];
  }

  getObservableOfBlacklist() : Observable<PlayerEntity[]> {
    return of(this.getBlacklistPlayers());
  }

  addPlayerToBlacklist(player:PlayerEntity) : ValidationProblem | null {
    // FIXME: invocazione API
    return null;
  }

  blacklistHasPlayer(player:PlayerEntity) {
    return this.getBlacklistPlayers().find(teamPlayer => teamPlayer.equals(player)) != undefined;
  }

  clearBlacklist() : void {
    // FIXME: invocazione API
  }

  removePlayerFromBlacklist(player:PlayerEntity) : ValidationProblem | null {
    // FIXME: invocazione API
    return null;
  }

  /* METODI OPZIONI DI RICERCA */

  addObserverToOption(observer:Observer<OptionEntity | null>) : Subscription | undefined {
    return this.option.addObserver(observer);
  }

  setOption(option:OptionEntity | null) : void {
    this.option.setValue(option);
  }

  /*
   * METODI FILTRAGGIO GIOCATORI NELLA TABELLA 
   */  

  addObserverToTableFilterOption(observer:Observer<TableFilterOption>) : Subscription | undefined {
    return this.tableFilterOption.addObserver(observer);
  }

  filterPlayersByRole(role:RolePlayerEntity) : void {
    let tableFilter:TableFilterOption = this.tableFilterOption.getValue();
    tableFilter.updateRoles(role);
    this.tableFilterOption.setValue(tableFilter);
  }

  filterPlayersByMatchPlayedPerc(matchPlayedPerc:number) : void {
    let tableFilter:TableFilterOption = this.tableFilterOption.getValue();
    tableFilter.setMatchPlayedPerc(matchPlayedPerc);
    this.tableFilterOption.setValue(tableFilter);
  }

  filterPlayersByTeams(team:TeamEntity) : void {
    let tableFilter:TableFilterOption = this.tableFilterOption.getValue();
    tableFilter.updateTeams(team);
    this.tableFilterOption.setValue(tableFilter);
  }

  filterPlayersByName(playerName:string) : void {
    let tableFilter:TableFilterOption = this.tableFilterOption.getValue();
    tableFilter.setPlayerName(playerName);
    this.tableFilterOption.setValue(tableFilter);
  }

  clearTableFilterOption() : void {
    let tableFilter:TableFilterOption = this.tableFilterOption.getValue();
    tableFilter.clear();
    this.tableFilterOption.setValue(tableFilter);
  }
}
