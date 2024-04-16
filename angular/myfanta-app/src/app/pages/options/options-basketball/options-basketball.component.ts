import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdMatCard } from '../IdMatCardInterface';
import { RolePlayerEntity } from 'src/model/rolePlayerEntity.model';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { RolePlayerSearchRequestService } from 'src/app/service/role-player-search-request.service';
import { OptionsAbstract } from '../OptionsAbstract';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { SportEnum } from 'src/enum/SportEnum.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { TeamEntity } from 'src/model/teamEntity.model';

@Component({
  selector: 'app-options-basketball',
  templateUrl: './options-basketball.component.html',
  styleUrls: ['./options-basketball.component.scss']
})
export class OptionsBasketballComponent extends OptionsAbstract implements OnInit, OnDestroy {  

  /*
   * ===================
   * VARIABILI STATICHE 
   * ===================
   */

  /*
   * Lista hardcoded contenente gli id delle singole mat-card.
   * Ogni volta che si aggiunge una nuova mat-card il nuovo id
   * deve essere aggiunto alla lista 
  */

  static readonly idTeamsCard: IdMatCard = {
    id : "basketballTeamsCard",
    description : "Squadre"
  }

  static readonly idBudgetForBasketballRolesCard : IdMatCard = {
    id : "budgetForBasketballRolesCard",
    description : "Budget per ruoli"
  }

  static readonly idBasketballTeamOptionCard : IdMatCard = {
    id : "basketballTeamOptionCard",
    description : "Caratteristiche squadra"
  }

  // Valori standard utilizzabili per il budget
  readonly SMALL_BUDGET:number = 100;
  readonly MIDDLE_BUDGET:number = 250;
  readonly BIG_BUDGET:number = 500;

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private _option!: OptionEntity;
  private _budgetAvailable!: number;  
  private _roles: RolePlayerEntity[] = [];    

  private _isMobileOrMobileXLBreakpointActive: boolean = false;    
  private _subscriptionMobileOrMobileXLBreakpointObservable:Subscription;

  private _isMobileBreakpointActive: boolean = false;    
  private _subscriptionMobileBreakpointObservable:Subscription;

  /*
   * ============================
   * CONSTRUCTOR, INIT & DESTROY
   * ============================
   */

  constructor(private breakpointsService:BreakpointsService,
    private rolePlayerSearchRequest:RolePlayerSearchRequestService) { 
    console.log("Construct Advanced Option Basketball component");

    super();
    this.roles = this.rolePlayerSearchRequest.bySport(SportEnum.BASKETBALL);
    
    let windowWidth:number = window.innerWidth;
    this.isMobileBreakpointActive = BreakpointsService.isMobileBreakpointActive(windowWidth);
    this.isMobileOrMobileXLBreakpointActive = BreakpointsService.isMobileOrMobileXLBreakpointActive(windowWidth);

    this._subscriptionMobileOrMobileXLBreakpointObservable = this.observeMobileOrMobileXLBreakpoint();
    this._subscriptionMobileBreakpointObservable = this.observeMobileBreakpoint();
  }  

  ngOnInit(): void { }

  ngOnDestroy(): void {
    console.log("Destroy Advanced Option Basketball component");

    this._subscriptionMobileOrMobileXLBreakpointObservable.unsubscribe();
    this._subscriptionMobileBreakpointObservable.unsubscribe();
  }

   /*
   * =========
   * OBSERVER 
   * =========
   */

   private observeMobileOrMobileXLBreakpoint() : Subscription {
    return this.breakpointsService.mobileOrMobileXLObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(isActive => this.isMobileOrMobileXLBreakpointActive = isActive)
        .error(err => console.log("Error while retriving mobileOrMobileXLBreakpoint : " + err))
        .build()
    );
  }

  private observeMobileBreakpoint() : Subscription {
    return this.breakpointsService.mobileObservable.subscribe(
      new ObserverStepBuilder<boolean>()
        .next(isActive => this.isMobileBreakpointActive = isActive)
        .error(err => console.log("Error while retriving mobileBreakpoint : " + err))
        .build()
    );
  }

  /*
   * ================
   * GETTER & SETTER  
   * ================
   */

  public get isMobileOrMobileXLBreakpointActive(): boolean {
    return this._isMobileOrMobileXLBreakpointActive;
  }

  private set isMobileOrMobileXLBreakpointActive(value: boolean) {
    this._isMobileOrMobileXLBreakpointActive = value;
  }

  public get isMobileBreakpointActive(): boolean {
    return this._isMobileBreakpointActive;
  }

  private set isMobileBreakpointActive(value: boolean) {
    this._isMobileBreakpointActive = value;
  }

  public get roles(): RolePlayerEntity[] {
    return this._roles;
  }

  private set roles(value: RolePlayerEntity[]) {
    this._roles = value;
  }
  
  public getRoleDescription(role:RolePlayerEntity) : String {
    return this.isMobileOrMobileXLBreakpointActive ? role.shortDescription : role.description;
  }

  /*
   * =========
   * LISTENER
   * =========
   */

  updateSelectedTeamsList(team: TeamEntity) : void {
    // TODO: da implementare
  }

  clearTeams() : void {
    // TODO: da implementare
  }

  override updateOptionStandard(option: OptionEntity): void {
    // TODO: da implementare
  }  

  /*
    * ===============
    * METODI STATICI 
    * ===============
    */

  public static override getIds(): IdMatCard[] {
    return [
      this.idTeamsCard,
      this.idBudgetForBasketballRolesCard,
      this.idBasketballTeamOptionCard,
    ];  
  }
}
