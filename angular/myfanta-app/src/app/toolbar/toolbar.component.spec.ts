import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { ToolbarComponent } from './toolbar.component';
import { SharedService } from '../service/shared.service';
import { InternalDataService } from '../service/internal-data.service';
import { TeamDataService } from '../service/team-data.service';

const SPORT_DATA = [
  {
    sportId : 1, 
    sportName: 'Football soccer'
  },
  {
    sportId : 2,
    sportName : 'Volleyball'
  }
];

const CHAMPIONSHIP_DATA = [
  {
    championshipId : 1, 
    championshipName : 'Serie A',
    sport : 1
  },
  {
    championshipId : 2,
    championshipName : 'Premier League',
    sport : 1
  },
  {
    championshipId : 3,
    championshipName : 'Serie A Female',
    sport : 2
  }
];

describe('ToolbarComponent', () => {

  let component:ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let shared_service:SharedService;
  let internal_data_service:InternalDataService;
  let team_data_service: TeamDataService;

  let championship_selected:string;
  let sportsList = SPORT_DATA;
  let championshipsList = CHAMPIONSHIP_DATA;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        ToolbarComponent
      ],
      providers : [
        SharedService, 
        InternalDataService,
        TeamDataService
      ],
      schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA 
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    championship_selected = '';
    fixture = TestBed.createComponent(ToolbarComponent);
    internal_data_service = TestBed.inject(InternalDataService);
    shared_service = TestBed.inject(SharedService);
    team_data_service = TestBed.inject(TeamDataService);
    component = fixture.componentInstance;
  });

  describe("ngOnInit", () => {

    it('testing subscribe method into getChampionshipSelected from internal data service is getting called', () => {
      const champSpy = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(championship_selected));
      const subSpy = spyOn(internal_data_service.getChampionshipSelected(), 'subscribe');

      component.ngOnInit();

      expect(champSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    });

    it('should set championship_selected variable with value returned from getChamprionshipSelected method from ' + 
    'internal data service', () => {
      const champSpy = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of('test'));
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.championship_selected).toBeDefined();
      expect(component.championship_selected).toEqual('test');
    });

    it('testing subscribe method into refreshSportsList is getting called', () => {
      const sportSpy = spyOn(shared_service, 'getSportList').and.returnValue(of([sportsList]));
      const subSpy = spyOn(shared_service.getSportList(), 'subscribe');

      component.ngOnInit();

      expect(sportSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    });

    it('should call refreshSportsList and get response as empty array', () => {
      const spy_getSportsList = spyOn(shared_service, "getSportList").and.returnValue(of([]));

      component.ngOnInit();

      expect(component.sportsList).toBeDefined();
      expect(component.sportsList).toEqual([]);
    });
  
    it('should call refreshSportsList and get response as array', () => {
      const spy_refreshSportsList = spyOn(shared_service, "getSportList").and.returnValue(of(SPORT_DATA))
      
      component.ngOnInit();

      expect(component.sportsList).toBeDefined();
      expect(component.sportsList).toEqual(SPORT_DATA);
    });

    it('testing subscribe method into refreshChampionshipsList is getting called', () => {
      const champSpy = spyOn(shared_service, 'getChampionshipList').and.returnValue(of([championshipsList]));
      const subSpy = spyOn(shared_service.getChampionshipList(), 'subscribe');

      component.ngOnInit();

      expect(champSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    });
  
    it('should call refreshChampionshipsList and get response as empty array', () => {
      const spy_refreshChampionshipsList = spyOn(shared_service, "getChampionshipList").and.returnValue(of([]));
      
      component.ngOnInit();

      expect(component.championshipsList).toBeDefined();
      expect(component.championshipsList).toEqual([]);
    });
  
    it('should call refreshChampionshipsList and get response as array', () => {
      const spy_refreshChampionshipsList = spyOn(shared_service, 'getChampionshipList').and.returnValue(of(CHAMPIONSHIP_DATA));

      component.ngOnInit();

      expect(component.championshipsList).toBeDefined();
      expect(component.championshipsList).toEqual(CHAMPIONSHIP_DATA);
    });

    it('should set is_mobile to false when window is greater than 801', () => {
      window.innerWidth = 1500;
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.is_mobile).toBeFalse();
    });

    it('should set is_mobile to false when window is equalt to 801', () => {
      window.innerWidth = 801;
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.is_mobile).toBeFalse();
    });

    it('should set is_mobile to true when window is less than 801', () => {
      window.innerWidth = 800;
      fixture.detectChanges(),

      component.ngOnInit();

      expect(component.is_mobile).toBeTrue();
    });
  });

  describe('Method called from template', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(ToolbarComponent);
      component = fixture.componentInstance;
      internal_data_service = TestBed.inject(InternalDataService);
      shared_service = TestBed.inject(SharedService);
    })

    it('should call filterChampionship and return false when sport.sportId and champ.sport are not equal', () => {
      const sport = SPORT_DATA[0];
      const champ = CHAMPIONSHIP_DATA[2];

      expect(component.filterChampionship(champ, sport)).toBeFalse();
    });

    it('should call filterChampionship and return true when sport.sportId and champ.sport are equal', () => {
      const sport = SPORT_DATA[0];
      const champ = CHAMPIONSHIP_DATA[0];

      expect(component.filterChampionship(champ, sport)).toBeTrue();
    });

    it('should call internal_data.setChampionshipSelected when setChampionshipSelected is called', () => {
      const spy_setChampionshipSelected = spyOn(internal_data_service, 'setChampionshipSelected');
      const champ:string = CHAMPIONSHIP_DATA[0].championshipName;

      component.setChampionshipSelected(champ);

      expect(spy_setChampionshipSelected).toHaveBeenCalled();
    });

    it('should call internal_data.setActiveLink when setActiveLink is called', () => {
      const spy_activeLink = spyOn(internal_data_service, "setActiveLink");
      const link_name:string = 'link';

      component.setActiveLink(link_name);

      expect(spy_activeLink).toHaveBeenCalled();
    });

    it('should return true when isActiveLink is called and link_name is equal to internal_data.active_link', () => {
      const link_name = "link";
      const spy_getActiveLink = spyOn(internal_data_service, "getActiveLink").and.returnValue(of(link_name));
      fixture.detectChanges();

      const isActive = component.isActiveLink(link_name);

      expect(spy_getActiveLink).toHaveBeenCalled();
      expect(isActive).toBeTrue();
    });

    it('should return false when isActiveLink is called and link_name is not equal to internal_data.active_link', () => {
      const link_name = "link";
      const current_link_name = "link2";
      const spy_getActiveLink = spyOn(internal_data_service, "getActiveLink").and.returnValue(of(current_link_name));

      const isActive = component.isActiveLink(link_name);

      expect(spy_getActiveLink).toHaveBeenCalled();
      expect(isActive).toBeFalse();
    });

    it('should clearData method call clearData method from internal data service and team data service', () => {
      const spy_clearDataInternal = spyOn(internal_data_service, "clearData");
      const spy_clearDataTeam = spyOn(team_data_service, "clearData");

      component.clearData();

      expect(spy_clearDataInternal).toHaveBeenCalled();
      expect(spy_clearDataTeam).toHaveBeenCalled();
    });
  });
});
