import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterDataService } from 'src/app/service/filter-data.service';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { StandardOption } from 'src/decorator/option/standard-option.model';
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

  private _standardOption: StandardOption = new StandardOption();
  private _teamsList: TeamEntity[] = []; 
  @Output() budgetEvent:EventEmitter<number> = new EventEmitter<number>();

  constructor(private internalDataService: InternalDataService, private filterDataService: FilterDataService) { }

  ngOnInit(): void {
    this.observeLeagueSelected();
    this.budgetEvent.emit(this._standardOption.budget);
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
    return budget == this._standardOption.budget;
  }

  // GETTER & SETTER

  public get standardOption(): StandardOption {
    return this._standardOption;
  }

  public set standardOption(value: StandardOption) {
    this._standardOption = value;
  }

  public get teamsList(): TeamEntity[] {
    return this._teamsList;
  }

  private set teamsList(value: TeamEntity[]) {
    this._teamsList = value;
  }

  getBudgets(): number[] {
    return [...Object.values(budgets)];
  }

  // LISTENER

  changeBudget(budget: number) {
    this._standardOption.budget = budget;
    this.budgetEvent.emit(budget);
  }
}
