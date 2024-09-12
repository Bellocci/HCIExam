import { animate, state, style, transition, trigger, group, keyframes } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import { FilterDataService } from '../../service/filter-data.service';
import { InternalDataService } from '../../service/internal-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { RouterService } from '../../service/router.service';
import { UserService } from '../../service/user.service';
import { TeamDataService } from '../../service/team-data.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { Subscription } from 'rxjs';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { LoadDataService } from 'src/app/service/load-data.service';
import { CountryEnum } from 'src/enum/CountryEnum.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('elevationAnimation', [
      transition('* => *', [
        animate('3s infinite', keyframes([
          style({ offset: 0, 'box-shadow': '0px 2px 4px rgba(0,0,0,0.2)' }),  // z4
          style({ offset: 0.5, 'box-shadow': '0px 6px 8px rgba(0,0,0,0.3)' }), // z6
          style({ offset: 1, 'box-shadow': '0px 2px 4px rgba(0,0,0,0.2)' })  // ritorno a z4
        ]))
      ])
    ]),

    trigger('ListAnimation', [
      state('openList', style({ height: '*', opacity: 1 })),
      state('closeList', style({ height: '0', opacity: 0 })),
      transition('closeList => openList', [
        group([
          animate("300ms cubic-bezier(0.4,0.0,0.2,1)", style({height: '*'})),
          animate("225ms cubic-bezier(0.4,0.0,0.2,1)", style({opacity: '1'}))
        ])
      ]),
      transition('openList => closeList', [
        group([
          animate("300ms cubic-bezier(0.4,0.0,0.2,1)", style({height: '0'})),
          animate("225ms cubic-bezier(0.4,0.0,0.2,1)", style({opacity: '0', transform: 'translateY(-100%)'}))
        ])
      ]),
    ]),
    trigger('element', [
      state('show', style({ display: 'block' })),
      state('hide', style({ display: 'none' })),
      transition('* => *', [
          animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private _isMobileOrMobileXLBreakpointActive: boolean = false;  
  private _subscriptionToMobileOrMobileXLBreakpointObservable:Subscription;

  private _leagues: LeagueEntity[] = [];
  private _subscriptionLeaguesObservable:Subscription;

  @ViewChildren('tutorialImage') tutorialImages!: QueryList<ElementRef>;

  /*
   * ================================================
   * CONSTRUCTOR - INIT - DESTROY -  AFTER VIEW INIT
   *  ===============================================
   */  

  constructor(private routerService:RouterService,
    private filterDataService:FilterDataService,
    private internalDataService:InternalDataService,
    private userService:UserService,
    private teamDataService:TeamDataService,
    private breakpointsService:BreakpointsService,
    private loadData:LoadDataService) {

      console.log("Construct Home page component");
      this._subscriptionLeaguesObservable = loadData.getLeagues().subscribe(result => this.leagues = result);      

      this._isMobileOrMobileXLBreakpointActive = BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);
      this._subscriptionToMobileOrMobileXLBreakpointObservable = this.observeMobileOrMobileXLBreakpoint();      
    }      

  ngOnInit(): void {     
    //this.internalDataService.setLoadingData(false);
  }

  ngOnDestroy(): void {
    console.log("Destroy Home page component");

    this._subscriptionLeaguesObservable.unsubscribe();
    this._subscriptionToMobileOrMobileXLBreakpointObservable.unsubscribe();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-left-animation');  // Cambia lo stato di animazione
          observer.unobserve(entry.target);  // Disabilita l'osservatore per l'elemento
        }
      });
    });

    this.tutorialImages.forEach((img) => {
      observer.observe(img.nativeElement);
    });
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private observeMobileOrMobileXLBreakpoint() : Subscription {
    return this.breakpointsService.mobileOrMobileXLObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(isActive => this._isMobileOrMobileXLBreakpointActive = isActive)
        .error(err => console.log("Error while retriving mobile or mobile XL breakpoint : " + err))
        .build()
    );
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

  public get isMobileOrMobileXLBreakpointActive(): boolean {
    return this._isMobileOrMobileXLBreakpointActive;
  }

  private set isMobileOrMobileXLBreakpointActive(value: boolean) {
    this._isMobileOrMobileXLBreakpointActive = value;
  }

  getSports(): SportEnum[] {
    return this.leagues.map(league => league.sport);
  }

  getCountries(sport:SportEnum):CountryEnum[] {
    return this.leagues
        .filter(league => league.sport.description == sport.description)
        .map(league => league.country);
  }

  getLeagues(sport:SportEnum, country:CountryEnum) : LeagueEntity[] {
    return this.leagues
      .filter(league => league.sport.description == sport.description && league.country.value == country.value)
  }
  
  /**
   * ================
   * METODI LISTENER
   * ================
   */

  selectedLeagueListener(league:LeagueEntity) : void {
    //this.internalDataService.setLoadingData(true);
    this.internalDataService.setLeagueSelected(league);
    this.routerService.goToMyTeamPage();
  }
}