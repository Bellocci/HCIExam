import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { SharedService } from './shared.service';
import { InternalDataService } from './internal-data.service';

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

describe('AppComponent', () => {

  let component:AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let shared_service:SharedService;
  let internal_data_service:InternalDataService;

  let championship_selected:string;
  let sportsList = SPORT_DATA;
  let championshipsList = CHAMPIONSHIP_DATA;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers : [
        SharedService, 
        InternalDataService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'myfanta-app'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component.title).toEqual('myfanta-app');
  });

  describe("ngOnInit", () => {

    beforeEach(() => {
      championship_selected = '';
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      internal_data_service = TestBed.inject(InternalDataService);
      shared_service = TestBed.inject(SharedService);
    });

    it('testing subscribe method into getChampionshipSelected is getting called', fakeAsync(() => {
      let champSpy = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(championship_selected));
      let subSpy = spyOn(internal_data_service.getChampionshipSelected(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(champSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    }));

    it('should call getChamprionshipSelected and return an empty string', fakeAsync(() => {
      let champSpy = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(championship_selected));

      component.ngOnInit();
      tick();

      expect(component.championship_selected).toBeDefined();
      expect(component.championship_selected).toEqual('');
    }));

    it('should call getChampionshipSelected and return a string', fakeAsync(() => {
      championship_selected = 'Football soccer';
      let champSpy = spyOn(internal_data_service, 'getChampionshipSelected').and.returnValue(of(championship_selected));

      component.ngOnInit();
      tick();

      expect(component.championship_selected).toBeDefined();
      expect(component.championship_selected).toEqual('Football soccer');
    }));

    it('testing subscribe method into refreshSportsList is getting called', fakeAsync(() => {
      let sportSpy = spyOn(shared_service, 'getSportList').and.returnValue(of([sportsList]));
      let subSpy = spyOn(shared_service.getSportList(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(sportSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    }));

    it('should call refreshSportsList and get response as empty array', fakeAsync(() => {
      let spy_refreshSportsList = spyOn(shared_service, "getSportList").and.returnValue(of([]));

      component.ngOnInit();
      tick();

      expect(component.sportsList).toBeDefined();
      expect(component.sportsList).toEqual([]);
    }));
  
    it('should call refreshSportsList and get response as array', fakeAsync(() => {
      let spy_refreshSportsList = spyOn(shared_service, "getSportList").and.returnValue(of(SPORT_DATA))
      
      component.ngOnInit();
      tick();

      expect(component.sportsList).toBeDefined();
      expect(component.sportsList).toEqual(SPORT_DATA);
    }));

    it('testing subscribe method into refreshChampionshipsList is getting called', fakeAsync(() => {
      let champSpy = spyOn(shared_service, 'getChampionshipList').and.returnValue(of([championshipsList]));
      let subSpy = spyOn(shared_service.getChampionshipList(), 'subscribe');

      component.ngOnInit();
      tick();

      expect(champSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    }));
  
    it('should call refreshChampionshipsList and get response as empty array', fakeAsync(() => {
      let spy_refreshChampionshipsList = spyOn(shared_service, "getChampionshipList").and.returnValue(of([]));
      
      component.ngOnInit();
      tick();

      expect(component.championshipsList).toBeDefined();
      expect(component.championshipsList).toEqual([]);
    }));
  
    it('should call refreshChampionshipsList and get response as array', fakeAsync(() => {
      let spy_refreshChampionshipsList = spyOn(shared_service, 'getChampionshipList').and.returnValue(of(CHAMPIONSHIP_DATA));

      component.ngOnInit();
      tick();

      expect(component.championshipsList).toBeDefined();
      expect(component.championshipsList).toEqual(CHAMPIONSHIP_DATA);
    }))

  });
});
