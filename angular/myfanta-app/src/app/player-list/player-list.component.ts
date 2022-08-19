import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeamDataService } from '../service/team-data.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  private _teams : {name : string, selected : boolean}[] = [];
  private _roles : {name : string, selected : boolean}[] = [
    {name : 'P', 'selected' : false},
    {name : 'D', 'selected' : false},
    {name : 'C', 'selected' : false},
    {name : 'A', 'selected' : false},
  ];

  team_form = new FormControl('');

  constructor(private _team_data_service: TeamDataService) { }

  ngOnInit(): void {
    this._team_data_service.getTeamName().subscribe((teams) => {
      for(let team of teams) {
        this._teams.push({name : team, selected : false});
      }
    });
  }

  // GETTER

  getWindowWidth() : number {
    return window.innerWidth;
  }

  getRoles() : {name : string, selected : boolean}[] {
    return this._roles;
  }

  getTeam() : {name : string, selected : boolean}[] {
    return this._teams;
  }

  // METHODS

  selectedRole(role : string) : void {
    let found : any = null;
    for(let r of this._roles.values()) {
      if(r.name == role) {
        r.selected = !r.selected;
        found = r;
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

  isShortSelectedTeam() : boolean {
    return this.getWindowWidth() <= 600 ? true : false;
  }

  filterPlayerByRole(role : {name : string, selected : boolean}) : void {
    this._team_data_service.filterPlayerByRoles(role.name, role.selected)
  }

  filterPlayerByTeam(team : {name : string, selected : boolean}) : void {
    this._team_data_service.filterPlayersByTeam(team.name, team.selected);
  }
}