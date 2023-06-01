import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserTeam } from 'src/decorator/userTeam.model';
import { PLAYER_DATA_SERIE_A, PLAYER_DATA_SERIE_A_FEMALE, Player } from 'src/model/player.model';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

  private favoriteList:Set<Player> = new Set<Player>();
  private blacklist:Set<Player> = new Set<Player>();
  private userTeam:Set<Player> = new Set<Player>();

  private _player_selected = new BehaviorSubject(null);
  private _current_player_selected = this._player_selected.asObservable();

  constructor() { }

  /**
   * Dato il team, procede al popolamento delle liste dei giocatori
   * 
   * @param team 
   */
  loadTeam(team:UserTeam) : void {
    this.clearAllList();
    // Per il team posso utilizzare questo approccio siccome non avrà molti elementi
    team.getTeam().forEach(player => this.userTeam.add(player));

    // Per l'aggiunta invece dei giocatori nelle liste dei giocatori preferiti meglio
    // ciclo for normale siccome possono essere molto grandi
    for(let player of team.getFavoritList()) {
      this.favoriteList.add(player);
    }

    for(let player of team.getBlackList()) {
      this.blacklist.add(player);
    }
  }

  /**
   * Svuota le liste del team, dei giocatori preferiti e dei giocatori esclusi
   */
  private clearAllList() : void {
    this.userTeam.clear();
    this.favoriteList.clear();
    this.blacklist.clear();
  }

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

  /* CLEAR */

  clearAllPlayers() {
    // Rimuove tutti i giocatori dalla lista, in base al link attivo.
  }

  clearTeam() {

  }

  removePlayerFromTeam(player: any) {
    
  }

  addToBlacklistFromTeam(player: any) {
    
  }

  clearBlacklist() {
    
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
    return this.favoriteList.has(player);
  }

  addPlayerIntoFavoriteList(player:any) : void {
    this.favoriteList.add(player);
  }

  /* REMOVE PLAYER */

  removePlayer(player:string) {
    // Deve guardare quale link è attivo e poi rimuoverlo dalla lista opportuna.
  }

  removePlayerFromFavoriteList(player:any) : void {
    this.favoriteList.delete(player);
  }

  isPlayerIntoBlacklist(player:any) : boolean {
    return this.blacklist.has(player);
  }

  addPlayerIntoBlacklist(player:any) : void {
    this.blacklist.add(player);
  }

  removePlayerFromBlacklist(player:any) : void {
    this.blacklist.delete(player);
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
    return of([
      {
        name : 'Atalanta',
        short_name : 'ATA',
      },
      {
        name : 'Fiorentina',
        short_name : 'FIO',
      },
      {
        name : 'Juventus',
        short_name : 'JUV',
      },
      {
        name : 'Inter',
        short_name : 'INT',
      },
      {
        name : 'Milan',
        short_name : 'MIL',
      },
      {
        name : 'Napoli',
        short_name : 'NAP',
      },
      {
        name : 'Roma',
        short_name : 'ROM',
      },
      {
        name : 'Verona',
        short_name : 'VER',
      },
      {
        name : 'Empoli',
        short_name : 'EMP',
      },
      {
        name : 'Udinese',
        short_name : 'UDI',
      },
      {
        name : 'Sampdoria',
        short_name : 'SAM',
      },
    ])
    //return of([{'Atalanta', 'Fiorentina', 'Juventus', 'Inter', 'Milan', 'Napoli', 'Roma', 'Verona', 'Empoli', 'Udinese']);
  }
}
