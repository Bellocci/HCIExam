import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { TeamDataService } from '../service/team-data.service';
import { MaterialModule } from "../material-module";

import { PlayerListComponent } from './player-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let team_data: TeamDataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        MaterialModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        PlayerListComponent,
        MockTableComponent
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

  beforeEach(() => {
    ROLE = [
      {name : 'P', 'selected' : false},
      {name : 'D', 'selected' : false},
      {name : 'C', 'selected' : false},
      {name : 'A', 'selected' : false},
    ];
    TEAM_DICT = [
      {
        name : 'Atalanta',
        selected : false
      },
      {
        name : 'Bologna',
        selected : false
      },
      {
        name : 'Cremonese',
        selected : false
      },
    ]
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

    it('testing subscribe from getTeamName method from team data service', () => {
      const spy_getTeam = spyOn(team_data, "getTeamName").and.returnValue(of());
      const spy_subscribe = spyOn(team_data.getTeamName(), "subscribe");

      component.ngOnInit();

      expect(spy_getTeam).toHaveBeenCalledBefore(spy_subscribe);
      expect(spy_subscribe).toHaveBeenCalled();
    });

    it('should initialize _team dictionary with value returned by getTeamName method from team data service', () => {
      component['_teams'] = [];
      const spy_getTeam = spyOn(team_data, "getTeamName").and.returnValue(of(TEAM));

      component.ngOnInit();

      expect(component.getTeam()).toEqual(TEAM_DICT);
    });
  });

  describe('Methods', () => {

    it('should selectedRole method toggle value of selected key about role passed as argument into _roles dictionary',
    () => {
      component['_roles'] = ROLE;

      component.selectedRole(ROLE[2].name); 
      expect(component.getRoles()[2]).toEqual({name : ROLE[2].name, selected : true});

      component.selectedRole(ROLE[2].name);
      expect(component.getRoles()[2]).toEqual({name : ROLE[2].name, selected : false});
    });

    it('should selectedRole method call filterPlayerByRoles with argument role if role exist into _roles dictionary', () => {
      const spy_filter_role = spyOn(team_data, "filterPlayerByRoles");
      component['_roles'] = ROLE;
      
      component.selectedRole(ROLE[2].name);
      expect(component.getRoles()[2]).toEqual({name : ROLE[2].name, selected : true});
      expect(spy_filter_role).toHaveBeenCalledWith(ROLE[2].name, true);

      component.selectedRole(ROLE[0].name);
      expect(component.getRoles()[0]).toEqual({name : ROLE[0].name, selected : true});
      expect(spy_filter_role).toHaveBeenCalledWith(ROLE[0].name, true);

      component.selectedRole(ROLE[2].name);
      expect(component.getRoles()[2]).toEqual({name : ROLE[2].name, selected : false});
      expect(spy_filter_role).toHaveBeenCalledWith(ROLE[2].name, false);
    });

    it('should selectedRole method not modify _roles dictionary and does not call filterPlayerByRoles if role does not ' +
    ' exist into _roles dictionary', () => {
      const spy_filter_role = spyOn(team_data, "filterPlayerByRoles");
      component['_roles'] = ROLE;
      
      component.selectedRole('error');
      expect(component.getRoles()).toEqual(ROLE);
      expect(spy_filter_role).not.toHaveBeenCalled();
    });

    it('should isRoleSelected method return true if value of key selected with key name the same passed as argument is equal to true',
    () => {
      component['_roles'] = ROLE;
      component['_roles'][0].selected = true;

      expect(component.isRoleSelected(ROLE[0].name)).toBeTrue();
    });

    it('should isRoleSelected method return false if value of key selected with key name the same passed as argument is equal to false',
    () => {
      component['_roles'] = ROLE;

      expect(component.isRoleSelected(ROLE[0].name)).toBeFalse();
    }); 

    it('should selectedTeam method toggle into _teams dictionary the value of key selected with key name the same passed as argument',
    () => {
      component['_teams'] = TEAM_DICT;

      component.selectedTeam(TEAM[1]);
      expect(component.getTeam()[1]).toEqual({name : TEAM[1], selected : true});

      component.selectedTeam(TEAM[1]);
      expect(component.getTeam()[1]).toEqual({name : TEAM[1], selected : false});
    });

    it('should selectedTeam method call filterPlayersByTeam method with argument an array of team names that are selected ' +
    'from team data service', () => {
      const spy_filter_team = spyOn(team_data, "filterPlayersByTeam");
      component['_teams'] = TEAM_DICT;

      component.selectedTeam(TEAM[0]);
      expect(component.getTeam()[0]).toEqual({name : TEAM[0], selected : true});
      expect(spy_filter_team).toHaveBeenCalledWith(TEAM[0], true);

      component.selectedTeam(TEAM[1]);
      expect(component.getTeam()[1]).toEqual({name : TEAM[1], selected : true});
      expect(spy_filter_team).toHaveBeenCalledWith(TEAM[1], true);

      component.selectedTeam(TEAM[0]);
      expect(component.getTeam()[0]).toEqual({name : TEAM[0], selected : false});
      expect(spy_filter_team).toHaveBeenCalledWith(TEAM[0], false);
    });

    it('should selectedTeam method not modify _teams dictionary and does not call filterPlayerByRoles if team does not ' +
    ' exist into _teams dictionary', () => {
      const spy_filter_team = spyOn(team_data, "filterPlayersByTeam");
      component['_teams'] = TEAM_DICT;
      
      component.selectedRole('error');
      expect(component.getTeam()).toEqual(TEAM_DICT);
      expect(spy_filter_team).not.toHaveBeenCalled();
    });

    it('should isTeamSelected method return true if value of key selected with key name the same passed as argument is equal to true',
    () => {
      component['_teams'] = TEAM_DICT;
      component['_teams'][0].selected = true;

      expect(component.isTeamSelected(TEAM[0])).toBeTrue();
    });

    it('should isTeamSelected method return false if value of key selected with key name the same passed as argument is equal to false',
    () => {
      component['_teams'] = TEAM_DICT;

      expect(component.isRoleSelected(TEAM[0])).toBeFalse();
    }); 

    it('should isShortSelectedTeam method return false when window.width is greater than 600px', () => {
      const spy_width = spyOn(component, "getWindowWidth").and.returnValue(601);
      fixture.detectChanges();

      expect(component.isShortSelectedTeam()).toBeFalse();
    });

    it('should isShortSelectedTeam method return true when window.width is less or equal than 600px', () => {
      const spy_width = spyOn(component, "getWindowWidth").and.returnValue(600);
      fixture.detectChanges();

      expect(component.isShortSelectedTeam()).toBeTrue();

      spy_width.and.returnValue(500);
      fixture.detectChanges();

      expect(component.isShortSelectedTeam()).toBeTrue();
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

    it('testing next method of _search_players when searchPlayer is called', () => {
      const player_name:string = 'test';
      const spy_next = spyOn(component['_search_players'], "next");

      component.searchPlayer(player_name);

      expect(spy_next).toHaveBeenCalled();
    });
  });

});

let ROLE : {name : string, selected : boolean}[] = [];
let TEAM_DICT : {name : string, selected : boolean}[] =  [
  {
    name : 'Atalanta',
    selected : false
  },
  {
    name : 'Bologna',
    selected : false
  },
  {
    name : 'Cremonese',
    selected : false
  },
];
const TEAM = [
  'Atalanta',
  'Bologna',
  'Cremonese'
];

@Component({
  selector: 'app-table',
  template: ''
})
class MockTableComponent {
}