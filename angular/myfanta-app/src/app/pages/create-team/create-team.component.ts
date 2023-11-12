import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StandardOption } from 'src/decorator/option/standard-option.model';
import { ExternalService } from '../../service/external.service';
import { TeamDataService } from '../../service/team-data.service';
import { InternalDataService } from '../../service/internal-data.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit, AfterViewInit { 

  private simpleOption!:StandardOption;
  private currentLeague:LeagueEntity | null = null;
  private option:OptionEntity | null = null;

  constructor(private externalService:ExternalService,
    private teamDataService:TeamDataService,
    private internalDataService:InternalDataService,
    private snackBarService:SnackBarService) {

    this.observeOptionTeam();
    this.subscribeLeague();
  }

  private observeOptionTeam() : void {
    this.teamDataService.addObserverToOption(
      new ObserverStepBuilder<OptionEntity | null>().next(o => this.option = o).build());
  }

  private subscribeLeague() : void {
    this.internalDataService.getObservableLeagueSelected().subscribe(league => this.currentLeague = league);
  }

  ngOnInit(): void { 
    this.internalDataService.setLoadingData(false);
  }

  ngAfterViewInit(): void { }

  /* METODI LISTENER */

  changeOption(option:StandardOption) : void {
    this.simpleOption = option;
  }

  createTeam() : void {
    if(!this.simpleOption.includeAdvancedFilter) {
      this.externalService.createTeamWithSimpleOption(this.simpleOption);
    } else if(this.option != null && this.currentLeague != null) {
      this.externalService.createTeamWithAdvancedOption(this.option, this.currentLeague.sport);
    }
    // TODO: Una volta terminato la creazione del team si visualizza un messaggio
    this.snackBarService.openInfoSnackBar("Generazione del team terminata!");
  }
}
