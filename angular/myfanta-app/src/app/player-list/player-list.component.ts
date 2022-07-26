import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { TeamDataService } from '../service/team-data.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  input_txt:string = '';

  private _search_players = new Subject<string>();

  constructor(private _team_data_service: TeamDataService) { }

  ngOnInit(): void {
    this._search_players.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      switchMap((name:string) => this._team_data_service.searchPlayersWithName(name)),
    );
  }


  filterText(event: KeyboardEvent) : boolean {
    return event.key.match(/[^a-zA-Z ,]/g) === null;
  }

  searchPlayer(player_name:string) {
    this._search_players.next(player_name);
  }
}
