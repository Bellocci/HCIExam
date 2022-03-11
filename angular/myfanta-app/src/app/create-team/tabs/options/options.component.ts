import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InternalService } from 'src/app/internal.service';

import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface Option {
  old_value: string,
  new_value: string
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  height:string = '0';
  width:string = '0';
  subscrip_height:Subscription = new Subscription;
  subscrip_width:Subscription = new Subscription;

  optionsForm!:FormGroup;

  options = new Map<string, Option>();

  constructor(private internal:InternalService) { }

  ngOnInit(): void {
    this.subscrip_height = this.internal.current_table_height.subscribe(message => this.height = message);
    this.subscrip_width = this.internal.current_table_width.subscribe(message => this.width = message);

    this.optionsForm = new FormGroup({
      budget : new FormControl('', [Validators.min(1)]),
      match : new FormControl('', [Validators.min(0)]),
      minAge : new FormControl('', [Validators.min(18)]),
      maxAge : new FormControl('', [Validators.max(99), Validators.min(18)])
    });

    this.options.set("Budget", {
      old_value: '',
      new_value: ''
    });

    this.options.set("Average match played", {
      old_value: '',
      new_value: ''
    })

    this.options.set("Minimun age", {
      old_value: '',
      new_value: ''
    })

    this.options.set("Maximun age", {
      old_value: '',
      new_value: ''
    })
  }

  getOldValue(field:string):string {
    for(let o of this.options) {
      if(o[0] == field) {
        return o[1].old_value;
      }
    }
    return '';
  }

  getNewValue(field:string):string {
    for(let o of this.options) {
      if(o[0] == field) {
        return o[1].new_value;
      }
    }
    return '';
  }

  changeValue(event:any) {
    console.log(event);
    for(let o of this.options) {
      if(o[0] == event.target.title) {
        o[1].new_value = event.target.value;
      }
    }
  }

  checkValidity(field:string) {
    if(this.optionsForm.get(field)?.invalid) {
      return false;
    }
    return true;
  }

  getErrorBudgetMessage():string {
    return this.optionsForm.get('budget')?.hasError('min') ? 'Budget must be greater than zero' : '';
  }

  getErrorMatchMessage():string {
    return this.optionsForm.get('match')?.hasError('min') ? 'Average match must not be negative' : '';
  }

  getErrorMinAgeMessage():string {
    return this.optionsForm.get('minAge')?.hasError('min') ? 'Age must be greater than 18' : '';
  }

  getErrorMaxAgeMessage():string {
    if(this.optionsForm.get('maxAge')?.hasError('min'))
      return 'Age must be greater than 18';
    return this.optionsForm.get('maxAge')?.hasError('max') ? 'Age must be smaller than 99' : '';
  }
}