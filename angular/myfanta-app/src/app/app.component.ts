import { Component, OnDestroy } from '@angular/core';
import { SessionStorageService } from './service/session-storage.service';
import { Observable, Subscription } from 'rxjs';
import { InternalDataService } from './service/internal-data.service';
import { SnackBarService } from './service/snack-bar.service';
import { BreakpointsService } from './service/breakpoints.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { LeagueEntity } from 'src/model/leagueEntity.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'myfanta-app';

  /*
   * ==========
   * VARIABILI
   * ==========
   */

  private _isLeagueSelected: boolean = false;
  private _subscriptionLeagueSelectedObservable: Subscription | undefined;

  private _isMobileOrTabletBreakpointActive: boolean = false;
  private _subscriptionToMobileOrTabletBreakpointObservable: Subscription;

  /**
   * ========================
   * CONSTRUCTOR & DESTROYER
   * ========================
   */

  constructor(private sessionService: SessionStorageService,
    private internalDataService: InternalDataService,
    private snackbarService: SnackBarService,
    private breakpointsService: BreakpointsService) {

    console.log("Construct FantasyTeam app component");
    
    this._subscriptionLeagueSelectedObservable = this.observeLeagueSelected();
    this.isMobileOrTabletBreakpointActive = BreakpointsService.isMobileOrTabletBreakpointActive(window.innerWidth);
    this._subscriptionToMobileOrTabletBreakpointObservable = this.observeMobileOrTabletBreakpoint();
  }

  public ngOnDestroy(): void {
    console.log("Destroy the app");

    this._subscriptionLeagueSelectedObservable != undefined ? this._subscriptionLeagueSelectedObservable.unsubscribe() : undefined;
    this._subscriptionToMobileOrTabletBreakpointObservable.unsubscribe();
    this.sessionService.clearData();
  }

  /*
   * =========
   * OBSERVER
   * =========
   */

  private observeLeagueSelected() : Subscription | undefined {
    return this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
      .next((league : LeagueEntity | null) => this.isLeagueSelected = league != undefined)
      .error((error : any) => console.error("Error while retriving league selected: " + error))
      .complete( () => console.log("League selected observer completed"))
      .build()
    );
  }

  private observeMobileOrTabletBreakpoint(): Subscription {
    return this.breakpointsService.mobileOrTabletObservable
      .subscribe(new ObserverStepBuilder<boolean>()
        .next((isActive: boolean) => this.isMobileOrTabletBreakpointActive = isActive)
        .error((error: any) => console.error("Error to get mobile breakpoint: " + error))
        .complete(() => console.log("Mobile breakpoint observer completed"))
        .build());
  }

  getLoadingDataObservable(): Observable<boolean> {
    return this.internalDataService.getLoadingDataObservable();
  }

  isSnackBarVisibleObservable(): Observable<boolean> {
    return this.snackbarService.getSnackBarVisibleObservable();
  }

  /*
  * ================
  * GETTER & SETTER 
  * ================
  */

  public get isLeagueSelected(): boolean {
    return this._isLeagueSelected;
  }

  private set isLeagueSelected(value: boolean) {
    this._isLeagueSelected = value;
  }

  public get isMobileOrTabletBreakpointActive(): boolean {
    return this._isMobileOrTabletBreakpointActive;
  }

  private set isMobileOrTabletBreakpointActive(value: boolean) {
    this._isMobileOrTabletBreakpointActive = value;
  }
}