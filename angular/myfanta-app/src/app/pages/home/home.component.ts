import { animate, state, style, transition, trigger, group } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
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
export class HomeComponent implements OnInit {

  /**
   * ===================
   * CONSTRUCTOR & INIT
   *  ==================
   */

  constructor(private routerService:RouterService,
    private filterDataService:FilterDataService,
    private internalDataService:InternalDataService,
    private userService:UserService,
    private teamDataService:TeamDataService,
    public breakpointsService:BreakpointsService) { }

  ngOnInit(): void { 
    this.internalDataService.setLoadingData(false);
  }

  /*
   * ================
   * GETTER & SETTER
   * ================
   */

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
    this.internalDataService.setLoadingData(true);
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