import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { OptionFootballSoccerEntity } from 'src/model/options/optionFootballSoccerEntity.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { IdMatCard } from '../IdMatCardInterface';
import { OptionsAbstract } from '../OptionsAbstract';


@Component({
  selector: 'app-options-football',
  templateUrl: './options-football.component.html',
  styleUrls: ['../options.component.scss']
})
export class OptionsFootballComponent extends OptionsAbstract implements OnInit {

  //
  // ID MAT CARD
  //

  /**
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

  //
  // FINE SEZIONE ID MAT CARD
  //

  private _option!: OptionFootballSoccerEntity;
  private _budgetAvailable!: number;

  constructor(private userService: UserService) { 
    super();
  }


  ngOnInit(): void {
    this.addSelectedUserTeamObserver();
  }

  // PRIVATE

  private addSelectedUserTeamObserver(): void {
    this.userService.addSelectedTeamObserver(new ObserverStepBuilder<UserTeamEntity | undefined>()
      .next(userTeam => {
        if (userTeam != undefined && userTeam.option != null && userTeam.option.sport == SportEnum.FOOTBALL_SOCCER) {
          this._option = userTeam.option as OptionFootballSoccerEntity;
        } else {
          this._option = new OptionFootballSoccerEntity();
        }
        this.updateBudgetAvailable();
      })
      .build())
  }

  // GETTER & SETTER

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

  updateBudgetAvailable(): void {
    this._budgetAvailable = this.option.budget - this.option.calculateTotalBudgetByRoles();
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
      OptionsFootballComponent.idBudgetForFootballSoccerRoles,
      OptionsFootballComponent.idFootballSoccerTeamOption
    ]
  }

}
