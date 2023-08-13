import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Option } from 'src/decorator/option/option.model';
import { Player } from 'src/decorator/player.model';
import { RolePlayer } from 'src/decorator/role-player.model';
import { Team } from 'src/decorator/team.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { MapHelper } from 'src/utility/map-helper';
import { ObserverHelper } from 'src/utility/observer-helper';
import { TableFilterOption } from '../components/table/table-filter';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { RouterService } from './router.service';
import { ValidationProblemBuilder } from 'src/utility/validation/ValidationProblemBuilder';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { LinkEnum } from 'src/enum/LinkEnum.model';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

 /*
  * Mappe per la gestione della Squadra, Giocatori Preferiti e Giocatori da escludere
  */
  private teamMap:MapHelper<number, Player> = new MapHelper<number, Player>(new Map());
  private favoriteListMap:MapHelper<number, Player> = new MapHelper<number, Player>(new Map());
  private blacklistMap:MapHelper<number, Player> = new MapHelper<number, Player>(new Map());  

  /*
   * Opzioni di ricerca per la creazione della squadra 
   */
  private option:ObserverHelper<Option | null> = new ObserverHelper<Option | null>(null);

  /*
   * Filtro dei giocatori presenti nella tabella 
   */
  private tableFilterOption:ObserverHelper<TableFilterOption> = new ObserverHelper(new TableFilterOption());

  constructor(private routerService:RouterService) { }

  /* METODI GENERICI */

  /**
   * Dato il team, procede al popolamento delle liste dei giocatori
   * 
   * @param team 
   */
  loadTeam(team:UserTeam) : void {
    // Riporto alla situazione iniziale
    this.clearAllList();
    
    // Aggiungo i giocatori del team  
    team.getTeam().forEach(player => this.teamMap.addElementToMap(player.getId(), player));

    // Aggiungo i giocatori preferiti
    team.getFavoritList().forEach(player => this.favoriteListMap.addElementToMap(player.getId(), player));
    
    // Aggiungo i giocatori da escludere
    team.getBlackList().forEach(player => this.blacklistMap.addElementToMap(player.getId(), player));

    // Carico le opzioni
    this.option.setValue(team.getOption());
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

  addPlayerToList(player:Player) : ValidationProblem[] {
    if(this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM)) {
      return this.addPlayerToMyTeam(player);
    } else if(this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST)) {
      return this.addPlayerToFavoriteList(player);
    } else if(this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST)) {
      return this.addPlayerToBlacklist(player);
    } else {
      return [new ValidationProblemBuilder()
        .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
        .withMessage("Errore durante l'inserimento del giocatore nella lista")
        .build()
      ]
    }
  }

  /* METODI SQUADRA UTENTE */

  getUserTeamList() : Player[] {
    return this.teamMap.getValues();
  }

  addObserverToUserTeam(observer:Observer<Player[]>) {
    this.teamMap.addObserver(observer);
  }

  getObservableOfUserTeam() : Observable<Player[]> {
    return this.teamMap.getObservable();
  }

  private addPlayerToMyTeam(player:Player) : ValidationProblem[] {
    let validationProblemList:ValidationProblem[] = [];
    const added:boolean = this.teamMap.addElementToMap(player.getId(), player);      
    !added ? validationProblemList.push(new ValidationProblemBuilder()
        .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE).withMessage("Errore durante l'inserimento del giocatore").build()) : 
        null;

    return validationProblemList;
  }

  userTeamHasPlayer(player:Player) : boolean {
    return this.teamMap.hasElement(player.getId());
  }

  clearUserTeam() : void {
    this.teamMap.clearMap();
  }

  removePlayerFromUserTeam(player:Player) : boolean {
    return this.teamMap.removeElement(player.getId());
  }

  /* METODI LISTA GIOCATORI PREFERITI */

  getFavoritePlayersList() : Player[] {
    return this.favoriteListMap.getValues();
  }

  addObserverToFavoriteList(observer:Observer<Player[]>) {
    this.favoriteListMap.addObserver(observer);
  }

  getObservableOfFavoriteList() : Observable<Player[]> {
    return this.favoriteListMap.getObservable();
  }

  private addPlayerToFavoriteList(player:Player) : ValidationProblem[] {
    let validationProblemList:ValidationProblem[] = [];
    const added:boolean = this.favoriteListMap.addElementToMap(player.getId(), player);
    !added ? validationProblemList.push(new ValidationProblemBuilder()
        .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE).withMessage("Errore durante l'inserimento del giocatore").build()) : 
        null;
    return validationProblemList;
  }

  favoriteListHasPlayer(player:Player) {
    return this.favoriteListMap.hasElement(player.getId());
  }

  clearFavoritList() : void {
    this.favoriteListMap.clearMap();
  }

  removePlayerFromFavoriteList(player:Player) : boolean {
    return this.favoriteListMap.removeElement(player.getId());
  }

  /* METODI LISTA GIOCATORI ESCLUSI */

  getBlacklistPlayers() : Player[] {
    return this.blacklistMap.getValues();
  }

  addObserverToBlacklist(observer:Observer<Player[]>) {
    this.blacklistMap.addObserver(observer);
  }

  getObservableOfBlacklist() : Observable<Player[]> {
    return this.blacklistMap.getObservable();
  }

  private addPlayerToBlacklist(player:Player) : ValidationProblem[] {
    let validationProblemList:ValidationProblem[] = [];
    const added:boolean = this.blacklistMap.addElementToMap(player.getId(), player);
    !added ? validationProblemList.push(new ValidationProblemBuilder()
        .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE).withMessage("Errore durante l'inserimento del giocatore").build()) : 
        null;
    return validationProblemList;
  }

  blacklistHasPlayer(player:Player) {
    return this.blacklistMap.hasElement(player.getId());
  }

  clearBlacklist() : void {
    this.blacklistMap.clearMap();
  }

  removePlayerFromBlacklist(player:Player) : boolean {
    return this.blacklistMap.removeElement(player.getId());
  }

  /* METODI OPZIONI DI RICERCA */

  addObserverToOption(observer:Observer<Option | null>) : void {
    this.option.addObserver(observer);
  }

  setOption(option:Option | null) : void {
    this.option.setValue(option);
  }

  /*
   * METODI FILTRAGGIO GIOCATORI NELLA TABELLA 
   */  

  addObserverToTableFilterOption(observer:Observer<TableFilterOption>) : void {
    this.tableFilterOption.addObserver(observer);
  }

  filterPlayersByRole(role:RolePlayer) : void {
    let tableFilter:TableFilterOption = this.tableFilterOption.getValue();
    tableFilter.updateRoles(role);
    this.tableFilterOption.setValue(tableFilter);
  }

  filterPlayersByMatchPlayedPerc(matchPlayedPerc:number) : void {
    let tableFilter:TableFilterOption = this.tableFilterOption.getValue();
    tableFilter.setMatchPlayedPerc(matchPlayedPerc);
    this.tableFilterOption.setValue(tableFilter);
  }

  filterPlayersByTeams(team:Team) : void {
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
