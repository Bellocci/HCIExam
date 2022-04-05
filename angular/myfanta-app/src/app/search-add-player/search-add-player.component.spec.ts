import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { InternalDataService } from '../internal-data.service';
import { SharedService } from '../shared.service';

import { SearchAddPlayerComponent } from './search-add-player.component';

const PLAYERS_DATA = [
  {
    name : 'Andrea Belotti',
  },
  {
    name : 'Ciro Immobile',
  },
  {
    name : 'Dusan Vlahovic',
  },
  {
    name : 'Antonio Candreva',
  },
]

describe('SearchAddPlayerComponent', () => {
  let component: SearchAddPlayerComponent;
  let fixture: ComponentFixture<SearchAddPlayerComponent>;
  let shared: SharedService;
  let internal_data: InternalDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        SearchAddPlayerComponent
      ],
      providers: [
        SharedService,
        InternalDataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAddPlayerComponent);
    component = fixture.componentInstance;
    shared = TestBed.inject(SharedService);
    internal_data = TestBed.inject(InternalDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {

    it('testing pipe and subscribe method of _search_players is called', () => {
      const spy_pipe = spyOn(component['_search_players'], "pipe").and.returnValue(of());
      const spy_sub = spyOn(component['_search_players'].pipe(), "subscribe");

      component.ngOnInit();

      expect(spy_pipe).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should _search_players set players with list that match name of players', fakeAsync(() => {
      const player_name:string = 'Bel';
      const players_matched:any[] = [PLAYERS_DATA[0]];
      const spy_search = spyOn(shared, "searchPlayers").and.returnValue(of(players_matched));
      component.players = [];
      fixture.detectChanges();

      component['_search_players'].next(player_name);
      tick(300);

      expect(component.players).toEqual(players_matched);
    }));

    it('should set tab_selected with tab_name got from internal_data service', () => {
      let textTab:string = 'test';
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of(textTab));
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.getTabSelected()).toEqual(textTab);

      textTab = '';
      spy_getTab.and.returnValue(of(textTab));
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.getTabSelected()).toEqual(textTab);
    });

    it('should set inputVisible to true when tab_name is not equal to Options', 
    () => {
      const textTab:string = 'test';
      component.input_visible = false;
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of(textTab));
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.input_visible).toBeTrue();
    });

    it('should set inputVisible to false when tab_name is equal to Options', 
    () => {
      const textTab:string = 'Options';
      component.input_visible = true;
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of(textTab));
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.input_visible).toBeFalse();
    });
  });

  describe('Methods called from template', () => {

    it('should call addPlayerToTeam from internal_data when method addPlayer is called', () => {
      const player_name:string = 'test';
      const spy_addPlayer = spyOn(internal_data, "addPlayerToTeam");

      component.addPlayer(player_name);

      expect(spy_addPlayer).toHaveBeenCalled();
    });

    it('testing next method of _search_players when searchPlayer is called', () => {
      const player_name:string = 'test';
      const spy_next = spyOn(component['_search_players'], "next");

      component.searchPlayer(player_name);

      expect(spy_next).toHaveBeenCalled();
    });

    it('should return true when filterText method is called with alphabetic character parameter', () => {
      const event = new KeyboardEvent("keypress", {
        "key": "b",
      });

      expect(component.filterText(event)).toBeTrue();
    });

    it('should return false when filterText method is called with numeric character parameter', () => {
      const event = new KeyboardEvent("keypress", {
        "key": "1",
      });

      expect(component.filterText(event)).toBeFalse();
    });

    it('should return false when filterText method is called with special character parameter', () => {
      const event = new KeyboardEvent("keypress", {
        "key": "*",
      });

      expect(component.filterText(event)).toBeFalse();
    });
  });
});
