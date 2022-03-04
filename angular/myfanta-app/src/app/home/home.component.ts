import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  panelOpenState:boolean = false;

  // Share the value with parent
  @Output() childToParent = new EventEmitter<String>();

  ngOnInit(): void {
  }

  sendChampionshipSelected(name:string) {
    this.childToParent.emit(name);
  }
}
