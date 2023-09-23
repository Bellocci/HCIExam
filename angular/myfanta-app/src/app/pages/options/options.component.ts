import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { SportEnum } from 'src/enum/SportEnum.model';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit, AfterViewInit {

  private breakpointObserver = inject(BreakpointObserver);
  private _sportSelected: SportEnum | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private internalDataService: InternalDataService) { }

  ngOnInit(): void {
    this.observeLeagueSelected();
  }

  ngAfterViewInit(): void {
    this.internalDataService.setLoadingData(false);
  }

  // METODI PRIVATI

  private observeLeagueSelected() {
    this.internalDataService.getLeagueSelected()
      .subscribe(league => this._sportSelected = league != null ? league.sport : null);
  }

  // VISIBILITA'

  isFootballOptionsRendered(): boolean {
    return this._sportSelected != null && this._sportSelected.label == SportEnum.FOOTBALL_SOCCER.label;
  }

  // LISTENER  

  scrollToCard(idCard: string) {
    // Effettua lo scroll della pagina fino alla card passata come parametro    
    !idCard.startsWith('#') ? idCard = '#' + idCard : null;
    let card: Element | null = document.querySelector(idCard);
    card?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

}