import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';

import { SearchAddPlayerComponent } from './search-add-player.component';
import { SharedService } from '../service/shared.service';
import { InternalDataService } from '../service/internal-data.service';
import { TeamDataService } from '../service/team-data.service';

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
  let team_data: TeamDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        NoopAnimationsModule
      ],
      declarations: [ 
        SearchAddPlayerComponent
      ],
      providers: [
        SharedService,
        InternalDataService,
        TeamDataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAddPlayerComponent);
    component = fixture.componentInstance;
    shared = TestBed.inject(SharedService);
    internal_data = TestBed.inject(InternalDataService);
    team_data = TestBed.inject(TeamDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

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
      component.players = [];
      const spy_search = spyOn(shared, "searchPlayers").and.returnValue(of(players_matched));
      fixture.detectChanges();

      component['_search_players'].next(player_name);
      tick(300);

      expect(component.players).toEqual(players_matched);
    }));
  });

  describe('ngAterViewInit', () => {
    
    it('testing subscribe method of getTabSelected from internal_data service', fakeAsync(() => {
      const textTab = 'test';
      
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of(textTab));
      const spy_sub = spyOn(internal_data.getTabSelected(), "subscribe");

      component.ngAfterViewInit();
      tick();

      expect(spy_getTab).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should set tab_selected with tab_name got from internal_data service', fakeAsync(() => {
      let textTab:string = 'test';
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of(textTab));
      fixture.detectChanges();

      component.ngAfterViewInit();
      tick();

      expect(component.getTabSelected()).toEqual(textTab);

      textTab = '';
      spy_getTab.and.returnValue(of(textTab));
      fixture.detectChanges();

      component.ngAfterViewInit();
      tick();

      expect(component.getTabSelected()).toEqual(textTab);
    }));

    it('should set value_input_text to empty string when got tab_selected from internal_data service', fakeAsync(() => {
      component.value_input_text = 'test';
      const text_tab = 'tab_test';
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of(text_tab));
      fixture.detectChanges();

      component.ngAfterViewInit();
      tick();

      expect(component.value_input_text).toBe('');
    }));

    it('should set input_visible to true when tab_name is not equal to Options', fakeAsync(() => {
      const textTab:string = 'test';
      component.input_visible = false;
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of(textTab));
      fixture.detectChanges();

      component.ngAfterViewInit();
      tick();

      expect(component.input_visible).toBeTrue();
    }));

    it('should set input_visible to false when tab_name is equal to Options', fakeAsync(() => {
      const textTab:string = 'Options';
      component.input_visible = true;
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of(textTab));
      fixture.detectChanges();

      component.ngAfterViewInit();
      tick();

      expect(component.input_visible).toBeFalse();
    }));
  });

  describe('Methods called from template', () => {

    it('should isValueInputTextEmpty method return true if value_input_text is an empty string', () => {
      component.value_input_text = '';
      
      expect(component.isValueInputTextEmpty()).toBeTrue();
    });

    it('should isValueInputTextEmpty method return true if value_input_text has only empty space characters', () => {
      component.value_input_text = '  ';
      
      expect(component.isValueInputTextEmpty()).toBeTrue();
    });

    it('should isValueInputTextEmpty method return true if value_input_text has only tab characters', () => {
      component.value_input_text = '\t\t';
      
      expect(component.isValueInputTextEmpty()).toBeTrue();
    });

    it('should isValueInputTextEmpty method return false if value_input_text is not an empty string', () => {
      component.value_input_text = 'test';
      
      expect(component.isValueInputTextEmpty()).toBeFalse();
    });

    it('should isValueInputTextEmpty method return false if value_input_text is not an empty string and first character is space', () => {
      component.value_input_text = ' test';
      
      expect(component.isValueInputTextEmpty()).toBeFalse();
    });

    it('should call addPlayerToTeam from internal_data when method addPlayer is called', () => {
      const player_name:string = 'test';
      const spy_addPlayer = spyOn(team_data, "addPlayerToTeam");

      component.addPlayer(player_name);

      expect(spy_addPlayer).toHaveBeenCalled();
    });

    it('should set value_input_text as empty string when addPlayer method is called', () => {
      component.value_input_text = 'test';
      const player_name:string = 'test';

      component.addPlayer(player_name);

      expect(component.value_input_text).toBe('');
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

    it('should return true when filterText method is called with space parameter', () => {
      const event = new KeyboardEvent("keypress", {
        "key": " ",
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
