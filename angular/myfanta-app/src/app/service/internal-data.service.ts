import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  constructor() { }

  private _championship_selected = new BehaviorSubject('');
  private _current_championship = this._championship_selected.asObservable();

  private _active_link = new BehaviorSubject('');
  private _current_link = this._active_link.asObservable();

  private _tab_selected = new BehaviorSubject('');
  private _current_tab = this._tab_selected.asObservable();

  setChampionshipSelected(champ:string) {
    this._championship_selected.next(champ);
  }

  getChampionshipSelected() {
    return this._current_championship;
  }

  setActiveLink(link_name:string) {
    this._active_link.next(link_name);
  }

  getActiveLink() {
    return this._current_link;
  }

  setTabSelected(tab_name:string) {
    this._tab_selected.next(tab_name);
  }

  getTabSelected() : Observable<string> {
    return this._current_tab;
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

  
}