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
import { CountryEnum } from 'src/enum/CountryEnum.model';

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
    // FIXME: RIMUOVERE
    return []
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
   * @param country
   * @returns LeagueEntity[]
   */
  filterLeaguesByCountryAndSport(sport:SportEnum, country:CountryEnum) : LeagueEntity[] {
    return []
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
    //return this.loadDataService.getTeams(league);
    return []
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
