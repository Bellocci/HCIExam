import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Sport } from 'src/decorator/sport.model';
import { League } from 'src/decorator/League.model';
import { InternalDataService } from '../service/internal-data.service';
import { LoadDataService } from '../service/load-data.service';
import { SharedService } from '../service/shared.service';
import { TeamDataService } from '../service/team-data.service';
import { FilterDataService } from '../service/filter-data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private service:SharedService, private loadDataService:LoadDataService, 
    private filterDataService:FilterDataService, private internal_data:InternalDataService, private team_data:TeamDataService) { }

  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  activeLink:string = '';
  is_mobile:boolean = false;

  leagueSelected!:League | null;
  sportSelected:number = -1;

  sportsList!:Sport[];
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

  getSports() : Sport[] {
    return this.loadDataService.getSportsList();
  }

  getChampionships(sport:Sport) : string[] {
    return this.filterDataService.filterChampionshipsBySport(sport);
  }

  getLeagues(sport:Sport, championship:string) : League[] {
    return this.filterDataService.filterLeaguesByChampionshipAndSport(sport, championship);
  }

  getActiveLink() : string {
    return this.activeLink.toUpperCase();
  }

  /* SETTER */

  setLeagueSelected(league:League | null) {
    this.internal_data.setLeagueSelected(league);
  }

  setActiveLink(link_name:string) {
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
  }

  /* Metodi visibilità */

  isPanelSportOpen(index:number) : boolean {
    return this.sportSelected == index;
  }

  isActiveLink (link_name:string):boolean {
    let current_link:string = '';
    this.internal_data.getActiveLink().subscribe(link => {
      current_link = link;
    });
    return current_link === link_name;
  }

  /* METHODS */

  isMobileLayout() : boolean {
    return this.is_mobile;
  }

  onResize(event:any) {
    this.is_mobile = event.target.innerWidth < 801 ? true : false;
  }

  clearData() : void {
    this.internal_data.clearData();
    this.team_data.clearData();
  }
}
