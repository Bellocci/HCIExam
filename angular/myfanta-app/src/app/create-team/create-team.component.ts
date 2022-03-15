import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  value_input_text = '';
  input_visible:boolean = true;

  tab_selected = '';

  breakpoint:number = 0;

  cols_tabs: number = 0;
  rows_tabs: number = 0;

  cols_buttons: number = 0;
  rows_buttons: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = this.getInnerWidth() >= 480 ? 5 : 1;

    this.cols_tabs = this.getInnerWidth() >= 480 ? 3 : 1;
    this.rows_tabs = this.getInnerWidth() >= 480 ? 6 : 1;
  
    this.cols_buttons = this.getInnerWidth() >= 480 ? 2 : 1;
    this.rows_buttons = this.getInnerWidth() >= 480 ? 6 : 1;
  }

  getInnerWidth(): number {
    return window.innerWidth;
  }

  onResize() {
    this.breakpoint = this.getInnerWidth() >= 480 ? 5 : 1;

    this.cols_tabs = this.getInnerWidth() >= 480 ? 3 : 1;
    this.rows_tabs = this.getInnerWidth() >= 480 ? 6 : 1;
  
    this.cols_buttons = this.getInnerWidth() >= 480 ? 2 : 1;
    this.rows_buttons = this.getInnerWidth() >= 480 ? 6 : 1;
    
  }

  setTabSelected(textTab:string) {
    this.tab_selected = textTab;
  }

  setInputVisible(textTab:string) {
    if(textTab != 'Options') {
      this.input_visible = true;
    } else {
      this.input_visible = false;
    }
  }
}
