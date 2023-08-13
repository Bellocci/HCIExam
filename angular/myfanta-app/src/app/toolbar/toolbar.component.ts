import { Component, ViewChild, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { League } from 'src/decorator/League.model';
import { InternalDataService } from '../service/internal-data.service';
import { TeamDataService } from '../service/team-data.service';
import { FilterDataService } from '../service/filter-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { RouterService } from '../service/router.service';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private filterDataService:FilterDataService, 
    private internalDataService:InternalDataService, 
    private teamDataService:TeamDataService,
    public routerService:RouterService,
    private userService:UserService) { 

  }

  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  
  linkEnum : typeof LinkEnum = LinkEnum;  
  is_mobile:boolean = false;

  leagueSelected!:League | null;
  sportSelected:number = -1;

  leagueList!:League[];
  championshipsList!:string[];

  isLoadingData:boolean = false;

  ngOnInit(): void {
    this.observerLoadingData();
    this.subscribeLeagueSelected();

    this.is_mobile = window.innerWidth < 801;
  }

  private subscribeLeagueSelected() {
    this.internalDataService.getLeagueSelected().subscribe(league => {
      this.leagueSelected = league;
    })
  }

  private observerLoadingData() {
    this.internalDataService.addObserverToLoadingData(new ObserverStepBuilder<boolean>()
        .next(isLoading => this.isLoadingData = isLoading)
        .build()    
    );
  }

  /* GETTER */

  getSports() : SportEnum[] {
    return SportEnum.getAllSport();
  }

  getChampionships(sport:SportEnum) : ChampionshipEnum[] {
    return this.filterDataService.filterChampionshipsBySport(sport);
  }

  getLeagues(sport:SportEnum, championship:ChampionshipEnum) : League[] {
    return this.filterDataService.filterLeaguesByChampionshipAndSport(sport, championship);
  }

  /* SETTER */

  protected setLeagueSelected(league:League | null) {
    this.internalDataService.setLeagueSelected(league);
  }

  /* Metodi sidenav */

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  /* Methods expansion panel */

  panelSportOpened(index:number) : void {
    this.sportSelected = index;
  }

  panelSportClosed() : void {
    this.sportSelected = -1;
    // Permette di rimuovere il focus dall'elemento attivo
    const activeElement = document.activeElement as HTMLElement;
    activeElement.blur();        
  }

  /* Metodi visibilità */

  isPanelSportOpen(index:number) : boolean {
    return this.sportSelected == index;
  }

  isMobileLayout() : boolean {
    return this.is_mobile;
  }

  loading() : boolean {
    return this.isLoadingData;
  }

  /* Metodi di funzionalità */

  selectedLeagueListener(league: League) {    
    this.clearData();
    this.setLeagueSelected(league);
    this.closeSidenav();
    this.routerService.goToMyTeamPage(LinkEnum.MYTEAM);
  }

  onResize(event:any) {
    this.is_mobile = event.target.innerWidth < 801 ? true : false;
  }

  private clearData() : void {
    this.userService.setSelectedTeam(undefined);
    this.teamDataService.clearAllList();
  }
}
