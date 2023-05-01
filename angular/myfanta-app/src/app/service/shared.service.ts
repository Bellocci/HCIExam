import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SportEntity, SPORT_DATA } from 'src/model/sportEntity.model';
import { PLAYER_DATA_NBA, PLAYER_DATA_PREMIER_LEAGUE, PLAYER_DATA_SERIE_A, PLAYER_DATA_SERIE_A_FEMALE } from 'src/model/player.model'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost";

  constructor(private http:HttpClient) { }

  getSportList():SportEntity[] {
    return SPORT_DATA;
  }

  getPlayerList(championship:string):Observable<any[]> {
    if(championship == 'Serie A')
      return of(PLAYER_DATA_SERIE_A);
    if(championship == 'Premier League')
      return PLAYER_DATA_PREMIER_LEAGUE;
    if(championship == 'Serie A Female')
      return PLAYER_DATA_SERIE_A_FEMALE;
    if(championship == 'NBA')
      return PLAYER_DATA_NBA;
    return of([]);
  }

  getGeneratePlayers(championship:string) {
    return this.getPlayerList(championship);
  }

  searchPlayers(player_name:string) : Observable<any[]> {
    let find:any[] = [];
    if(player_name != '') {
      for(let player of PLAYER_DATA_SERIE_A) {
        if(player.playerName.match(player_name)) {
          find.push(player);
        }
        if(find.length == 3) {
          return of(find);
        }
      }
    }
    return of(find);
  }

  resetOptions() {
    
  }
}
