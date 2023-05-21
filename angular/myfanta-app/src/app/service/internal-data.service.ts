import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { League } from 'src/decorator/League.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  static readonly KEY_SESSION_LINK = "link";
  static readonly KEY_SESSION_LEAGUE = "league";

  constructor(private sessionStorageLink:SessionStorageService<string>, private sessionStorageLeague:SessionStorageService<League>) {
    const link = this.sessionStorageLink.getData(InternalDataService.KEY_SESSION_LINK);
    link != undefined ? this.activeLink.next(link) : this.activeLink.next("");

    const league = this.sessionStorageLeague.getData(InternalDataService.KEY_SESSION_LEAGUE);
    league != null ? this.leagueSelected.next(league) : null;
  }

  private leagueSelected:BehaviorSubject<League | null> = new BehaviorSubject<League | null>(null);
  private currentLeagueSelected = this.leagueSelected.asObservable();

  private activeLink = new BehaviorSubject("");
  private currentLink = this.activeLink.asObservable();

  private _clear_team_btn = new BehaviorSubject(true);
  private _current_clear_team = this._clear_team_btn.asObservable();

  private _enable_save_options = new BehaviorSubject(false);
  private _current_enable_save_options = this._enable_save_options.asObservable();
  private _save_options_clicked = new BehaviorSubject(false);
  private _current_save_options_clicked = this._save_options_clicked.asObservable();

  setLeagueSelected(league: League | null): void {
    if(league != this.leagueSelected.getValue()) {
      league != null ? this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE, league) : 
        this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE, null);
      this.leagueSelected.next(league);
    }
  }  

  getLeagueSelected() : Observable<League | null> {
    return this.currentLeagueSelected;
  }

  setActiveLink(link_name:string) : void {
    this.sessionStorageLink.saveData(InternalDataService.KEY_SESSION_LINK, link_name);
    this.activeLink.next(link_name);
  }

  getActiveLink() : Observable<string> {
    return this.currentLink;
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