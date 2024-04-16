import { Component, OnDestroy, OnInit } from '@angular/core';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { OptionVolleyballEntity } from 'src/model/options/optionVolleyballEntity.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { OptionsAbstract } from '../OptionsAbstract';
import { IdMatCard } from '../IdMatCardInterface';
import { Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { TeamEntity } from 'src/model/teamEntity.model';
import { RolePlayerSearchRequestService } from 'src/app/service/role-player-search-request.service';
import { RolePlayerEntity } from 'src/model/rolePlayerEntity.model';

@Component({
  selector: 'app-options-volleyball',
  templateUrl: './options-volleyball.component.html',
  styleUrls: ['./options-volleyball.component.scss']
})
export class OptionsVolleyballComponent extends OptionsAbstract implements OnInit, OnDestroy {

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
    id : "volleyballTeamsCard",
    description : "Squadre"
  }

  static readonly idBudgetForVolleyballRolesCard : IdMatCard = {
    id : "budgetForVolleyballRolesCard",
    description : "Budget per ruoli"
  }

  static readonly idVolleyballTeamOptionCard : IdMatCard = {
    id : "volleyballTeamOptionCard",
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

  private _option!: OptionVolleyballEntity;
  private _budgetAvailable!: number;  
  private _roles: RolePlayerEntity[];  

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
    console.log("Construct Advanced Option Volleyball component");

    super();
    this._roles = this.rolePlayerSearchRequest.bySport(SportEnum.VOLLEYBALL);

    let windowWidth:number = window.innerWidth;
    this.isMobileBreakpointActive = BreakpointsService.isMobileBreakpointActive(windowWidth);
    this.isMobileOrMobileXLBreakpointActive = BreakpointsService.isMobileOrMobileXLBreakpointActive(windowWidth);
    
    this._subscriptionMobileOrMobileXLBreakpointObservable = this.observeMobileOrMobileXLBreakpoint();
    this._subscriptionMobileBreakpointObservable = this.observeMobileBreakpoint();
  }  

  ngOnInit(): void { }

  ngOnDestroy(): void {
    console.log("Destroy Advanced Option Volleyball component");

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

  public get option(): OptionVolleyballEntity {
    return this._option;
  }
  
  public set option(value: OptionVolleyballEntity) {
    this._option = value;
  }

  public get budgetAvailable(): number {
    return this._budgetAvailable;
  }
  
  public set budgetAvailable(value: number) {
    this._budgetAvailable = value;
  }

  public get roles(): RolePlayerEntity[] {
    return this._roles;
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

  updateOptionStandard(option: OptionEntity): void {
    this._option.budget = option.budget
    this._option.minAge = option.minAge;
    this._option.maxAge = option.maxAge;
    this._option.playersToInclude = option.playersToInclude;
    this._option.playersToExclude = option.playersToExclude;
    this._option.teamsList = option.teamsList;
    this.updateBudgetAvailable();
    console.log(this._option);
  }

  updateBudgetAvailable() : void {
    this._budgetAvailable = this.option.budget - this.option.calculateTotalBudgetByRoles();
  }

  /*
   * ===============
   * METODI STATICI 
   * ===============
   */

  public static override getIds(): IdMatCard[] {
    return [
      this.idTeamsCard,
      this.idBudgetForVolleyballRolesCard,
      this.idVolleyballTeamOptionCard
    ];  
  }
}
