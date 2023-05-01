import { Injectable } from '@angular/core';
import { SportEntity, SPORT_DATA } from 'src/model/sportEntity.model';
import { LeagueEntity, LEAGUE_DATA } from 'src/model/leagueEntity.model';
import { League } from 'src/decorator/League.model';
import { Sport } from 'src/decorator/sport.model';
import { UserEntity, USER_DATA } from 'src/model/userEntity.model';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor() { }

  private sportsList!:Sport[];
  private leaguesList!:League[];  

  loadAllSports() : void {
    if(!this.sportsList) {
      // Qui avverrà la comunicazione con il backend
      let sportEntities:SportEntity[] = SPORT_DATA;
      let sport:Sport[] = [];
      for(let sportEntity of sportEntities) {
        sport.push(new Sport(sportEntity));
      }
      this.sportsList = sport;
    }
  }

  getSportsList():Sport[] {
    this.loadAllSports();
    return this.sportsList;
  }

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
