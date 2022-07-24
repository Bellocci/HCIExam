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

  private _clear_team_btn = new BehaviorSubject(true);
  private _current_clear_team = this._clear_team_btn.asObservable();

  private _player_selected = new BehaviorSubject(null);
  private _current_player = this._player_selected.asObservable();

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

  setActiveClearTeamBtn() {
  }
  
  isDisabledClearTeamBtn() : Observable<boolean> {
    return this._current_clear_team;
  }

  setPlayerSelected(player:any) {
    this._player_selected.next(player)
  }

  getPlayerSelected() : Observable<any> {
    return this._current_player;
  }

  isClearBlacklistBtnDisabled() : Observable<boolean> {
    return of(true);
  }

  isSaveBtnDisabled() : Observable<boolean> {
    return of(true);
  }

  saveOptions() {
    
  }
}