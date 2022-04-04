import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CreateTeamComponent } from './create-team.component';
import { SnackBarService } from '../snack-bar.service';
import { InternalDataService } from '../internal-data.service';
import { SharedService } from '../shared.service';
import { By } from '@angular/platform-browser';

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

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  let snackbar_service:SnackBarService;
  let internal_data:InternalDataService;
  let shared: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        MatAutocompleteModule
      ],
      declarations: [ 
        CreateTeamComponent 
      ],
      providers: [
        SnackBarService,
        InternalDataService,
        SharedService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    snackbar_service = TestBed.inject(SnackBarService);
    internal_data = TestBed.inject(InternalDataService);
    shared = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('breakpoint value should be 5 when getInnerWidth return a value greater or equal than 800', () => {
      let width:number = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();
      expect(component.getBreakpoint()).toEqual(5);

      width = 800;
      spy_window.and.returnValue(width);

      component.ngOnInit();
      expect(component.getBreakpoint()).toEqual(5);
    });

    it('breakpoint value should be 1 when getInnerWidth return a value less than 800', () => {
      const width:number = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.getBreakpoint()).toEqual(1);
    });

    it('should set number of rows equal to 6', () => {
      component.ngOnInit();

      expect(component.getRows()).toBe(6);
    })

    it('cols_tabs value should be 3 when getInnerWidth return a value greater or equal than 800', () => {
      let width:number = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();
      expect(component.getColsTabs()).toEqual(3);

      width = 800;
      spy_window.and.returnValue(width);

      component.ngOnInit();
      expect(component.getColsTabs()).toEqual(3);
    });

    it('cols_tab value should be 1 when getInnerWidth return a value less than 800', () => {
      const width:number = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.getColsTabs()).toEqual(1);
    });

    it('cols_buttons value should be 2 when getInnerWidth return a value greater or equal than 800', () => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();
      expect(component.getColsButtons()).toEqual(2);

      width = 800;
      spy_window.and.returnValue(width);

      component.ngOnInit();
      expect(component.getColsButtons()).toEqual(2);
    });

    it('cols_buttons value should be 1 when getInnerWidth return a value less than 800', () => {
      const width = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.getColsButtons()).toEqual(1);
    });

    it('testing pipe method of _search_players is called', () => {
      const spy_pipe = spyOn(component['_search_players'], "pipe").and.returnValue(of());

      component.ngOnInit();

      expect(spy_pipe).toHaveBeenCalled();
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

    it('should call setIsMobileLayout method', () => {
      const spy_isMobile= spyOn(component, 'setIsMobileLayout');
      
      component.ngOnInit();

      expect(spy_isMobile).toHaveBeenCalled();
    });

    it('testing subscribe method _mobile variable is called', () => {
      const spy_sub = spyOn(component['_mobile'], "subscribe");

      component.ngOnInit();

      expect(spy_sub).toHaveBeenCalled();
    });

    it('testing setIsMobileLayout method is called before subscribe method of _mobile', () => {
      const spy_sub = spyOn(component['_mobile'], "subscribe");
      const spy_setMobile = spyOn(component, "setIsMobileLayout");

      component.ngOnInit();

      expect(spy_sub).toHaveBeenCalledBefore(spy_setMobile);
      expect(spy_setMobile).toHaveBeenCalled();
    })
  });

  describe('Methods called by template', () => {

    it('onResize should set breakpoint value to 5 when getInnerWidth return a value greater or equal than 800', () => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();
      expect(component.getBreakpoint()).toEqual(5);

      width = 800;
      spy_window.and.returnValue(width);

      component.onResize();
      expect(component.getBreakpoint()).toEqual(5);
    });

    it('onResize should set breakpoint value to 1 when getInnerWidth return a value less than 800', () => {
      const width = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.getBreakpoint()).toEqual(1);
    });

    it('onResize should set cols_tabs value to 3 when getInnerWidth return a value greater than 800', () => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();
      expect(component.getColsTabs()).toEqual(3);

      width = 800;
      spy_window.and.returnValue(width);

      component.onResize();
      expect(component.getColsTabs()).toEqual(3);
    });

    it('onResize should set cols_tabs value to 1 when getInnerWidth return a value less than 800', () => {
      const width = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.getColsTabs()).toEqual(1);
    });

    it('onResize should set cols_buttons value to 2 when getInnerWidth return a value greater or equal than 800', () => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();
      expect(component.getColsButtons()).toEqual(2);

      width = 800;
      spy_window.and.returnValue(width);

      component.onResize();
      expect(component.getColsButtons()).toEqual(2);
    });

    it('onResize should set cols_buttons value to 1 when getInnerWidth return a value less than 800', () => {
      const width = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.getColsButtons()).toEqual(1);
    });

    it('should set value of tab_selected as value of parameter when setTabSelected is called', () => {
      let textTab:string = 'test';
      component.setTabSelected(textTab);
      expect(component.getTabSelected()).toEqual(textTab);

      textTab = '';
      component.setTabSelected(textTab);
      expect(component.getTabSelected()).toEqual(textTab);
    });

    it('should set inputVisible to true when value of parameter is not equal to Options and setTabSelected is called', 
    () => {
      const textTab:string = 'test';
      component.input_visible = false;

      component.setTabSelected(textTab);

      expect(component.input_visible).toBeTrue();
    });

    it('should set inputVisible to false when value of parameter is equal to Options and setTabSelected is called', 
    () => {
      const textTab:string = 'Options';
      component.input_visible = true;

      component.setTabSelected(textTab);

      expect(component.input_visible).toBeFalse();
    });

    it('should call openSnackBar method from snack_bar service when method openSnackBar is called', () => {
      const textMessage = '';
      const spy_snack_bar = spyOn(snackbar_service, 'openSnackBar');

      component.openSnackBar(textMessage);

      expect(spy_snack_bar).toHaveBeenCalled();
    });

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

    it('should call generateTeam from internal_data service when generateTeam method is called', () => {
      const spy_generateTeam = spyOn(internal_data, "generateTeam");

      component.generateTeam();

      expect(spy_generateTeam).toHaveBeenCalled();
    });

    it('should call generateTeamWithFavoritList from internal_data servie when generateTeamWithFavoritList method is called',
    () => {
      const spy_generateWithFavorit = spyOn(internal_data, "generateTeamWithFavoritList");

      component.generateTeamWithFavoritList();

      expect(spy_generateWithFavorit).toHaveBeenCalled();
    });

    it('should set is_mobile variable to true when window width is less than 800', () => {
      component.is_mobile = false;
      const width:number = 700;
      const spy_window = spyOn(component, "getInnerWidth").and.returnValue(width);

      component.setIsMobileLayout();

      expect(component.is_mobile).toBeTrue();
    });

    it('should set is_mobile variable to false when window width is greater than 800', () => {
      component.is_mobile = true;
      const width:number = 1000;
      const spy_window = spyOn(component, "getInnerWidth").and.returnValue(width);

      component.setIsMobileLayout();

      expect(component.is_mobile).toBeFalse();
    });

    it('should set is_mobile variable to false when window width is equal to 800', () => {
      component.is_mobile = true;
      const width:number = 800;
      const spy_window = spyOn(component, "getInnerWidth").and.returnValue(width);

      component.setIsMobileLayout();

      expect(component.is_mobile).toBeFalse();
    });

    it('should return true when filterText method is called with alphabetic character parameter', () => {
      const event = new KeyboardEvent("keypress", {
        "key": "b",
        "charCode" : 98
      });

      expect(component.filterText(event)).toBeTrue();
    });

    it('should return false when filterText method is called with numeric character parameter', () => {
      const event = new KeyboardEvent("keypress", {
        "key": "1",
        "charCode" : 49
      });

      expect(component.filterText(event)).toBeFalse();
    });

    it('should return false when filterText method is called with special character parameter', () => {
      const event = new KeyboardEvent("keypress", {
        "key": "*",
        "charCode" : 42
      });

      expect(component.filterText(event)).toBeFalse();
    });
  });

});
