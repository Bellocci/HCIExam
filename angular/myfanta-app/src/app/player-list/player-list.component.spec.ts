import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TeamDataService } from '../service/team-data.service';

import { PlayerListComponent } from './player-list.component';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let team_data: TeamDataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PlayerListComponent 
      ],
      providers: [
        TeamDataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    team_data = TestBed.inject(TeamDataService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('testing pipe method of _search_players is called', () => {
      const spy_pipe = spyOn(component['_search_players'], "pipe").and.returnValue(of());

      component.ngOnInit();

      expect(spy_pipe).toHaveBeenCalled();
    });
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
