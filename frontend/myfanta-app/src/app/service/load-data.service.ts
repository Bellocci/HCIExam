import { Injectable } from '@angular/core';
import { LeagueEntity, LEAGUE_DATA } from 'src/model/leagueEntity.model';
import { PLAYER_DATA_NBA, PLAYER_DATA_PREMIER_LEAGUE, PLAYER_DATA_SERIE_A, PlayerEntity } from 'src/model/playerEntity.model';
import { PlayerDecoratorFactoryService } from 'src/decorator-factory/player-decorator-factory.service';
import { TEAM_DATA, TeamEntity } from 'src/model/teamEntity.model';
import { TeamDecoratorFactoryService } from 'src/decorator-factory/team-decorator-factory.service';
import { MapHelper } from 'src/utility/map-helper';
import { ModelRestClientService } from './model-rest-client.service';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor(private playerDecoratorFactory:PlayerDecoratorFactoryService,
    private teamDecoratorFactory:TeamDecoratorFactoryService,
    private modelRestClient:ModelRestClientService) { }

  private leagues:LeagueEntity[] | null = null;
  private playersMap:MapHelper<number, PlayerEntity[]> = new MapHelper<number, PlayerEntity[]>(new Map());
  private teamsMap:Map<number, TeamEntity[]> = new Map<number, TeamEntity[]>();

  private initLeagues() : Observable<LeagueEntity[]> {
      return this.modelRestClient.getLeagues()
        .pipe(
          // Permette di memorizzare i risultati ottenuti nella cache
          tap((leagues) => this.leagues = leagues)
        );
  }

  getLeagues():Observable<LeagueEntity[]> {
    if(this.leagues != null) {
      return of(this.leagues);
    }
    return this.initLeagues();
  }

  loadLeagueById(leagueId:number) : LeagueEntity | null {
    let result:LeagueEntity | undefined = undefined;
    // TODO: Interazione con il db
    result = LEAGUE_DATA.find(entity => entity.leagueId == leagueId);
    return result != undefined ? result : null;
  }

  private loadAllTeams(league:LeagueEntity) : void {   
    let list:TeamEntity[] = [];
    //TODO: interazione con il db
    list = this.teamDecoratorFactory.decorateList(TEAM_DATA.filter(team => team.league.equals(league)));    
    this.teamsMap.set(league.leagueId, list);
  }

  getAllTeams(league:LeagueEntity) : TeamEntity[] {
    if(!this.teamsMap.has(league.leagueId)) {
      this.loadAllTeams(league);
    }
    return this.teamsMap.get(league.leagueId)!;
  }  
}
