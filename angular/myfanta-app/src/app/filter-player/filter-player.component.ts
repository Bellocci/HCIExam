import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TeamDataService } from '../service/team-data.service';

@Component({
  selector: 'app-filter-player',
  templateUrl: './filter-player.component.html',
  styleUrls: ['./filter-player.component.css']
})
export class FilterPlayerComponent implements OnInit {

  input_txt:string = '';
  private _search_players = new Subject<string>();

  constructor(private _team_data_service:TeamDataService) { }

  ngOnInit(): void {
    this._search_players.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

    ).subscribe((player_name:string) => {
      // this._team_data_service.filterPlayersByName(player_name);
    });
  }

  filterText(event: KeyboardEvent) : boolean {
    return event.key.match(/[^a-zA-Z ,]/g) === null;
  }

  searchPlayer(player_name:string) {
    this._search_players.next(player_name);
  }
}
