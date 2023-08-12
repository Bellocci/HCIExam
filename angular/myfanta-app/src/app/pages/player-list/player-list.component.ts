import { Component, OnInit } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { TeamDataService } from '../../service/team-data.service';
import { RolePlayer } from 'src/decorator/role-player.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { League } from 'src/decorator/League.model';
import { Team } from 'src/decorator/team.model';
import { LinkEnum } from 'src/enum/LinkEnum.model';

interface ValueLabel {
  label:string,
  value:number | string
}

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  private linksList:LinkEnum[] = [LinkEnum.MYTEAM, LinkEnum.FAVORIT_LIST, LinkEnum.BLACKLIST];

  private roles:RolePlayer[] = [];
  private rolesSelectedMap:Map<number, RolePlayer> = new Map();  

  private static readonly ALL_PLAYERS:ValueLabel = {
    label: "Tutti",
    value: 0
  };
  private static readonly FIRST_THRESHOLD:ValueLabel = {
    label: ">75%",
    value: 75
  };
  private static readonly SECOND_THRESHOLD:ValueLabel = {
    label: ">50%",
    value: 50
  };
  private static readonly THIRD_THRESHOLD:ValueLabel = {
    label: ">25%",
    value: 25
  };

  private filterMatchValues:Map<ValueLabel, boolean> = new Map([
    [PlayerListComponent.ALL_PLAYERS , true], [PlayerListComponent.FIRST_THRESHOLD , false], 
    [PlayerListComponent.SECOND_THRESHOLD , false], [PlayerListComponent.THIRD_THRESHOLD , false]
  ]);
  private selectedMatchFilter:ValueLabel = PlayerListComponent.ALL_PLAYERS;

  private teams:Team[] = [];
  private selectedTeams:Set<Team> = new Set();

  constructor(private internalDataService:InternalDataService,
    private filterDataService:FilterDataService,
    private teamDataService:TeamDataService) {
    this.addObserverToLeague();
  }

  ngOnInit(): void {
    this.internalDataService.setLoadingData(false);
  }

  /* OBSERVER */

  addObserverToLeague() : void {
    this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<League | null>()
        .next(league => {
          if(league != null) {
            this.roles = this.filterDataService.filterRolesBySport(league.getSport());
            this.teams = this.filterDataService.filterTeamsByLeague(league);
          } else {
            this.roles = [];
            this.teams = [];
          }          
        })
        .build()
    )
  }
  
  /* GETTER */

  getPlayerRoles() : RolePlayer[] {
    return this.roles;
  }

  getMatchFilters() : ValueLabel[] {
    return [... this.filterMatchValues.keys()];
  }

  getTeams() : Team[] {
    return this.teams;
  }

  getLinksList() : LinkEnum[] {
    return this.linksList;
  }

  /* VISIBLITA' */

  isRoleSelected(role:RolePlayer) : boolean {
    return this.rolesSelectedMap.has(role.getId());
  }

  isMatchFilterSelected(filter:ValueLabel) : boolean {
    return this.selectedMatchFilter == filter;
  }

  /* LISTENER */

  updateRolesSelectedList(role:RolePlayer) : void {
    this.rolesSelectedMap.has(role.getId()) ? 
        this.rolesSelectedMap.delete(role.getId()) : 
        this.rolesSelectedMap.set(role.getId(), role);
    
    this.teamDataService.filterPlayersByRole(role);
  }

  updateMatchFilterSelected(filter:ValueLabel) : void {
    this.selectedMatchFilter = this.selectedMatchFilter == filter ? PlayerListComponent.ALL_PLAYERS : filter;
    this.teamDataService.filterPlayersByMatchPlayedPerc(filter.value as number);
  }

  changeSelectedTeamsList(team:Team) : void {
    this.selectedTeams.has(team) ? this.selectedTeams.delete(team) : this.selectedTeams.add(team);
    this.teamDataService.filterPlayersByTeams(team);
  }
}