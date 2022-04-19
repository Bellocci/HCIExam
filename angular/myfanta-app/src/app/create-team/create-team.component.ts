import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../service/snack-bar.service';
import { TeamDataService } from '../service/team-data.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  private _error_message:string = 'My error message. Cannot add into team. Team is already full';

  private _breakpoint:number = 0;
  private _rows_tabs:number = 0;
  private _cols_tabs:number = 0;
  private _rows_btns:number = 0;
  private _cols_buttons:number = 0;

  constructor(
    private _snackBar:SnackBarService,
    private _team_data:TeamDataService
  ) { }

  ngOnInit(): void {
    this._rows_tabs = 6;
    this.setColsRowsMatGrid();
  }

  /* GETTER METHODS */

  getInnerWidth(): number {
    return window.innerWidth;
  }

  getBreakpoint() : number {
    return this._breakpoint;
  }

  getRowsTabs() : number {
    return this._rows_tabs;
  }

  getRowsBtns() : number {
    return this._rows_btns;
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

  setColsRowsMatGrid() {
    this._breakpoint = this.getInnerWidth() >= 801 ? 5 : 1;
    this._cols_tabs = this.getInnerWidth() >= 801 ? 3 : 1;
    this._cols_buttons = this.getInnerWidth() >= 801 ? 2 : 1;
    this._rows_btns = this.getInnerWidth() >= 801 ? 6 : 3;
  }  

  openSnackBar(textMessage:string) : void {
    this._snackBar.openSnackBar(textMessage);
  }

  generateTeam() {
    this._team_data.generateTeam();
  }

  generateTeamWithFavoritList() {
    this._team_data.generateTeamWithFavoritList();
  }

  clearErrorMessage() {
    this._error_message = '';
  }

  isLayoutMobile() : boolean {
    return this.getInnerWidth() < 801 ? true : false;
  }
}
