import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  private table_height = new BehaviorSubject('0px');
  private table_width = new BehaviorSubject('0px');

  current_table_height = this.table_height.asObservable();
  current_table_width = this.table_width.asObservable();

  constructor() { }

  setTableHeight(height:number) {
    this.table_height.next(height.toString());
  }

  setTableWidth(width:number) {
    this.table_width.next(width.toString());
  }
}
