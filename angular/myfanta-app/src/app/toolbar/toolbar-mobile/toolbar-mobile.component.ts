import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InternalDataService } from 'src/app/internal-data.service';
import { SharedService } from 'src/app/shared.service';
import { ToolbarComponent } from '../toolbar.component';

@Component({
  selector: 'app-toolbar-mobile',
  templateUrl: './toolbar-mobile.component.html',
  styleUrls: ['./toolbar-mobile.component.css']
})
export class ToolbarMobileComponent extends ToolbarComponent implements OnInit {

  @Output() sidenav_emit = new EventEmitter();

  constructor(private shared:SharedService, private data_service: InternalDataService) {
    super(shared, data_service);
  }

  openSidenavFromChild() {
    this.sidenav_emit.emit();
  }
}
