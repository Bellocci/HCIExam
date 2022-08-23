import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconHarness } from '@angular/material/icon/testing';

import { Component, DebugElement } from '@angular/core';
import { Location } from "@angular/common";
import { Router, Routes } from '@angular/router';
import { of } from 'rxjs';

import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ToolbarBaseComponent } from './toolbar-base.component';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { MaterialModule } from 'src/app/material-module';
import { TeamDataService } from 'src/app/service/team-data.service';
import { SharedService } from 'src/app/service/shared.service';

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
    },
]

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

describe('ToolbarBaseComponent DOM', () => {
    let component:ToolbarBaseComponent;
    let fixture:ComponentFixture<ToolbarBaseComponent>;
    let loader: HarnessLoader;
    let internal_data:InternalDataService;
    let team_data:TeamDataService;
    let shared: SharedService;
    let location: Location;
    let router: Router

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes(routes),
            ],
            declarations: [
                ToolbarBaseComponent
            ],
            providers: [
                InternalDataService,
                TeamDataService,
                SharedService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarBaseComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        internal_data = TestBed.inject(InternalDataService);
        team_data = TestBed.inject(TeamDataService);
        shared = TestBed.inject(SharedService);
        fixture.detectChanges();

    });

    describe('min-width : 801px', () => {

        describe("Template elements", () => {

            it('should have button with icon "menu" and text equal to "Categories"', fakeAsync(async () => {
                const categories_menu = await loader.getAllHarnesses(MatButtonHarness.with({text : 'menu Categories'}))

                expect(categories_menu.length).toBe(1)
            }));
        
            it('should have button with mat-icon "help"', async () => {
                const icon = await loader.getAllHarnesses(MatButtonHarness.with({text: 'help'}));
                
                expect(icon.length).toBe(1);
            });

            it('should not show link on toolbar when championship_selected is empty', () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").and.returnValue(of(''));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));
                
                expect(link.length).toBe(0)
            });

            let findLink = (link_list:DebugElement[], text_link:string) : boolean => {
                for(let link of link_list) {
                    if(link.nativeElement.text.trim() == text_link) {
                        return true;
                    }
                }
                return false;
            };

            it('should show link "Create team" when getChampionshipSelected method return a not empty string', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const links_list = fixture.debugElement.queryAll(By.css('.link'));
                const find_link = findLink(links_list, LINK_PAGE_NAME[0].name);                
                
                expect(find_link).toBeTrue();
            });

            it('should not show link "Create team" when getChampionshipSelected method return an empty string', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('');
                fixture.detectChanges();

                const links_list = fixture.debugElement.queryAll(By.css('.link'));
                const find_link = findLink(links_list, LINK_PAGE_NAME[0].name); 

                expect(find_link).toBeFalse();
            });

            it('should not show link "Player list" when getChampionshipSelected method return a not empty string', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const links_list = fixture.debugElement.queryAll(By.css('.link'));
                const find_link = findLink(links_list, LINK_PAGE_NAME[1].name);

                expect(find_link).toBeTrue();
            });

            it('should not show link "Player list" when getChampionshipSelected method return an empty string', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('');
                fixture.detectChanges();

                const links_list = fixture.debugElement.queryAll(By.css('.link'));
                const find_link = findLink(links_list, LINK_PAGE_NAME[1].name);

                expect(find_link).toBeFalse();
            });

            it('should show link "Favorit list" when getChampionshipSelected method return a not empty string', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const links_list = fixture.debugElement.queryAll(By.css('.link'));
                const find_link = findLink(links_list, LINK_PAGE_NAME[2].name);

                expect(find_link).toBeTrue();
            });

            it('should not show link "Favorit list" when getChampionshipSelected method return an empty string', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('');
                fixture.detectChanges();

                const links_list = fixture.debugElement.queryAll(By.css('.link'));
                const find_link = findLink(links_list, LINK_PAGE_NAME[2].name);

                expect(find_link).toBeFalse();
            });

            it('should show link "My Fanta" when getChampionshipSelected method return a not empty string',
            () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const links_list = fixture.debugElement.queryAll(By.css('.link'));
                const find_link = findLink(links_list, LINK_PAGE_NAME[3].name);

                expect(find_link).toBeTrue();
            });

            it('should not show link "My Fanta" when getChampionshipSelected method return an empty string',
            () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('');
                fixture.detectChanges();

                const links_list = fixture.debugElement.queryAll(By.css('.link'));
                const find_link = findLink(links_list, LINK_PAGE_NAME[3].name);

                expect(find_link).toBeFalse();
            });

        });

        describe('Template actions', () => {

            let getButtonWithIcon  = async (regex_text_btn:string, icon:string): Promise<MatButtonHarness | undefined> => {
                const buttons = await loader.getAllHarnesses(MatButtonHarness);
                for(let btn of buttons) {
                    if((await btn.getText()).match(regex_text_btn)) {
                        let i = btn.getAllHarnesses(MatIconHarness.with({name : icon}))
                        if((await i).length > 0) {
                            return btn;
                        }
                    }
                }
                return undefined;
            };
    
            it('should click Categories button and call openSidenavFromChild method', async () => {
                let spy_sidenavChild = spyOn(component, "openSidenavFromChild");
                let button:MatButtonHarness | undefined = await getButtonWithIcon('Categories$', 'menu');
                expect(button).not.toBe(undefined);

                await button?.click();
    
                expect(spy_sidenavChild).toHaveBeenCalled();
            });

            let getLink = (link_list:DebugElement[], text_link:string) : any | undefined => {
                for(let link of link_list) {
                    if(link.nativeElement.text.trim() == text_link) {
                        return link;
                    }
                }
                return undefined;
            }

            it('should call setActiveLink method when "Create team" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_setActiveLink = spyOn(component, "setActiveLink");
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[0].name);
                link.nativeElement.click();
                
                expect(spy_setActiveLink).toHaveBeenCalled();
            });

            it('should call clearData method when "Create team" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_clear = spyOn(component, "clearData");
                fixture.detectChanges();
                
                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[0].name);
                link.nativeElement.click();

                expect(spy_clear).toHaveBeenCalled();
            });

            it('should call setActiveLink method when "Player list" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_setActiveLink = spyOn(component, "setActiveLink");
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[1].name);
                link.nativeElement.click();
                
                expect(spy_setActiveLink).toHaveBeenCalled();
            });

            it('should call clearData method when "Player list" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_clear = spyOn(component, "clearData");
                fixture.detectChanges();
                
                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[1].name);
                link.nativeElement.click();

                expect(spy_clear).toHaveBeenCalled();
            });

            it('should call setActiveLink method when "Favorit list" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_setActiveLink = spyOn(component, "setActiveLink");
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[2].name);
                link.nativeElement.click();
                
                expect(spy_setActiveLink).toHaveBeenCalled();
            });

            it('should call clearData method when "Favorit list" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_clear = spyOn(component, "clearData");
                fixture.detectChanges();
                
                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[2].name);
                link.nativeElement.click();

                expect(spy_clear).toHaveBeenCalled();
            });

            it('should call setActiveLink method when "Blacklist" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_setActiveLink = spyOn(component, "setActiveLink");
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[3].name);
                link.nativeElement.click();
                
                expect(spy_setActiveLink).toHaveBeenCalled();
            });

            it('should call clearData method when "Blacklist" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_clear = spyOn(component, "clearData");
                fixture.detectChanges();
                
                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[3].name);
                link.nativeElement.click();

                expect(spy_clear).toHaveBeenCalled();
            });

            it('should call setActiveLink method when "My Fanta" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_setActiveLink = spyOn(component, "setActiveLink");
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[3].name);
                link.nativeElement.click();
                
                expect(spy_setActiveLink).toHaveBeenCalled();
            });

            it('should call clearData method when "My Fanta" link is clicked', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_clear = spyOn(component, "clearData");
                fixture.detectChanges();
                
                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[4].name);
                link.nativeElement.click();

                expect(spy_clear).toHaveBeenCalled();
            });
        });

        describe('Template styles', () => {

            it('should set style class "toolbar-simple" to mat-toolbar when getChampionshipSelected method return an empty string', 
            () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('');
                fixture.detectChanges();

                const toolbar = fixture.debugElement.query(By.css('.mat-toolbar'));
                expect(toolbar != undefined).toBeTrue();

                expect(toolbar.nativeElement.className.includes('toolbar-simple')).toBeTrue();
                expect(toolbar.nativeElement.className.includes('toolbar-complete')).toBeFalse();
            });

            it('should set style class "toolbar-complete" to mat-toolbar when getChampionshipSelected method return a not empty string', 
            () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const toolbar = fixture.debugElement.query(By.css('.mat-toolbar'));
                expect(toolbar != undefined).toBeTrue();

                expect(toolbar.nativeElement.className.includes('toolbar-complete')).toBeTrue();
                expect(toolbar.nativeElement.className.includes('toolbar-simple')).toBeFalse();
            });

            let getLink = (link_list:DebugElement[], text_link:string) : any | undefined => {
                for(let link of link_list) {
                    if(link.nativeElement.text.trim() == text_link) {
                        return link;
                    }
                }
                return undefined;
            }

            it('should replace style class "primary-color-dark" with "link-toolbar-color" to "Create team" ' +
            'link when isActiveLink method return true', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_getIsActive = spyOn(component, "isActiveLink").and.returnValue(true);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[0].name);
                
                expect(component.isActiveLink(LINK_PAGE_NAME[0].name)).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });

            it('should replace style class "primary-color-dark" with "link-toolbar-color" to "Player list" ' +
            'link when isActiveLink method return true', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_getIsActive = spyOn(component, "isActiveLink").and.returnValue(true);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[1].name);
                expect(link != undefined).toBeTrue();
                
                expect(component.isActiveLink(LINK_PAGE_NAME[1].name)).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });

            it('should replace style class "primary-color-dark" with "link-toolbar-color" to "Favorit list" ' +
            'link when isActiveLink return true', () => {
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                const spy_getIsActive = spyOn(component, "isActiveLink").and.returnValue(true);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, LINK_PAGE_NAME[2].name);
                expect(link != undefined).toBeTrue();
                
                expect(component.isActiveLink(LINK_PAGE_NAME[2].name)).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });
        });

        describe('Routing', () => {

            beforeEach(() => {
                router = TestBed.inject(Router);
                location = TestBed.inject(Location);
                router.initialNavigation();
            });

            let getLinkFromList = (link_list:any[], text_link:string) : any | undefined => {
                for(let link of link_list) {
                    if(link.text.trim() == text_link) {
                        return link;
                    }
                }
                return undefined;
            }

            it('should navigate to /createTeam when link "Create team" is clicked', fakeAsync(() => {
                router.navigate(['/playerList']);
                tick();
                expect(location.path()).toBe('/playerList');
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');                
                fixture.detectChanges();

                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, LINK_PAGE_NAME[0].name);
                link.click();
                tick();

                expect(location.path()).toBe('/createTeam');
            }));

            it('should navigate to /playerList when link "Player list" is clicked', fakeAsync(() => {
                router.navigate(['/createTeam']);
                tick();
                expect(location.path()).toBe('/createTeam');
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, LINK_PAGE_NAME[1].name);
                link.click();
                tick();

                expect(location.path()).toBe('/playerList');
            }));

            it('should navigate to /favoritList when link "Favorit list" is clicked', fakeAsync(() => {
                router.navigate(['/createTeam']);
                tick();
                expect(location.path()).toBe('/createTeam');
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, LINK_PAGE_NAME[2].name);
                link.click();
                tick();

                expect(location.path()).toBe('/favoritList');
            }));

            it('should navigate to /blackList when link "Blacklist" is clicked', fakeAsync(() => {
                router.navigate(['/createTeam']);
                tick();
                expect(location.path()).toBe('/createTeam');
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, LINK_PAGE_NAME[3].name);
                link.click();
                tick();

                expect(location.path()).toBe('/blackList');
            }));

            it('should navigate to /home when My Fanta link is clicked', fakeAsync(() => {
                router.navigate(['/createTeam']);
                tick();
                expect(location.path()).toBe('/createTeam');
                const spy_champ_selected = spyOn(component, "getChampionshipSelected").and.returnValue('test');
                fixture.detectChanges();

                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, LINK_PAGE_NAME[4].name);
                link.click();
                tick();

                expect(location.path()).toBe('/home');
            }));

            let getIconButton  = (icon:string): any | undefined => {
                const button_list = fixture.debugElement.nativeElement.querySelectorAll('button');
                for(let btn of button_list) {
                    if(btn.innerText.trim() == icon) {
                        return btn;
                    }
                }
                return undefined;
            }

            it('should navigate to /help when Help button is clicked', fakeAsync(() => {
                router.navigate(['/home']);
                tick();
                expect(location.path()).toBe('/home');
                const button_list = fixture.debugElement.nativeElement.querySelectorAll('button');
                const button = getIconButton("help");

                button.click();
                tick();

                expect(location.path()).toBe('/help');
            }));
        });
    });
});
