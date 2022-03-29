import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SharedService } from '../shared.service';
import { HomeComponent} from './home.component';
import { InternalDataService } from '../internal-data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let shared_service:SharedService;
  let internal_data_service:InternalDataService;

  const FOOTBALL = SPORT_DATA[0].sportName;
  const BASKETBALL = SPORT_DATA[1].sportName;
  
  const SERIE_A = CHAMPIONSHIP_DATA[0].championshipName;
  const PREMIERE_LEAGUE = CHAMPIONSHIP_DATA[1].championshipName;
  const NBA = CHAMPIONSHIP_DATA[2].championshipName;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      declarations: [
        HomeComponent
      ],
      providers : [
        SharedService,
        InternalDataService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    shared_service = TestBed.inject(SharedService);
    internal_data_service = TestBed.inject(InternalDataService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.sportsList = SPORT_DATA;
    component.championshipsList = CHAMPIONSHIP_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('testing subscribe method into loadSportsList is getting called', () => {
      const spy_sport = spyOn(shared_service, 'getSportList').and.returnValue(of([SPORT_DATA]));
      const spy_sub = spyOn(shared_service.getSportList(), 'subscribe');

      component.ngOnInit();

      expect(spy_sport).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should call loadSportsList and get response as array', () => {
      const spy_loadSports = spyOn(shared_service, 'getSportList').and.returnValue(of(SPORT_DATA));

      component.ngOnInit();

      expect(spy_loadSports).toHaveBeenCalled();
      expect(component.sportsList).toEqual(SPORT_DATA);
    });

    it('testing subscribe method into loadChampionshipsList is getting called', () => {
      const spy_champ = spyOn(shared_service, 'getChampionshipList').and.returnValue(of([]));
      const spy_sub = spyOn(shared_service.getChampionshipList(), 'subscribe');

      component.ngOnInit();

      expect(spy_champ).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should call loadChampionshipsList and get response as array', () => {
      const spy_loadChamp = spyOn(shared_service, 'getChampionshipList').and.returnValue(of(CHAMPIONSHIP_DATA));

      component.ngOnInit();

      expect(spy_loadChamp).toHaveBeenCalled();
      expect(component.championshipsList).toEqual(CHAMPIONSHIP_DATA);
    });

    it('testing subscribe method into getChampionshipSelected is getting called', () => {
      const spy_champ = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(''));
      const spy_sub = spyOn(internal_data_service.getChampionshipSelected(), 'subscribe');

      component.ngOnInit();

      expect(spy_champ).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should call getChampionshipSelected and get response as empty string', () => {
      const spy_getChampSelected = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(''));
      
      component.ngOnInit();

      expect(spy_getChampSelected).toHaveBeenCalled();
      expect(component.championship_selected).toEqual('');
    });

    it('should call getChampionshipSelected and get response as string', () => {
      const championship_selected = CHAMPIONSHIP_DATA[0].championshipName;
      const spy_getChampSelected = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(championship_selected));
      
      component.ngOnInit();

      expect(spy_getChampSelected).toHaveBeenCalledTimes(1);
      expect(component.championship_selected).toEqual(championship_selected);
    });

    it('should istance _state_btn to length of sport_list', () => {
      const spy_getSport = spyOn(shared_service, "getSportList").and.returnValue(of(SPORT_DATA));
      component['_state_btns'].clear();

      component.ngOnInit();

      expect(component['_state_btns'].size).toBe(SPORT_DATA.length);
    });

    let countTrue = (map:Map<string,boolean>) : number => {
      let count_true:number = 0;
      for(let el of map) {
        if(el[1])
          count_true++;
      }
      return count_true;
    };

    it('should istance all _state_btn values to false', () => {
      const spy_getSport = spyOn(shared_service, "getSportList").and.returnValue(of(SPORT_DATA));
      component['_state_btns'].clear();

      component.ngOnInit();

      const count_true = countTrue(component['_state_btns']);
      expect(count_true).toBe(0);
    });

    it('should istance _active_button to empty string', () => {
      const spy_getSport = spyOn(shared_service, "getSportList").and.returnValue(of(SPORT_DATA));

      component.ngOnInit();

      expect(component['_active_btn']).toBe('');
    });
  });

  describe('Template methods', () => {

    beforeEach(() => {
      component['_state_btns'].clear();
      component['initStateBtns']();
      fixture.detectChanges();
    });

    it('should call filterChampionship and return false when champ.sport and sport.sportId are not equal', () => {
      const sport = SPORT_DATA[0];
      const champ = CHAMPIONSHIP_DATA[2];

      expect(component.filterChampionship(champ, sport)).toBeFalse();
    });

    it('should call filterChampionship and return true when champ.sport and sport.sportId are equal', () => {
      const sport = SPORT_DATA[0];
      const champ = CHAMPIONSHIP_DATA[0];

      expect(component.filterChampionship(champ, sport)).toBeTrue();
    });

    it('should call internal_data.setChampionshipSelected in setChampionshipSelected method', () => {
      const spy_setChampionshipSelected = spyOn(internal_data_service, 'setChampionshipSelected');
      const champ:string = CHAMPIONSHIP_DATA[0].championshipName;

      component.setChampionshipSelected(champ);

      expect(spy_setChampionshipSelected).toHaveBeenCalled();
    });

    it('should no add new element in _state_btn when setStateBtn method is called', () => {
      expect(component['_state_btns'].size).toBe(SPORT_DATA.length);

      component['setStateBtn']('error test');

      expect(component['_state_btns'].size).toBe(SPORT_DATA.length);
    });

    it('should set _state_btns value to true when value of button is false and setStateBtn method is called', 
    () => {  
      expect(component['_state_btns'].get(FOOTBALL)).toBeFalse();
      component['setStateBtn'](FOOTBALL);

      expect(component['_state_btns'].get(FOOTBALL)).toBeTrue();
    });

    it('should set _state_btns value to false when value of button is true and setStateBtn method is called', 
    () => {
      component['setStateBtn'](FOOTBALL);
      expect(component['_state_btns'].get(FOOTBALL)).toBeTrue();
      
      component['setStateBtn'](FOOTBALL);
      expect(component['_state_btns'].get(FOOTBALL)).toBeFalse();
    });

    it('should set _active_btn with text of button when value of button in _state_buttons is false and setStateBtn method is called',
    () => {
      expect(component['_state_btns'].get(FOOTBALL)).toBeFalse();

      component['setStateBtn'](FOOTBALL);

      expect(component['_state_btns'].get(FOOTBALL)).toBeTrue();
      expect(component['_active_btn']).toBe(FOOTBALL);
    });

    it('should set _active_btn with empty string when value of button in _state_buttons is true and setStateBtn method is called',
    () => {
      component['setStateBtn'](FOOTBALL);
      expect(component['_state_btns'].get(FOOTBALL)).toBeTrue();

      component['setStateBtn'](FOOTBALL);
      expect(component['_state_btns'].get(FOOTBALL)).toBeFalse();
      expect(component['_active_btn']).toBe('');
    });

    it('should set _active_btn to empty string and value of button in _state_buttons to false when value of button '+
    'is true and setStateBtn method is called',
    () => {
      component['setStateBtn'](FOOTBALL);
      expect(component['_state_btns'].get(FOOTBALL)).toBeTrue();

      component['setStateBtn'](FOOTBALL);

      expect(component['_state_btns'].get(FOOTBALL)).toBeFalse();
      expect(component['_active_btn']).toBe('');
    });

    let countTrue = (map:Map<string,boolean>) : number => {
      let count_true:number = 0;
      for(let el of map) {
        if(el[1])
          count_true++;
      }
      return count_true;
    };

    it('should setStateBtn method not set more than a value of _state_btns setted to true', () => {
      let count_true = countTrue(component['_state_btns']);
      expect(count_true).toBe(0)

      component['setStateBtn'](FOOTBALL);
      count_true = countTrue(component['_state_btns']);
      expect(count_true).toBe(1);

      component['setStateBtn'](BASKETBALL);
      count_true = countTrue(component['_state_btns']);
      expect(count_true).toBe(1);
    });

    it('should call setStateBtn when toggleSportBtn is called', () => {
      const spy_setState = spyOn<any>(component, "setStateBtn");

      const button:HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      component.toggleSportBtn(button);

      expect(spy_setState).toHaveBeenCalled();
    });

    it('should call toggleSportBtn when toggleSportBtnFromIcon is called', () => {
      const spy_toggleBtn = spyOn(component, "toggleSportBtn");

      const icon:HTMLElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
      component.toggleSportBtnFromIcon(icon);

      expect(spy_toggleBtn).toHaveBeenCalled();
    });

    it('should return true when value in _state_btns is true and isActiveBtn method is called', () => {
      component['_state_btns'].set(FOOTBALL, true);

      const is_active = component.isActiveBtn(FOOTBALL);

      expect(is_active).toBeTrue();
    });

    it('should return false when value in _state_btns is false and isActiveBtn method is called', () => {
      component['_state_btns'].set(FOOTBALL, false);

      const is_active = component.isActiveBtn(FOOTBALL);

      expect(is_active).toBeFalse();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe subscrip_champ when it is not empty and ngOnDestroy is called', () => {
      let spy_subscrip_champ = spyOn(component.subscrip_champ, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy_subscrip_champ).toHaveBeenCalled();
      expect(spy_subscrip_champ).toHaveBeenCalledTimes(1);
    });
  });

});
