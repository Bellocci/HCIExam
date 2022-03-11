import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { InternalService } from 'src/app/internal.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Output() tab_selected = new EventEmitter<string>();
  @ViewChild('tab_group') private tab_group!:MatTabGroup;

  constructor(private internal:InternalService) { }


  ngOnInit(): void {
    let height = 350;
    this.internal.setTableHeight(height);
    this.internal.setOptionsHeight(height);

    let width = 450;
    this.internal.setTableWidth(width);
    this.internal.setOptionsWidth(width);
  }

  ngAfterViewInit():void {
    this.tab_selected.emit(this.tab_group._tabs.first.textLabel);
  }

  tabClick(event:any) {
    this.tab_selected.emit(event.tab.textLabel)
  }
}
