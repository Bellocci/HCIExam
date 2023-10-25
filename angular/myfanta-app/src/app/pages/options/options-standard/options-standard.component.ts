import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { StandardOption } from 'src/decorator/option/standard-option.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';

/*
 * Rappresenta i valori standard che possono essere selezionati per il budget
 */
const budgets = { TWO_HUNDRED_AND_FIFTY: 250, FIVE_HUNDRED: 500, ONE_THOUSAND: 1000 }

@Component({
  selector: 'app-options-standard',
  templateUrl: './options-standard.component.html',
  styleUrls: ['../options.css']
})
export class OptionsStandardComponent implements OnInit {

  private _teamsList: TeamEntity[] = []; 
  private _includePlayersFromFavoriteList: boolean = false;
  private _excludePlayersFromBlacklist: boolean = false;
  @Input() option!: OptionEntity;
  @Output() optionEvent:EventEmitter<OptionEntity> = new EventEmitter<OptionEntity>();

  constructor(private internalDataService: InternalDataService, private filterDataService: FilterDataService,
    private teamDataService:TeamDataService) { }

  ngOnInit(): void {
    this.observeLeagueSelected();
    this.optionEvent.emit(this.option);
  }

  // PRIVATE METHOD

  private observeLeagueSelected() {
    this.internalDataService.getLeagueSelected().subscribe(league => {
      this.teamsList = league != null ?
          this.filterDataService.filterTeamsByLeague(league) :
          [];
    })
  }

  // VISIBILITA'

  isBudgetSelected(budget: number) : boolean {
    return budget == this.option.budget;
  }

  // GETTER & SETTER

  public get teamsList(): TeamEntity[] {
    return this._teamsList;
  }

  private set teamsList(value: TeamEntity[]) {
    this._teamsList = value;
  }

  public get includePlayersFromFavoriteList(): boolean {
    return this._includePlayersFromFavoriteList;
  }

  public set includePlayersFromFavoriteList(value: boolean) {
    this._includePlayersFromFavoriteList = value;
  }

  public get excludePlayersFromBlacklist(): boolean {
    return this._excludePlayersFromBlacklist;
  }

  public set excludePlayersFromBlacklist(value: boolean) {
    this._excludePlayersFromBlacklist = value;
  }

  getBudgets(): number[] {
    return [...Object.values(budgets)];
  }

  // LISTENER

  selectBudgetListener(budget:number) : void {
    this.option.budget = budget;
    this.notifyOptionUpdate();
  }

  updatePlayersToInclude() : void {
    this.option.playersToInclude = this.includePlayersFromFavoriteList ?
      this.teamDataService.getFavoritePlayersList() :
      [];

    this.notifyOptionUpdate();
  }

  updatePlayersToExclude() : void {
    this.option.playersToExclude = this.excludePlayersFromBlacklist ?
      this.teamDataService.getBlacklistPlayers() :
      [];

    this.notifyOptionUpdate();
  }

  notifyOptionUpdate() {
    this.optionEvent.emit(this.option);
  }
}
