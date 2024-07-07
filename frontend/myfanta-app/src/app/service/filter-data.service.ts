import { Injectable } from '@angular/core';
import { LoadDataService } from './load-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { ChampionshipEnum } from 'src/enum/ChampionshipEnum.model';
import { Observable, of } from 'rxjs';
import { ROLE_PLAYER_DATA, RolePlayerEntity } from 'src/model/rolePlayerEntity.model';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';
import { FilterUtility } from 'src/utility/filter-utility';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  private championshipMap:Map<SportEnum,Set<ChampionshipEnum>> = new Map<SportEnum,Set<ChampionshipEnum>>();

  constructor(private loadDataService:LoadDataService) { }

  /*
   * ==================
   * FILTRI CAMPIONATO
   * ==================
   */

  /**
   * Metodo che filtra fra tutte le leghe, i campionati esistenti per ogni sport
   * 
   * @returns ChampionshipEnum[]
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
   * =============
   * FILTRI LEGHE
   * =============
   */

  /**
   * Metodo che filtra tutte le leghe per campionato e sport
   * 
   * @param sport 
   * @param championship 
   * @returns LeagueEntity[]
   */
  filterLeaguesByChampionshipAndSport(sport:SportEnum, championship:ChampionshipEnum) : LeagueEntity[] {
    return this.loadDataService.getLeaguesList()
        .filter(league => league.championship == championship && 
          league.sport == sport);
  }

  /*
   * ===============
   * FILTRI SQUADRE 
   * ===============
   */

  /**
   * Ricerca tutte le squadre relative alla lega passata come parametro
   * 
   * @param league 
   * @returns TeamEntity[] 
   */
  filterTeamsByLeague(league:LeagueEntity):TeamEntity[] {
    return this.loadDataService.getAllTeams(league);
  }

  /*
   * =============
   * FILTRI RUOLI 
   * =============
   */

  /**
   * Ricerca tutti i ruoli dei giocatori relativi ad uno Sport
   * 
   * @param sport 
   * @returns RolePlayerEntity[]
   */
  filterRolesBySport(sport:SportEnum) : RolePlayerEntity[] {
    const filteredList:RolePlayerEntity[] = [];
    ROLE_PLAYER_DATA.filter(role => role.sport == sport)
        .forEach(role => filteredList.push(role));

    return filteredList;
  }  
}
