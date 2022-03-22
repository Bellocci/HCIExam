import { Component, OnInit } from '@angular/core';
import { InternalDataService } from 'src/app/internal-data.service';
import { SharedService } from 'src/app/shared.service';
import { ToolbarComponent } from '../toolbar.component';

@Component({
  selector: 'app-toolbar-mobile',
  templateUrl: './toolbar-mobile.component.html',
  styleUrls: ['./toolbar-mobile.component.css']
})
export class ToolbarMobileComponent extends ToolbarComponent implements OnInit {

  constructor(private shared:SharedService, private data_service: InternalDataService) {
    super(shared, data_service);
   }

}
