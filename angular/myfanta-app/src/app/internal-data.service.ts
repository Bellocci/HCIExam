import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  constructor() { }

  private championship_selected = new BehaviorSubject('');
  current_championship = this.championship_selected.asObservable();

  setChampionshipSelected(champ:string) {
    this.championship_selected.next(champ);
  }
}
