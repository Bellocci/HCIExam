import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

 /*
  * Mappe per la gestione della Squadra, Giocatori Preferiti e Giocatori da escludere
  */
  private teamMap:MapHelper<number, PlayerEntity> = new MapHelper<number, PlayerEntity>(new Map());
  private favoriteListMap:MapHelper<number, PlayerEntity> = new MapHelper<number, PlayerEntity>(new Map());
  private blacklistMap:MapHelper<number, PlayerEntity> = new MapHelper<number, PlayerEntity>(new Map());  

  /*
   * Opzioni di ricerca per la creazione della squadra 
   */
  private option:ObservableHelper<OptionEntity | null> = new ObservableHelper<OptionEntity | null>(null);

  /*
   * Filtro dei giocatori presenti nella tabella 
   */
  private tableFilterOption:ObservableHelper<TableFilterOption> = new ObservableHelper(new TableFilterOption());

  constructor(private routerService:RouterService) { }

  /* METODI GENERICI */

  /**
   * Dato il team, procede al popolamento delle liste dei giocatori
   * 
   * @param team 
   */
  loadTeam(team:UserTeamEntity) : void {
    // Riporto alla situazione iniziale
    this.clearAllList();
    
    // Aggiungo i giocatori del team  
    team.team.forEach(player => this.teamMap.addElementToMap(player.playerId, player));

    // Aggiungo i giocatori preferiti
    team.favoriteList.forEach(player => this.favoriteListMap.addElementToMap(player.playerId, player));
    
    // Aggiungo i giocatori da escludere
    team.blacklist.forEach(player => this.blacklistMap.addElementToMap(player.playerId, player));

    // Carico le opzioni
    this.option.setValue(team.option);
  }

  /**
   * Svuota le liste del team, dei giocatori preferiti e dei giocatori esclusi
   */
  clearAllList() : void {
    // User Team
    this.teamMap.clearMap();

    // Favorite List
    this.favoriteListMap.clearMap();

    // Blacklist
    this.blacklistMap.clearMap();
  }

  /* METODI SQUADRA UTENTE */

  getUserTeamList() : PlayerEntity[] {
    return this.teamMap.getValues();
  }

  addObserverToUserTeam(observer:Observer<PlayerEntity[]>) {
    this.teamMap.addObserver(observer);
  }

  getObservableOfUserTeam() : Observable<PlayerEntity[]> {
    return this.teamMap.getObservable();
  }

  addPlayerToMyTeam(player:PlayerEntity) : ValidationProblem | null {
    const added:boolean = this.teamMap.addElementToMap(player.playerId, player);      
    if(!added) {
      return new ValidationProblemBuilder()
          .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
          .withMessage("Errore durante l'inserimento del giocatore " + player.playerName + " nella lista della squadra")
          .build();
    }

    return null;
  }

  userTeamHasPlayer(player:PlayerEntity) : boolean {
    return this.teamMap.hasElement(player.playerId);
  }

  clearUserTeam() : void {
    this.teamMap.clearMap();
  }

  removePlayerFromUserTeam(player:PlayerEntity) : ValidationProblem | null {
    const removed:boolean = this.teamMap.removeElement(player.playerId);
    if(!removed) {
      return new ValidationProblemBuilder()
          .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
          .withMessage("Errore durante la rimozione del giocatore " + player.playerName + " dalla lista della squadra")
          .build()
    }    
    
    return null;
  }

  /* METODI LISTA GIOCATORI PREFERITI */

  getFavoritePlayersList() : PlayerEntity[] {
    return this.favoriteListMap.getValues();
  }

  addObserverToFavoriteList(observer:Observer<PlayerEntity[]>) {
    this.favoriteListMap.addObserver(observer);
  }

  getObservableOfFavoriteList() : Observable<PlayerEntity[]> {
    return this.favoriteListMap.getObservable();
  }

  addPlayerToFavoriteList(player:PlayerEntity) : ValidationProblem | null {
    const added:boolean = this.favoriteListMap.addElementToMap(player.playerId, player);
    if(!added) {
      return new ValidationProblemBuilder()
          .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
          .withMessage("Errore durante l'inserimento del giocatore " + player.playerName + " nella lista dei preferiti")
          .build();
    } 
    
    return null;
  }

  favoriteListHasPlayer(player:PlayerEntity) {
    return this.favoriteListMap.hasElement(player.playerId);
  }

  clearFavoritList() : void {
    this.favoriteListMap.clearMap();
  }

  removePlayerFromFavoriteList(player:PlayerEntity) : ValidationProblem | null {
    const removed:boolean = this.favoriteListMap.removeElement(player.playerId);
    if(!removed) {
      return new ValidationProblemBuilder()
          .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
          .withMessage("Errore durante la rimozione del giocatore " + player.playerName + " dalla lista dei preferiti")
          .build();
    }

    return null;
  }

  /* METODI LISTA GIOCATORI ESCLUSI */

  getBlacklistPlayers() : PlayerEntity[] {
    return this.blacklistMap.getValues();
  }

  addObserverToBlacklist(observer:Observer<PlayerEntity[]>) {
    this.blacklistMap.addObserver(observer);
  }

  getObservableOfBlacklist() : Observable<PlayerEntity[]> {
    return this.blacklistMap.getObservable();
  }

  addPlayerToBlacklist(player:PlayerEntity) : ValidationProblem | null {
    const added:boolean = this.blacklistMap.addElementToMap(player.playerId, player);
    if(!added) {
      return new ValidationProblemBuilder()
          .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
          .withMessage("Errore durante l'inserimento del giocatore " + player.playerName + " nella lista dei giocatori da escludere")
          .build();
    }

    return null;
  }

  blacklistHasPlayer(player:PlayerEntity) {
    return this.blacklistMap.hasElement(player.playerId);
  }

  clearBlacklist() : void {
    this.blacklistMap.clearMap();
  }

  removePlayerFromBlacklist(player:PlayerEntity) : ValidationProblem | null {
    let validationProblemList:ValidationProblem[] = [];
    const removed:boolean = this.blacklistMap.removeElement(player.playerId);
    if(!removed) {
      return new ValidationProblemBuilder()
          .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
          .withMessage("Errore durante la rimozione del giocatore " + player.playerName + " dalla lista dei giocatori da escludere")
          .build();
    }

    return null;
  }

  /* METODI OPZIONI DI RICERCA */

  addObserverToOption(observer:Observer<OptionEntity | null>) : void {
    this.option.addObserver(observer);
  }

  setOption(option:OptionEntity | null) : void {
    this.option.setValue(option);
  }

  /*
   * METODI FILTRAGGIO GIOCATORI NELLA TABELLA 
   */  

  addObserverToTableFilterOption(observer:Observer<TableFilterOption>) : void {
    this.tableFilterOption.addObserver(observer);
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
