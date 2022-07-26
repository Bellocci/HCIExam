import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material-module";
import { PlayerListComponent } from "./player-list.component";
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import { By } from "@angular/platform-browser";
import { MatInputHarness } from "@angular/material/input/testing";



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
            ],
            declarations: [ 
                PlayerListComponent 
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

        it('should have form-field', fakeAsync(async () => {
            const form_field = await loader.getAllHarnesses(MatFormFieldHarness);

            expect(form_field.length).toBe(1);
        }));

        it('should have app-table component', () => {
            const table = fixture.debugElement.query(By.css('app-table'));
    
            expect(table).toBeTruthy();
        });
    });

    describe('Template methods', () => {

        it('should mat-input set value of input into input_text when text is written', fakeAsync(async () => {
            const input = await loader.getHarness(MatInputHarness);

            await input.setValue('test');

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