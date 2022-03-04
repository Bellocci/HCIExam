import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  breakpoint:number = 0;

  cols_tabs: number = 0;
  rows_tabs: number = 0;

  cols_buttons: number = 0;
  rows_buttons: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = window.innerWidth >= 480 ? 4 : 1;

    this.cols_tabs = window.innerWidth >= 480 ? 3 : 1;
    this.rows_tabs = window.innerWidth >= 480 ? 6 : 4;
  
    this.cols_buttons = window.innerWidth >= 480 ? 1 : 1;
    this.rows_buttons = window.innerWidth >= 480 ? 6 : 4;
  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth >= 480) ? 4 : 1;

    this.cols_tabs = (event.target.innerWidth >= 480) ? 3 : 1;
    this.rows_tabs = (event.target.innerWidth >= 480) ? 6 : 4;
  
    this.cols_buttons = (event.target.innerWidth >= 480) ? 1 : 1;
    this.rows_buttons = (event.target.innerWidth >= 480) ? 6 : 4;
  }

}
