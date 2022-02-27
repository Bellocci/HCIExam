import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }
  sidenavStatus:boolean = false;

  ngOnInit(): void {
  }

  toggleMenu() {
    this.sidenavStatus = !this.sidenavStatus;
  }
}
