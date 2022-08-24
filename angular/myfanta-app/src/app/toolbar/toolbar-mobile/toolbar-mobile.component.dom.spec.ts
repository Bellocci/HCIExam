import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatToolbarHarness } from '@angular/material/toolbar/testing';

import { Router, Routes } from "@angular/router";
import { Location } from "@angular/common";

import { By } from "@angular/platform-browser";

import { of } from "rxjs";
import { Component, DebugElement } from "@angular/core";

import { ToolbarMobileComponent } from "./toolbar-mobile.component";
import { MaterialModule } from "src/app/material-module"
import { InternalDataService } from "src/app/service/internal-data.service";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TeamDataService } from "src/app/service/team-data.service";
import { SharedService } from "src/app/service/shared.service";

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

const LINK_PAGE_NAME = [
    {
        name : 'Create team'
    },
    {
        name : 'Player list'
    },
    {
        name : 'Favorit list'
    },
    {
        name : 'Blacklist'
    },
    {
        name : 'My Fanta'
    }
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
    {path: "home/playerList", redirectTo: '/playerList', pathMatch: "full"},
    {path: 'playerList', component: DummyComponent},
    {path: "home/favoritList", redirectTo: '/favoritList', pathMatch: "full"},
    {path: 'favoritList', component: DummyComponent},
    {path: "home/blackList", redirectTo: '/blackList', pathMatch: "full"},
    {path: 'blackList', component: DummyComponent},
    {path: "home/help", redirectTo: '/help', pathMatch: "full"},
    {path: 'help', component: DummyComponent},
];

