import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';
import { League } from 'src/decorator/League.model';
import { SessionStorageService } from './session-storage.service';
import { LoadDataService } from './load-data.service';
import { ObserverHelper } from 'src/utility/observer-helper';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { Player } from 'src/decorator/player.model';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  static readonly KEY_SESSION_LEAGUE_ID:string = "leagueId";
  static readonly KEY_SESSION_PLAYER_ID:string = "playerId";

  private leagueSelected:ObserverHelper<League | null> = new ObserverHelper<League | null>(null);
  private loadingData:ObserverHelper<boolean> = new ObserverHelper<boolean>(false);
  private playerSelected:ObserverHelper<Player | null> = new ObserverHelper<Player | null>(null);

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
    this.leagueSelected.addObserver(new ObserverStepBuilder<League | null>()
      .next(league => {
        league instanceof League ? this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, league.getLeagueId()) :
          this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, null);
      })
      .build()
    );
  }

  private updateSessionStoragePlayer() : void {
    this.playerSelected.addObserver(new ObserverStepBuilder<Player | null>()
      .next(player => {
        player instanceof Player ? this.sessionStoragePlayer.saveData(InternalDataService.KEY_SESSION_PLAYER_ID, player.getId()) :
          this.sessionStoragePlayer.saveData(InternalDataService.KEY_SESSION_PLAYER_ID, null);
      })
      .build()
    );
  }

  setLeagueSelected(league: League | null): void {
    this.leagueSelected.setValue(league);
  }  

  addObserverToLeagueSelected(observer:Observer<League | null>) : void {
    this.leagueSelected.addObserver(observer);
  }

  getLeagueSelected() : Observable<League | null> {
    return this.leagueSelected.getObservable();
  }

  addObserverToLoadingData(observer: Observer<boolean>) : void {
    this.loadingData.addObserver(observer);
  }

  setLoadingData(isLoading:boolean) : void {
    this.loadingData.setValue(isLoading);
  }

  addObserverToPlayerSelected(observer:Observer<Player | null>) : void {
    this.playerSelected.addObserver(observer);
  }

  setPlayerSelected(player:Player | null) : void {
    this.playerSelected.setValue(player);
  }

  clearData() : void {
    this.leagueSelected.setValue(null);
    this.loadingData.setValue(false);
    this.playerSelected.setValue(null);
  }
}