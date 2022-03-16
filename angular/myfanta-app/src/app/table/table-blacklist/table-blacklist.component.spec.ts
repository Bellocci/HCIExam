import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { InternalDimensionService } from 'src/app/internal-dimension.service';
import { of } from 'rxjs';

import { TableBlacklistComponent } from './table-blacklist.component';
import { InternalDataService } from 'src/app/internal-data.service';
import { MatTableDataSource } from '@angular/material/table';

const BLACKLIST_PLAYERS = [
  {
    playerId : 1,
    playerName : 'Musso',
    team : 1,
    cost : 12,
    role : 'P',
    age : 27,
    matchPlayed : 24,
  },
  {
    playerId : 2,
    playerName : 'Toloi',
    team : 1,
    cost : 8,
    role : 'D',
    age : 31,
    matchPlayed : 16,
  }
];

describe('TableBlacklistComponent', () => {
  let component: TableBlacklistComponent;
  let fixture: ComponentFixture<TableBlacklistComponent>;
  let internal_dimension: InternalDimensionService;
  let internal_data: InternalDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBlacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBlacklistComponent);
    component = fixture.componentInstance;
    internal_dimension = TestBed.inject(InternalDimensionService);
    internal_data = TestBed.inject(InternalDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('testing subscribe method into getTableHeight is getting called', fakeAsync(() => {
      let spy_height = spyOn(internal_dimension, 'getTableHeight').and.returnValue(of(''));
      let spy_sub = spyOn(internal_dimension.getTableHeight(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(spy_height).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call getTableHeight and get response a string', fakeAsync(() => {
      let height:string = "400";
      let spy_height = spyOn(internal_dimension, "getTableHeight").and.returnValue(of(height));

      component.ngOnInit();
      tick();

      expect(spy_height).toHaveBeenCalled();
      expect(component.height).toBe(height);
    }));

    it('should call getTableHeight and get response a string that contains only digit', fakeAsync(() => {
      let height:string = "400";
      let spy_height = spyOn(internal_dimension, "getTableHeight").and.returnValue(of(height));

      component.ngOnInit();
      tick();

      expect(spy_height).toHaveBeenCalled();
      expect(component.height).toMatch('^[0-9]*$');
    }));

    it('should call getTableHeight and if get a string that not contains only digit set default value', fakeAsync(() => {
      let height:string = "400px";
      let spy_height = spyOn(internal_dimension, "getTableHeight").and.returnValue(of(height));

      component.ngOnInit();
      tick();

      expect(spy_height).toHaveBeenCalled();
      expect(component.height).toBe(component.getDefaultHeight());
    }));

    it('testing subscribe method into getTableWidth is getting called', fakeAsync(() => {
      let spy_width = spyOn(internal_dimension, 'getTableWidth').and.returnValue(of(''));
      let spy_sub = spyOn(internal_dimension.getTableWidth(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(spy_width).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call getTableWidth and get response a string', fakeAsync(() => {
      let width:string = "400";
      let spy_width = spyOn(internal_dimension, "getTableWidth").and.returnValue(of(width));

      component.ngOnInit();
      tick();

      expect(spy_width).toHaveBeenCalled();
      expect(component.width).toBe(width);
    }));

    it('should call getTableWidth and if get a string that not contains only digit set default value', fakeAsync(() => {
      let width:string = "400px";
      let spy_width = spyOn(internal_dimension, "getTableWidth").and.returnValue(of(width));

      component.ngOnInit();
      tick();

      expect(spy_width).toHaveBeenCalled();
      expect(component.width).toBe(component.getDefaultWidth());
    }));

  });

  describe('ngAfterViewInit', () => {
    it('testing subscribe method from internal_data.getBlacklistPlayers is getting called', fakeAsync(() => {
      let spy_blacklist = spyOn(internal_data, "getBlacklistPlayers").and.returnValue(of([]));
      let spy_sub = spyOn(internal_data.getBlacklistPlayers(), "subscribe");

      component.ngAfterViewInit();

      expect(spy_blacklist).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should set property dataSource.data with array', fakeAsync(() => {
      let spy_blacklist = spyOn(internal_data, "getBlacklistPlayers").and.returnValue(of(BLACKLIST_PLAYERS));

      component.ngAfterViewInit();

      expect(spy_blacklist).toHaveBeenCalled();
      expect(component.dataSource.data).toEqual(BLACKLIST_PLAYERS);
    }));
  });
});
