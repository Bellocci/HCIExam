import { Injectable } from '@angular/core';
import { League } from 'src/decorator/League.model';
import { LoadDataService } from './load-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { InternalDataService } from './internal-data.service';
import { Player } from 'src/decorator/player.model';
import { Observable, of } from 'rxjs';
import { Team } from 'src/decorator/team.model';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  private championshipMap:Map<SportEnum,Set<ChampionshipEnum>> = new Map<SportEnum,Set<ChampionshipEnum>>();

  constructor(private loadDataService:LoadDataService,
    private internalDataService:InternalDataService) { }

  /*
  Metodo che filtra fra tutte le leghe, i campionati esistenti per ogni sport
  */
  filterChampionshipsBySport(sport:SportEnum) : ChampionshipEnum[] {
    if(!this.championshipMap.get(sport)) {
      this.championshipMap.set(sport, new Set<ChampionshipEnum>());
      this.loadDataService
        .getLeaguesList()
        .filter(league => league.getSport() == sport)
        .forEach(league => {
          this.championshipMap.get(sport)?.add(league.getChampionship());
        });
    }   

    return Array.from(this.championshipMap.get(sport)!.values());
  }

  /*
  Metodo che filtra tutte le leghe per campionato e sport
  */
  filterLeaguesByChampionshipAndSport(sport:SportEnum, championship:ChampionshipEnum) : League[] {
    return this.loadDataService.getLeaguesList()
        .filter(league => league.getChampionship() == championship && 
          league.getSport() == sport);
  }

  filterTeamsByLeague(league:League):Team[] {
    return this.loadDataService.getAllTeams(league);
  }

  searchPlayerToAddList(playerName:string, league:League | null) : Observable<Player[]> {    
    let result:Player[] = [];
    if(league != null && !this.isEmptyString(playerName)) {
      for(let player of this.loadDataService.getAllPlayers(league)) {
        if(player.getName().includes(playerName)) {
          result.push(player);
        }
  
        if(result.length == 3) {
          return of(result);
        }
      }
    }
    return of(result);
  }

  isEmptyString(text:string) : boolean {
    return text.trim().length == 0;
  }
}
