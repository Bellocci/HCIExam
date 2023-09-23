import { Component, OnInit } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { TeamDataService } from '../../service/team-data.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { RouterService } from 'src/app/service/router.service';
import { StandardOption } from 'src/decorator/option/standard-option.model';
import { ExternalService } from 'src/app/service/external.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UserService } from 'src/app/service/user.service';
import { CreateNewTeamDataStructure } from 'src/app/Dialog/create-new-team-dialog/create-new-team-data-structure.interface';
import { DialogService } from 'src/app/service/dialog.service';
import { CreateNewTeamDialogComponent } from 'src/app/Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { RolePlayerEntity } from 'src/model/rolePlayerEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';
import { UserEntity } from 'src/model/userEntity.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';

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
  private option:OptionEntity | null = null;

  private roles:RolePlayerEntity[] = [];
  private rolesSelectedMap:Map<number, RolePlayerEntity> = new Map();  

  private leagueSelected:LeagueEntity | null = null;

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

  private teams:TeamEntity[] = [];
  private selectedTeams:Set<TeamEntity> = new Set();

  private user!:UserEntity;
  private userTeam:UserTeamEntity | undefined = undefined;

  constructor(private internalDataService:InternalDataService,
    private filterDataService:FilterDataService,
    private teamDataService:TeamDataService,
    private routerService:RouterService,
    private externalService:ExternalService,
    private snackbarService:SnackBarService,
    private userService:UserService,
    private dialogService:DialogService) {

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
    this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
        .next(league => {
          if(league != null) {
            this.roles = this.filterDataService.filterRolesBySport(league.sport);
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
      new ObserverStepBuilder<OptionEntity | null>().next(o => this.option = o).build());
  }

  private observeUser() : void {
    this.userService.addObserverForUser(new ObserverStepBuilder<UserEntity>().next(user => this.user = user).build());
  }

  private observeUserTeam() : void {
    this.userService.addSelectedTeamObserver(new ObserverStepBuilder<UserTeamEntity | undefined>()
        .next(team => this.userTeam = team).build());
  }
  
  /* GETTER */

  getPlayerRoles() : RolePlayerEntity[] {
    return this.roles;
  }

  getMatchFilters() : ValueLabel[] {
    return [... this.filterMatchValues.keys()];
  }

  getTeams() : TeamEntity[] {
    return this.teams;
  }

  getLinksList() : LinkEnum[] {
    return this.linksList;
  }

  /* VISIBLITA' */

  isRoleSelected(role:RolePlayerEntity) : boolean {
    return this.rolesSelectedMap.has(role.roleId);
  }

  isMatchFilterSelected(filter:ValueLabel) : boolean {
    return this.selectedMatchFilter == filter;
  }

  isFilterTableRendered() : boolean {
    return this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) || 
        this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST) ||
        this.routerService.currentPageIsPlayerList(LinkEnum.PLAYER_LIST);
  }

  isCurrentPageCreateTeam() : boolean {
    return this.routerService.isLinkActivated(LinkEnum.CREATE_TEAM);
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

  updateRolesSelectedList(role:RolePlayerEntity) : void {
    this.rolesSelectedMap.has(role.roleId) ? 
        this.rolesSelectedMap.delete(role.roleId) : 
        this.rolesSelectedMap.set(role.roleId, role);
    
    this.teamDataService.filterPlayersByRole(role);
  }

  updateMatchFilterSelected(filter:ValueLabel) : void {
    this.selectedMatchFilter = this.selectedMatchFilter == filter ? PlayerListComponent.ALL_PLAYERS : filter;
    this.teamDataService.filterPlayersByMatchPlayedPerc(filter.value as number);
  }

  changeSelectedTeamsList(team:TeamEntity) : void {
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
      this.externalService.createTeamWithAdvancedOption(this.option, this.leagueSelected.sport);
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
        sport : this.leagueSelected.sport,
        championship : this.leagueSelected.championship,
        league : this.leagueSelected,
        teamName : '',
        importPlayer : true
      }
      this.dialogService.getDialogHelper().setData(dataStructure);
      this.dialogService.getDialogHelper().openDialog(CreateNewTeamDialogComponent);
    }
  }
}