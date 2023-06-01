import { Component, OnInit } from '@angular/core';
import { InternalDataService } from '../service/internal-data.service';
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
  private _rows:number = 0;
  private _cols_tabs:number = 0;
  private _cols_buttons:number = 0;

  constructor(
    private _snackBar:SnackBarService,
    private _team_data:TeamDataService,
    private _internal_data:InternalDataService
  ) { }

  ngOnInit(): void {
    this._rows = 6;
    this._breakpoint = 5;
    this._cols_tabs = 3;
    this._cols_buttons = 2;
    this.subscribeErrorMessage();
  }

  private subscribeErrorMessage() {
    this._internal_data.getErrorMessage().subscribe((msg) => {
      this._error_message = msg;
    })
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

  /* EVENT METHODS */

  openSnackBar(textMessage:string) : void {
    this._snackBar.openInfoSnackBar(textMessage);
  }

  generateTeam() {
    this._team_data.generateTeam();
  }

  generateTeamWithFavoritList() {
    this._team_data.generateTeamWithFavoritList();
  }

  clearErrorMessage() {
    this._internal_data.setErrorMessage('');
  }

  isLayoutMobile() : boolean {
    return this.getInnerWidth() < 801 ? true : false;
  }
}
