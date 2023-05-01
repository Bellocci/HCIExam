import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

import { InternalDataService } from 'src/app/service/internal-data.service';

interface RangeOption {
  'value_min' : number,
  'value_max' : number
}

interface ValueOption {
  'old_value' : number,
  'new_value' : number
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  SINGLE_OPTIONS = [
    {
      'name' : 'Crediti',
      'default_value' : 500,
      'last_value' : 500,
      'max_value' : 1000,
      'min_value' : 25,
      'new_value' : 500,
    }
  ]

  MULTIPLE_OPTIONS = [
    {
      'name' : 'Età',
      'default_value_min' : 18,
      'last_value_min' : 18,
      'min_value' : 18,
      'new_value_min' : 18,
      'default_value_max' : 99,
      'last_value_max' : 99,
      'max_value' : 99,
      'new_value_max' : 99,
    }
  ]

  /* INIT VARIABLE */

  _range_age:RangeOption = {'value_min' : 0, 'value_max' : 0};
  _option_age_min:ValueOption = {'old_value' : 0, 'new_value' : 0};
  _option_age_max:ValueOption = {'old_value' : 0, 'new_value' : 0};

  constructor(private _internal_data:InternalDataService) { }

  ngOnInit(): void {
    this.setOptionsAge();
  }

  /* PRIVATE METHODS */

  private setOptionsAge() : void {
    this.subscribeMinAge();
    this.subscribeMaxAge();
    this.subscribeOldValueMinAge();
    this.subscribeOldValueMaxAge();
    this._option_age_min.new_value = this._option_age_min.old_value;
    this._option_age_max.new_value = this._option_age_max.old_value;
  }

  private subscribeMinAge() : void {
    this._internal_data.getMinAge().subscribe((age) => {
      this._range_age.value_min = age;
    })
  }

  private subscribeMaxAge() : void {
    this._internal_data.getMaxAge().subscribe((age) => {
      this._range_age.value_max = age;
    })
  }

  private subscribeOldValueMinAge() : void {
    this._internal_data.getLastValueMinAge().subscribe((old) => {
      this._option_age_min.old_value = old;
    })
  }

  private subscribeOldValueMaxAge() : void {
    this._internal_data.getLastValueMaxAge().subscribe((old) => {
      this._option_age_max.old_value = old;
    })
  }

  /* GETTER */

  getMinAge() : number {
    return this._range_age.value_min;
  }

  getMaxAge() : number {
    return this._range_age.value_max;
  }

  getValueMinAge() : number {
    return this._option_age_min.new_value;
  }

  getValueMaxAge() : number {
    return this._option_age_max.new_value;
  }

  /* SETTER */

  setNewValueMinAge(event : MatSliderChange) {
    if(event.value != undefined)
      this._option_age_min.new_value = event.value;
  }

  setNewValueMaxAge(event : MatSliderChange) {
    if(event.value != undefined)
      this._option_age_max.new_value = event.value;
  }

  /* METHODS */

  isSingleOptionCorrect(single_option : any) : boolean {
    return single_option.new_value >= single_option.min_value &&
      single_option.new_value <= single_option.max_value ? true : false;
  }

  isMultipleOptionMinValueCorrect(multiple_option : any) : boolean {
    return multiple_option.new_value_min >= multiple_option.min_value && 
      multiple_option.new_value_min <= multiple_option.new_value_max ? true : false;
  }

  isMultipleOptionMaxValueCorrect(multiple_option : any) : boolean {
    return multiple_option.new_value_max <= multiple_option.max_value &&
      multiple_option.new_value_max >= multiple_option.new_value_min ? true : false;
  }
}