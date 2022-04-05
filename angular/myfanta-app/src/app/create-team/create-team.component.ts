import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InternalDataService } from '../internal-data.service';
import { SharedService } from '../shared.service';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  private _error_message:string = '';

  private _breakpoint:number = 0;
  private _rows:number = 0;
  private _cols_tabs:number = 0;
  private _cols_buttons:number = 0;

  constructor(
    private _snackBar:SnackBarService, 
    private _internal_data:InternalDataService,
    private _shared:SharedService
  ) { }

  ngOnInit(): void {
    this._breakpoint = this.getInnerWidth() >= 800 ? 5 : 1;
    this._rows = 6;

    this._cols_tabs = this.getInnerWidth() >= 800 ? 3 : 1;
    this._cols_buttons = this.getInnerWidth() >= 800 ? 2 : 0;
  }

  /* GETTER METHODS */

  getInnerWidth(): number {
    return window.innerWidth;
  }

  getBreakpoint() : number {
    return this._breakpoint;
  }

  getRows() : number {
    return this._rows;
  }

  getColsTabs() : number {
    return this._cols_tabs;
  }

  getColsButtons() : number {
    return this._cols_buttons;
  }

  getErrorMessage() : string {
    return this._error_message;
  }

  /* SETTER METHODS */

  setErrorMessage(msg: string) {
    this._error_message = msg;
  }

  /* EVENT METHODS */

  onResize() {
    this._breakpoint = this.getInnerWidth() >= 800 ? 5 : 1;

    this._cols_tabs = this.getInnerWidth() >= 800 ? 3 : 1;
  
    this._cols_buttons = this.getInnerWidth() >= 800 ? 2 : 0;
  }  

  openSnackBar(textMessage:string) : void {
    this._snackBar.openSnackBar(textMessage);
  }

  generateTeam() {
    this._internal_data.generateTeam();
  }

  generateTeamWithFavoritList() {
    this._internal_data.generateTeamWithFavoritList();
  }

  clearErrorMessage() {
    this._error_message = '';
  }
}
