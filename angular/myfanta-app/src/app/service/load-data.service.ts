import { Injectable } from '@angular/core';
import { LeagueEntity, LEAGUE_DATA } from 'src/model/leagueEntity.model';
import { League } from 'src/decorator/League.model';
import { PLAYER_DATA_NBA, PLAYER_DATA_PREMIER_LEAGUE, PLAYER_DATA_SERIE_A, PLAYER_DATA_SERIE_A_FEMALE, PlayerEntity } from 'src/model/playerEntity.model';
import { PlayerDecoratorFactoryService } from 'src/decorator-factory/player-decorator-factory.service';
import { Player } from 'src/decorator/player.model';
import { LeagueDecoratorFactoryService } from 'src/decorator-factory/league-decorator-factory.service';
import { Team } from 'src/decorator/team.model';
import { TEAM_DATA } from 'src/model/teamEntity.model';
import { TeamDecoratorFactoryService } from 'src/decorator-factory/team-decorator-factory.service';
import { MapHelper } from 'src/utility/map-helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor(private leagueDecoratorFactory:LeagueDecoratorFactoryService,
    private playerDecoratorFactory:PlayerDecoratorFactoryService,
    private teamDecoratorFactory:TeamDecoratorFactoryService) { }

  private leaguesList!:League[];
  private playersMap:MapHelper<number, Player[]> = new MapHelper<number, Player[]>(new Map());
  private teamsMap:Map<number, Team[]> = new Map<number, Team[]>();

  async loadAllLeagues() : Promise<void> {
    if(!this.leaguesList) {
      // FIXME: Interazione con il db      
      let leagueEntities:LeagueEntity[] = LEAGUE_DATA;
      this.leaguesList = this.leagueDecoratorFactory.decorateList(leagueEntities);
    }
  }

  getLeaguesList():League[] {
    this.loadAllLeagues();
    return this.leaguesList;
  }

  loadLeagueById(leagueId:number) : League | null {
    let result:LeagueEntity | undefined = undefined;
    // FIXME: Interazione con il db
    result = LEAGUE_DATA.find(entity => entity.leagueId == leagueId);
    return result != undefined ? this.leagueDecoratorFactory.decorate(result) : null;
  }

  private loadAllTeams(league:League) : Team[] {   
    let list:Team[] = [];
    //FIXME: interazione con il db
    list = this.teamDecoratorFactory.decorateList(TEAM_DATA.filter(team => team.league.equals(league)));
    this.teamsMap.set(league.getLeagueId(), list);
    return list;
  }

  getAllTeams(league:League) : Team[] {
    if(this.teamsMap.has(league.getLeagueId())) {
      return this.teamsMap.get(league.getLeagueId())!;
    } else {
      return this.loadAllTeams(league);
    }
  }

  private loadAllPlayers(league:League) : Player[] {
    let list:Player[] = [];
    // FIXME: Interazione con il db
    league.getLeagueId() == 1 ? list = this.playerDecoratorFactory.decorateList(PLAYER_DATA_SERIE_A) :
      league.getLeagueId() == 2 ? list = this.playerDecoratorFactory.decorateList(PLAYER_DATA_PREMIER_LEAGUE) :
      league.getLeagueId() == 3 ? list = this.playerDecoratorFactory.decorateList(PLAYER_DATA_SERIE_A_FEMALE) :
      league.getLeagueId() == 4 ? list = this.playerDecoratorFactory.decorateList(PLAYER_DATA_NBA) :
      league.getLeagueId() == 5 ? list = [] : 
      list = [];
    
    this.playersMap.addElementToMap(league.getLeagueId(), list);
    return list;
  }

  getAllPlayers(league:League): Player[] {
    if(this.playersMap.hasElement(league.getLeagueId())) {
      return this.playersMap.getValue(league.getLeagueId())!;
    } else {
      return this.loadAllPlayers(league);
    }
  }

  searchPlayer(playerName:string, league:League) : Player | undefined {
    if(this.playersMap.hasElement(league.getLeagueId())) {
      //FIXME: Interazione con il db
      return this.playersMap.getValue(league.getLeagueId())?.find(player => player.getName() === playerName);
    }
    return undefined;
  }
}
