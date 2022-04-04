import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { InternalDataService } from '../internal-data.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private service:SharedService, private internal_data:InternalDataService) { }

  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  panelOpenState:boolean = false;
  activeLink:string = '';
  is_mobile:boolean = false;

  championship_selected:string = "";
  subscrip_champ:Subscription = new Subscription;
  
  sportsList:any = [];
  championshipsList:any = [];

  ngOnInit(): void {
    this.refreshSportsList();
    this.refreshChampionshipsList();

    this.getChampionshipSelected();

    this.is_mobile = window.innerWidth < 800;
  }

  ngOnDestroy(): void {
    if(this.subscrip_champ)
      this.subscrip_champ.unsubscribe();
  }

  private getChampionshipSelected() {
    this.subscrip_champ = this.internal_data.getChampionshipSelected().subscribe(champ => {
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

  isMobileLayout(event:any) {
    this.is_mobile = event.target.innerWidth < 800 ? true : false;
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
}