describe("ToolbarMobileComponent DOM", () => {

    let component: ToolbarMobileComponent;
    let fixture: ComponentFixture<ToolbarMobileComponent>;
    let loader: HarnessLoader;
    let internal_data: InternalDataService;
    let team_data: TeamDataService;
    let shared: SharedService;
    let router: Router;
    let location: Location

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes),
                MaterialModule,
                NoopAnimationsModule,
            ],
            declarations: [
                ToolbarMobileComponent
            ],
            providers : [
                InternalDataService,
                SharedService,
                TeamDataService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarMobileComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        internal_data = TestBed.inject(InternalDataService);
        shared = TestBed.inject(SharedService);
        team_data = TestBed.inject(TeamDataService);
        fixture.detectChanges();
    });

    describe('Template elements', () => {

        let findButton = async (btns_list:MatButtonHarness[], btn_txt:string) : Promise<boolean> => {
            for(let btn of btns_list) {
                if((await btn.getText()).trim() == btn_txt) {
                    return true;
                }
            }
            return false;
        }

        it('should have icon button "menu"', fakeAsync(async () => {
            const btns_list = await loader.getAllHarnesses(MatButtonHarness);

            let find_button = await findButton(btns_list, 'menu');

            expect(find_button).toBeTrue();
        }));

        it('should have icon button "help"', fakeAsync(async () => {
            const btns_list = await loader.getAllHarnesses(MatButtonHarness);

            let find_button = await findButton(btns_list, 'help');

            expect(find_button).toBeTrue();
        }));

        it('should show second mat-toolbar-row when getChampionshipSelected method return a not empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            const toolbar = await loader.getHarness(MatToolbarHarness);

            expect(await toolbar.hasMultipleRows()).toBeTrue();
            expect((await toolbar.getRowsAsText()).length).toBe(2);
        }));

        it('should not show second mat-toolbar-row when getChampionshipSelected method return an empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('');
            fixture.detectChanges();
            const toolbar = await loader.getHarness(MatToolbarHarness);

            expect((await toolbar.getRowsAsText()).length).toBe(1);
        }));

        let findLink = (link_list:DebugElement[], text_link:string) : boolean => {
            for(let link of link_list) {
                if(link.nativeElement.text.trim() == text_link) {
                    return true;
                }
            }
            return false;
        };

        it('should show "My Fanta" link when getChampionshipSelected method return an empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const find_link = findLink(links_list, LINK_PAGE_NAME[4].name)

            expect(find_link).toBeTrue();
        }));

        it('should not show "My Fanta" link when getChampionshipSelected method return an empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('');
            fixture.detectChanges();
            
            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const find_link = findLink(links_list, LINK_PAGE_NAME[4].name)

            expect(find_link).toBeFalse();
        }));

        it('should show "Create team" link when getChampionshipSelected method return a not empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            
            const link = fixture.debugElement.queryAll(By.css('a'));

            expect(findLink(link, LINK_PAGE_NAME[0].name)).toBeTrue();
        }));

        it('should not show "Create team" link when getChampionshipSelected method return an empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('');
            fixture.detectChanges();
            
            const link = fixture.debugElement.queryAll(By.css('a'));

            expect(findLink(link, LINK_PAGE_NAME[0].name)).toBeFalse();
        }));

        it('should show "Player list" link when getChampionshipSelected method return a not empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            
            const link = fixture.debugElement.queryAll(By.css('a'));

            expect(findLink(link, LINK_PAGE_NAME[1].name)).toBeTrue();
        }));

        it('should not show "Player list" link when getChampionshipSelected method return an empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('');
            fixture.detectChanges();
            
            const link = fixture.debugElement.queryAll(By.css('a'));

            expect(findLink(link, LINK_PAGE_NAME[1].name)).toBeFalse();
        }));

        it('should show "Favorit list" link when getChampionshipSelected method return a not empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            
            const link = fixture.debugElement.queryAll(By.css('a'));

            expect(findLink(link, LINK_PAGE_NAME[2].name)).toBeTrue();
        }));

        it('should not show "Favorit list" link when getChampionshipSelected method return an empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('');
            fixture.detectChanges();
            
            const link = fixture.debugElement.queryAll(By.css('a'));

            expect(findLink(link, LINK_PAGE_NAME[2].name)).toBeFalse();
        }));

        it('should show "Blacklist" link when getChampionshipSelected method return a not empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            
            const link = fixture.debugElement.queryAll(By.css('a'));

            expect(findLink(link, LINK_PAGE_NAME[3].name)).toBeTrue();
        }));

        it('should not show "Blacklist" link when getChampionshipSelected method return an empty string', fakeAsync(async () => {
            let spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('');
            fixture.detectChanges();
            
            const link = fixture.debugElement.queryAll(By.css('a'));

            expect(findLink(link, LINK_PAGE_NAME[3].name)).toBeFalse();
        }));
    });

    describe('Actions', () => {

        let getButton = async (btns_list:MatButtonHarness[], btn_name:string) : Promise<MatButtonHarness | undefined> => {
            for(let btn of btns_list) {
                if((await btn.getText()).trim() == btn_name) {
                    return btn;
                }
            }
            return undefined;
        }

        it('should click icon button "menu" and call openSidenavFromChild method', fakeAsync(async () => {
            let spy_openSidenav = spyOn(component, "openSidenavFromChild");

            const btns_list = await loader.getAllHarnesses(MatButtonHarness);
            const btn_menu = await getButton(btns_list, 'menu');
            expect(btn_menu).not.toBe(undefined);

            await btn_menu?.click();

            expect(spy_openSidenav).toHaveBeenCalled();
        }));

        let getLink = (link_list:DebugElement[], text_link:string) : any | undefined => {
            for(let link of link_list) {
                if(link.nativeElement.text.trim() == text_link) {
                    return link;
                }
            }
            return undefined;
        }

        it('should call setActiveLink method when "My Fanta" link is clicked', () => {
            const spy_setActiveLink = spyOn(component, "setActiveLink");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[4].name);
            link.nativeElement.click();

            expect(spy_setActiveLink).toHaveBeenCalled();
        });

        it('should call clearData method when "My Fanta" link is clicked', () => {
            const spy_clear = spyOn(component, "clearData");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[4].name);
            link.nativeElement.click();

            expect(spy_clear).toHaveBeenCalled();
        });

        it('should set championship_selected to empty string when "My Fanta" btn is clicked', () => {
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            const spy_setChampSelected = spyOn(component, "setChampionshipSelected");
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[4].name);
            link.nativeElement.click();

            expect(spy_setChampSelected).toHaveBeenCalledWith('');
        });

        it('should call setActiveLink method when link "Create team" is clicked', () => {
            const spy_setActiveLink = spyOn(component, "setActiveLink");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[0].name);
            link.nativeElement.click();

            expect(spy_setActiveLink).toHaveBeenCalled();
        });

        it('should call clearData method when link "Create team" is clicked', () => {
            const spy_clear = spyOn(component, "clearData");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[0].name);
            link.nativeElement.click();

            expect(spy_clear).toHaveBeenCalled();
        });

        it('should call setActiveLink method when link "Player list" is clicked', () => {
            const spy_setActiveLink = spyOn(component, "setActiveLink");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[1].name);
            expect(link).not.toBe(undefined);
            link.nativeElement.click();

            expect(spy_setActiveLink).toHaveBeenCalled();
        });

        it('should call clearData method when link "Player list" is clicked', () => {
            const spy_clear = spyOn(component, "clearData");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[1].name);
            link.nativeElement.click();

            expect(spy_clear).toHaveBeenCalled();
        });

        it('should call setActiveLink method when link "Favorit list" is clicked', () => {
            const spy_setActiveLink = spyOn(component, "setActiveLink");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[2].name);
            link.nativeElement.click();

            expect(spy_setActiveLink).toHaveBeenCalled();
        });

        it('should call clearData method when link "Favorit list" is clicked', () => {
            const spy_clear = spyOn(component, "clearData");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[2].name);
            link.nativeElement.click();

            expect(spy_clear).toHaveBeenCalled();
        });

        it('should call setActiveLink method when link "Blacklist" is clicked', () => {
            const spy_setActiveLink = spyOn(component, "setActiveLink");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[3].name);
            link.nativeElement.click();

            expect(spy_setActiveLink).toHaveBeenCalled();
        });

        it('should call clearData method when link "Blacklist" is clicked', () => {
            const spy_clear = spyOn(component, "clearData");
            const spy_getChampSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[3].name);
            link.nativeElement.click();

            expect(spy_clear).toHaveBeenCalled();
        });
    });

    describe('Template styles', () => {

        it('should set "toolbar-simple" class style to first mat-toolbar-row when getChampionshipSelected method return an empty string',
        () => {
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('');
            fixture.detectChanges();

            const toolbar_row = fixture.debugElement.query(By.css('.mat-toolbar-row'));

            expect(toolbar_row.nativeElement.className.includes('toolbar-simple')).toBeTrue();
            expect(toolbar_row.nativeElement.className.includes('toolbar-complete')).toBeFalse();
        });

        it('should set "toolbar-complete" class style to first mat-toolbar-row when getChampionshipSelected method return a not empty string',
        () => {
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const toolbar_row = fixture.debugElement.query(By.css('.mat-toolbar-row'));

            expect(toolbar_row.nativeElement.className.includes('toolbar-complete')).toBeTrue();
            expect(toolbar_row.nativeElement.className.includes('toolbar-simple')).toBeFalse();
        });

        let getLink = (link_list:DebugElement[], text_link:string) : any | undefined => {
            for(let link of link_list) {
                if(link.nativeElement.text.trim() == text_link) {
                    return link;
                }
            }
            return undefined;
        }

        it('should set "link-toolbar-color" style to "Create team" link when isActiveLink return true', () => {
            const spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of(LINK_PAGE_NAME[0].name));
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            
            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[0].name);
            
            expect(component.isActiveLink(LINK_PAGE_NAME[0].name)).toBeTrue();
            expect(link.nativeElement.className.includes('link-toolbar-color')).toBeTrue();
        });

        it('should set "link-toolbar-color" style to "Player list" link when isActiveLink return true', () => {
            const spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of(LINK_PAGE_NAME[1].name));
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            
            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[1].name);
            
            expect(component.isActiveLink(LINK_PAGE_NAME[1].name)).toBeTrue();
            expect(link.nativeElement.className.includes('link-toolbar-color')).toBeTrue();
        });

        it('should set "link-toolbar-color" style to "Favorit list" link when isActiveLink return true', () => {
            const spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of(LINK_PAGE_NAME[2].name));
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            
            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[2].name);
            
            expect(component.isActiveLink(LINK_PAGE_NAME[2].name)).toBeTrue();
            expect(link.nativeElement.className.includes('link-toolbar-color')).toBeTrue();
        });

        it('should set "link-toolbar-color" style to "Blacklist" link when isActiveLink return true', () => {
            const spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of(LINK_PAGE_NAME[3].name));
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();
            
            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[3].name);
            
            expect(component.isActiveLink(LINK_PAGE_NAME[3].name)).toBeTrue();
            expect(link.nativeElement.className.includes('link-toolbar-color')).toBeTrue();
        });
    });

    describe('Routing', () => {

        beforeEach(() => {
            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
            router.initialNavigation();
        });

        let getLink = (link_list:DebugElement[], text_link:string) : any | undefined => {
            for(let link of link_list) {
                if(link.nativeElement.text.trim() == text_link) {
                    return link;
                }
            }
            return undefined;
        }

        it('should navigate to "/createTeam" when "Create team" link is clicked', fakeAsync(() => {
            router.navigate(['/playerList']);
            tick();
            expect(location.path()).toBe('/playerList');
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[0].name);
            link.nativeElement.click();
            tick();

            expect(location.path()).toBe('/createTeam');
        }));

        it('should navigate to "/playerList" when "Player list" link is clicked', fakeAsync(() => {
            router.navigate(['/createTeam']);
            tick();
            expect(location.path()).toBe('/createTeam');
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[1].name);
            link.nativeElement.click();
            tick();

            expect(location.path()).toBe('/playerList');
        }));

        it('should navigate to "/favoritList" when "Favorit list" link is clicked', fakeAsync(() => {
            router.navigate(['/createTeam']);
            tick();
            expect(location.path()).toBe('/createTeam');
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[2].name);
            link.nativeElement.click();
            tick();

            expect(location.path()).toBe('/favoritList');
        }));

        it('should navigate to "/blackList" when "Blacklist" link is clicked', fakeAsync(() => {
            router.navigate(['/createTeam']);
            tick();
            expect(location.path()).toBe('/createTeam');
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[3].name);
            link.nativeElement.click();
            tick();

            expect(location.path()).toBe('/blackList');
        }));

        it('should navigate to "/home" when "My Fanta" link is clicked', fakeAsync(() => {
            router.navigate(['/createTeam']);
            tick();
            expect(location.path()).toBe('/createTeam');
            const spy_champSelected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
            fixture.detectChanges();

            const links_list = fixture.debugElement.queryAll(By.css('a'));
            const link = getLink(links_list, LINK_PAGE_NAME[4].name);
            link.nativeElement.click();
            tick();

            expect(location.path()).toBe('/home');
        }));

        let getButton = async (btns_list:MatButtonHarness[], btn_name:string) : Promise<MatButtonHarness | undefined> => {
            for(let btn of btns_list) {
                if((await btn.getText()).trim() == btn_name) {
                    return btn;
                }
            }
            return undefined;
        }

        it('should navigate to "/help" when "help" button is clicked', fakeAsync(async () => {
            await router.navigate(['/home']); 
            expect(location.path()).toBe('/home');
            const spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected").
                and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
            fixture.detectChanges();

            const btns_list = await loader.getAllHarnesses(MatButtonHarness);
            const btn_myfanta = await getButton(btns_list, "help");
            expect(btn_myfanta).not.toBe(undefined);
            await btn_myfanta?.click();
            
            expect(location.path()).toBe('/help');
        }));
    });
});