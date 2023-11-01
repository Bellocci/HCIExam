import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { LoadDataService } from './load-data.service';
import { ObserverHelper } from 'src/utility/observer-helper';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { SearchPlayersService } from './search-players.service';

/**
 * Servizio per la memorizzazione delle informazioni necessarie a livello di front-end
 */
@Injectable({
  providedIn: 'root'
})
export class InternalDataService implements OnDestroy {

  /*
   * ==========
   * VARIABILI
   * ==========
   */ 

  public static readonly KEY_SESSION_LEAGUE_ID:string = "leagueId";
  public static readonly KEY_SESSION_PLAYER_ID:string = "playerId";

  private leagueSelected:ObserverHelper<LeagueEntity | null> = new ObserverHelper<LeagueEntity | null>(null);
  private _subscriptionLeagueObservable : Subscription | undefined;
  private playerSelected:ObserverHelper<PlayerEntity | null> = new ObserverHelper<PlayerEntity | null>(null);
  private _subscriptionPlayerObservable : Subscription | undefined;
  private loadingData:ObserverHelper<boolean> = new ObserverHelper<boolean>(false);

  /*
   * ========================
   * CONSTRUCTOR & DESTROYER
   * ========================
   */

  constructor(private sessionStorageLeague:SessionStorageService<number>,
    private sessionStoragePlayer:SessionStorageService<number>,
    private loadDataService:LoadDataService,
    private searchPlayersService:SearchPlayersService) {

    console.log("Construct the Internal data service");

    const leagueId:number | null = this.sessionStorageLeague.getData(InternalDataService.KEY_SESSION_LEAGUE_ID);
    leagueId != null ? this.leagueSelected.setValue(this.loadDataService.loadLeagueById(leagueId)) : null;
    this._subscriptionLeagueObservable = this.updateSessionStorageLeague();

    const playerId:number | null = this.sessionStoragePlayer.getData(InternalDataService.KEY_SESSION_PLAYER_ID);
    playerId != null ? this.playerSelected.setValue(this.searchPlayersService.loadPlayerBydId(playerId)) : null;
    this._subscriptionPlayerObservable = this.updateSessionStoragePlayer();
  }  

  ngOnDestroy(): void {
    console.log("Destroy the Internal data service");
    this.leagueSelected.destroy();
    this.playerSelected.destroy();
    this.loadingData.destroy();
    this._subscriptionLeagueObservable != undefined ? this._subscriptionLeagueObservable?.unsubscribe() : null;
    this._subscriptionPlayerObservable != undefined ? this._subscriptionPlayerObservable.unsubscribe() : null;
  }

  /*
   * =================
   * SESSION STORAGE
   * =================
   */ 

  private updateSessionStorageLeague() : Subscription | undefined {
    return this.leagueSelected.addObserver(new ObserverStepBuilder<LeagueEntity | null>()
      .next(league => {
        league instanceof LeagueEntity ? this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, league.leagueId) :
          this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, null);
      })
      .build()
    );
  }

  private updateSessionStoragePlayer() : Subscription | undefined {
    return this.playerSelected.addObserver(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => {
        player instanceof PlayerEntity ? this.sessionStoragePlayer.saveData(InternalDataService.KEY_SESSION_PLAYER_ID, player?.playerId) :
          this.sessionStoragePlayer.saveData(InternalDataService.KEY_SESSION_PLAYER_ID, null);
      })
      .build()
    );
  }
  
  /*
   * ==============================
   * GESTIONE SELEZIONE CAMPIONATO
   * ==============================
   */

  setLeagueSelected(league: LeagueEntity | null): void {
    this.leagueSelected.setValue(league);
  }  

  addObserverToLeagueSelected(observer:Observer<LeagueEntity | null>) : Subscription | undefined {
    return this.leagueSelected.addObserver(observer);
  }

  getLeagueSelected() : Observable<LeagueEntity | null> {
    return this.leagueSelected.getObservable();
  }  

  /*
   * ==============================
   * GESTIONE GIOCATORE CAMPIONATO
   * ==============================
   */

  addObserverToPlayerSelected(observer:Observer<PlayerEntity | null>) : Subscription | undefined {
    return this.playerSelected.addObserver(observer);
  }

  setPlayerSelected(player:PlayerEntity | null) : void {
    this.playerSelected.setValue(player);
  }

  /*
   * =================================
   * GESTIONE ATTESA CARICAMENTO DATI
   * =================================
   */
  
  addObserverToLoadingData(observer: Observer<boolean>) : void {
    this.loadingData.addObserver(observer);
  }

  setLoadingData(isLoading:boolean) : void {
    this.loadingData.setValue(isLoading);
  }

  /*
   * =================
   * METODI GENERALI
   * =================
   */

  clearData() : void {
    this.leagueSelected.setValue(null);
    this.loadingData.setValue(false);
    this.playerSelected.setValue(null);
  }
}