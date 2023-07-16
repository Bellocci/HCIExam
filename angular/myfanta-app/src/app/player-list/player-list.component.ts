import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { InternalDataService } from '../service/internal-data.service';
import { TeamDataService } from '../service/team-data.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  panelRoleOpenState : boolean = false;
  panelTeamOpenState : boolean = false;

  input_txt:string = '';
  private _search_players = new Subject<string>();

  private _teams : {name : string, short_name : string, selected : boolean}[] = [];
  private _roles : {name : string, selected : boolean}[] = [
    {name : 'P', selected : false},
    {name : 'D', selected : false},
    {name : 'C', selected : false},
    {name : 'A', selected : false},
  ];

  team_form = new UntypedFormControl('');

  constructor(private _team_data_service: TeamDataService, private _internal_data_service:InternalDataService) { }

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

  // GETTER

  getWindowWidth() : number {
    return window.innerWidth;
  }

  getRoles() : {name : string, selected : boolean}[] {
    return this._roles;
  }

  getTeam() : {name : string, short_name : string, selected : boolean}[] {
    return this._teams;
  }

  // METHODS

  isLayoutMobile() : boolean {
    return this.getWindowWidth() <= 800 ? true : false;
  }

  selectedRole(role : string) : void {
    let found : any = null;
    for(let r of this._roles.values()) {
      if(r.name == role) {
        r.selected = !r.selected;
        found = r.name;
        break;
      }
    }
    if(found != null)
      this.filterPlayerByRole(found);
  }

  isRoleSelected(role : string) : boolean {
    let found = null;
    found = this._roles.find((r) => r.name == role);
    if(found != null)
      return found.selected;
    return false;
  }

  isAllRolesDisabled() : boolean {
    for(let btn of this._roles) {
      if(btn.selected)
        return false;
    }
    return true;
  }
  
  disableAllRoles() : void {
    for(let btn of this._roles)
      btn.selected = false;
  }

  selectedTeam(team : string) : void {
    let found : any = null;
    for(let t of this._teams.values()) {
      if(t.name == team) {
        t.selected = !t.selected;
        found = t;
        break;
      }
    }
    if(found != null)
      this.filterPlayerByTeam(found);
  }

  isTeamSelected(team : string) : boolean {
    let found = null;
    found = this._teams.find((t) => t.name == team);
    if(found != null)
      return found.selected
    return false;
  }

  isAllTeamsDisabled() : boolean {
    for(let team of this._teams) {
      if(team.selected)
        return false;
    }
    return true;
  }

  disableAllTeams() : void {
    for(let team of this._teams)
      team.selected = false;
  }

  isShortSelectedTeam() : boolean {
    return this.getWindowWidth() <= 600 ? true : false;
  }

  filterPlayerByRole(role : {name : string, selected : boolean}) : void {
    
  }

  filterPlayerByTeam(team : {name : string, selected : boolean}) : void {
    
  }

  filterText(event: KeyboardEvent) : boolean {
    return event.key.match(/[^a-zA-Z ,]/g) === null;
  }

  searchPlayer(player_name:string) {
    this._search_players.next(player_name);
  }




  /* NEW  */

  match_filter : string[] = ['Tutte', '>75%', '>50%', '>25%'];
  match_filter_selected : string = 'Tutte';
  
  roles_view : string[] = ['Classic', 'Mantra'];
  role_view_selected : string = 'Classic';

  isRoleViewSelected(role_view:string) : boolean {
    return this.role_view_selected == role_view ? true : false;
  }

  setRoleView(role_view:string) : void {
    this.role_view_selected = role_view;
  }

  isMatchFilterSelected(match:string) : boolean {
    return this.match_filter_selected == match ? true : false;
  }

  setMatchSelected(match:string) : void {
    this.match_filter_selected = match;
  }
}