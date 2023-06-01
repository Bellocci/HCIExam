import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatLegacyButtonHarness as MatButtonHarness } from '@angular/material/legacy-button/testing';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';

import { MaterialModule } from "../material-module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { ToolbarComponent } from "./toolbar.component";
import { SharedService } from "../service/shared.service";
import { of } from "rxjs";
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { InternalDataService } from "../service/internal-data.service";
import { Location } from "@angular/common";
import { Router, Routes } from "@angular/router";
import { By } from "@angular/platform-browser";

const SPORT_DATA = [
    {
        sportId : 1,
        sportName : 'Football soccer'
    },
    {
        sportId : 2,
        sportName : 'Basketball'
    },
];

const SPORT_FOOTBALL = [
    {
        sportId : 1,
        sportName : 'Football soccer'
    }
];

const CHAMPIONSHIP_FOOTBALL = [
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

@Component({
})
class DummyComponent {
}

const routes: Routes = [
    {path: "", redirectTo: '/home', pathMatch: "full"},
    {path: 'home', component: DummyComponent},
    {path: "home/createTeam", redirectTo: '/createTeam', pathMatch: "full"},
    {path: 'createTeam', component: DummyComponent},
];

describe('AppComponent DOM', () => {
    let component:ToolbarComponent;
    let fixture:ComponentFixture<ToolbarComponent>;
    let loader: HarnessLoader;
    let shared: SharedService;
    let internal_data:InternalDataService;
    let location: Location;
    let router: Router

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes(routes),
            ],
            declarations: [
                ToolbarComponent
            ],
            providers: [
                SharedService,
                InternalDataService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        shared = TestBed.inject(SharedService);
        internal_data = TestBed.inject(InternalDataService);
    });

    describe('Template elements', () => {

        let findButtonWithIcon = async (text_btn:string, icon:string): Promise<boolean> => {
            const buttons = await loader.getAllHarnesses(MatButtonHarness);
            for(let btn of buttons) {
                let text = (await btn.getText()).trim();
                if(text == (icon + ' ' + text_btn)) {
                    return true
                }
            }
            return false;
        }

        it('should have button with mat-icon "arrow_left" and text equal to "Championships"', async () => {
            const result = findButtonWithIcon('Championships', 'arrow_back');

            expect((await result).valueOf()).toBeTrue();
        });

        it('should have slidenav with mode "over"', async () => {
            const sidenav = await loader.getHarness(MatSidenavHarness);

            expect(await sidenav.getMode()).toBe('over');
        });

        it('should have mat-expansion-panel as number of sports ', async () => {
            const spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_DATA));
            const mat_panel = await loader.getAllHarnesses(MatExpansionPanelHarness);

            expect(mat_panel.length).toBe(SPORT_DATA.length);
            let index = 0;
            for(let panel of mat_panel) {
                expect(await panel.getTitle()).toBe(SPORT_DATA[index].sportName);
                index += 1;
            }
        });

        it('Each mat-panel show only championships related to its sport', async () => {
            const spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_DATA));
            const spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_DATA));

            const mat_panel = await loader.getAllHarnesses(MatExpansionPanelHarness);

            expect(mat_panel.length).toBe(SPORT_DATA.length);
            
            const mat_football = mat_panel[0];
            expect(await mat_football.getTitle()).toBe(SPORT_DATA[0].sportName);
            expect((await mat_football.getTextContent()).includes(CHAMPIONSHIP_DATA[0].championshipName)).toBeTrue();
            expect((await mat_football.getTextContent()).includes(CHAMPIONSHIP_DATA[1].championshipName)).toBeTrue();
            expect((await mat_football.getTextContent()).includes(CHAMPIONSHIP_DATA[2].championshipName)).toBeFalse();
            
            const mat_basketball = mat_panel[1];
            expect(await mat_basketball.getTitle()).toBe(SPORT_DATA[1].sportName);
            expect((await mat_basketball.getTextContent()).includes(CHAMPIONSHIP_DATA[0].championshipName)).toBeFalse();
            expect((await mat_basketball.getTextContent()).includes(CHAMPIONSHIP_DATA[1].championshipName)).toBeFalse();
            expect((await mat_basketball.getTextContent()).includes(CHAMPIONSHIP_DATA[2].championshipName)).toBeTrue();
        });

        it('should show toolbar-base component and not toolbar-mobile component when isMobileLayout method return false', () => {
            const spy_mobile = spyOn(component, "isMobileLayout").and.returnValue(false);
            fixture.detectChanges();

            const toolbar_base = fixture.debugElement.queryAll(By.css('app-toolbar-base'));
            const toolbar_mobile = fixture.debugElement.queryAll(By.css('app-toolbar-mobile'));

            expect(toolbar_base.length).toBe(1);
            expect(toolbar_mobile.length).toBe(0);
        });

        it('should show toolbar-mobile component and not toolbar-base component when isMobileLayout method return true', () => {
            const spy_mobile = spyOn(component, "isMobileLayout").and.returnValue(true);
            fixture.detectChanges();

            const toolbar_base = fixture.debugElement.queryAll(By.css('app-toolbar-base'));
            const toolbar_mobile = fixture.debugElement.queryAll(By.css('app-toolbar-mobile'));

            expect(toolbar_base.length).toBe(0);
            expect(toolbar_mobile.length).toBe(1);
        });

        it('should show h1 element when activeLink is not an empty string', () => {
            const spy_link = spyOn(component, "getActiveLink").and.returnValue('test');
            fixture.detectChanges();

            const h1 = fixture.debugElement.queryAll(By.css('h1'));

            expect(h1.length).toBe(1);
        });

        it('should not show h1 element when activeLink is an empty string', () => {
            const spy_link = spyOn(component, "getActiveLink").and.returnValue('');
            fixture.detectChanges();

            const h1 = fixture.debugElement.queryAll(By.css('h1'));

            expect(h1.length).toBe(0);
        });
    });

    describe('Actions', () => {

        it('should open sidenav when openSidenav method is called', async () => {
            const sidenav = await loader.getHarness(MatSidenavHarness);

            component.openSidenav();
            fixture.detectChanges();

            expect(await sidenav.isOpen()).toBeTrue();
        });

        it('should close sidenav when closeSidenav method is called', async () => {
            const sidenav = await loader.getHarness(MatSidenavHarness);

            component.closeSidenav();
            fixture.detectChanges();

            expect(await sidenav.isOpen()).toBeFalse();
        });

        let getButtonWithIcon  = async (text_btn:string, icon:string): Promise<MatButtonHarness | undefined> => {
            const buttons = await loader.getAllHarnesses(MatButtonHarness);
            for(let btn of buttons) {
                let text = (await btn.getText()).trim();
                if(text == (icon + ' ' + text_btn)) {
                    return btn;
                }
            }
            return undefined;
        }

        it('should close sidenav when button "Championships" with icon "arrow_back" is clicked', async () => {
            const sidenav = await loader.getHarness(MatSidenavHarness);
            component.openSidenav();

            expect(await sidenav.isOpen()).toBeTrue();

            const button_close:MatButtonHarness | undefined = await getButtonWithIcon('Championships', 'arrow_back');
            expect(button_close).not.toBe(undefined);
            button_close?.click();
            fixture.detectChanges();

            expect(await sidenav.isOpen()).toBeFalse();
        });

        it('should expanded mat-panel when is clicked', async () => {
            const spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
            const spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));

            const mat_football = await loader.getHarness(MatExpansionPanelHarness);
            expect(component.panelOpenState).toBeFalse();

            await mat_football.expand();

            expect(component.panelOpenState).toBeTrue();
        });

        it('should collapsed mat-panel when is open and is clicked', async () => {
            const spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
            const spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));

            const mat_football = await loader.getHarness(MatExpansionPanelHarness);
            await mat_football.expand();
            expect(component.panelOpenState).toBeTrue();

            await mat_football.collapse();

            expect(component.panelOpenState).toBeFalse();
        });

        it('should only expand one mat-panel at a time', async () => {
            const spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_DATA));
            const spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_DATA));
            const mat_panel = await loader.getAllHarnesses(MatExpansionPanelHarness);
            const mat_football = mat_panel[0];
            const mat_basketball = mat_panel[1];

            await mat_football.expand();
            expect(await mat_football.isExpanded()).toBeTrue();
            expect(await mat_basketball.isExpanded()).toBeFalse();

            await mat_basketball.expand();
            expect(await mat_basketball.isExpanded()).toBeTrue();
            expect(await mat_football.isExpanded()).toBeFalse();
        });

        it('should click link championship into mat-panel and call setChampionshipSelected from internal-data service', 
        () => {
            const spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
            const spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));
            const spy_champ_selected = spyOn(internal_data, "setChampionshipSelected");
            fixture.detectChanges();

            const link = fixture.debugElement.nativeElement.querySelectorAll('a');            
            const link_serieA = link[0];
            link_serieA.click();

            expect(spy_champ_selected).toHaveBeenCalled();
        });

        it('should click link championship into mat-panel and call internal_data.setActiveLink', () => {
            const spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
            const spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));
            const spy_setActiveLink = spyOn(internal_data, "setActiveLink");
            fixture.detectChanges();

            const link = fixture.debugElement.nativeElement.querySelectorAll('a');            
            const link_serieA = link[0];
            link_serieA.click();

            expect(spy_setActiveLink).toHaveBeenCalled();
        })
    });

    describe('Routing', () => {

        beforeEach(() => {
            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
            router.initialNavigation();
        });

        it('should navigate to /createTeam when championship link inside mat-panel is clicked', fakeAsync(() => {
            router.navigate(['/home']);
            tick();
            expect(location.path()).toBe('/home');
            const spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
            const spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));
            fixture.detectChanges();
            
            const link = fixture.debugElement.nativeElement.querySelectorAll('a');            
            const link_serieA = link[0];
            link_serieA.click();
            tick();

            expect(location.path()).toBe('/createTeam');
        }));
    });
});

