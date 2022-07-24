import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from './table.component';
import { InternalDimensionService } from '../service/internal-dimension.service';
import { of } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let internal_dim_service:InternalDimensionService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        HttpClientTestingModule
      ],
      providers: [
        InternalDimensionService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    internal_dim_service = TestBed.inject(InternalDimensionService);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('testing subscribe method into getTableHeight is getting called', fakeAsync(() => {
      let spy_height = spyOn(internal_dim_service, 'getTableHeight').and.returnValue(of(''));
      let spy_sub = spyOn(internal_dim_service.getTableHeight(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(spy_height).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call getTableHeight and get response a string', fakeAsync(() => {
      let height:string = "400";
      let spy_height = spyOn(internal_dim_service, "getTableHeight").and.returnValue(of(height));

      component.ngOnInit();
      tick();

      expect(spy_height).toHaveBeenCalled();
      expect(component.height).toBe(height);
    }));

    it('should call getTableHeight and get response a string that contains only digit', fakeAsync(() => {
      let height:string = "400";
      let spy_height = spyOn(internal_dim_service, "getTableHeight").and.returnValue(of(height));

      component.ngOnInit();
      tick();

      expect(spy_height).toHaveBeenCalled();
      expect(component.height).toMatch('^[0-9]*$');
    }));

    it('should call getTableHeight and if get a string that not contains only digit set default value', fakeAsync(() => {
      let height:string = "400px";
      let spy_height = spyOn(internal_dim_service, "getTableHeight").and.returnValue(of(height));

      component.ngOnInit();
      tick();

      expect(spy_height).toHaveBeenCalled();
      expect(component.height).toBe(component.getDefaultHeight());
    }));

    it('testing subscribe method into getTableWidth is getting called', fakeAsync(() => {
      let spy_width = spyOn(internal_dim_service, 'getTableWidth').and.returnValue(of(''));
      let spy_sub = spyOn(internal_dim_service.getTableWidth(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(spy_width).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call getTableWidth and get response a string', fakeAsync(() => {
      let width:string = "400";
      let spy_width = spyOn(internal_dim_service, "getTableWidth").and.returnValue(of(width));

      component.ngOnInit();
      tick();

      expect(spy_width).toHaveBeenCalled();
      expect(component.width).toBe(width);
    }));

    it('should call getTableWidth and if get a string that not contains only digit set default value', fakeAsync(() => {
      let width:string = "400px";
      let spy_width = spyOn(internal_dim_service, "getTableWidth").and.returnValue(of(width));

      component.ngOnInit();
      tick();

      expect(spy_width).toHaveBeenCalled();
      expect(component.width).toBe(component.getDefaultWidth());
    }));

  });
});
