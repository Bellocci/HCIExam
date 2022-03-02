import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private service:SharedService) { }

  panelOpenState:boolean = false;
  championshipSelected:string = "";
  
  sportsList:any = [];
  championshipsList:any = [];

  ngOnInit(): void {
    this.refreshChampionshipsList();
    this.refreshSportsList();
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
}
