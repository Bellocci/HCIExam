import { Injectable } from '@angular/core';
import { LeagueEntity, LEAGUE_DATA } from 'src/model/leagueEntity.model';
import { League } from 'src/decorator/League.model';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor() { }

  private leaguesList!:League[];  

  loadAllLeagues() : void {
    if(!this.leaguesList) {
      // Qui avverrà la comunicazione con il backend
      let leagueEntities:LeagueEntity[] = LEAGUE_DATA;
      let leagues:League[] = [];
      for(let leagueEntity of leagueEntities) {
        leagues.push(new League(leagueEntity));
      }
      this.leaguesList = leagues;
    }
  }

  getLeaguesList():League[] {
    this.loadAllLeagues();
    return this.leaguesList;
  }
}
