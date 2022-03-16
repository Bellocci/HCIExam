import { AfterViewInit, Component } from '@angular/core';

import { InternalDimensionService } from 'src/app/internal-dimension.service';
import { TableComponent } from '../table.component';

@Component({
  selector: 'app-table-empty',
  templateUrl: '../table.component.html',
  styleUrls: ['../table.component.css'],
  
})
export class TableEmptyComponent extends TableComponent implements AfterViewInit {

  constructor(private internal_dimension_service:InternalDimensionService) {
    super(internal_dimension_service);
  }

}


