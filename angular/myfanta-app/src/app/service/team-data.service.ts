import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

  constructor() { }

  generateTeam():Observable<any[]> {
    return of([]);
  }

  generateTeamWithFavoritList():Observable<any[]> {
    return of([]);
  }

  getBlacklistPlayers():Observable<any[]> {
    return of([]);
  }

  addPlayerToTeam(player_name:any) {
    
  }
}
