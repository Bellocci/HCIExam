import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionsVolleyballEntity } from 'src/model/options/OptionsVolleyballEntity.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { OptionsAbstract } from '../OptionsAbstract';
import { IdMatCard } from '../IdMatCardInterface';

@Component({
  selector: 'app-options-volleyball',
  templateUrl: './options-volleyball.component.html',
  styleUrls: ['../options.component.scss']
})
export class OptionsVolleyballComponent extends OptionsAbstract implements OnInit {

  //
  // ID MAT CARD
  //

  /**
   * Lista hardcoded contenente gli id delle singole mat-card.
   * Ogni volta che si aggiunge una nuova mat-card il nuovo id
   * deve essere aggiunto alla lista 
  */

  static readonly idBudgetForVolleyballRolesCard : IdMatCard = {
    id : "budgetForVolleyballRolesCard",
    description : "Budget per ruoli"
  }

  static readonly idVolleyballTeamOptionCard : IdMatCard = {
    id : "volleyballTeamOptionCard",
    description : "Caratteristiche squadra"
  }

  //
  // FINE SEZIONE ID MAT CARD
  //

  private _option!: OptionsVolleyballEntity;
  private _budgetAvailable!: number;  

  constructor(private userService: UserService) { 
    super();
  }

  ngOnInit(): void {
    this.addSelectedUserTeamObserver();
  }

  // METODI PRIVATI

  private addSelectedUserTeamObserver(): void {
    this.userService.addSelectedTeamObserver(new ObserverStepBuilder<UserTeamEntity | undefined>()
      .next(userTeam => {
        if (userTeam != undefined && userTeam.option != null && userTeam.option.sport == SportEnum.VOLLEYBALL) {
          this._option = userTeam.option as OptionsVolleyballEntity;
        } else {
          this._option = new OptionsVolleyballEntity();
        }
        this.updateBudgetAvailable();
      })
      .build())
  }

  // GETTER & SETTER

  public get option(): OptionsVolleyballEntity {
    return this._option;
  }
  
  public set option(value: OptionsVolleyballEntity) {
    this._option = value;
  }

  public get budgetAvailable(): number {
    return this._budgetAvailable;
  }
  
  public set budgetAvailable(value: number) {
    this._budgetAvailable = value;
  }

  // LISTENER

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

  // STATICI

  public static override getIds(): IdMatCard[] {
    return [
      this.idBudgetForVolleyballRolesCard,
      this.idVolleyballTeamOptionCard
    ];  
  }
}
