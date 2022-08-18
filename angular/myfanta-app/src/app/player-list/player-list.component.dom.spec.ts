import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { async, ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material-module";
import { PlayerListComponent } from "./player-list.component";
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from "@angular/platform-browser";
import { MatInputHarness } from "@angular/material/input/testing";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatChipHarness, MatChipListboxHarness } from '@angular/material/chips/testing';
import { Component } from "@angular/core";
import { MatSelectHarness } from "@angular/material/select/testing";



describe('PlayerListComponent DOM', () => {
    let component: PlayerListComponent;
    let fixture: ComponentFixture<PlayerListComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [ 
                PlayerListComponent,
                MockTableComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });

    describe('Template', () => {

        it('should have button with text "P"', fakeAsync(async () => {
            const buttons = await loader.getAllHarnesses(MatButtonHarness.with({text : 'P'}));

            expect(buttons.length).toBe(1);
        }));

        it('should have button with text "D"', fakeAsync(async () => {
            const buttons = await loader.getAllHarnesses(MatButtonHarness.with({text : 'D'}));

            expect(buttons.length).toBe(1);
        }));

        it('should have button with text "C"', fakeAsync(async () => {
            const buttons = await loader.getAllHarnesses(MatButtonHarness.with({text : 'C'}));

            expect(buttons.length).toBe(1);
        }));

        it('should have button with text "A"', fakeAsync(async () => {
            const buttons = await loader.getAllHarnesses(MatButtonHarness.with({text : 'A'}));

            expect(buttons.length).toBe(1);
        }));

        it('should have a mat-chip-list when isShortSelectedTeam method return false', fakeAsync(async () => {
            const spy_short_select = spyOn(component, "isShortSelectedTeam").and.returnValue(false);
            fixture.detectChanges();
            const chipList = await loader.getAllHarnesses(MatChipListboxHarness);

            expect(chipList.length).toBe(1);
        }));

        it('should mat-chip-list have a mat-chip for each team returned by getTeam method', fakeAsync(async () => {
            const spy_short_select = spyOn(component, "isShortSelectedTeam").and.returnValue(false);
            const spy_team = spyOn(component, "getTeam").and.returnValue(TEAM_DICT);
            fixture.detectChanges();
            const chipList = await loader.getHarness(MatChipListboxHarness);
            
            const chips = await chipList.getChips();

            expect(chips.length).toBe(TEAMS.length);
            expect(await chips[0].getText()).toEqual(TEAMS[0]);
            expect(await chips[1].getText()).toEqual(TEAMS[1]);
            expect(await chips[2].getText()).toEqual(TEAMS[2]);
        }));

        it('should have a select when isShortSelectedTeam method return true', fakeAsync(async () => {
            const spy_short_select = spyOn(component, "isShortSelectedTeam").and.returnValue(true);
            fixture.detectChanges();
            const select = await loader.getAllHarnesses(MatSelectHarness);

            expect(select.length).toBe(1);
        }));

        it('should select has an option for each team returned by getTeam method', fakeAsync(async () => {
            const spy_short_select = spyOn(component, "isShortSelectedTeam").and.returnValue(true);
            const spy_team = spyOn(component, "getTeam").and.returnValue(TEAM_DICT);
            fixture.detectChanges();
            const select = await loader.getHarness(MatSelectHarness);

            await select.open();
            const options = await select.getOptions();

            expect(options.length).toBe(TEAMS.length);
            expect(await options[0].getText()).toEqual(TEAMS[0]);
            expect(await options[1].getText()).toEqual(TEAMS[1]);
            expect(await options[2].getText()).toEqual(TEAMS[2]);
        }));

        it('should have a form-field when isShortSelectedTeam method return false', fakeAsync(async () => {
            const spy_short_select = spyOn(component, "isShortSelectedTeam").and.returnValue(false);
            fixture.detectChanges();
            const form_field = await loader.getAllHarnesses(MatFormFieldHarness);

            expect(form_field.length).toBe(1);
        }));

        it('should have two form-field when isShortSelectedTeam method return true', fakeAsync(async () => {
            const spy_short_select = spyOn(component, "isShortSelectedTeam").and.returnValue(true);
            fixture.detectChanges();
            const form_field = await loader.getAllHarnesses(MatFormFieldHarness);

            expect(form_field.length).toBe(2);
        }));

        it('should have app-table component', () => {
            const table = fixture.debugElement.query(By.css('app-table'));
    
            expect(table).toBeTruthy();
        });
    });

    describe('Template methods', () => {

        it('should buttons about player role call selectedRole method when they are clicked', fakeAsync(async () => {
            const spy_selected = spyOn(component, "selectedRole");
            const btn_p = await loader.getHarness(MatButtonHarness.with({text : ROLES[0]}));
            const btn_d = await loader.getHarness(MatButtonHarness.with({text : ROLES[1]}));
            const btn_c = await loader.getHarness(MatButtonHarness.with({text : ROLES[2]}));
            const btn_a = await loader.getHarness(MatButtonHarness.with({text : ROLES[3]}));

            await btn_p.click();
            expect(spy_selected).toHaveBeenCalledWith(ROLES[0]);

            await btn_d.click();
            expect(spy_selected).toHaveBeenCalledWith(ROLES[1]);

            await btn_c.click();
            expect(spy_selected).toHaveBeenCalledWith(ROLES[2]);

            await btn_a.click();
            expect(spy_selected).toHaveBeenCalledWith(ROLES[3]);
        }));

        it('should mat-chips call selectedTeam method when they are clicked', fakeAsync(async () => {
            const spy_team = spyOn(component, "getTeam").and.returnValue(TEAM_DICT);
            const spy_selected = spyOn(component, "selectedTeam");
            fixture.detectChanges();

            const chips = fixture.debugElement.queryAll(By.css('mat-chip'));
            chips[1].nativeElement.click();

            expect(spy_selected).toHaveBeenCalledTimes(1);
            expect(spy_selected).toHaveBeenCalledWith(TEAMS[1]);
        }));

        it('should call selectedTeam method with argument name of team selected when option in selected is clicked', 
        fakeAsync(async () => {
            const spy_short_select = spyOn(component, "isShortSelectedTeam").and.returnValue(true);
            const spy_team = spyOn(component, "getTeam").and.returnValue(TEAM_DICT);
            const spy_selected = spyOn(component, "selectedTeam");
            fixture.detectChanges();
            const select = await loader.getHarness(MatSelectHarness);

            await select.open();
            const options = await select.getOptions();
            await options[1].click();

            expect(spy_selected).toHaveBeenCalledWith(TEAMS[1]);
        }));

        it('should mat-form for select show name of team selected', fakeAsync(async () => {
            const spy_short_select = spyOn(component, "isShortSelectedTeam").and.returnValue(true);
            const spy_team = spyOn(component, "getTeam").and.returnValue(TEAM_DICT);
            fixture.detectChanges();
            const form = await loader.getHarness(MatFormFieldHarness);
            const select = await loader.getHarness(MatSelectHarness);

            await select.open();
            const options = await select.getOptions();
            await options[1].click();


        }));

        it('should mat-input set value of input into input_text when text is written', fakeAsync(async () => {
            const input = await loader.getHarness(MatInputHarness);

            await input.setValue('test');
            tick(300);

            expect(component.input_txt).toEqual('test');
        }));

        it('should mat-input call filterText method when keypress event occurs', () => {
            const spy_filter = spyOn(component, "filterText");
            const input = fixture.debugElement.query(By.css('input'));
            const event = new KeyboardEvent("keypress", {
                "key": "b",
            });
        
            input.nativeElement.dispatchEvent(event);
            fixture.detectChanges();
        
            expect(spy_filter).toHaveBeenCalledWith(event);
        });

        it('should input call searchPlayer method when set text', fakeAsync(async () => {
            const spy_search = spyOn(component, "searchPlayer");
        
            const input = await loader.getHarness(MatInputHarness);
            await input.setValue('test');
        
            expect(spy_search).toHaveBeenCalled();
        }));
    });
})

const ROLES = [
    'P',
    'D',
    'C',
    'A'
]

const TEAMS = [
    'Atalanta',
    'Bologna',
    'Cremonese'
];
let TEAM_DICT : {name : string, selected : boolean}[] =  [
    {
      name : 'Atalanta',
      selected : false
    },
    {
      name : 'Bologna',
      selected : false
    },
    {
      name : 'Cremonese',
      selected : false
    },
];

@Component({
    selector: 'app-table',
    template: ''
  })
  class MockTableComponent {
  }