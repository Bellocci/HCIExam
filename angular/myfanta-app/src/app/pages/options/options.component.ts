import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';

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
export class OptionsComponent implements OnInit, AfterViewInit {

  constructor(private internalDataService:InternalDataService) { }  

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.internalDataService.setLoadingData(false);
  }


}