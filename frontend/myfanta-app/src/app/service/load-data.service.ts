import { Injectable } from '@angular/core';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { PlayerDecoratorFactoryService } from 'src/decorator-factory/player-decorator-factory.service';
import { TeamEntity } from 'src/model/teamEntity.model';
import { TeamDecoratorFactoryService } from 'src/decorator-factory/team-decorator-factory.service';
import { ModelRestClientService } from './model-rest-client.service';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  /*
   * ==========
   * VARIABILI
   * ==========
   */  
  private cachedLeagues = new BehaviorSubject<LeagueEntity[]>([]);
  private cachedTeams: Map<number, BehaviorSubject<TeamEntity[]>> = new Map();
  private cachedPlayers: Map<number, BehaviorSubject<PlayerEntity[]>> = new Map();

  /*
   * ===========
   * CONSTRUCT
   * ===========
   */

  constructor(private playerDecoratorFactory:PlayerDecoratorFactoryService,
    private teamDecoratorFactory:TeamDecoratorFactoryService,
    private modelRestClient:ModelRestClientService) { }    

  /*
   * ==============
   * METODI PUBLIC 
   * ==============
   */

  // ***** LEAGUE ****** 

  getLeagues():Observable<LeagueEntity[]> {
    if(this.cachedLeagues.getValue().length == 0) {
      this.modelRestClient.getLeagues()
        .pipe(
          tap((leagues) => this.cachedLeagues.next(leagues)),
          catchError((error) => {
            console.log("Error on getLeagues method: ", error)
            return of([])
          })
        )
        .subscribe();
    }

    return this.cachedLeagues.asObservable();
  }

  loadLeagueById(leagueId:number) : Observable<LeagueEntity> {    
    return this.modelRestClient.loadLeague(leagueId.toString())
  }

  // ***** TEAM ******

  getTeams(league:LeagueEntity) : Observable<TeamEntity[]> {
    if (!this.cachedTeams.has(league.league_id)) {      
      let subject = new BehaviorSubject<TeamEntity[]>([]);
      this.cachedTeams.set(league.league_id, subject)

      this.modelRestClient.getTeams(league)
          .pipe(
            tap((teams) => subject.next(teams)),
            catchError((error) => {
              subject.error(error);
              return of([]);
            })
          )
          .subscribe();  
    }

    return this.cachedTeams.get(league.league_id)!;
  }

  // ***** PLAYER ******
}
