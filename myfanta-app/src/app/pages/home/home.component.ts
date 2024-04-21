import { animate, state, style, transition, trigger, group } from '@angular/animations';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { FilterDataService } from '../../service/filter-data.service';
import { InternalDataService } from '../../service/internal-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { RouterService } from '../../service/router.service';
import { UserService } from '../../service/user.service';
import { TeamDataService } from '../../service/team-data.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { Subscription } from 'rxjs';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('champListAnimation', [
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
    trigger('champElement', [
      state('show', style({ display: 'block' })),
      state('hide', style({ display: 'none' })),
      transition('* => *', [
          animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  /**
   * ===================
   * CONSTRUCTOR & INIT
   *  ==================
   */

  private _isMobileOrMobileXLBreakpointActive: boolean = false;  
  private _subscriptionToMobileOrMobileXLBreakpointObservable:Subscription;

  constructor(private routerService:RouterService,
    private filterDataService:FilterDataService,
    private internalDataService:InternalDataService,
    private userService:UserService,
    private teamDataService:TeamDataService,
    private breakpointsService:BreakpointsService) {

      console.log("Construct Home page component");
      this._isMobileOrMobileXLBreakpointActive = BreakpointsService.isMobileOrMobileXLBreakpointActive(window.innerWidth);
      this._subscriptionToMobileOrMobileXLBreakpointObservable = this.observeMobileOrMobileXLBreakpoint();
    }  

  ngOnInit(): void { 
    //this.internalDataService.setLoadingData(false);
  }

  ngOnDestroy(): void {
    console.log("Destroy Home page component");

    this._subscriptionToMobileOrMobileXLBreakpointObservable.unsubscribe();
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

  public get isMobileOrMobileXLBreakpointActive(): boolean {
    return this._isMobileOrMobileXLBreakpointActive;
  }

  private set isMobileOrMobileXLBreakpointActive(value: boolean) {
    this._isMobileOrMobileXLBreakpointActive = value;
  }

  getSports(): SportEnum[] {
    return SportEnum.getAllSport();
  }

  getChampionships(sport:SportEnum) : ChampionshipEnum[] {
    return this.filterDataService.filterChampionshipsBySport(sport);
  }

  getLeagues(sport:SportEnum, championship:ChampionshipEnum) : LeagueEntity[] {
    return this.filterDataService.filterLeaguesByChampionshipAndSport(sport, championship);
  }
  
  /**
   * ================
   * METODI LISTENER
   * ================
   */

  selectedLeagueListener(league:LeagueEntity) : void {
    //this.internalDataService.setLoadingData(true);
    this.setLeagueSelected(league);
    this.routerService.goToMyTeamPage();
  }

  /*
   * =============== 
   * METODI PRIVATI
   * ===============
   */

  private setLeagueSelected(league:LeagueEntity) : void {
    this.internalDataService.setLeagueSelected(league);
  }
}