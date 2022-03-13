import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { InternalDataService } from '../internal-data.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  panelOpenState:boolean = false;

  championship_selected:string = '';
  subscrip_champ:Subscription = new Subscription;

  sportsList:any = [];
  championshipsList:any = [];

  constructor(private service:SharedService, private internal_data:InternalDataService) { }

  // Share the value with parent
  @Output() childToParent = new EventEmitter<String>();

  ngOnInit(): void {
    this.loadSportsList();
    this.loadChampionshipsList();

    this.subscrip_champ = this.internal_data.current_championship.subscribe(champ => this.championship_selected = champ);
  }

  ngOnDestroy(): void {
    this.subscrip_champ.unsubscribe();
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

  setChampionshipSelected(name:string) {
    this.internal_data.setChampionshipSelected(name);
  }
}
