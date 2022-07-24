import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/material-module";
import { TabsComponent } from "./tabs.component";
import {MatTabGroupHarness, MatTabHarness } from '@angular/material/tabs/testing';
import { MatButtonHarness } from "@angular/material/button/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {MatGridListHarness, MatGridTileHarness} from '@angular/material/grid-list/testing';

const PLAYER_DATA = [
    {
        playerName : 'Andrea Belotti',
    },
    {
        playerName : 'Ciro Immobile',
    },
    {
        playerName : 'Dusan Vlahovic',
    },
    {
        playerName : 'Antonio Candreva',
    },
]

describe('TabsComponent DOM', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                MaterialModule,
            ],
            declarations: [
                TabsComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Template', () => {

        it('should have only one mat-tab-group', () => {
            const tab_group = fixture.debugElement.queryAll(By.css('mat-tab-group'));

            expect(tab_group.length).toBe(1);
        });

        it('should have three mat-tab', fakeAsync(async () => {
            const mat_tab = await loader.getHarness(MatTabGroupHarness);

            expect((await mat_tab.getTabs()).length).toBe(3);
        }));

        it('should have mat-label with label "Team", "Blacklist", "Options"', fakeAsync(async () => {
            const label_list = await loader.getAllHarnesses(MatTabHarness);

            expect(await label_list[0].getLabel()).toBe('Team');
            expect(await label_list[1].getLabel()).toBe('Blacklist');
            expect(await label_list[2].getLabel()).toBe('Options');
        }));

        it('should have two mat-grid-tile inside tab "Team" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const grid_tiles = await tab_selected.getAllHarnesses(MatGridTileHarness);

            expect(grid_tiles.length).toBe(2);
        }));

        it('should not have mat-grid-list inside tab "Team" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const grid_tiles = await tab_selected.getAllHarnesses(MatGridListHarness);

            expect(grid_tiles.length).toBe(0);
        }));

        it('should show app-table component inside tab "Team" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const table_empty = await tab_selected.getAllChildLoaders('app-table');
            
            expect(table_empty.length).toBe(1);
        }));

        it('should show app-table component inside tab "Team" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const table_empty = await tab_selected.getAllChildLoaders('app-table');
            
            expect(table_empty.length).toBe(1);
        }));

        it('should show button with mat-icon "clear" and text "Clear" inside tab "Team" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Clear'}));

            expect(btn_clear.length).toBe(1);
        }));

        it('should show button with mat-icon "clear" and text "Clear" inside tab "Team" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Clear'}));

            expect(btn_clear.length).toBe(1);
        }));

        it('should show button with mat-icon "delete" and text "Remove" inside tab "Team" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'delete Remove'}));

            expect(btn_remove.length).toBe(1);
        }));

        it('should show button with mat-icon "delete" and text "Remove" inside tab "Team"  when isGridDisplayed method return true',
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'delete Remove'}));

            expect(btn_remove.length).toBe(1);
        }));

        it('should show button with mat-icon "arrow_forward" and text "Blacklist" inside tab "Team" when ' +
        'isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_blacklist = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'arrow_forward Blacklist'}));

            expect(btn_blacklist.length).toBe(1);
        }));

        it('should show button with mat-icon "arrow_forward" and text "Blacklist" inside tab "Team" when ' +
        'isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_blacklist = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'arrow_forward Blacklist'}));

            expect(btn_blacklist.length).toBe(1);
        }));

        it('should have two mat-grid-tile inside tab "Blacklist" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const grid_tiles = await tab_selected.getAllHarnesses(MatGridTileHarness);

            expect(grid_tiles.length).toBe(2);
        }));

        it('should not have mat-grid-list inside tab "Blacklist" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const grid_tiles = await tab_selected.getAllHarnesses(MatGridListHarness);

            expect(grid_tiles.length).toBe(0);
        }));

        it('should show app-table component inside tab "Blacklist" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const table_blacklist = await tab_selected.getAllChildLoaders('app-table');

            expect(table_blacklist.length).toBe(1);
        }));

        it('should show app-table component inside tab "Blacklist" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const table_blacklist = await tab_selected.getAllChildLoaders('app-table');

            expect(table_blacklist.length).toBe(1);
        }));

        it('should show button with mat-icon "clear" and text "Clear" inside tab "Blacklist" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Clear'}));

            expect(btn_clear.length).toBe(1);
        }));

        it('should show button with mat-icon "clear" and text "Clear" inside tab "Blacklist" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Clear'}));

            expect(btn_clear.length).toBe(1);
        }));

        it('should show button with mat-icon "delete" and text "Remove" inside tab "Blacklist" when ' +
        'isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'delete Remove'}));

            expect(btn_remove.length).toBe(1);
        }));

        it('should show button with mat-icon "delete" and text "Remove" inside tab "Blacklist" when ' +
        'isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'delete Remove'}));

            expect(btn_remove.length).toBe(1);
        }));

        it('should have two mat-grid-tile inside tab "Options" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const grid_tiles = await tab_selected.getAllHarnesses(MatGridTileHarness);

            expect(grid_tiles.length).toBe(2);
        }));

        it('should not have mat-grid-list inside tab "Options" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const grid_tiles = await tab_selected.getAllHarnesses(MatGridTileHarness);

            expect(grid_tiles.length).toBe(0);
        }));

        it('should show app-options component inside tab "Options" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const options = await tab_selected.getAllChildLoaders('app-options');

            expect(options.length).toBe(1);
        }));

        it('should show app-options component inside tab "Options" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const options = await tab_selected.getAllChildLoaders('app-options');

            expect(options.length).toBe(1);
        }));

        it('should show button with mat-icon "clear" and text "Reset" inside tab "Options" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_reset = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Reset'}));

            expect(btn_reset.length).toBe(1);
        }));

        it('should show button with mat-icon "clear" and text "Reset" inside tab "Options" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_reset = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Reset'}));

            expect(btn_reset.length).toBe(1);
        }));

        it('should show button with mat-icon "save" and text "Save" inside tab "Options" when isGridDisplayed method return false', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(false);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_save = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'save Save'}));

            expect(btn_save.length).toBe(1);
        }));

        it('should show button with mat-icon "save" and text "Save" inside tab "Options" when isGridDisplayed method return true', 
        fakeAsync(async () => {
            const spy_grid_display = spyOn(component, "isGridDisplayed").and.returnValue(true);
            fixture.detectChanges();
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_save = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'save Save'}));

            expect(btn_save.length).toBe(1);
        }));
    });

    describe('Template methods', () => {

        it('should mat-tab-group call setTab method when selectedTabChange event occurs', fakeAsync(async () => {
            const spy_setTab = spyOn(component, "setTab");
            const tab_selected = 'Blacklist';
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            
            await mat_tab.selectTab({label: tab_selected});

            expect(spy_setTab).toHaveBeenCalledWith(tab_selected);
        }));

        it('should mat-tab-group call setPlayerSelected when selectedTabChange event occurs', fakeAsync(async () => {
            const spy_setPlayer = spyOn(component, "setPlayerSelected");
            const tab_selected = 'Blacklist';
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            
            await mat_tab.selectTab({label: tab_selected});

            expect(spy_setPlayer).toHaveBeenCalled();
        }));

        it('should mat-tab-group call setPlayersToView when selectedTabChange event occurs', fakeAsync(async () => {
            const spy_player_views = spyOn(component, "setPlayersToView");
            const tab_selected = 'Blacklist';
            const mat_tab = await loader.getHarness(MatTabGroupHarness);

            await mat_tab.selectTab({label: tab_selected});

            expect(spy_player_views).toHaveBeenCalledWith(tab_selected);
        }));

        it('should call setBtnRows method when window:resize event occurs', () => {
            const spy_onResize = spyOn(component, "setBtnRows");
            const mat_grid = fixture.debugElement.query(By.css('mat-grid-list'));
            
            window.dispatchEvent(new Event('resize'));
            fixture.detectChanges();

            expect(spy_onResize).toHaveBeenCalled();
        });

        it('should show "Team" tab when is clicked', fakeAsync(async () => {
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Team'});

            expect(await (await mat_tab.getSelectedTab()).getLabel()).toBe('Team');
        }));

        it('should show "Blacklist" tab when is clicked', fakeAsync(async () => {
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Blacklist'});

            expect(await (await mat_tab.getSelectedTab()).getLabel()).toBe('Blacklist');
        }));

        it('should show "Options" tab when is clicked', fakeAsync(async () => {
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Options'});

            expect(await (await mat_tab.getSelectedTab()).getLabel()).toBe('Options');
        }));

        it('should call clearAll method when button "Clear" in "Team" tab is clicked', fakeAsync(async () => {
            const spy_clear = spyOn(component, "clearAll");
            const spy_isDisable = spyOn(component, "isDisableClearTeamBtn").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Clear'}));
            expect(btn_clear.length).toBe(1);

            await btn_clear[0].click();

            expect(spy_clear).toHaveBeenCalled();
        }));

        it('should call removePlayer method when button "Remove" in "Team" tab is clicked', fakeAsync(async () => {
            const spy_remove = spyOn(component, "removePlayer");
            const spy_isDisable = spyOn(component, "isPlayerSelected").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label: 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'delete Remove'}));
            expect(btn_remove.length).toBe(1);

            await btn_remove[0].click();

            expect(spy_remove).toHaveBeenCalled();
        }));

        it('should call moveToBlacklist method when button "Blacklist" in "Team" tab is clicked', fakeAsync(async () => {
            const spy_blacklist = spyOn(component, "moveToBlacklist");
            const spy_isDisable = spyOn(component, "isPlayerSelected").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_blacklist = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'arrow_forward Blacklist'}));
            expect(btn_blacklist.length).toBe(1);

            await btn_blacklist[0].click();

            expect(spy_blacklist).toHaveBeenCalled();
        }));

        it('should call clearAll method when button "Clear" in "Blacklist" tab is clicked', fakeAsync(async () => {
            const spy_clearBlacklist = spyOn(component, "clearAll");
            const spy_isDisable = spyOn(component, "isClearBlacklistBtnDisabled").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Clear'}));
            expect(btn_clear.length).toBe(1);

            await btn_clear[0].click();

            expect(spy_clearBlacklist).toHaveBeenCalled();
        }));

        it('should call removePlayer method when button "Remove" from "Blacklist" tab is clicked', fakeAsync(async () => {
            const spy_removePlayer = spyOn(component, "removePlayer");
            const spy_playerSelected = spyOn(component, "isPlayerSelected").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'delete Remove'}));
            expect(btn_remove.length).toBe(1);

            await btn_remove[0].click();
            
            expect(spy_removePlayer).toHaveBeenCalled();
        }));

        it('should call resetOptions method when button "Reset" from "Options" tab is clicked', fakeAsync(async () => {
            const spy_reset = spyOn(component, "resetOptions");
            
            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_reset = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'clear Reset'}));
            expect(btn_reset.length).toBe(1);

            await btn_reset[0].click();

            expect(spy_reset).toHaveBeenCalled();
        }));

        it('should call saveOptions method when button "Save" from "Options" tab is clicked', fakeAsync(async () => {
            const spy_save = spyOn(component, "saveOptions");
            const spy_isDisable = spyOn(component, "isSaveBtnDisabled").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_save = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'save Save'}));
            expect(btn_save.length).toBe(1);

            await btn_save[0].click();

            expect(spy_save).toHaveBeenCalled();
        }));
    });

    describe('Template style', () => {

        it('should button "Clear" to be disabled in "Team" tab when isDisableClearTeamBtn method return true', 
        fakeAsync(async () => {
            const spy_isDisable = spyOn(component, "isDisableClearTeamBtn").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'clear Clear'}));

            expect(btn_clear.length).toBe(1);
            expect(await btn_clear[0].isDisabled()).toBeTrue();
        }));

        it('should button "Clear" not to be disabled in "Team" tab when isDisableClearTeamBtn method return false',
        fakeAsync(async () => {
            const spy_isDisable = spyOn(component, "isDisableClearTeamBtn").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'clear Clear'}));

            expect(btn_clear.length).toBe(1);
            expect(await btn_clear[0].isDisabled()).toBeFalse();
        }));

        it('should button "Remove" to be disabled in "Team" tab when isPlayerSelected return false',
        fakeAsync(async () => {
            const spy_playerSelected = spyOn(component, "isPlayerSelected").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'delete Remove'}));

            expect(btn_remove.length).toBe(1);
            expect(await btn_remove[0].isDisabled()).toBeTrue();
        }));

        it('should button "Remove" not to be disabled in "Team" tab when isPlayerSelected return true', 
        fakeAsync(async () => {
            const spy_playerSelected = spyOn(component, "isPlayerSelected").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'delete Remove'}));

            expect(btn_remove.length).toBe(1);
            expect(await btn_remove[0].isDisabled()).toBeFalse();
        }));

        it('should button "Blacklist" to be disabled in "Team" tab when isPlayerSelected return false', fakeAsync(async () => {
            const spy_playerSelected = spyOn(component, "isPlayerSelected").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_blacklist = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'arrow_forward Blacklist'}));

            expect(btn_blacklist.length).toBe(1);
            expect(await btn_blacklist[0].isDisabled()).toBeTrue();
        }));

        it('should button "Blacklist" not to be disabled in "Team" tab when isPlayerSelected return true', fakeAsync(async () => {
            const spy_playerSelected = spyOn(component, "isPlayerSelected").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Team'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_blacklist = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'arrow_forward Blacklist'}));

            expect(btn_blacklist.length).toBe(1);
            expect(await btn_blacklist[0].isDisabled()).toBeFalse();
        }));

        it('should button "Clear" to be disabled in "Blacklist" tab when isClearBlacklistBtnDisabled method return true', 
        fakeAsync(async () => {
            const spy_isDisable = spyOn(component, "isClearBlacklistBtnDisabled").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'clear Clear'}));

            expect(btn_clear.length).toBe(1);
            expect(await btn_clear[0].isDisabled()).toBeTrue();
        }));

        it('should button "Clear" not to be disabled in "Blacklist" tab when isClearBlacklistBtnDisabled method return false', 
        fakeAsync(async () => {
            const spy_isDisable = spyOn(component, "isClearBlacklistBtnDisabled").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_clear = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'clear Clear'}));

            expect(btn_clear.length).toBe(1);
            expect(await btn_clear[0].isDisabled()).toBeFalse();
        }));

        it('should button "Remove" to be disabled in "Blacklist" tab when isPlayerSelected return false', fakeAsync(async () => {
            const spy_playerSelected = spyOn(component, "isPlayerSelected").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'delete Remove'}));

            expect(btn_remove.length).toBe(1);
            expect(await btn_remove[0].isDisabled()).toBeTrue();
        }));

        it('should button "Remove" not to be disabled in "Blacklist" tab when isPlayerSelected return true', fakeAsync(async () => {
            const spy_playerSelected = spyOn(component, "isPlayerSelected").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Blacklist'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_remove = await tab_selected.getAllHarnesses(MatButtonHarness.with({text: 'delete Remove'}));

            expect(btn_remove.length).toBe(1);
            expect(await btn_remove[0].isDisabled()).toBeFalse();
        }));

        it('should button "Save" to be disabled in "Options" tab when isSaveBtnDisabled method return true', fakeAsync(async () => {
            const spy_isDisable = spyOn(component, "isSaveBtnDisabled").and.returnValue(true);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_save = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'save Save'}));
            
            expect(btn_save.length).toBe(1);
            expect(await btn_save[0].isDisabled()).toBeTrue();
        }));

        it('should button "Save" not to be disabled in "Options" tab when isSaveBtnDisabled method return false', 
        fakeAsync(async () => {
            const spy_isDisable = spyOn(component, "isSaveBtnDisabled").and.returnValue(false);
            fixture.detectChanges();

            const mat_tab = await loader.getHarness(MatTabGroupHarness);
            await mat_tab.selectTab({label : 'Options'});
            await fixture.whenStable();

            const tab_selected = await mat_tab.getSelectedTab();
            const btn_save = await tab_selected.getAllHarnesses(MatButtonHarness.with({text : 'save Save'}));
            
            expect(btn_save.length).toBe(1);
            expect(await btn_save[0].isDisabled()).toBeFalse();
        }));
    });
})