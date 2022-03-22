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
import { InternalDataService } from 'src/app/internal-data.service';
import { SharedService } from 'src/app/shared.service';
import { MaterialModule } from 'src/app/material-module';

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
    {path: "home/playerList", redirectTo: '/playerList', pathMatch: "full"},
    {path: 'playerList', component: DummyComponent},
    {path: "home/favoritList", redirectTo: '/favoritList', pathMatch: "full"},
    {path: 'favoritList', component: DummyComponent},
    {path: "home/help", redirectTo: '/help', pathMatch: "full"},
    {path: 'help', component: DummyComponent},
];

describe('ToolbarBaseComponent DOM', () => {
    let component:ToolbarBaseComponent;
    let fixture:ComponentFixture<ToolbarBaseComponent>;
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
                ToolbarBaseComponent
            ],
            providers: [
                SharedService,
                InternalDataService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarBaseComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        shared = TestBed.inject(SharedService);
        internal_data = TestBed.inject(InternalDataService);
    });

    describe('min-width > 800px', () => {
        
        beforeEach(() => {
            window.innerWidth = 800;
        });

        describe("Template elements", () => {

            let findButtonWithIcon = async (regex_text_btn:string, icon:string): Promise<boolean> => {
                const buttons = await loader.getAllHarnesses(MatButtonHarness);
                for(let btn of buttons) {
                    if((await btn.getText()).match(regex_text_btn)) {
                        let i = btn.getAllHarnesses(MatIconHarness.with({name : icon}))
                        if((await i).length > 0) {
                            return true;
                        }
                    }
                }
                return false;
            }

            it('should have button with mat-icon "menu" and text equal to "Categories"', async () => {
                let result = findButtonWithIcon('Categories$', 'menu');
    
                expect((await result).valueOf()).toBeTrue();
            });
        
            it('should have button with mat-icon "help"', async () => {
                const icon = await loader.getAllHarnesses(MatIconHarness.with({name: 'help'}));
                
                expect(icon.length).toBe(1);
            });

            it('should not show link on toolbar when championship_selected is empty', () => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of([]));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of([]));
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").and.returnValue(of(''));

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

            it('should show link "Create team" when championship_selected is not empty', () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, 'Create team')).toBeTrue();
            });

            it('should not show link "Create team" when championship_selected is empty', () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(''));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, 'Create team')).toBeFalse();
            });

            it('should show link "Player list" when championship_selected is not empty', () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, 'Player list')).toBeTrue();
            });

            it('should not show link "Player list" when championship_selected is empty', () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(''));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, 'Player list')).toBeFalse();
            });

            it('should show link "Favorit list" when championship_selected is not empty', () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, 'Favorit list')).toBeTrue();
            });

            it('should not show link "Favorit list" when championship_selected is empty', () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(''));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, 'Favorit list')).toBeFalse();
            });

            it('should show link "My Fanta" when championship_selected is not empty',
            () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, 'My Fanta')).toBeTrue();
            });

            it('should not show link "My Fanta" when championship_selected is empty',
            () => {
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(''));
                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, 'My Fanta')).toBeFalse();
            });

        });

        describe('Template actions', () => {

            it('should set style class "toolbar-two-element" to mat-toolbar when championship_selected is empty', () => {
                const spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected").and.returnValue(of(''));
                fixture.detectChanges();

                const toolbar = fixture.debugElement.query(By.css('.mat-toolbar'));
                expect(toolbar != undefined).toBeTrue();

                expect(toolbar.nativeElement.className.includes('toolbar-two-element')).toBeTrue();
                expect(toolbar.nativeElement.className.includes('toolbar-six-element')).toBeFalse();
            });

            it('should set style class "toolbar-six-element" to mat-toolbar when championship_selected is not empty', () => {
                const spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();

                const toolbar = fixture.debugElement.query(By.css('.mat-toolbar'));
                expect(toolbar != undefined).toBeTrue();

                expect(toolbar.nativeElement.className.includes('toolbar-six-element')).toBeTrue();
                expect(toolbar.nativeElement.className.includes('toolbar-two-element')).toBeFalse();
            });

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

            it('should replace style class "primary-color-dark" with "link-toolbar-color to "Create team" ' +
            'link when isActiveLink return true', () => {
                let spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of('Create team'));
                component.setChampionshipSelected(CHAMPIONSHIP_DATA[0].championshipName);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, "Create team");
                expect(link != undefined).toBeTrue();
                
                expect(component.isActiveLink("Create team")).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });

            it('should replace style class "primary-color-dark" with "link-toolbar-color to "Player list" ' +
            'link when isActiveLink return true', () => {
                let spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of('Player list'));
                component.setChampionshipSelected(CHAMPIONSHIP_DATA[0].championshipName);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, "Player list");
                expect(link != undefined).toBeTrue();
                
                expect(component.isActiveLink("Player list")).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });

            it('should replace style class "primary-color-dark" with "link-toolbar-color to "Favorit list" ' +
            'link when isActiveLink return true', () => {
                let spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of('Favorit list'));
                component.setChampionshipSelected(CHAMPIONSHIP_DATA[0].championshipName);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, "Favorit list");
                expect(link != undefined).toBeTrue();
                
                expect(component.isActiveLink("Favorit list")).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });

            it('should click link "Create team" and replace style class "primary-color-dark" with "link-toolbar-color"', 
            () => {
                let spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of('Create team'));
                component.setChampionshipSelected(CHAMPIONSHIP_DATA[0].championshipName);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, "Create team");
                expect(link != undefined).toBeTrue();
                link.nativeElement.click();

                fixture.detectChanges();
                
                expect(component.isActiveLink("Create team")).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });

            it('should click link "Player list" and replace style class "primary-color-dark" with "link-toolbar-color"', () => {
                let spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of('Player list'));
                component.setChampionshipSelected(CHAMPIONSHIP_DATA[0].championshipName);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, "Player list");
                expect(link != undefined).toBeTrue();
                link.nativeElement.click();

                fixture.detectChanges();
                
                expect(component.isActiveLink("Player list")).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });

            it('should click link "Favorit list" and replace style class "primary-color-dark" with "link-toolbar-color"', () => {
                let spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of('Favorit list'));
                component.setChampionshipSelected(CHAMPIONSHIP_DATA[0].championshipName);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, "Favorit list");
                expect(link != undefined).toBeTrue();
                link.nativeElement.click();

                fixture.detectChanges();
                
                expect(component.isActiveLink("Favorit list")).toBeTrue();
                expect(link.nativeElement.className.includes("primary-color-dark")).toBeFalse();
                expect(link.nativeElement.className.includes("link-toolbar-color")).toBeTrue();
            });

            it('should click link "My Fanta" and set active link to empty string', () => {
                let spy_getIsActive = spyOn(internal_data, "getActiveLink").and.returnValue(of(''));
                component.setChampionshipSelected(CHAMPIONSHIP_DATA[0].championshipName);
                fixture.detectChanges();

                const link_list = fixture.debugElement.queryAll(By.css('.link'));
                const link = getLink(link_list, "My Fanta");
                expect(link != undefined).toBeTrue();
                link.nativeElement.click();

                fixture.detectChanges();

                expect(component.isActiveLink('')).toBeTrue();
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
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                
                fixture.detectChanges();
                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, 'Create team');
                expect(link != undefined).toBeTrue();

                link.click();
                tick();

                expect(location.path()).toBe('/createTeam');
            }));

            it('should navigate to /playerList when link "Player list" is clicked', fakeAsync(() => {
                router.navigate(['/createTeam']);
                tick();
                expect(location.path()).toBe('/createTeam');
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                
                fixture.detectChanges();
                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, 'Player list');
                expect(link != undefined).toBeTrue();

                link.click();
                tick();

                expect(location.path()).toBe('/playerList');
            }));

            it('should navigate to /favoritList when link "Favorit list" is clicked', fakeAsync(() => {
                router.navigate(['/createTeam']);
                tick();
                expect(location.path()).toBe('/createTeam');
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                
                fixture.detectChanges();
                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, 'Favorit list');
                expect(link != undefined).toBeTrue();

                link.click();
                tick();

                expect(location.path()).toBe('/favoritList');
            }));

            it('should navigate to /home when My Fanta link is clicked', fakeAsync(() => {
                router.navigate(['/createTeam']);
                tick();
                expect(location.path()).toBe('/createTeam');
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                
                fixture.detectChanges();
                const link_list = fixture.debugElement.nativeElement.querySelectorAll('a');
                const link = getLinkFromList(link_list, 'My Fanta');
                expect(link != undefined).toBeTrue();

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
                expect(button != undefined).toBeTrue();

                button.click();
                tick();

                expect(location.path()).toBe('/help');
            }));
        });
    });
});
