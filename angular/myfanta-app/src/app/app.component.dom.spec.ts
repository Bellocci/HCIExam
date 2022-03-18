import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { MatAccordionHarness, MatExpansionPanelHarness } from '@angular/material/expansion/testing';

import { MaterialModule } from "./material-module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { SharedService } from "./shared.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { Component, DebugElement } from "@angular/core";
import { InternalDataService } from "./internal-data.service";
import { Location } from "@angular/common";
import { Router, Routes } from "@angular/router";

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
    {path: "home/playerList", redirectTo: '/playerList', pathMatch: "full"},
    {path: 'playerList', component: DummyComponent},
    {path: "home/favoritList", redirectTo: '/favoritList', pathMatch: "full"},
    {path: 'favoritList', component: DummyComponent},
    {path: "home/help", redirectTo: '/help', pathMatch: "full"},
    {path: 'help', component: DummyComponent},
];

describe('AppComponent DOM', () => {
    let component:AppComponent;
    let fixture:ComponentFixture<AppComponent>;
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
                AppComponent
            ],
            providers: [
                SharedService,
                InternalDataService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        shared = TestBed.inject(SharedService);
        internal_data = TestBed.inject(InternalDataService);
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
    });

    describe('window.width > 1200px', () => {

        beforeEach(() => {
            window.innerWidth = 1200;
        });

        describe('Template elements', () => {

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

            it('should have button with mat-icon "menu" and text equal to "Championships"', async () => {    
                let result = findButtonWithIcon('Championships$', 'menu');
    
                expect((await result).valueOf()).toBeTrue();
            });
        
            it('should have button with mat-icon "help"', async () => {
                const icon = await loader.getAllHarnesses(MatIconHarness.with({name: 'help'}));
                
                expect(icon.length).toBe(1);
            });
    
            it('should have button with mat-icon "arrow_left" and text equal to "Championships"', async () => {
                let result = findButtonWithIcon('Championships$', 'arrow_back');
    
                expect((await result).valueOf()).toBeTrue();
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
            }

            it('should show link "Create team", "Player list", "Favorit list" and "My Fanta" when championship_selected is not empty',
            () => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of([]));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of([]));
                let spy_champ_selected = spyOn(internal_data, "getChampionshipSelected").
                    and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));

                fixture.detectChanges();

                const link = fixture.debugElement.queryAll(By.css('.link'));
                expect(findLink(link, 'Create team')).toBeTrue();
                expect(findLink(link, 'Player list')).toBeTrue();
                expect(findLink(link, 'Favorit list')).toBeTrue();
                expect(findLink(link, 'My Fanta')).toBeTrue();
            })
    
            it('should have slidenav with mode "over"', async () => {
                const sidenav = await loader.getHarness(MatSidenavHarness);
    
                expect(await sidenav.getMode()).toBe('over');
            });
    
            it('should have mat-expansion-panel as number of sports ', async () => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_DATA));
                let mat_panel = await loader.getAllHarnesses(MatExpansionPanelHarness);
    
                expect(mat_panel.length).toBe(SPORT_DATA.length);
                let index = 0;
                for(let panel of mat_panel) {
                    expect(await panel.getTitle()).toBe(SPORT_DATA[index].sportName);
                    index += 1;
                }
            });
    
            it('mat-panel with title "Football soccer" should contains championships "Serie A" and "Premier League"', async () => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));
    
                let mat_panel = await loader.getHarness(MatExpansionPanelHarness);
                let text_element = await mat_panel.getTextContent();
    
                for(let champ of CHAMPIONSHIP_FOOTBALL) {
                    expect(text_element.includes(champ.championshipName)).toBeTrue();
                }
            });
    
            it('mat-panel only show championships related to its sport', async () => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_DATA));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_DATA));
    
                let mat_panel = await loader.getAllHarnesses(MatExpansionPanelHarness);
    
                expect(mat_panel.length).toBe(SPORT_DATA.length);
                
                let mat_football = mat_panel[0];
                expect(await mat_football.getTitle()).toBe(SPORT_DATA[0].sportName);
                expect((await mat_football.getTextContent()).includes(CHAMPIONSHIP_DATA[0].championshipName)).toBeTrue();
                expect((await mat_football.getTextContent()).includes(CHAMPIONSHIP_DATA[1].championshipName)).toBeTrue();
                expect((await mat_football.getTextContent()).includes(CHAMPIONSHIP_DATA[2].championshipName)).toBeFalse();
                
                let mat_basketball = mat_panel[1];
                expect(await mat_basketball.getTitle()).toBe(SPORT_DATA[1].sportName);
                expect((await mat_basketball.getTextContent()).includes(CHAMPIONSHIP_DATA[0].championshipName)).toBeFalse();
                expect((await mat_basketball.getTextContent()).includes(CHAMPIONSHIP_DATA[1].championshipName)).toBeFalse();
                expect((await mat_basketball.getTextContent()).includes(CHAMPIONSHIP_DATA[2].championshipName)).toBeTrue();
            });
        });
    
        describe('Actions', () => {

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
            }
    
            it('should click Championships button and open sidenav', async () => {
                const sidenav = await loader.getHarness(MatSidenavHarness);
    
                let button:MatButtonHarness | undefined = await getButtonWithIcon('Championships$', 'menu');
    
                expect(button).not.toBe(undefined);
                button?.click();
                fixture.detectChanges();
    
                expect(await sidenav.isOpen()).toBeTrue();
            });
    
            it('should close sidenav when button "Championships" with icon "arrow_back" is clicked', async () => {
                const sidenav = await loader.getHarness(MatSidenavHarness);
                component.openSidenav();
    
                expect(await sidenav.isOpen()).toBeTrue();
    
                let button_close:MatButtonHarness | undefined = await getButtonWithIcon('Championships$', 'arrow_back');
                expect(button_close).not.toBe(undefined);
                button_close?.click();
                fixture.detectChanges();
    
                expect(await sidenav.isOpen()).toBeFalse();
            });

            it('should expanded mat-panel when is clicked', async () => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));

                const mat_football = await loader.getHarness(MatExpansionPanelHarness);
                expect(component.panelOpenState).toBeFalse();

                await mat_football.expand();

                expect(component.panelOpenState).toBeTrue();
            });

            it('should collapsed mat-panel when is open and is clicked', async () => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));

                const mat_football = await loader.getHarness(MatExpansionPanelHarness);
                await mat_football.expand();
                expect(component.panelOpenState).toBeTrue();

                await mat_football.collapse();

                expect(component.panelOpenState).toBeFalse();
            });

            it('should only expand one mat-panel at a time', async () => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_DATA));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_DATA));
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
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));
                let spy_champ_selected = spyOn(internal_data, "setChampionshipSelected");

                fixture.detectChanges();
                const link = fixture.debugElement.nativeElement.querySelectorAll('a');            
                const link_serieA = link[0];
                link_serieA.click();

                expect(spy_champ_selected).toHaveBeenCalled();
            });
        });

        describe('Routing', () => {

            it('should navigate to /createTeam when championship link inside mat-panel is clicked', fakeAsync(() => {
                let spy_sport = spyOn(shared, "getSportList").and.returnValue(of(SPORT_FOOTBALL));
                let spy_champ = spyOn(shared, "getChampionshipList").and.returnValue(of(CHAMPIONSHIP_FOOTBALL));
                fixture.detectChanges();
                const link = fixture.debugElement.nativeElement.querySelectorAll('a');            
                const link_serieA = link[0];

                link_serieA.click();
                tick();

                expect(location.path()).toBe('/createTeam');
            }));

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

