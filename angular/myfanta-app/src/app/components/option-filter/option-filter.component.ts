import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { Team } from 'src/decorator/team.model';
import { FilterDataService } from '../../service/filter-data.service';
import { SimpleOption } from 'src/decorator/option/simple-option.interfaces';

@Component({
  selector: 'app-option-filter',
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.css'],
})
export class OptionFilterComponent implements OnInit {
    
  private teamsList:Team[] = [];

  option:SimpleOption;

  @Output() private optionToSend:EventEmitter<SimpleOption> = new EventEmitter<SimpleOption>();

  constructor(private internalDataService:InternalDataService,
    private filterDataService:FilterDataService) {
    this.subscribeTeams();
    this.option = {
      budget: 250,
      minAge: 18,
      maxAge: 99,
      includeFavorite: false,
      includeBlacklist: false,
      includeAdvancedFilter: false,
      selectedTeams : new Set<Team>()
    }    
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

  getTeams() : Team[] {
    return this.teamsList;
  }

  /* Visibilità */

  isTeamSelected(team:Team) : boolean {
    return this.option.selectedTeams.has(team);
  }

  /* Funzionalità  */

  changeSelectedList(team:Team) : void {    
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
