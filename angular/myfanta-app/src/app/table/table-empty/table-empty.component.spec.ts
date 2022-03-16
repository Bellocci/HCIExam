import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';

import { InternalDataService } from 'src/app/internal-data.service';
import { TableEmptyComponent } from './table-empty.component';
import { MatTableDataSource } from '@angular/material/table';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
