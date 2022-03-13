import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  panelOpenState:boolean = false;

  sportsList:any = [];
  championshipsList:any = [];

  constructor(private service:SharedService) { }

  // Share the value with parent
  @Output() childToParent = new EventEmitter<String>();

  ngOnInit(): void {
    this.loadSportsList();
    this.loadChampionshipsList();
  }

  loadSportsList() {
    this.service.getSportList().subscribe(data => {
      this.sportsList = data;
    });
  }

  loadChampionshipsList() {
    this.service.getChampionshipList().subscribe(data => {
      this.championshipsList = data;
    });
  }

  filterChampionship(champ:any, sport:any):boolean {
    if(champ.sport != sport.sportId)
      return false;
    return true;
  }

  sendChampionshipSelected(name:string) {
    this.childToParent.emit(name);
  }
}
