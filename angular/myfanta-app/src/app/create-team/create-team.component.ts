import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
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
  private _tab_selected = '';

  private _breakpoint:number = 0;
  private _rows:number = 0;
  private _cols_tabs: number = 0;
  private _cols_buttons: number = 0;
  
  value_input_text = '';
  input_visible:boolean = true;

  is_mobile:boolean = false;
  private _mobile = new Subject<any>();

  players!: any[];
  private _search_players = new Subject<string>();

  constructor(
    private _snackBar:SnackBarService, 
    private _internal_data:InternalDataService,
    private _shared:SharedService
  ) { }

  ngOnInit(): void {
    this._breakpoint = this.getInnerWidth() >= 800 ? 5 : 1;
    this._rows = 6;

    this._cols_tabs = this.getInnerWidth() >= 800 ? 3 : 1;
    this._cols_buttons = this.getInnerWidth() >= 800 ? 2 : 1;

    this._search_players.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      switchMap((name:string) => this._shared.searchPlayers(name)),
    ).subscribe(
      (players) => {
        this.players = players;
      }
    );

    this._mobile.subscribe(() => {
      this.setIsMobileLayout();
    })

    this.setIsMobileLayout();
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

  getTabSelected() : string {
    return this._tab_selected;
  }

  getErrorMessage() : string {
    return this._error_message;
  }

  /* SETTER METHODS */

  setTabSelected(textTab:string) {
    this._tab_selected = textTab;
    this.setInputVible(textTab);
  }

  private setInputVible(textTab:string) {
    if(textTab != 'Options') {
      this.input_visible = true;
    } else {
      this.input_visible = false;
    }
  }

  setIsMobileLayout() {
    this.is_mobile = this.getInnerWidth() < 800 ? true : false;
  }

  /* EVENT METHODS */

  onResize() {
    this._breakpoint = this.getInnerWidth() >= 800 ? 5 : 1;

    this._cols_tabs = this.getInnerWidth() >= 800 ? 3 : 1;
  
    this._cols_buttons = this.getInnerWidth() >= 800 ? 2 : 1;
  }  

  openSnackBar(textMessage:string) : void {
    this._snackBar.openSnackBar(textMessage);
  }

  searchPlayer(player_name:string) : void {
    this._search_players.next(player_name);
  }

  addPlayer(player:any) : void {
    this._internal_data.addPlayerToTeam(this, player);
  }

  generateTeam() {
    this._internal_data.generateTeam();
  }

  generateTeamWithFavoritList() {
    this._internal_data.generateTeamWithFavoritList();
  }

  filterText(event:any) : boolean {
    return String.fromCharCode(event.charCode).match(/[^a-zA-Z]/g) === null;
  }
}
