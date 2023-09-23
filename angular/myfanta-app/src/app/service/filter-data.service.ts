import { Injectable } from '@angular/core';
import { LoadDataService } from './load-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { InternalDataService } from './internal-data.service';
import { Observable, of } from 'rxjs';
import { ROLE_PLAYER_DATA, RolePlayerEntity } from 'src/model/rolePlayerEntity.model';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';

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
        .filter(league => league.sport == sport)
        .forEach(league => {
          this.championshipMap.get(sport)?.add(league.championship);
        });
    }   

    return Array.from(this.championshipMap.get(sport)!.values());
  }

  /*
  Metodo che filtra tutte le leghe per campionato e sport
  */
  filterLeaguesByChampionshipAndSport(sport:SportEnum, championship:ChampionshipEnum) : LeagueEntity[] {
    return this.loadDataService.getLeaguesList()
        .filter(league => league.championship == championship && 
          league.sport == sport);
  }

  filterTeamsByLeague(league:LeagueEntity):TeamEntity[] {
    return this.loadDataService.getAllTeams(league);
  }

  searchPlayerToAddList(playerName:string, league:LeagueEntity | null) : Observable<PlayerEntity[]> {    
    let result:PlayerEntity[] = [];
    if(league != null && !this.isEmptyString(playerName)) {
      for(let player of this.loadDataService.getAllPlayers(league)) {
        if(player.playerName.toLowerCase().includes(playerName.toLowerCase())) {
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

  filterRolesBySport(sport:SportEnum) : RolePlayerEntity[] {
    const filteredList:RolePlayerEntity[] = [];
    ROLE_PLAYER_DATA.filter(role => role.sport == sport)
        .forEach(role => filteredList.push(role));

    return filteredList;
  }
}
