import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InternalDataService } from 'src/app/internal-data.service';
import { InternalDimensionService } from 'src/app/internal-dimension.service';
import { TableComponent } from '../table.component';

@Component({
  selector: 'app-table-blacklist',
  templateUrl: '../table.component.html',
  styleUrls: ['../table.component.css']
})
export class TableBlacklistComponent extends TableComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private internal_dimension_service:InternalDimensionService,
    private internal_data_service:InternalDataService) 
  {
    super(internal_dimension_service);
  }

  ngAfterViewInit(): void {
    this.internal_data_service.getBlacklistPlayers().subscribe(blacklist => {
      this.dataSource = new MatTableDataSource(blacklist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
