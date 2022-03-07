import { Component, Input, OnInit } from '@angular/core';
import { InternalService } from 'src/app/internal.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() height_table:number = 0;

  constructor(private internal:InternalService) { }

  ngOnInit(): void {
    let height = 350;
    this.internal.setTableHeight(height);
  }

}
