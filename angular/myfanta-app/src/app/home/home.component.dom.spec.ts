import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material-module";
import { SharedService } from "../shared.service";
import { HomeComponent } from "./home.component";


const SPORT_DATA = [
    {
        sportId : 1, 
        sportName: 'Football soccer'
    },
    {
        sportId : 2,
        sportName : 'Basketball'
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
        championshipName : 'NBA',
        sport : 2
    },
];

describe('HomeComponent DOM', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let loader: HarnessLoader;
    let shared: SharedService

    const FOOTBALL = SPORT_DATA[0].sportName;
    const BASKETBALL = SPORT_DATA[1].sportName;
    
    const SERIE_A = CHAMPIONSHIP_DATA[0].championshipName;
    const PREMIERE_LEAGUE = CHAMPIONSHIP_DATA[1].championshipName;
    const NBA = CHAMPIONSHIP_DATA[2].championshipName;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                MaterialModule
            ],
            declarations: [
                HomeComponent
            ],
            providers: [
                SharedService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        shared = TestBed.inject(SharedService);
        fixture.detectChanges();
    });

    beforeEach(() => {
        component.sportsList = SPORT_DATA;
        component.championshipsList = CHAMPIONSHIP_DATA;
        fixture.detectChanges();
    });

    describe('Template', () => {

        it('should show a number of buttons as number of sports', () => {
            const btns_list = fixture.debugElement.queryAll(By.css('button'));

            expect(btns_list.length).toBe(SPORT_DATA.length);
        });

        let findButton = (btns_list:DebugElement[], text_btn:string, icon:string) : boolean => {
            for(let btn of btns_list) {
                const text = btn.nativeElement.textContent.trim().toLowerCase();
                text_btn = text_btn.toLowerCase();
                if(text == (text_btn + icon)) {
                    return true;
                }
            }
            return false;
        }

        it('should every button show name of sport with "keyboard_arrow_down" icon', () => {
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
            const icon:string = 'keyboard_arrow_down';

            expect(findButton(btns_list, FOOTBALL, icon)).toBeTrue();
            expect(findButton(btns_list, BASKETBALL, icon)).toBeTrue();
        });

        it('should show button text to sportName with "keyboard_arrow_down"',
        () => {
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
            const icon:string = 'keyboard_arrow_down';

            expect(findButton(btns_list, FOOTBALL, icon)).toBeTrue();
            expect(findButton(btns_list, BASKETBALL, icon)).toBeTrue();
        });

        let findChampionship = (link_list:DebugElement[], champ_name:string) : boolean => {
            const icon:string = 'arrow_right'
            for(let link of link_list) {
                const link_text = link.nativeElement.textContent.trim();
                if(link_text == (icon + ' ' + champ_name)) {
                    return true;
                }
            }
            return false;
        }

        it('should show championship list when button is active', () => {
            const spy_active = spyOn(component, "isActiveBtn").
                withArgs(FOOTBALL).and.returnValue(true).
                withArgs(BASKETBALL).and.returnValue(false);
            fixture.detectChanges();

            let link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(2);
            expect(findChampionship(link_champ_list, SERIE_A)).toBeTrue();
            expect(findChampionship(link_champ_list, PREMIERE_LEAGUE)).toBeTrue();
        });

        it('should hide championship list when button is not active', () => {
            const spy_active = spyOn(component, "isActiveBtn").and.returnValue(false);
            fixture.detectChanges();

            let link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(0);
        });
    });

    describe('Actions', () => {
        let getButton = (button_list:DebugElement[], btn_text:string) : DebugElement | undefined => {
            for(let btn of button_list) {
                if(btn.nativeElement.textContent.includes(btn_text)) {
                    return btn;
                }
            }   
            return undefined;
        }

        
        let findChampionship = (link_list:DebugElement[], champ_name:string) : boolean => {
            const icon:string = 'arrow_right'
            for(let link of link_list) {
                const link_text = link.nativeElement.textContent.trim();
                if(link_text == (icon + ' ' + champ_name)) {
                    return true;
                }
            }
            return false;
        }

        it('should show championship list when they are hidden and button is clicked', () => {
            let link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(0);

            const btn_list = fixture.debugElement.queryAll(By.css('button'));
            const btn_football = getButton(btn_list, FOOTBALL);
            expect(btn_football).not.toBe(undefined);

            btn_football?.nativeElement.click();
            fixture.detectChanges();

            link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(2);
            expect(findChampionship(link_champ_list, SERIE_A)).toBeTrue();
            expect(findChampionship(link_champ_list, PREMIERE_LEAGUE)).toBeTrue();
        });

        it('should hide championship list when they are showed and button is clicked', fakeAsync(() => {
            const btn_list = fixture.debugElement.queryAll(By.css('button'));
            const btn_football = getButton(btn_list, FOOTBALL);
            expect(btn_football).not.toBe(undefined);

            btn_football?.nativeElement.click();
            fixture.detectChanges();
            tick();

            let link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(2);

            btn_football?.nativeElement.click();
            fixture.detectChanges();
            tick();

            link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(0);
            expect(findChampionship(link_champ_list, SERIE_A)).toBeFalse();
            expect(findChampionship(link_champ_list, PREMIERE_LEAGUE)).toBeFalse();
            expect(findChampionship(link_champ_list, NBA)).toBeFalse();
        }));

        it('should hide championship list when they are showed and another button is clicked', fakeAsync(() => {
            const btn_list = fixture.debugElement.queryAll(By.css('button'));
            const btn_football = getButton(btn_list, FOOTBALL);
            expect(btn_football).not.toBe(undefined);

            btn_football?.nativeElement.click();
            fixture.detectChanges();
            tick();

            let link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(2);
            expect(findChampionship(link_champ_list, SERIE_A)).toBeTrue();
            expect(findChampionship(link_champ_list, PREMIERE_LEAGUE)).toBeTrue();

            const btn_basketball = getButton(btn_list, BASKETBALL);
            btn_basketball?.nativeElement.click();
            fixture.detectChanges();
            tick();

            link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(1);
            expect(findChampionship(link_champ_list, NBA)).toBeTrue();
        }));

        it('should call setActivePage method when championship is clicked', fakeAsync(() => {
            const spy_activePage = spyOn(component, 'setActivePage');
            component['_state_btns'].set(BASKETBALL, true);
            component['_active_btn'] = BASKETBALL;
            fixture.detectChanges();
            tick();

            const link_champ_list = fixture.debugElement.queryAll(By.css('a'));
            expect(link_champ_list.length).toBe(1)
            const link_nba = link_champ_list[0];

            link_nba.nativeElement.click();
            fixture.detectChanges();

            expect(spy_activePage).toHaveBeenCalled();
        }));
    });

    describe('Style', () => {

        it('should set "btn-sport-close" style class when button is not active', () => {

            const btn_football = fixture.debugElement.query(By.css('button'));
            
            expect(component['isActiveBtn'](SPORT_DATA[0].sportName)).toBeFalse();
            expect(btn_football.nativeElement.className.includes('btn-sport-close')).toBeTrue();
        });

        it('should set "btn-sport-open" style class when button is active', () => {
            const btn_football = fixture.debugElement.query(By.css('button'));
            component['_state_btns'].set(SPORT_DATA[0].sportName, true);
            fixture.detectChanges();
            
            expect(component['isActiveBtn'](SPORT_DATA[0].sportName)).toBeTrue();
            expect(btn_football.nativeElement.className.includes('btn-sport-open')).toBeTrue();
        });

        it('should set "icon-close-btn" style class to icon "keyboard_arrow_down" when relative button is not active', () => {
            const spy_isActive = spyOn(component, "isActiveBtn").and.returnValue(false);
            fixture.detectChanges(); 

            const icon_list = fixture.debugElement.queryAll(By.css('mat-icon'));
            const icon = icon_list[0];

            expect(icon.nativeElement.className.includes('icon-close-btn')).toBeTrue();
            expect(icon.nativeElement.className.includes('icon-open-btn')).toBeFalse();
        });

        it('should set "icon-open-btn" style class to icon "keyboard_arrow_down" when relative button is active', () => {
            const spy_isActive = spyOn(component, "isActiveBtn").
                withArgs(FOOTBALL).and.returnValue(true).
                withArgs(BASKETBALL).and.returnValue(false);
            fixture.detectChanges();

            const icon_list = fixture.debugElement.queryAll(By.css('mat-icon'));
            const football_arrow = icon_list[0];

            expect(football_arrow.nativeElement.className.includes('icon-open-btn')).toBeTrue();
            expect(football_arrow.nativeElement.className.includes('icon-close-btn')).toBeFalse();
        });
    });
});