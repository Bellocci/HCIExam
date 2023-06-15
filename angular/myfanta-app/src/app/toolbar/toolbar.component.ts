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

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private filterDataService:FilterDataService, 
    private internal_data:InternalDataService, 
    private team_data:TeamDataService,
    public routerService:RouterService) { }

  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  
  linkEnum : typeof LinkEnum = LinkEnum;

  activeLink:string = '';
  is_mobile:boolean = false;

  leagueSelected!:League | null;
  sportSelected:number = -1;

  leagueList!:League[];
  championshipsList!:string[];

  ngOnInit(): void {
    this.subscribeLeagueSelected();
    this.subscribeActiveLink();

    this.is_mobile = window.innerWidth < 801;
  }

  private subscribeLeagueSelected() {
    this.internal_data.getLeagueSelected().subscribe(league => {
      this.leagueSelected = league;
    })
  }

  private subscribeActiveLink() {
    this.internal_data.getActiveLink().subscribe(link => {
      this.activeLink = link;
    });
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

  getActiveLink() : string {
    return this.activeLink.toUpperCase();
  }

  /* SETTER */

  protected setLeagueSelected(league:League | null) {
    this.internal_data.setLeagueSelected(league);
  }

  private setActiveLink(link_name:string) {
    this.internal_data.setActiveLink(link_name);
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

  isActiveLink(link_name:string) : boolean {
    console.log(this.activeLink + " " + link_name)
    return this.activeLink === link_name;
  }

  isMobileLayout() : boolean {
    return this.is_mobile;
  }

  /* Metodi di funzionalità */

  selectedLeagueListener(league: League) {
    this.clearData();
    this.setLeagueSelected(league);
    this.closeSidenav();
    this.routerService.goToCreateTeamPage();
  }

  onResize(event:any) {
    this.is_mobile = event.target.innerWidth < 801 ? true : false;
  }

  private clearData() : void {
    this.internal_data.clearData();
    this.team_data.clearAllPlayers();
  }
}
