import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { FilterDataService } from '../../service/filter-data.service';
import { StandardOption } from 'src/decorator/option/standard-option.model';
import { TeamEntity } from 'src/model/teamEntity.model';

@Component({
  selector: 'app-option-filter',
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.css'],
})
export class OptionFilterComponent implements OnInit {
    
  private teamsList:TeamEntity[] = [];

  option:StandardOption;

  @Output() private optionToSend:EventEmitter<StandardOption> = new EventEmitter<StandardOption>();

  constructor(private internalDataService:InternalDataService,
    private filterDataService:FilterDataService) {
    this.subscribeTeams();
    this.option = new StandardOption();
  }

  private subscribeTeams() {
    this.internalDataService.getLeagueSelected().subscribe(league => {
      if(league != null) {
        this.teamsList = this.filterDataService.filterTeamsByLeague(league);
      } else {
        this.teamsList = [];
      }
    })
  }
  
  ngOnInit(): void {
    this.optionToSend.emit(this.option);
  }

  /* GETTER */

  getTeams() : TeamEntity[] {
    return this.teamsList;
  }

  /* Visibilità */

  isTeamSelected(team:TeamEntity) : boolean {
    return this.option.selectedTeams.has(team);
  }

  /* Funzionalità  */

  changeSelectedList(team:TeamEntity) : void {    
    this.option.selectedTeams.has(team) ? this.option.selectedTeams.delete(team) : this.option.selectedTeams.add(team);
    this.optionToSend.emit(this.option);
  }

  checkBudgetValue() : void {
    this.option.budget < 0 ? this.option.budget = 0 : this.option.budget = Math.trunc( this.option.budget );
    this.optionToSend.emit(this.option);
  }

  checkMinAgeValue() : void {
    if(this.option.minAge < 18) {
      this.option.minAge = 18;
    } else if(this.option.minAge > this.option.maxAge) {
      this.option.minAge = this.option.maxAge;
    } else {
      this.option.minAge = Math.trunc(this.option.minAge);
    }
    this.optionToSend.emit(this.option);
  }

  checkMaxAgeValue() : void {
    if(this.option.maxAge > 100) {
      this.option.maxAge = 99;
    } else if(this.option.maxAge < this.option.minAge) {
      this.option.maxAge = this.option.minAge;
    } else {
      this.option.maxAge = Math.trunc(this.option.maxAge);
    }
    this.optionToSend.emit(this.option);
  }

  checkFavoritePlayersAreIncluded(included:boolean) : void {
    this.option.includeFavorite = included;
    this.optionToSend.emit(this.option);
  }

  checkBlacklistPlayersAreIncluded(included:boolean) : void {
    this.option.includeBlacklist = included;
    this.optionToSend.emit(this.option);
  }

  checkAdvancedFilterAreIncluded(included:boolean) : void {
    this.option.includeAdvancedFilter = included;
    this.optionToSend.emit(this.option);
  }
}
