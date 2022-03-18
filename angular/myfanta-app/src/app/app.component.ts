import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { InternalDataService } from './internal-data.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myfanta-app';

  constructor(private service:SharedService, private internal_data:InternalDataService) { }

  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  panelOpenState:boolean = false;

  championship_selected:string = "";
  subscrip_champ:Subscription = new Subscription;
  
  sportsList:any = [];
  championshipsList:any = [];

  ngOnInit(): void {
    this.refreshSportsList();
    this.refreshChampionshipsList();

    this.getChampionshipSelected();
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
}