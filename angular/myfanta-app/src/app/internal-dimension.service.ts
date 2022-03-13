import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalDimensionService {

  constructor() { }

  private table_height = new BehaviorSubject('0px');
  private table_width = new BehaviorSubject('0px');
  current_table_height = this.table_height.asObservable();
  current_table_width = this.table_width.asObservable();

  private options_height = new BehaviorSubject('0px');
  private options_width = new BehaviorSubject('0px');
  current_options_height = this.options_height.asObservable();
  current_options_width = this.options_width.asObservable();

  setTableHeight(height:number) {
    this.table_height.next(height.toString());
  }

  setTableWidth(width:number) {
    this.table_width.next(width.toString());
  }

  setOptionsHeight(height:number) {
    this.options_height.next(height.toString());
  }

  setOptionsWidth(width:number) {
    this.options_width.next(width.toString());
  }
}
