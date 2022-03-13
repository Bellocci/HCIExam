import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { InternalDimensionService } from 'src/app/internal-dimension.service';

export interface Option {
  min_value: number,
  max_value: number,
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

  formErrors:any = {
    'Budget' : "",
    'MinimunMatchPlayed' : "",
    'MaximunMatchPlayed' : "",
    'Match' : "",
    'MinimunAgePlayer' : "",
    'MaximunAgePlayer' : "",
    'Age' : ""
  }

  validationMessages:any = {
    'Budget' : {
      'min' : 'Value must be greater than 1'
    },
    'MinimunMatchPlayed' : {
      'min' : 'Min must be greater than 0',
      'max' : 'Min must be less than 40'
    },
    'MaximunMatchPlayed' : {
      'min' : 'Max must be greater than 0',
      'max' : 'Max must be less than 40'
    },
    'Match' : {
      'minGreaterMax' : 'Maximun must be greater than minimun'
    },
    'MinimunAgePlayer' : {
      'min' : 'Min must be greater than 18',
      'max' : 'Min must be less than 40'
    },
    'MaximunAgePlayer' : {
      'min' : 'Max must be greater than 18',
      'max' : 'Max must be less than 40'
    },
    'Age' : {
      'minGreaterMax' : 'Maximun must be greater than minimun'
    }
  }

  optionsBuilder!:FormGroup;

  options = new Map<string, Option>();

  constructor(private internal_dimension:InternalDimensionService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.subscrip_height = this.internal_dimension.current_table_height.subscribe(message => this.height = message);
    this.subscrip_width = this.internal_dimension.current_table_width.subscribe(message => this.width = message);

    this.options.set("Budget", {
      min_value: 1,
      max_value: 10000,
      old_value: '',
      new_value: ''
    });

    this.options.set("Minimun match played", {
      min_value: 0,
      max_value: 40,
      old_value: '',
      new_value: ''
    })

    this.options.set("Maximun match played", {
      min_value: 0,
      max_value: 40,
      old_value: '',
      new_value: ''
    })

    this.options.set("Minimun age player", {
      min_value: 18,
      max_value: 40,
      old_value: '',
      new_value: ''
    })

    this.options.set("Maximun age player", {
      min_value: 18,
      max_value: 40,
      old_value: '',
      new_value: ''
    })

    this.optionsBuilder = this.fb.group ({
      Budget : ['', [Validators.min(1), Validators.max(10000)]],
      Match : this.fb.group({
        MinimunMatchPlayed : ['', [Validators.min(0), Validators.max(40)]],
        MaximunMatchPlayed : ['', [Validators.min(0), Validators.max(40)]]
      }, { validator : maxGreaterOrEqualThanMin('MinimunMatchPlayed', 'MaximunMatchPlayed')}),
      Age : this.fb.group ({
        MinimunAgePlayer : ['', [Validators.min(18), Validators.max(40)]],
        MaximunAgePlayer : ['', [Validators.min(18), Validators.max(40)]]
      }, { validator : maxGreaterOrEqualThanMin('MinimunAgePlayer', 'MaximunAgePlayer')})
    });

    this.optionsBuilder.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.optionsBuilder);
    });
  }

  valueChanged(field:string):boolean {
    for(let option of this.options) {
      if(option[0] == field) {
        if(option[1].old_value != option[1].new_value)
          return true;
        return false;
      }
    }
    return false;
  }

  setNewValue(event:any) {
    console.log(event);
    for(let option of this.options) {
      if(option[0] == event.target.title) {
        option[1].new_value = event.target.value;
      }
    }
  }

  logValidationErrors(group: FormGroup = this.optionsBuilder): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // Loop through nested form groups and form controls to check
      // for validation errors. For the form groups and form controls
      // that have failed validation, retrieve the corresponding
      // validation message from validationMessages object and store
      // it in the formErrors object. The UI binds to the formErrors
      // object properties to display the validation errors.
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
  
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }
}

function maxGreaterOrEqualThanMin(field1:string, field2:string) : ValidatorFn {
  return (group: AbstractControl) : {[key : string] : any} | null => {
    const minControl = group.get(field1);
    const maxControl = group.get(field2);
  
    if(minControl?.value > maxControl?.value) {
      return {'minGreaterMax' : true};
    }
    return null;
  }
}