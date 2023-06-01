import { Injectable } from '@angular/core';
import { League } from 'src/decorator/League.model';
import { LoadDataService } from './load-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  championshipMap:Map<SportEnum,Set<ChampionshipEnum>> = new Map<SportEnum,Set<ChampionshipEnum>>();

  constructor(private loadDataService:LoadDataService) { }

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

  isEmptyString(text:string) : boolean {
    return text.trim().length == 0;
  }
}
