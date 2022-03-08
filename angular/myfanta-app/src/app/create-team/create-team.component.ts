import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  value_input_text = '';

  breakpoint:number = 0;

  cols_tabs: number = 0;
  rows_tabs: number = 0;

  cols_buttons: number = 0;
  rows_buttons: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = window.innerWidth >= 480 ? 5 : 1;

    this.cols_tabs = window.innerWidth >= 480 ? 3 : 1;
    this.rows_tabs = window.innerWidth >= 480 ? 6 : 1;
  
    this.cols_buttons = window.innerWidth >= 480 ? 2 : 1;
    this.rows_buttons = window.innerWidth >= 480 ? 2 : 1;
  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth >= 480) ? 5 : 1;

    this.cols_tabs = (event.target.innerWidth >= 480) ? 3 : 1;
    this.rows_tabs = (event.target.innerWidth >= 480) ? 6 : 1;
  
    this.cols_buttons = (event.target.innerWidth >= 480) ? 2 : 1;
    this.rows_buttons = (event.target.innerWidth >= 480) ? 2 : 1;
  }

}
