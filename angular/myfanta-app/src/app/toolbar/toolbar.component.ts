import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { InternalDataService } from '../service/internal-data.service';
import { SharedService } from '../service/shared.service';
import { TeamDataService } from '../service/team-data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private service:SharedService, private internal_data:InternalDataService, private team_data:TeamDataService) { }

  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  panelOpenState:boolean = false;
  activeLink:string = '';
  is_mobile:boolean = false;

  championship_selected:string = "";
  
  sportsList:any = [];
  championshipsList:any = [];

  ngOnInit(): void {
    this.refreshSportsList();
    this.refreshChampionshipsList();
    this.getChampionshipSelected();
    this.subscribeActiveLink();
    this.is_mobile = window.innerWidth < 801;
  }

  private getChampionshipSelected() {
    this.internal_data.getChampionshipSelected().subscribe(champ => {
      this.championship_selected = champ;
    })
  }

  private refreshChampionshipsList() {
    this.service.getChampionshipList().subscribe(data => {
      this.championshipsList = data;
    });
  }

  private refreshSportsList() {
    this.service.getSportList().subscribe(data => {
      this.sportsList = data;
    });
  }

  private subscribeActiveLink() {
    this.internal_data.getActiveLink().subscribe(link => {
      this.activeLink = link;
    });
  }

  getActiveLink() : string {
    return this.activeLink.toUpperCase();
  }

  onResize(event:any) {
    this.is_mobile = event.target.innerWidth < 801 ? true : false;
  }

  isMobileLayout() : boolean {
    return this.is_mobile;
  }

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  setChampionshipSelected(champ:string) {
    this.internal_data.setChampionshipSelected(champ);
  }

  filterChampionship(champ:any, sport:any):boolean {
    if(champ.sport != sport.sportId)
      return false;
    return true;
  }

  setActiveLink(link_name:string) {
    this.internal_data.setActiveLink(link_name);
  }

  isActiveLink (link_name:string):boolean {
    let current_link:string = '';
    this.internal_data.getActiveLink().subscribe(link => {
      current_link = link;
    });
    return current_link === link_name;
  }

  clearData() : void {
    this.internal_data.clearData();
    this.team_data.clearData();
  }
}
