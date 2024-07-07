import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { OptionFootballSoccerEntity } from 'src/model/options/optionFootballSoccerEntity.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { IdMatCard } from '../IdMatCardInterface';
import { OptionsAbstract } from '../OptionsAbstract';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { Subscription } from 'rxjs';
import { RolePlayerSearchRequestService } from 'src/app/service/role-player-search-request.service';
import { RolePlayerEntity } from 'src/model/rolePlayerEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';


@Component({
  selector: 'app-options-football',
  templateUrl: './options-football.component.html',
  styleUrls: ['./options-football.component.scss']
})
export class OptionsFootballComponent extends OptionsAbstract implements OnInit, OnDestroy {

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

  static readonly idBudgetForFootballSoccerRoles: IdMatCard = {
    id: "budgetForFootballSoccerRolesCard",
    description: "Budget per ruoli"
  }

  static readonly idFootballSoccerTeamOption: IdMatCard = {
    id: "footballSoccerTeamOptionCard",
    description: "Caratteristiche squadra"
  }

  static readonly idTeamsCard: IdMatCard = {
    id : "teamsCard",
    description : "Squadre"
  }

  // Valori standard utilizzabili per il budget
  readonly SMALL_BUDGET:number = 200;
  readonly MIDDLE_BUDGET:number = 500;
  readonly BIG_BUDGET:number = 1000;

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  private _option!: OptionFootballSoccerEntity;
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

  constructor(private userService: UserService, 
    private breakpointsService:BreakpointsService,
    private rolePlayerSearchRequest:RolePlayerSearchRequestService) { 
      
    console.log("Construct Option Football component");
    
    super();    
    this._option = new OptionFootballSoccerEntity();
    this._roles = rolePlayerSearchRequest.bySport(SportEnum.FOOTBALL_SOCCER);

    let windowWidth:number = window.innerWidth;
    this.isMobileBreakpointActive = BreakpointsService.isMobileBreakpointActive(windowWidth);
    this.isMobileOrMobileXLBreakpointActive = BreakpointsService.isMobileOrMobileXLBreakpointActive(windowWidth);
    
    this._subscriptionMobileOrMobileXLBreakpointObservable = this.observeMobileOrMobileXLBreakpoint();
    this._subscriptionMobileBreakpointObservable = this.observeMobileBreakpoint();
  }  

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    console.log("Destroy Option Football component");
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

  public get option(): OptionFootballSoccerEntity {
    return this._option;
  }

  public set option(value: OptionFootballSoccerEntity) {
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

  public getRoleDescription(role:RolePlayerEntity) : String {
    return this.isMobileOrMobileXLBreakpointActive ? role.shortDescription : role.description;
  }

  /*
   * ===========
   * VISIBILITA 
   * ===========
   */

  isBudgetSelected(budget:number) : boolean {
    return this._option.budget == budget;
  }

  /**
   * =========
   * LISTENER 
   * =========
   */

  updateOptionStandard(option: OptionEntity): void {
    // FIXME
    /*
    this._option.budget = option.budget
    this._option.minAge = option.minAge;
    this._option.maxAge = option.maxAge;
    this._option.playersToInclude = option.playersToInclude;
    this._option.playersToExclude = option.playersToExclude;
    this._option.teamsList = option.teamsList;
    this.updateBudgetAvailable();
    console.log(this._option);
    */
  }

  updateBudgetAvailable(): void {
    this._budgetAvailable = this.option.budget - this.option.calculateTotalBudgetByRoles();
  }

  updateSelectedTeamsList(team: TeamEntity) : void {
    // TODO: da implementare
  }

  clearTeams() : void {
    // TODO: da implementare
  }

  // METODI STATICI

  /**
   * Metodo che restituisce una lista implementata in modo hardcoded
   * degli id di ciascuna mat-card
   *  
   * @returns ids
   */
  public static override getIds(): IdMatCard[] {
    return [
      OptionsFootballComponent.idTeamsCard,
      OptionsFootballComponent.idBudgetForFootballSoccerRoles,
      OptionsFootballComponent.idFootballSoccerTeamOption
    ]
  }

}
