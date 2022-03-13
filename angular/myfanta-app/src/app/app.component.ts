import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myfanta-app';

  constructor(private service:SharedService) { }

  panelOpenState:boolean = false;
  championshipSelected:string = "";
  
  sportsList:any = [];
  championshipsList:any = [];

  ngOnInit(): void {
    this.refreshSportsList();
    this.refreshChampionshipsList();
  }

  refreshChampionshipsList() {
    this.service.getChampionshipList().subscribe(data => {
      this.championshipsList = data;
    });
  }

  refreshSportsList() {
    this.service.getSportList().subscribe(data => {
      this.sportsList = data;
    });
  }

  setChampionshipSelected(sport:any) {
    this.championshipSelected = sport;
  }

  filterChampionship(champ:any, sport:any):boolean {
    if(champ.sport != sport.sportId)
      return false;
    return true;
  }
}