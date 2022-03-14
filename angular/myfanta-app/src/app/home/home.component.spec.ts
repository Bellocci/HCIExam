import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SharedService } from '../shared.service';
import { HomeComponent } from './home.component';
import { InternalDataService } from '../internal-data.service';

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

  let sportsList = SPORT_DATA;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        HomeComponent
      ],
      providers : [
        SharedService,
        InternalDataService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    shared_service = TestBed.inject(SharedService);
    internal_data_service = TestBed.inject(InternalDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('testing subscribe method into loadSportsList is getting called', fakeAsync(() => {
      let spy_sport = spyOn(shared_service, 'getSportList').and.returnValue(of([sportsList]));
      let spy_sub = spyOn(shared_service.getSportList(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(spy_sport).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call loadSportsList and get response as empty array', fakeAsync(() => {
      let spy_loadSports = spyOn(shared_service, 'getSportList').and.returnValue(of([]));

      component.ngOnInit();
      tick();

      expect(spy_loadSports).toHaveBeenCalledTimes(1);
      expect(component.sportsList).toEqual([]);
    }));

    it('should call loadSportsList and get response as array', fakeAsync(() => {
      let spy_loadSports = spyOn(shared_service, 'getSportList').and.returnValue(of(sportsList));

      component.ngOnInit();
      tick();

      expect(spy_loadSports).toHaveBeenCalledTimes(1);
      expect(component.sportsList).toEqual(sportsList);
    }));

    it('testing subscribe method into loadChampionshipsList is getting called', fakeAsync(() => {
      let spy_champ = spyOn(shared_service, 'getChampionshipList').and.returnValue(of([]));
      let spy_sub = spyOn(shared_service.getChampionshipList(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(spy_champ).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call loadChampionshipsList and get response as empty array', fakeAsync(() => {
      let spy_loadChamp = spyOn(shared_service, 'getChampionshipList').and.returnValue(of([]));

      component.ngOnInit();
      tick();

      expect(spy_loadChamp).toHaveBeenCalledTimes(1);
      expect(component.championshipsList).toEqual([]);
    }));

    it('should call loadChampionshipsList and get response as array', fakeAsync(() => {
      let spy_loadChamp = spyOn(shared_service, 'getChampionshipList').and.returnValue(of(CHAMPIONSHIP_DATA));

      component.ngOnInit();
      tick();

      expect(spy_loadChamp).toHaveBeenCalledTimes(1);
      expect(component.championshipsList).toEqual(CHAMPIONSHIP_DATA);
    }));

    it('testing subscribe method into getChampionshipSelected is getting called', fakeAsync(() => {
      let spy_champ = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(''));
      let spy_sub = spyOn(internal_data_service.getChampionshipSelected(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(spy_champ).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    }));

    it('should call getChampionshipSelected and get response as empty string', fakeAsync(() => {
      let spy_getChampSelected = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(''));
      
      component.ngOnInit();
      tick();

      expect(spy_getChampSelected).toHaveBeenCalledTimes(1);
      expect(component.championship_selected).toEqual('');
    }));

    it('should call getChampionshipSelected and get response as string', fakeAsync(() => {
      let championship_selected = CHAMPIONSHIP_DATA[0].championshipName;
      let spy_getChampSelected = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(championship_selected));
      
      component.ngOnInit();
      tick();

      expect(spy_getChampSelected).toHaveBeenCalledTimes(1);
      expect(component.championship_selected).toEqual(championship_selected);
    }));
  });

  describe('Methods called in home.component.html', () => {
    it('should call filterChampionship and return false when champ.sport and sport.sportId are not equal', () => {
      let sport = SPORT_DATA[0];
      let champ = CHAMPIONSHIP_DATA[2];

      expect(component.filterChampionship(champ, sport)).toBeFalse();
    });

    it('should call filterChampionship and return true when champ.sport and sport.sportId are equal', () => {
      let sport = SPORT_DATA[0];
      let champ = CHAMPIONSHIP_DATA[0];

      expect(component.filterChampionship(champ, sport)).toBeTrue();
    });

    it('should call internal_data.setChampionshipSelected in setChampionshipSelected method when champ is empty', () => {
      let spy_setChampionshipSelected = spyOn(internal_data_service, 'setChampionshipSelected');
      let champ:string = '';

      component.setChampionshipSelected(champ);

      expect(spy_setChampionshipSelected).toHaveBeenCalledTimes(1);
    });

    it('should call internal_data.setChampionshipSelected in setChampionshipSelected method when champ is a string', () => {
      let spy_setChampionshipSelected = spyOn(internal_data_service, 'setChampionshipSelected');
      let champ:string = CHAMPIONSHIP_DATA[0].championshipName;

      component.setChampionshipSelected(champ);

      expect(spy_setChampionshipSelected).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe subscrip_champ when it is not empty and ngOnDestroy is called', () => {
      let spy_subscrip_champ = spyOn(component.subscrip_champ, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy_subscrip_champ).toHaveBeenCalled();
      expect(spy_subscrip_champ).toHaveBeenCalledTimes(1);
    })
  })

});
