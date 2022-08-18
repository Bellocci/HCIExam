import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PLAYER_DATA_SERIE_A, PLAYER_DATA_SERIE_A_FEMALE } from 'src/model/player.model';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

  private _favorite_list:Set<any> = new Set<any>();

  private _player_selected = new BehaviorSubject(null);
  private _current_player_selected = this._player_selected.asObservable();

  constructor() { }

  generateTeam():Observable<any[]> {
    return of([]);
  }

  generateTeamWithFavoritList():Observable<any[]> {
    return of([]);
  }

  getBlacklistPlayers():Observable<any[]> {
    return of([]);
  }

  addPlayerToTeam(player_name:any) {
    
  }

  addPlayerToBlacklist(player_name:any) {

  }

  clearTeam() {

  }

  removePlayerFromTeam(player: any) {
    
  }

  addToBlacklistFromTeam(player: any) {
    
  }

  clearBlacklist() {
    
  }

  removePlayerFromBlacklist(player: any) {

  }

  setPlayerListViewOptions(players_to_view: number, last_id:number) : void {
    
  }

  setPlayerList(player_list:any[]) : void {
    
  }

  getPlayerList(ord=null, isAsc=null) : Observable<any> {
    if (ord) {
      return of(PLAYER_DATA_SERIE_A_FEMALE);
    }
    return of(PLAYER_DATA_SERIE_A);
  }

  searchPlayers(player_name:string) :  Observable<any[]> {
    return of();
  }

  isPlayerIntoFavoriteList(player:any) : boolean {
    return this._favorite_list.has(player);
  }

  addPlayerIntoFavoriteList(player:any) : void {
    this._favorite_list.add(player);
  }

  removePlayerFromFavoriteList(player:any) : void {
    this._favorite_list.delete(player);
  }

  /*
  Deve ricercare tutti i giocatori che iniziano con quella stringa e sovrascrivere 
  la lista dei giocatori restituiti (invocare setPlayerList e passare come argomento la lista
  dei giocatori ottenuti). 
  */

  searchPlayersWithName(player:any) : Observable<any[]> {
    return of()
  }

  /*
  Deve far ritornare i giocatori che devono essere visualizzati. Occorre definire una variabile dei giocatori che devono essere
  visualizzati. Modificare il suo valore con un set in modo che tutti i metodi che fanno riferimento al metodo getPlayerList
  vengano aggiornati.
  */

  showTeam() : void {

  }

  showBlacklist() : void {
    
  }

  getPlayerSelected() : Observable<any> {
    return this._current_player_selected;
  }

  setPlayerSelected(player:any) : void {
    this._player_selected.next(player);
  }

  /*
  Deve restituire tutti i team del campionato selezionato
  */

  getTeamName() : Observable<any> {
    return of(['Atalanta', 'Fiorentina', 'Juventus', 'Inter', 'Milan', 'Napoli', 'Roma', 'Verona', 'Empoli', 'Udinese']);
    //return of(['Atalanta', 'Fiorentina', 'Juventus']);
  }

  /* Deve filtrare i giocatori */

  filterPlayersByName(player_name:string) : void {
    
  };

  filterPlayerByRoles(role : string, selected : boolean) : void {

  };

  filterPlayersByTeam(teams : string, selected : boolean) : void {

  };
}
