import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { TeamDataService } from '../../service/team-data.service';
import { RolePlayer } from 'src/decorator/role-player.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { League } from 'src/decorator/League.model';
import { Team } from 'src/decorator/team.model';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { RouterService } from 'src/app/service/router.service';
import { StandardOption } from 'src/decorator/option/standard-option.interface';
import { Option } from 'src/decorator/option/option.model';
import { ExternalService } from 'src/app/service/external.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/decorator/user.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { CreateNewTeamDataStructure } from 'src/app/Dialog/create-new-team-dialog/create-new-team-data-structure.interface';
import { DialogService } from 'src/app/service/dialog.service';
import { CreateNewTeamDialogComponent } from 'src/app/Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { ViewportScroller } from '@angular/common';

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

  private linksList:LinkEnum[] = [LinkEnum.MYTEAM, LinkEnum.FAVORIT_LIST, LinkEnum.BLACKLIST, LinkEnum.PLAYER_LIST];
  private simpleOption!:StandardOption;
  private option:Option | null = null;

  private roles:RolePlayer[] = [];
  private rolesSelectedMap:Map<number, RolePlayer> = new Map();  

  private leagueSelected:League | null = null;

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

  private user!:User;
  private userTeam:UserTeam | undefined = undefined;

  constructor(private internalDataService:InternalDataService,
    private filterDataService:FilterDataService,
    private teamDataService:TeamDataService,
    private routerService:RouterService,
    private externalService:ExternalService,
    private snackbarService:SnackBarService,
    private userService:UserService,
    private dialogService:DialogService,
    private scroller: ViewportScroller) {

    this.addObserverToLeague();
    this.observeOptionTeam();
    this.observeUser();
    this.observeUserTeam();
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

          this.leagueSelected = league;
        })
        .build()
    )
  }

  private observeOptionTeam() : void {
    this.teamDataService.addObserverToOption(
      new ObserverStepBuilder<Option | null>().next(o => this.option = o).build());
  }

  private observeUser() : void {
    this.userService.addObserverForUser(new ObserverStepBuilder<User>().next(user => this.user = user).build());
  }

  private observeUserTeam() : void {
    this.userService.addSelectedTeamObserver(new ObserverStepBuilder<UserTeam | undefined>()
        .next(team => this.userTeam = team).build());
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

  isFilterTableRendered() : boolean {
    return this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) || 
        this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST) ||
        this.routerService.currentPageIsPlayerList(LinkEnum.PLAYER_LIST);
  }

  isCurrentPageMyTeam() : boolean {
    return this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM);
  }

  isActionListRendered() : boolean {
    return this.isSaveBtnRendered() || this.isSaveNewTeamBtnRendered();
  }

  isSaveBtnRendered() : boolean {
    return this.user.isUserDefined() && this.userTeam != undefined;
  }

  isSaveNewTeamBtnRendered() : boolean {
    return this.user.isUserDefined();
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

  changeOption(option:StandardOption) : void {
    this.simpleOption = option;
  }

  createTeam() : void {
    if(!this.simpleOption.includeAdvancedFilter) {
      this.externalService.createTeamWithSimpleOption(this.simpleOption);
    } else if(this.option != null && this.leagueSelected != null) {
      this.externalService.createTeamWithAdvancedOption(this.option, this.leagueSelected.getSport());
    }
    
    // Effettua lo scroll della pagina fino alla tabella dei giocatori
    const tableContainer = document.querySelector('#tableContainer');
    tableContainer?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });

    // FIXME: Una volta terminato la creazione del team si visualizza un messaggio
    this.snackbarService.openInfoSnackBar("Generazione del team terminata!");
  }

  openCreateNewTeamDialog() : void {
    if(this.leagueSelected != null) {
      let dataStructure:CreateNewTeamDataStructure = {
        sport : this.leagueSelected.getSport(),
        championship : this.leagueSelected.getChampionship(),
        league : this.leagueSelected,
        teamName : '',
        importPlayer : true
      }
      this.dialogService.getDialogHelper().setData(dataStructure);
      this.dialogService.getDialogHelper().openDialog(CreateNewTeamDialogComponent);
    }
  }
}