import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';
import { InternalDataService } from '../service/internal-data.service';
import { SharedService } from '../service/shared.service';
import { TeamDataService } from '../service/team-data.service';

@Component({
  selector: 'app-search-add-player',
  templateUrl: './search-add-player.component.html',
  styleUrls: ['./search-add-player.component.css']
})
export class SearchAddPlayerComponent implements OnInit {

  private _active_link:string = '';

  value_input_text:string = '';

  players!: any[];
  private _search_players = new Subject<string>();

  constructor(
    private _shared:SharedService, 
    private _internal_data:InternalDataService,
    private _team_data:TeamDataService) { }

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
  }

  /* METHODS */

  isValueInputTextEmpty() : boolean {
    return this.value_input_text.trimStart() == '' ? true : false;
  }

  searchPlayer(player_name:string) : void {
    this._search_players.next(player_name);
  }

  filterText(event:KeyboardEvent) : boolean {
    return event.key.match(/[^a-zA-Z ,]/g) === null;
  }

  addPlayer(player:any) : void {
    this.value_input_text = '';
    if(this._active_link == 'Blacklist')
      this._team_data.addPlayerToBlacklist(player);
    else
      this._team_data.addPlayerIntoFavoriteList(player);
  }
}
