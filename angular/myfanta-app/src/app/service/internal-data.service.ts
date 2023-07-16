import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';
import { League } from 'src/decorator/League.model';
import { SessionStorageService } from './session-storage.service';
import { LoadDataService } from './load-data.service';
import { ObserverHelper } from 'src/utility/observer-helper';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  static readonly KEY_SESSION_LEAGUE_ID:string = "leagueId";

  private leagueSelected:ObserverHelper<League | null> = new ObserverHelper<League | null>(null);
  private loadingData:ObserverHelper<boolean> = new ObserverHelper<boolean>(false);

  constructor(private sessionStorageLeague:SessionStorageService<number>,
    private loadDataService:LoadDataService) {

    const leagueId:number | null = this.sessionStorageLeague.getData(InternalDataService.KEY_SESSION_LEAGUE_ID);
    leagueId != null ? this.leagueSelected.setValue(this.loadDataService.loadLeagueById(leagueId)) : null;
    this.updateSessionStorageLeague();
  }  

  private updateSessionStorageLeague() : void {
    this.leagueSelected.addObserver(new ObserverStepBuilder<League | null>()
      .next(league => {
        if(league instanceof League) {
          this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, league.getLeagueId())
        } else {
          this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, null);
        }
      })
      .build());
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

  clearData() : void {
    this.leagueSelected.setValue(null);
    this.loadingData.setValue(false);
  }
}