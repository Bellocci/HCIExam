import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalDimensionService {

  constructor() { }

  private _table_height = new BehaviorSubject('0px');
  private _table_width = new BehaviorSubject('0px');
  private _current_table_height = this._table_height.asObservable();
  private _current_table_width = this._table_width.asObservable();

  private _options_height = new BehaviorSubject('0px');
  private _options_width = new BehaviorSubject('0px');
  private _current_options_height = this._options_height.asObservable();
  private _current_options_width = this._options_width.asObservable();

  setTableHeight(height:number) {
    this._table_height.next(height.toString());
  }

  getTableHeight() {
    return this._current_table_height;
  }

  setTableWidth(width:number) {
    this._table_width.next(width.toString());
  }

  getTableWidth() {
    return this._current_table_width;
  }

  setOptionsHeight(height:number) {
    this._options_height.next(height.toString());
  }

  getOptionsHeight() {
    return this._current_options_height;
  }

  setOptionsWidth(width:number) {
    this._options_width.next(width.toString());
  }

  getOptionsWidth() {
    return this._current_options_width;
  }
}
