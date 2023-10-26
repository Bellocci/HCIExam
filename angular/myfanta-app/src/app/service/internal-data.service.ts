import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { LoadDataService } from './load-data.service';
import { ObserverHelper } from 'src/utility/observer-helper';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  public static readonly KEY_SESSION_LEAGUE_ID:string = "leagueId";
  public static readonly KEY_SESSION_PLAYER_ID:string = "playerId";

  private leagueSelected:ObserverHelper<LeagueEntity | null> = new ObserverHelper<LeagueEntity | null>(null);
  private loadingData:ObserverHelper<boolean> = new ObserverHelper<boolean>(false);
  private playerSelected:ObserverHelper<PlayerEntity | null> = new ObserverHelper<PlayerEntity | null>(null);

  constructor(private sessionStorageLeague:SessionStorageService<number>,
    private sessionStoragePlayer:SessionStorageService<number>,
    private loadDataService:LoadDataService) {

    const leagueId:number | null = this.sessionStorageLeague.getData(InternalDataService.KEY_SESSION_LEAGUE_ID);
    leagueId != null ? this.leagueSelected.setValue(this.loadDataService.loadLeagueById(leagueId)) : null;
    this.updateSessionStorageLeague();

    const playerId:number | null = this.sessionStoragePlayer.getData(InternalDataService.KEY_SESSION_PLAYER_ID);
    playerId != null ? this.playerSelected.setValue(this.loadDataService.loadPlayerBydId(playerId)) : null;
    this.updateSessionStoragePlayer();
  }  

  private updateSessionStorageLeague() : void {
    this.leagueSelected.addObserver(new ObserverStepBuilder<LeagueEntity | null>()
      .next(league => {
        league instanceof LeagueEntity ? this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, league.leagueId) :
          this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, null);
      })
      .build()
    );
  }

  private updateSessionStoragePlayer() : void {
    this.playerSelected.addObserver(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => {
        player instanceof PlayerEntity ? this.sessionStoragePlayer.saveData(InternalDataService.KEY_SESSION_PLAYER_ID, player?.playerId) :
          this.sessionStoragePlayer.saveData(InternalDataService.KEY_SESSION_PLAYER_ID, null);
      })
      .build()
    );
  }

  setLeagueSelected(league: LeagueEntity | null): void {
    this.leagueSelected.setValue(league);
  }  

  addObserverToLeagueSelected(observer:Observer<LeagueEntity | null>) : void {
    this.leagueSelected.addObserver(observer);
  }

  getLeagueSelected() : Observable<LeagueEntity | null> {
    return this.leagueSelected.getObservable();
  }

  addObserverToLoadingData(observer: Observer<boolean>) : void {
    this.loadingData.addObserver(observer);
  }

  setLoadingData(isLoading:boolean) : void {
    this.loadingData.setValue(isLoading);
  }

  addObserverToPlayerSelected(observer:Observer<PlayerEntity | null>) : void {
    this.playerSelected.addObserver(observer);
  }

  setPlayerSelected(player:PlayerEntity | null) : void {
    this.playerSelected.setValue(player);
  }

  clearData() : void {
    this.leagueSelected.setValue(null);
    this.loadingData.setValue(false);
    this.playerSelected.setValue(null);
  }
}