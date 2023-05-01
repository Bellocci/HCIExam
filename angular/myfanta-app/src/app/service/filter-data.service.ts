import { Injectable } from '@angular/core';
import { League } from 'src/decorator/League.model';
import { Sport } from 'src/decorator/sport.model';
import { ChampionshipEnum } from 'src/model/ChampionshipEnum.model';
import { LoadDataService } from './load-data.service';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  constructor(private loadDataService:LoadDataService) { }

  filterChampionshipsBySport(sport:Sport) : string[] {
    let championshipsMap:Map<number,string> = new Map();
      this.loadDataService.getLeaguesList()
        .filter(league => league.getSport().getSportId() == sport.getSportId())
        .forEach(league => {
          if(!championshipsMap.get(league.getChampionshipId())) {
            championshipsMap.set(league.getChampionshipId(), league.getChampionshipName());
          }
        });
    return Array.from(championshipsMap.values());
  }

  filterLeaguesByChampionshipAndSport(sport:Sport, championship:string) : League[] {
    return this.loadDataService.getLeaguesList()
        .filter(league => league.getChampionshipName() == championship && 
          league.getSport().getSportId() == sport.getSportId());
  }

  isEmptyString(text:string) : boolean {
    return text.trim().length == 0;
  }
}
