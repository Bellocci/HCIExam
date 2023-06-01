import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';

import { TeamDataService } from '../service/team-data.service';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let team_data: TeamDataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [ 
        TableComponent 
      ],
      providers: [
        TeamDataService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    team_data = TestBed.inject(TeamDataService);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('testing subscribe method into getPlayerList method from team_data service', () => {
      const spy_playerList = spyOn(team_data, "getPlayerList").and.returnValue(of());
      const spy_subscribe = spyOn(team_data.getPlayerList(), "subscribe");

      component.ngOnInit();

      expect(spy_playerList).toHaveBeenCalledBefore(spy_subscribe);
      expect(spy_subscribe).toHaveBeenCalled();
    });

    it('should set datasource data with value returned from getPlayerList method of team_data service', () => {
      const spy_playerList = spyOn(team_data, "getPlayerList").and.returnValue(of(PLAYER_DATA));
      component.ngOnInit();
      component.getDataSource().data = [];

      component.ngOnInit();

      expect(component.getDataSource().data.length).toBe(PLAYER_DATA.length);
    });

    it('testing subscribe method into getPlayerSelected method from internal data service', () => {
      const spy_playerSelected = spyOn(team_data, "getPlayerSelected").and.returnValue(of());
      const spy_subscribe = spyOn(team_data.getPlayerSelected(), "subscribe");

      component.ngOnInit();

      expect(spy_playerSelected).toHaveBeenCalledBefore(spy_subscribe);
      expect(spy_subscribe).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    
    it('should set _dataSource.paginator with _paginator', () => {
      component.ngOnInit();
      component.getDataSource().paginator = null;

      component.ngAfterViewInit();

      expect(component.getDataSource().paginator).toEqual(component['_paginator']);
    });

    it('should set _dataSource.sort with _sort', () => {
      component.ngOnInit();
      component.getDataSource().sort = null;

      component.ngAfterViewInit();

      expect(component.getDataSource().sort).toEqual(component['_sort']);
    })
  });

  describe('Methods from template', () => {

    it('should call isPlayerIntoFavoriteList method from team data service when isFavoritePlayer method is called', () => {
      const spy_favoriteTeam = spyOn(team_data, "isPlayerIntoFavoriteList");
      const player = PLAYER_DATA[0];

      component.isFavoritePlayer(player)

      expect(spy_favoriteTeam).toHaveBeenCalledWith(player);
    });

    it('should isFavoritePlayer method return the value returned by isPlayerIntoFavoriteList method from team data service', 
    () =>{
      const spy_favoriteTeam = spyOn(team_data, "isPlayerIntoFavoriteList").and.returnValue(false);
      const player = PLAYER_DATA[0];

      expect(component.isFavoritePlayer(player)).toBeFalse();

      spy_favoriteTeam.and.returnValue(true);

      expect(component.isFavoritePlayer(player)).toBeTrue();
    });

    it('should call addPlayerIntoFavoriteList method from team data service when setPlayerAsFavorite method is called',
    () => {
      const spy_favoriteTeam = spyOn(team_data, "addPlayerIntoFavoriteList");
      const player = PLAYER_DATA[0];

      component.setPlayerAsFavorite(player);

      expect(spy_favoriteTeam).toHaveBeenCalledOnceWith(player);
    });

    it('should call removePlayerFromFavoriteList method from team data service when removePlayerAsFavorite method is called',
    () => {
      const spy_favoriteTeam = spyOn(team_data, "removePlayerFromFavoriteList");
      const player = PLAYER_DATA[0];

      component.removePlayerAsFavorite(player);

      expect(spy_favoriteTeam).toHaveBeenCalledOnceWith(player);
    });

    it('should set _pageIndex with value from PageEvent when handlePageEvent method is called', () => {
      const event = new PageEvent();
      event.pageIndex = 1;
      const default_value = 0
      expect(component.getPageIndex()).toBe(default_value);
      
      component.handlePageEvent(event);

      expect(component.getPageIndex()).toBe(1);
    });

    it('should set _pageSize with value from PageEvent when handlePageEvent method is called', () => {
      const event = new PageEvent();
      event.pageSize = 20;
      const default_value = 10;
      expect(component.getPageSize()).toBe(default_value);
      
      component.handlePageEvent(event);

      expect(component.getPageSize()).toBe(20);
    });

    it('should setPlayerSelected method call setPlayerSelected method from team data service', () => {
      const spy_setPlayerSelected = spyOn(team_data, "setPlayerSelected");

      component.setPlayerSelected(PLAYER_DATA[0]);

      expect(spy_setPlayerSelected).toHaveBeenCalledWith(PLAYER_DATA[0]);
    });

    it('should setPlayerSelected method call setPlayerSelected method from team data service with argument null if '+
    'player selected is already selected', () => {
      const spy_setPlayerSelected = spyOn(team_data, "setPlayerSelected");
      component['_playerSelected'] = PLAYER_DATA[0];

      component.setPlayerSelected(PLAYER_DATA[0]);

      expect(spy_setPlayerSelected).toHaveBeenCalledWith(null);
    });
  });
});

const PLAYER_DATA = [
  {
      playerId : 1,
      playerName : 'Musso',
      teamName : 'Atalanta',
      cost : 12,
      role : 'P',
      age : 27,
      matchPlayed : 24,
  },
  {
      playerId : 2,
      playerName : 'Toloi',
      teamName : 'Atalanta',
      cost : 8,
      role : 'D',
      age : 31,
      matchPlayed : 16,
  },
  {
      playerId : 3,
      playerName : 'Malinovskyi',
      teamName : 'Atalanta',
      cost : 22,
      role : 'C',
      age : 28,
      matchPlayed : 22,
  },
  {
      playerId : 4,
      playerName : 'Pasalic',
      teamName : 'Atalanta',
      cost : 28,
      role : 'C',
      age : 27,
      matchPlayed : 24,
  },
  {
      playerId : 5,
      playerName : 'Arnautovic',
      teamName : 'Bologna',
      cost : 24,
      role : 'A',
      age : 32,
      matchPlayed : 23,
  },
  {
      playerId : 6,
      playerName : 'De Silvestri',
      teamName : 'Bologna',
      cost : 14,
      role : 'D',
      age : 33,
      matchPlayed : 23,
  },
  {
      playerId : 7,
      playerName : 'Soriano',
      teamName : 'Bologna',
      cost : 10,
      role : 'C',
      age : 31,
      matchPlayed : 25,
  },
  {
      playerId : 8,
      playerName : 'Skorupski',
      teamName : 'Bologna',
      cost : 10,
      role : 'P',
      age : 30,
      matchPlayed : 27,
  },
  {
      playerId : 9,
      playerName : 'Theate',
      teamName : 'Bologna',
      cost : 12,
      role : 'D',
      age : 21,
      matchPlayed : 22,
  },
  {
      playerId : 10,
      playerName : 'Orsolini',
      teamName : 'Bologna',
      cost : 18,
      role : 'C',
      age : 25,
      matchPlayed : 18,
  },
  {
      playerId : 11,
      playerName : 'Muriel',
      teamName : 'Atalanta',
      cost : 23,
      role : 'A',
      age : 30,
      matchPlayed : 16,
  },
  {
      playerId : 12,
      playerName : 'Zapata',
      teamName : 'Atalanta',
      cost : 34,
      role : 'A',
      age : 30,
      matchPlayed : 17,
  },
];
