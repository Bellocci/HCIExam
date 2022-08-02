import { AfterViewInit, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';
import { InternalDataService } from '../../service/internal-data.service';
import { SharedService } from '../../service/shared.service';
import { TeamDataService } from '../../service/team-data.service';

@Component({
  selector: 'app-search-add-player',
  templateUrl: './search-add-player.component.html',
  styleUrls: ['./search-add-player.component.css']
})
export class SearchAddPlayerComponent implements OnInit, AfterViewInit {

  private _tab_selected:string = '';
  input_visible:boolean = true;

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

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.subscribeTabSelected();
    })
  }

  private subscribeTabSelected() : void {
    this._internal_data.getTabSelected().subscribe((tab_name) => {
      this._tab_selected = tab_name;
      this.value_input_text = '';
      this.setInputVible(tab_name);
    });
  }

  private setInputVible(textTab:string) {
    this.input_visible = textTab != 'Options' ? true : false;
  }

  /* GETTER */

  getTabSelected() : string {
    return this._tab_selected;
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
    if(this._tab_selected == 'Blacklist')
      this._team_data.addPlayerToBlacklist(player);
    else
      this._team_data.addPlayerToTeam(player);
  }
}
