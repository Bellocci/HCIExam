import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  private table_height = new BehaviorSubject('0px');
  current_table_height = this.table_height.asObservable();

  constructor() { }

  setTableHeight(height:number) {
    this.table_height.next(height.toString());
  }
}
