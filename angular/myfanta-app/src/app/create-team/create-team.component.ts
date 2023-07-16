import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SimpleOption } from 'src/decorator/option/simple-option.interfaces';
import { ExternalService } from '../service/external.service';
import { TeamDataService } from '../service/team-data.service';
import { Option } from 'src/decorator/option/option.model';
import { InternalDataService } from '../service/internal-data.service';
import { League } from 'src/decorator/League.model';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit, AfterViewInit { 

  private simpleOption!:SimpleOption;
  private currentLeague:League | null = null;
  private option:Option | null = null;

  constructor(private externalService:ExternalService,
    private teamDataService:TeamDataService,
    private internalDataService:InternalDataService,
    private snackBarService:SnackBarService) {

    this.subscribeOption();
    this.subscribeLeague();
  }

  private subscribeOption() : void {
    this.teamDataService.getOption().subscribe(o => this.option = o)
  }

  private subscribeLeague() : void {
    this.internalDataService.getLeagueSelected().subscribe(league => this.currentLeague = league);
  }

  ngOnInit(): void { 
    this.internalDataService.setLoadingData(false);
  }

  ngAfterViewInit(): void { }

  /* METODI LISTENER */

  changeOption(option:SimpleOption) : void {
    this.simpleOption = option;
  }

  createTeam() : void {
    if(!this.simpleOption.includeAdvancedFilter) {
      this.externalService.createTeamWithSimpleOption(this.simpleOption);
    } else if(this.option != null && this.currentLeague != null) {
      this.externalService.createTeamWithAdvancedOption(this.option, this.currentLeague.getSport());
    }
    // FIXME: Una volta terminato la creazione del team si visualizza un messaggio
    this.snackBarService.openInfoSnackBar("Generazione del team terminata!");
  }
}
