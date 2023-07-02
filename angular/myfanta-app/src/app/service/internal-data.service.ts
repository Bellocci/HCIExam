import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { League } from 'src/decorator/League.model';
import { SessionStorageService } from './session-storage.service';
import { LoadDataService } from './load-data.service';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  static readonly KEY_SESSION_LINK:string = "link";
  static readonly KEY_SESSION_LEAGUE_ID:string = "leagueId";

  constructor(private sessionStorageLink:SessionStorageService<string>, 
    private sessionStorageLeague:SessionStorageService<number>,
    private loadDataService:LoadDataService) {
    const link = this.sessionStorageLink.getData(InternalDataService.KEY_SESSION_LINK);
    link != undefined ? this.activeLink.next(link) : this.activeLink.next("");

    const leagueId:number | null = this.sessionStorageLeague.getData(InternalDataService.KEY_SESSION_LEAGUE_ID);
    leagueId != null ? this.leagueSelected.next(this.loadDataService.loadLeagueById(leagueId)) : null;
  }

  private leagueSelected:BehaviorSubject<League | null> = new BehaviorSubject<League | null>(null);
  private currentLeagueSelected = this.leagueSelected.asObservable();

  private activeLink = new BehaviorSubject("");
  private currentLink = this.activeLink.asObservable();

  private loadingData:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLoading:Observable<boolean> = this.loadingData.asObservable();

  setLeagueSelected(league: League | null): void {
    if(league != this.leagueSelected.getValue()) {
      league != null ? this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, league.getLeagueId()) : 
        this.sessionStorageLeague.saveData(InternalDataService.KEY_SESSION_LEAGUE_ID, null);
      this.leagueSelected.next(league);
    }
  }  

  getLeagueSelected() : Observable<League | null> {
    return this.currentLeagueSelected;
  }

  setActiveLink(link_name:string) : void {
    this.sessionStorageLink.saveData(InternalDataService.KEY_SESSION_LINK, link_name);
    this.activeLink.next(link_name);
  }

  getActiveLink() : Observable<string> {
    return this.currentLink;
  }

  isLoadingData() : Observable<boolean> {
    return this.isLoading;
  }

  setLoadingData(isLoading:boolean) : void {
    this.loadingData.next(isLoading);
  }

  clearData() : void {
    
  }
}