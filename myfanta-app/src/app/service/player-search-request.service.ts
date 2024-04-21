import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PLAYER_DATA_NBA, PLAYER_DATA_PREMIER_LEAGUE, PLAYER_DATA_SERIE_A, PlayerEntity } from 'src/model/playerEntity.model';
import { MapHelper } from 'src/utility/map-helper';
import { PlayerSearchFilter } from './player-search-filter';
import { SportEnum } from 'src/enum/SportEnum.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerSearchRequestService implements OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private static readonly MAX_RESULT:number = 3;

  private playersMap:MapHelper<number, PlayerEntity[]> = new MapHelper<number, PlayerEntity[]>(new Map());

  /*
   * ========================
   * CONSTRUCTOR & DESTROYER  
   * ========================
   */

  constructor() { 
    console.log("Construct the Player search service");
  }

  ngOnDestroy(): void {
    console.log("Destroy the Player search service");
    this.playersMap.destroy();
  }

  /*
   *  ======================
   *  CARICAMENTO GIOCATORI
   *  ======================
   */

  private loadAllPlayers(league:LeagueEntity) : PlayerEntity[] {
    if(this.playersMap.hasElement(league.leagueId)) {
      return this.playersMap.getValue(league.leagueId)!;
    }

    this.playersMap.clearMap();
    let list:PlayerEntity[] = [];
    // TODO: Interazione con il db
    league.leagueId == 1 ? list = PLAYER_DATA_SERIE_A :
      league.leagueId == 2 ? list = PLAYER_DATA_PREMIER_LEAGUE :
      league.leagueId == 4 ? list = PLAYER_DATA_NBA :
      league.leagueId == 5 ? list = [] : 
      list = [];
    
    this.playersMap.addElementToMap(league.leagueId, list);
    return list;
  }

  getAllPlayers(league:LeagueEntity): PlayerEntity[] {
    if(this.playersMap.hasElement(league.leagueId)) {
      return this.playersMap.getValue(league.leagueId)!;
    } else {
      return this.loadAllPlayers(league);
    }
  }

  loadPlayerBydId(playerId:number) : PlayerEntity | null {
    // TODO: Interazione con il db
    let result:PlayerEntity[] = PLAYER_DATA_SERIE_A.filter(player => player.playerId == playerId);
    if(result.length != 0) {
      return result[0];
    }    

    result = PLAYER_DATA_PREMIER_LEAGUE.filter(player => player.playerId == playerId);
    if(result.length != 0) {
      return result[0];
    }

    result = PLAYER_DATA_NBA.filter(player => player.playerId == playerId);
    if(result.length != 0) {
      return result[0];
    }

    return null;
  } 

  /*
   * ==================
   * RICERCA GIOCATORI 
   * ==================
   */ 

  byNameAndLeagueAsObservable(playerName:string, league:LeagueEntity, maxResult?:number) : Observable<PlayerEntity[]> {
    maxResult = maxResult != undefined ? maxResult : PlayerSearchRequestService.MAX_RESULT;
    let resultList:PlayerEntity[] = this.byNameAndLeague(playerName, league);
    if(resultList.length <= maxResult) {
      return of(resultList);
    }

    return of(resultList.splice(0, maxResult));
  }

  byNameAndLeague(playerName:string, league:LeagueEntity) : PlayerEntity[] {
    // TODO: Interazione con il DB (Ricerca giocatore per nome e lega)
    
    /**
     * Se la lega per cui stiamo ricercando non è quella presente, significa che
     * l'utente ha cambiato campionato e quindi si ripulisce la mappa e carichiamo
     * tutti i giocatori appartenenti alla lega
     */
    this.loadAllPlayers(league);
    let resultList:PlayerEntity[] = [];
    for(let player of this.playersMap.getValue(league.leagueId)!) {
      if(player.playerName.toLowerCase().includes(playerName.toLowerCase())) {
        resultList.push(player);
      }
    }

    return resultList;
  }

  byFilter(searchFilter:PlayerSearchFilter) : PlayerEntity[] {
    // TODO: Interazione con il DB se necessario
    if(searchFilter.league == undefined) {
      throw new Error("League is not defined");
    }

    this.loadAllPlayers(searchFilter.league);
    let filteredPlayerList:PlayerEntity[] = this.playersMap.getValue(searchFilter.league.leagueId)!;

    let searchFilterString:string = "";
    if(searchFilter.name.trim().length != 0) {      
      searchFilterString += "Name: " + searchFilter.name.trim();
      filteredPlayerList = filteredPlayerList.filter(player => player.playerName.trim().toLowerCase().includes(searchFilter.name));
    }

    if(searchFilter.rolesList.length != 0) {
      searchFilterString += " Role: [";
      searchFilter.rolesList.forEach(role => searchFilterString += role.description + " ");
      searchFilterString += "]";
      filteredPlayerList = filteredPlayerList.filter(player => searchFilter.rolesList.includes(player.role))
    }

    if(searchFilter.matchPlayed != -1) {
      searchFilterString += " MatchPlayed: " + searchFilter.matchPlayed;
      filteredPlayerList = filteredPlayerList.filter(player => player.matchPlayed == searchFilter.matchPlayed)
    }

    if(searchFilter.matchPlayedPerc != undefined) {
      searchFilterString += " MatchPlayedPercentage: " + searchFilter.matchPlayedPerc.value;
      let match:number = this.calculateMatchPlayedFilter(searchFilter.league.sport, searchFilter.matchPlayedPerc.value);
      filteredPlayerList = filteredPlayerList.filter(player => player.matchPlayed >= match);
    }

    if(searchFilter.teamsList.length != 0) {
      searchFilterString += " Team: [";
      searchFilter.teamsList.forEach(team => searchFilterString += team.teamAbbreviation + " ");
      searchFilterString += "]";
      filteredPlayerList = filteredPlayerList.filter(player => searchFilter.teamsList.includes(player.team));
    }

    console.log("Filter : " + searchFilterString);
    console.log("Result: " + filteredPlayerList.length);
    filteredPlayerList.forEach(player => console.log(player.toString()));

    return filteredPlayerList;
  }

  private calculateMatchPlayedFilter(sport:SportEnum, matchPlayedPerc:number) : number {
    const totalMatch:number = SportEnum.visitAndReturn<number>(sport, {
        footballSoccer() {
            return 38;
        },

        volleyball() {
            return 0;
        },  

        basketball() {
            return 0;
        }
    });

    return Math.trunc((totalMatch * matchPlayedPerc) / 100);
}
  
}
