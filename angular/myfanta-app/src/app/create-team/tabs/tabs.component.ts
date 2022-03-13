import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { InternalDimensionService } from 'src/app/internal-dimension.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Output() tab_selected = new EventEmitter<string>();
  @ViewChild('tab_group') private tab_group!:MatTabGroup;

  constructor(private internal_dimension:InternalDimensionService) { }


  ngOnInit(): void {
    let height = 350;
    this.internal_dimension.setTableHeight(height);
    this.internal_dimension.setOptionsHeight(height);

    let width = 450;
    this.internal_dimension.setTableWidth(width);
    this.internal_dimension.setOptionsWidth(width);
  }

  ngAfterViewInit():void {
    this.tab_selected.emit(this.tab_group._tabs.first.textLabel);
  }

  tabClick(event:any) {
    this.tab_selected.emit(event.tab.textLabel)
  }
}
