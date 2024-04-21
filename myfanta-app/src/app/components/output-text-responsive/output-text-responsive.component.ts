import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output-text-responsive',
  templateUrl: './output-text-responsive.component.html',
  styleUrls: ['./output-text-responsive.component.scss']
})
export class OutputTextResponsiveComponent {

  @Input() 
  value: string = '';  

  constructor() { }
}
