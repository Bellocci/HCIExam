import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { LoadDataService } from 'src/app/service/load-data.service';
import { CountryEnum } from 'src/enum/CountryEnum.model';
import { MessageSeverityEnum } from 'src/enum/MessageSeverityEnum';
import { SportEnum } from 'src/enum/SportEnum.model';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { MessageBuilderImpl } from 'src/utility/message/MessageBuilderImpl';

@Component({
  selector: 'app-league-dialog',
  templateUrl: './league-dialog.component.html',
  styleUrls: ['./league-dialog.component.scss'],
  providers: [MessageService]
})
export class LeagueDialogComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */
  private _leagues: LeagueEntity[] = [];   
  private _sports: SportEnum[] = [];
  private _countries: Set<CountryEnum> = new Set<CountryEnum>();
  private _subscriptionLeaguesObservable!: Subscription;

  @ViewChild('leagueDt') leagueDt: any;

  selectedTabIndex: number = 0;
  selectedSport: SportEnum | undefined;
  selectedCountry!: CountryEnum | undefined;
  selectedLeague!: LeagueEntity; 
  leagueNameFilter: string = '';

  /*
   * ==============================
   * CONSTRUCTOR - INIT - DESTROY
   * ==============================
   */

  constructor(private loadData: LoadDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef
  ) {
    console.log("Construct League dialog component");
  }

  ngOnInit(): void {
    console.log("Init League dialog component");

    this._sports = SportEnum.getAllSport();
    this._subscriptionLeaguesObservable = this.loadData.getLeagues().subscribe(result => {
      this.leagues = result
      this.leagues.forEach(league => {
        let country: CountryEnum | undefined = CountryEnum.getCountry(league.country.name);
        if (country) {
          this._countries.add(country);
        }
      })
    });
  }

  ngOnDestroy(): void {
    console.log("Destroyer League Dialog component");
    this._subscriptionLeaguesObservable.unsubscribe();
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  public get leagues(): LeagueEntity[] {
    return this._leagues;
  }

  private set leagues(value: LeagueEntity[]) {
    this._leagues = value;
  }

  getSports(): SportEnum[] {
    return Array.from(this._sports.values());
  }

  getCountries(): CountryEnum[] {
    return Array.from(this._countries.values());
  }

  getIconSport(name: string): string {
    return SportEnum.getIcon(name);
  }

  getIconCountry(name: string): string {
    return CountryEnum.getIcon(name);
  }

  getCountryShortDescription(name: string) : string {
    return CountryEnum.getShortDescription(name);
  }

  getCompleteBtnTooltip() : string {
    return this.selectedLeague ? 'Inizia a creare una squadra per ' + this.selectedLeague.name :
      'Seleziona un campionato premendo sulla riga';
  }

  /*
   * ============
   * VISIBILITA'
   * ============
   */  

  isIconVisibleOnDropdownMenu() : boolean {
    return BreakpointsService.isEqualOrGreaterThanLargeDeviceBreakpoint(window.innerWidth);
  }

  isExtendedTableRendered() : boolean {
    return BreakpointsService.isEqualOrGreaterThanTabletBreakpoint(window.innerWidth);
  }

  isDescriptionRendered() : boolean {
    return BreakpointsService.isEqualOrGreaterThanTabletBreakpoint(window.innerWidth);
  }

  /*
   * =========
   * LISTENER
   * =========
   */

  onSportFilter(selectedSport: any): void {
    this.selectedSport = selectedSport;
    this.leagueDt.filter(selectedSport?.name || '', 'sport.name', 'equals');
  }

  onCountryFilter(selectedCountry: any): void {
    this.selectedCountry = selectedCountry;
    this.leagueDt.filter(selectedCountry?.name || '', 'country.name', 'equals');
  }  

  showMessage(): void {
    if(this.selectedLeague) {
      console.log("LEAGUE SELECTED: " + this.selectedLeague.name)
      this.messageService.add(new MessageBuilderImpl().Build()
          .setSeverity(MessageSeverityEnum.INFO)
          .setText("Campionato '" + this.selectedLeague.name + "' selezionato")
          .build()
      );
    }    
  }

  completeBtnListener() : void {
    this.ref.close(this.selectedLeague);
  }
}
