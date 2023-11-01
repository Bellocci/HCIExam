import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlayerDecoratorFactoryService } from 'src/decorator-factory/player-decorator-factory.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PLAYER_DATA_NBA, PLAYER_DATA_PREMIER_LEAGUE, PLAYER_DATA_SERIE_A, PlayerEntity } from 'src/model/playerEntity.model';
import { FilterUtility } from 'src/utility/filter-utility';
import { MapHelper } from 'src/utility/map-helper';

@Injectable({
  providedIn: 'root'
})
export class SearchPlayersService implements OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private playersMap:MapHelper<number, PlayerEntity[]> = new MapHelper<number, PlayerEntity[]>(new Map());

  /*
   * ========================
   * CONSTRUCTOR & DESTROYER  
   * ========================
   */

  constructor(private playerDecoratorFactory:PlayerDecoratorFactoryService) { 
    console.log("Construct the Player search service");
  }

  ngOnDestroy(): void {
    console.log("Destroy the Player search service");
    this.playersMap.destroy();
  }

  /**
   *  ======================
   *  CARICAMENTO GIOCATORI
   *  ======================
   */

  private loadAllPlayers(league:LeagueEntity) : PlayerEntity[] {
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

  /**
   * ==================
   * RICERCA GIOCATORI 
   * ==================
   */

  searchPlayerToAddList(playerName:string, league:LeagueEntity | null) : Observable<PlayerEntity[]> {    
    let result:PlayerEntity[] = [];
    if(league != null && ! FilterUtility.isStringEmpty(playerName)) {
      for(let player of this.getAllPlayers(league)) {
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

  searchPlayer(playerName:string, league:LeagueEntity) : PlayerEntity | undefined {
    if(this.playersMap.hasElement(league.leagueId)) {
      //TODO: Interazione con il db
      return this.playersMap.getValue(league.leagueId)?.find(player => player.playerName === playerName);
    }
    return undefined;
  }
}
