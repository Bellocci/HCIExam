import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { InternalDataService } from '../internal-data.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search-add-player',
  templateUrl: './search-add-player.component.html',
  styleUrls: ['./search-add-player.component.css']
})
export class SearchAddPlayerComponent implements OnInit {

  private _tab_selected:string = '';
  input_visible:boolean = true;

  value_input_text:string = '';

  players!: any[];
  private _search_players = new Subject<string>();

  constructor(private _shared:SharedService, private _internal_data:InternalDataService) { }

  ngOnInit(): void {
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

    this._internal_data.getTabSelected().subscribe((tab_name) => {
      this._tab_selected = tab_name;
      this.setInputVible(tab_name);
    })
  }

  private setInputVible(textTab:string) {
    this.input_visible = textTab != 'Options' ? true : false;
  }

  getTabSelected() : string {
    return this._tab_selected;
  }

  searchPlayer(player_name:string) : void {
    this._search_players.next(player_name);
  }

  filterText(event:KeyboardEvent) : boolean {
    return event.key.match(/[^a-zA-Z]/g) === null;
  }

  addPlayer(player:any) : void {
    this._internal_data.addPlayerToTeam(player);
  }
}
