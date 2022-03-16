import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';

import { InternalDataService } from 'src/app/internal-data.service';
import { TableEmptyComponent } from './table-empty.component';
import { MatTableDataSource } from '@angular/material/table';
import { InternalDimensionService } from 'src/app/internal-dimension.service';

const GENERATE_PLAYERS_LIST = [
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

describe('TableEmptyComponent', () => {
  let component: TableEmptyComponent;
  let fixture: ComponentFixture<TableEmptyComponent>;
  let internal_data: InternalDataService;
  let internal_dimension: InternalDimensionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
      ],
      declarations: [ 
        TableEmptyComponent
      ],
      providers: [
        InternalDataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEmptyComponent);
    component = fixture.componentInstance;
    internal_data = TestBed.inject(InternalDataService);
    internal_dimension = TestBed.inject(InternalDimensionService);
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
    it('should define an empty dataSource', () => {
      expect(component.dataSource).not.toBeDefined();

      component.ngAfterViewInit();

      expect(component.dataSource.data.length).toBe(0);
    });

    it('should set property dataSource.paginator with paginator', () => {
      component.ngAfterViewInit();

      expect(component.dataSource.paginator).toEqual(component.paginator);
    });

    it('should set property dataSource.sort with sort', () => {
      component.ngAfterViewInit();

      expect(component.dataSource.sort).toEqual(component.sort);
    });

    it('should set property dataSource.data with empty array', () => {
      component.ngAfterViewInit();

      expect(component.dataSource.data).toEqual([]);
    });
  });

  describe('methods call from template', () => {

    beforeEach(() => {
      component.dataSource = new MatTableDataSource();
      component.dataSource.data = [];
    });

    it('testing generateTeam and subscribe methods into getTeam are getting called', fakeAsync(() => {
      let spy_generate_team = spyOn(internal_data, "generateTeam").and.returnValue(of([]));
      let spy_sub = spyOn(internal_data.generateTeam(), "subscribe");

      component.getTeam();
      
      expect(spy_generate_team).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call getTeam and set dataSource with array', fakeAsync(() => {
      let spy_generate_team = spyOn(internal_data, "generateTeam").and.returnValue(of(GENERATE_PLAYERS_LIST));

      component.getTeam();

      expect(spy_generate_team).toHaveBeenCalled();
      expect(component.dataSource.data).toEqual(GENERATE_PLAYERS_LIST);
    }));

    it('testing generateTeamWithFavoritList and subscribe methods into getTeamWithFavoritPlayers are getting called',
      fakeAsync(() => {
        let spy_generate_favorit = spyOn(internal_data, "generateTeamWithFavoritList").and.returnValue(of([]));
        let spy_sub = spyOn(internal_data.generateTeamWithFavoritList(), "subscribe");

        component.getTeamWithFavoritPlayers();

        expect(spy_generate_favorit).toHaveBeenCalledBefore(spy_sub);
        expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call getTeamWithFavoritPlayers and set dataSource with array', fakeAsync(() => {
      let spy_generate_favorit = spyOn(internal_data, "generateTeamWithFavoritList").and.returnValue(of(GENERATE_PLAYERS_LIST));

      component.getTeamWithFavoritPlayers();

      expect(spy_generate_favorit).toHaveBeenCalled();
      expect(component.dataSource.data).toEqual(GENERATE_PLAYERS_LIST);
    }));
  });
});
