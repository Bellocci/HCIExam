import { OnInit, Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { InternalDimensionService } from '../internal-dimension.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {

  columnsToDisplay = ['Name', 'Team', 'Cost'];
  dataSource!:MatTableDataSource<any>;
  expandedElement!: any | null;

  height:string = '0';
  width:string = '0';
  private _default_height:number = 200;
  private _default_width:number = 200;

  subscrip_height:Subscription = new Subscription;
  subscrip_width:Subscription = new Subscription;

  constructor(private internal_dimension:InternalDimensionService) {
  }

  ngOnInit(): void {
    this.getTableHeight();
    this.getTableWidth();
  }

  ngOnDestroy() {
    if(this.subscrip_height) {
      this.subscrip_height.unsubscribe();
    }
    if(this.subscrip_width) {
      this.subscrip_width.unsubscribe();
    }
  }

  getDefaultHeight():string {
    return this._default_height.toString();
  }

  getDefaultWidth():string {
    return this._default_width.toString();
  }

  getTableHeight() {
    this.subscrip_height = this.internal_dimension.getTableHeight().subscribe(height => {
      if(!height.match('^[0-9]*$'))
        this.height = this.getDefaultHeight();
      else
        this.height = height;
    });
  }

  getTableWidth() {
    this.subscrip_width = this.internal_dimension.getTableWidth().subscribe(width => {
      if(!width.match('^[0-9]*$'))
        this.width = this.getDefaultWidth();
      else
        this.width = width;
    })
  }
}