import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { TeamDataService } from '../service/team-data.service';
import { FilterPlayerComponent } from './filter-player.component';

describe('FilterPlayerComponent', () => {
  let component: FilterPlayerComponent;
  let fixture: ComponentFixture<FilterPlayerComponent>;
  let team_data:TeamDataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        FilterPlayerComponent 
      ],
      providers : [
        TeamDataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPlayerComponent);
    component = fixture.componentInstance;
    team_data = TestBed.inject(TeamDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('testing subscribe method from pipe method of _search_players is getting called', () => {
      const spy_pipe = spyOn(component['_search_players'], "pipe").and.returnValue(of());
      const spy_subscribe = spyOn(component['_search_players'].pipe(), "subscribe");

      component.ngOnInit();

      expect(spy_pipe).toHaveBeenCalledBefore(spy_subscribe);
      expect(spy_subscribe).toHaveBeenCalled();
    });

    it('should call filterPlayersByName method from team data service inside pipe method', fakeAsync(() => {
      const spy_filter = spyOn(team_data, "filterPlayersByName");

      component['_search_players'].next('test');
      tick(300);

      expect(spy_filter).toHaveBeenCalledWith('test');
    }));
  });

  describe('Methods', () => {

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

    it('testing next method of _search_players when searchPlayer is called', () => {
      const player_name:string = 'test';
      const spy_next = spyOn(component['_search_players'], "next");

      component.searchPlayer(player_name);

      expect(spy_next).toHaveBeenCalled();
    });
  });
});
