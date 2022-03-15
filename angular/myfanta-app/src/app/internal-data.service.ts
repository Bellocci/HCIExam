import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  constructor() { }

  private _championship_selected = new BehaviorSubject('');
  private _current_championship = this._championship_selected.asObservable();

  setChampionshipSelected(champ:string) {
    this._championship_selected.next(champ);
  }

  getChampionshipSelected() {
    return this._current_championship;
  }
}
