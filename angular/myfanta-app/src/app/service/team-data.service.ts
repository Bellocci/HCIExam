import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';
import { Option } from 'src/decorator/option/option.model';
import { Player } from 'src/decorator/player.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { MapHelper } from 'src/utility/map-helper';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

  private teamMap:MapHelper<number, Player> = new MapHelper<number, Player>(new Map());
  private favoriteListMap:MapHelper<number, Player> = new MapHelper<number, Player>(new Map());
  private blacklistMap:MapHelper<number, Player> = new MapHelper<number, Player>(new Map());  

  private option:BehaviorSubject<Option | null> = new BehaviorSubject<Option | null>(null);
  private currentOption:Observable<Option | null> = this.option.asObservable();

  private _player_selected = new BehaviorSubject(null);
  private _current_player_selected = this._player_selected.asObservable();

  constructor() { }

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
    this.option.next(team.getOption());
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

  getUserTeamList() : Player[] {
    return this.teamMap.getValues();
  }

  addObserverToUserTeam(observer:Observer<Player[]>) {
    this.teamMap.addObserver(observer);
  }

  getObservableOfUserTeam() : Observable<Player[]> {
    return this.teamMap.getObservable();
  }

  addPlayerToList(player:Player) : boolean {
    return this.teamMap.addElementToMap(player.getId(), player);
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

  addPlayerToFavoriteList(player:Player) : boolean {
    return this.favoriteListMap.addElementToMap(player.getId(), player);
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

  addPlayerToBlacklist(player:Player) : boolean {
    return this.blacklistMap.addElementToMap(player.getId(), player);
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

  getOption() : Observable<Option | null> {
    return this.currentOption;
  }

  setOption(option:Option | null) : void {
    this.option.next(option);
  }
}
