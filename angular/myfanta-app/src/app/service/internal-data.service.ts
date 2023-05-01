import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { League } from 'src/decorator/League.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  constructor(private _session_storage:SessionStorageService) { }


  private _championship_selected = new BehaviorSubject(this._session_storage.getData('championship'));
  private _current_championship = this._championship_selected.asObservable();

  private _leagueSelected:BehaviorSubject<League | null> = new BehaviorSubject<League | null>(this._session_storage.getData('league'));
  private _currentLeagueSelected = this._leagueSelected.asObservable();

  private _active_link = new BehaviorSubject(this._session_storage.getData('link'));
  private _current_link = this._active_link.asObservable();

  private _clear_team_btn = new BehaviorSubject(true);
  private _current_clear_team = this._clear_team_btn.asObservable();

  private _enable_save_options = new BehaviorSubject(false);
  private _current_enable_save_options = this._enable_save_options.asObservable();
  private _save_options_clicked = new BehaviorSubject(false);
  private _current_save_options_clicked = this._save_options_clicked.asObservable();

  setLeagueSelected(league: League | null): void {
    this._session_storage.saveData('league', league);
    this._leagueSelected.next(league);
  }  

  getLeagueSelected() : Observable<League | null> {
    return this._currentLeagueSelected;
  }

  setChampionshipSelected(champ:string) {
    this._session_storage.saveData('championship', champ)
    this._championship_selected.next(champ);
  }

  getChampionshipSelected() {
    return this._current_championship;
  }

  setActiveLink(link_name:string) {
    this._session_storage.saveData('link', link_name);
    this._active_link.next(link_name);
  }

  getActiveLink() {
    return this._current_link;
  }

  setActiveClearTeamBtn() {
  }
  
  isDisabledClearTeamBtn() : Observable<boolean> {
    return this._current_clear_team;
  }

  isClearBlacklistBtnDisabled() : Observable<boolean> {
    return of(true);
  }

  isSaveBtnDisabled() : Observable<boolean> {
    return of(true);
  }

  saveOptions() {
    
  }

  getErrorMessage() : Observable<string> {
    return of();
  }

  setErrorMessage(msg: string) : void {

  }

  clearData() : void {
    
  }

  /* Restituisce l'età minima tra tutti i giocatori presenti nel campionato 
  (la ricerca avviene invocando opportuno metodo nel team-data service) */

  getMinAge() : Observable<number> {
    return of(18);
  }

  /* Restituisce l'età massima tra tutti i giocatori presenti nel campionato 
  (la ricerca avviene invocando opportuno metodo nel team-data service)*/

  getMaxAge() : Observable<number> {
    return of(99);
  }

  /* Restituisce il valore dell'età minima se è la prima volta che modifica le opzioni, altrimenti restituisce l'ultimo valore
     salvato (la ricerca avviene invocando opportuno metodo nel team-data service)*/

  getLastValueMinAge() : Observable<number> {
    return of(18);
  }

  /* Restituisce il valore dell'età massima se è la prima volta che modifica le opzioni, altrimenti restituisce l'ultimo valore
     salvato (la ricerca avviene invocando opportuno metodo nel team-data service)*/

  getLastValueMaxAge() : Observable<number> {
    return of(99);
  }

  isSaveOptionEnable() : Observable<boolean> {
    return this._current_enable_save_options;
  }

  setEnableSaveOptions(enable : boolean) : void {
    this._enable_save_options.next(enable);
  }

  isSaveOptionClicked() : Observable<boolean> {
    return this._current_save_options_clicked;
  }

  setSaveOptionClicked(clicked : boolean) {
    this._save_options_clicked.next(clicked);
  }
}