import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatLegacyFormFieldHarness as MatFormFieldHarness } from '@angular/material/legacy-form-field/testing';
import { MatLegacyInputHarness as MatInputHarness } from '@angular/material/legacy-input/testing';

import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from "../material-module";
import { TeamDataService } from '../service/team-data.service';
import { FilterPlayerComponent } from './filter-player.component';

describe('FilterPlayerComponent DOM', () => {
  let component: FilterPlayerComponent;
  let fixture: ComponentFixture<FilterPlayerComponent>;
  let team_data:TeamDataService;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports : [
            MaterialModule,
            NoopAnimationsModule,
            FormsModule,
        ],
        declarations: [ 
        FilterPlayerComponent,
        ],
        providers : [
        TeamDataService
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPlayerComponent);
    component = fixture.componentInstance;
    team_data = TestBed.inject(TeamDataService);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template', () => {

    it('should have a form-field', fakeAsync(async () => {
        const form_field = await loader.getAllHarnesses(MatFormFieldHarness);

        expect(form_field.length).toBe(1);
    }));
  });

  describe('Template methods', () => {

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
});