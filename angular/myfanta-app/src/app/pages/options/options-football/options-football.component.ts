import { Component } from '@angular/core';

@Component({
  selector: 'app-options-football',
  templateUrl: './options-football.component.html',
  styleUrls: ['../options.component.css']
})
export class OptionsFootballComponent {

  private _budget: number = 0;

  // GETTER & SETTER
  
  public get budget(): number {
    return this._budget;
  }

  public set budget(value: number) {
    this._budget = value;
  }
}
