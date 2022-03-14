import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  constructor() { }

  private championship_selected = new BehaviorSubject('');
  private current_championship = this.championship_selected.asObservable();

  setChampionshipSelected(champ:string) {
    this.championship_selected.next(champ);
  }

  getChampionshipSelected() {
    return this.current_championship;
  }
}
