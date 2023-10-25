import { Injectable } from '@angular/core';
import { LeagueEntity, LEAGUE_DATA } from 'src/model/leagueEntity.model';
import { PLAYER_DATA_NBA, PLAYER_DATA_PREMIER_LEAGUE, PLAYER_DATA_SERIE_A, PlayerEntity } from 'src/model/playerEntity.model';
import { PlayerDecoratorFactoryService } from 'src/decorator-factory/player-decorator-factory.service';
import { TEAM_DATA, TeamEntity } from 'src/model/teamEntity.model';
import { TeamDecoratorFactoryService } from 'src/decorator-factory/team-decorator-factory.service';
import { MapHelper } from 'src/utility/map-helper';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor(private playerDecoratorFactory:PlayerDecoratorFactoryService,
    private teamDecoratorFactory:TeamDecoratorFactoryService) { }

  private leaguesList!:LeagueEntity[];
  private playersMap:MapHelper<number, PlayerEntity[]> = new MapHelper<number, PlayerEntity[]>(new Map());
  private teamsMap:Map<number, TeamEntity[]> = new Map<number, TeamEntity[]>();

  async loadAllLeagues() : Promise<void> {
    if(!this.leaguesList) {
      // TODO: Interazione con il db      
      let leagueEntities:LeagueEntity[] = LEAGUE_DATA;
      this.leaguesList = leagueEntities;
    }
  }

  getLeaguesList():LeagueEntity[] {
    this.loadAllLeagues();
    return this.leaguesList;
  }

  loadLeagueById(leagueId:number) : LeagueEntity | null {
    let result:LeagueEntity | undefined = undefined;
    // TODO: Interazione con il db
    result = LEAGUE_DATA.find(entity => entity.leagueId == leagueId);
    return result != undefined ? result : null;
  }

  private loadAllTeams(league:LeagueEntity) : TeamEntity[] {   
    let list:TeamEntity[] = [];
    //TODO: interazione con il db
    list = this.teamDecoratorFactory.decorateList(TEAM_DATA.filter(team => team.league.equals(league)));
    this.teamsMap.set(league.leagueId, list);
    return list;
  }

  getAllTeams(league:LeagueEntity) : TeamEntity[] {

    return this.teamsMap.has(league.leagueId) ?
      this.teamsMap.get(league.leagueId)! :
      this.loadAllTeams(league);
  }

  private loadAllPlayers(league:LeagueEntity) : PlayerEntity[] {
    let list:PlayerEntity[] = [];
    // TODO: Interazione con il db
    league.leagueId == 1 ? list = this.playerDecoratorFactory.decorateList(PLAYER_DATA_SERIE_A) :
      league.leagueId == 2 ? list = this.playerDecoratorFactory.decorateList(PLAYER_DATA_PREMIER_LEAGUE) :
      league.leagueId == 4 ? list = this.playerDecoratorFactory.decorateList(PLAYER_DATA_NBA) :
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

  searchPlayer(playerName:string, league:LeagueEntity) : PlayerEntity | undefined {
    if(this.playersMap.hasElement(league.leagueId)) {
      //TODO: Interazione con il db
      return this.playersMap.getValue(league.leagueId)?.find(player => player.playerName === playerName);
    }
    return undefined;
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
}
