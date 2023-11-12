import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { LoadDataService } from './load-data.service';
import { ObservableHelper } from 'src/utility/observer-helper';
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

  private leagueSelected:ObservableHelper<LeagueEntity | null> = new ObservableHelper<LeagueEntity | null>(null);
  private _subscriptionLeagueObservable : Subscription | undefined;
  private playerSelected:ObservableHelper<PlayerEntity | null> = new ObservableHelper<PlayerEntity | null>(null);
  private _subscriptionPlayerObservable : Subscription | undefined;
  private loadingData:ObservableHelper<boolean> = new ObservableHelper<boolean>(false);

  /*
   * ========================
   * CONSTRUCTOR & DESTROYER
   * ========================
   */

  constructor(private sessionStorage:SessionStorageService,
    private loadDataService:LoadDataService,
    private searchPlayersService:SearchPlayersService) {

    console.log("Construct the Internal data service");

    const jsonLeagueId:string | null = this.sessionStorage.getData(InternalDataService.KEY_SESSION_LEAGUE_ID);
    if(jsonLeagueId != null) {
      const leagueId:number = JSON.parse(jsonLeagueId);
      this.leagueSelected.setValue(this.loadDataService.loadLeagueById(leagueId));
    }
    this._subscriptionLeagueObservable = this.updateSessionStorageLeague();

    const jsonPlayerId:string | null = this.sessionStorage.getData(InternalDataService.KEY_SESSION_PLAYER_ID);
    if(jsonPlayerId != null) {
      const playerId:number = JSON.parse(jsonPlayerId);
      this.playerSelected.setValue(this.searchPlayersService.loadPlayerBydId(playerId));
    }
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
        if(league != null) {
          this.sessionStorage.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, league.leagueId.toString());
        } else {
          this.sessionStorage.removeData(InternalDataService.KEY_SESSION_LEAGUE_ID);
        }        
      })
      .build()
    );
  }

  private updateSessionStoragePlayer() : Subscription | undefined {
    return this.playerSelected.addObserver(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => {
        if(player != null) {
          this.sessionStorage.saveData(InternalDataService.KEY_SESSION_PLAYER_ID, player.playerId.toString());
        } else {
          this.sessionStorage.removeData(InternalDataService.KEY_SESSION_PLAYER_ID);
        }
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

  getObservableLeagueSelected() : Observable<LeagueEntity | null> {
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

  getObservablePlayer() : Observable<PlayerEntity | null> {
    return this.playerSelected.getObservable();
  }

  setPlayerSelected(player:PlayerEntity | null) : void {
    this.playerSelected.setValue(player);
  }

  /*
   * =================================
   * GESTIONE ATTESA CARICAMENTO DATI
   * =================================
   */
  
  getLoadingDataObservable() : Observable<boolean> {
    return this.loadingData.getObservable();
  }

  addObserverToLoadingData(observer: Observer<boolean>) : Subscription | undefined {
    return this.loadingData.addObserver(observer);
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