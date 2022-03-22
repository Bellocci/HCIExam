import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatToolbarHarness } from '@angular/material/toolbar/testing';

import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from "rxjs";
import { DebugElement } from "@angular/core";

import { ToolbarMobileComponent } from "./toolbar-mobile.component";
import { MaterialModule } from "src/app/material-module"
import { InternalDataService } from "src/app/internal-data.service";

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
]

describe("ToolbarMobileComponent DOM", () => {

    let component: ToolbarMobileComponent;
    let fixture: ComponentFixture<ToolbarMobileComponent>;
    let loader: HarnessLoader;
    let internal_data: InternalDataService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                ToolbarMobileComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarMobileComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        internal_data = TestBed.inject(InternalDataService);
    });

    describe('max-width < 800px', () => {

        beforeEach(() => {
            window.innerWidth = 500;
        });

        describe('Template elements', () => {

            let findIconButton = async (btn_list:MatButtonHarness[], icon_name:string) : Promise<boolean> => {
                for(let btn of btn_list) {
                    if((await btn.getText()).trim() == icon_name) {
                        return true;
                    }
                }
                return false;
            }

            it('should have icon button "menu"', async () => {
                const btn_list = await loader.getAllHarnesses(MatButtonHarness);

                let find_button = await findIconButton(btn_list, 'menu');

                expect(find_button).toBeTrue();
            });

            it('should have icon button "help"', async () => {
                const btn_list = await loader.getAllHarnesses(MatButtonHarness);

                let find_button = await findIconButton(btn_list, 'help');

                expect(find_button).toBeTrue();
            });

            it('should show icon button "home" when championship_selected is not empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();
                const btn_list = await loader.getAllHarnesses(MatButtonHarness);

                let find_button = await findIconButton(btn_list, 'home');

                expect(find_button).toBeTrue();
            });

            it('should not show icon button "home" when championship_selected is empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(''));
                fixture.detectChanges();
                const btn_list = await loader.getAllHarnesses(MatButtonHarness);

                let find_button = await findIconButton(btn_list, 'home');

                expect(find_button).toBeFalse();
            });

            it('should show second mat-toolbar-row when championship_selected is not empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();
                const toolbar = await loader.getHarness(MatToolbarHarness);

                expect(await toolbar.hasMultipleRows()).toBeTrue();
                expect((await toolbar.getRowsAsText()).length).toBe(2);
            });

            it('should not show second mat-toolbar-row when championship_selected is empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(''));
                    fixture.detectChanges();
                const toolbar = await loader.getHarness(MatToolbarHarness);

                expect((await toolbar.getRowsAsText()).length).toBe(1);
            });

            let findLink = (link_list:DebugElement[], text_link:string) : boolean => {
                for(let link of link_list) {
                    if(link.nativeElement.text.trim() == text_link) {
                        return true;
                    }
                }
                return false;
            };

            it('should show "Create team" link when championship_selected is not empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();
                
                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, LINK_PAGE_NAME[0].name)).toBeTrue();
            });

            it('should not show "Create team" link when championship_selected is empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(''));
                fixture.detectChanges();
                
                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, LINK_PAGE_NAME[0].name)).toBeFalse();
            });

            it('should show "Player list" link when championship_selected is not empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();
                
                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, LINK_PAGE_NAME[1].name)).toBeTrue();
            });

            it('should not show "Player list" link when championship_selected is empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(''));
                fixture.detectChanges();
                
                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, LINK_PAGE_NAME[1].name)).toBeFalse();
            });

            it('should show "Favorit list" link when championship_selected is not empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(CHAMPIONSHIP_DATA[0].championshipName));
                fixture.detectChanges();
                
                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, LINK_PAGE_NAME[2].name)).toBeTrue();
            });

            it('should not show "Favorit list" link when championship_selected is empty', async () => {
                let spy_getChampSelected = spyOn(internal_data, "getChampionshipSelected")
                    .and.returnValue(of(''));
                fixture.detectChanges();
                
                const link = fixture.debugElement.queryAll(By.css('.link'));

                expect(findLink(link, LINK_PAGE_NAME[2].name)).toBeFalse();
            });
        });
    });
});