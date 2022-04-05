import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";


import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatAutocompleteHarness } from "@angular/material/autocomplete/testing";
import { MatInputHarness } from "@angular/material/input/testing";

import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { of } from "rxjs";

import { MaterialModule } from "../material-module";
import { FormsModule } from "@angular/forms";

import { SearchAddPlayerComponent } from "./search-add-player.component";
import { SharedService } from "../service/shared.service";
import { InternalDataService } from "../service/internal-data.service";

const PLAYER_AUTOCOMPLETE = [
    {
      playerName : 'Andrea Belotti',
    },
    {
      playerName : 'Dusan Vlahovic',
    },
    {
      playerName : 'Antonio Candreva',
    },
]


describe('SearchAddPlayerComponent DOM', () => {
    let component: SearchAddPlayerComponent;
    let fixture: ComponentFixture<SearchAddPlayerComponent>;
    let loader: HarnessLoader;
    let shared: SharedService;
    let internal_data: InternalDataService;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          MaterialModule,
          NoopAnimationsModule,
          FormsModule
        ],
        declarations: [ 
          SearchAddPlayerComponent
        ],
        providers: [
          SharedService,
          InternalDataService
        ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SearchAddPlayerComponent);
      component = fixture.componentInstance;
      loader = TestbedHarnessEnvironment.loader(fixture);
      shared = TestBed.inject(SharedService);
      internal_data = TestBed.inject(InternalDataService);
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('Template', () => {

        it('should have mat-form-field', () => {
          const form_field = fixture.debugElement.query(By.css('mat-form-field'));
  
          expect(form_field).not.toBeNull();
        });

        it('should have only one mat-label with text "Player name"', () => {
          const label = fixture.debugElement.queryAll(By.css('mat-label'));

          expect(label.length).toBe(1);
          expect(label[0].nativeElement.textContent).toBe('Player name');
        });

        it('should have only one input', () => {
          const input = fixture.debugElement.queryAll(By.css('input'));
 
          expect(input.length).toBe(1);
        });

        it('should have only mat-autocomplete', () => {
          const autocomplete = fixture.debugElement.queryAll(By.css('mat-autocomplete'));

          expect(autocomplete.length).toBe(1);
        });
    
        it('should mat-autocomplete show player name that match text input', async () => {
          const spy_players = spyOn(shared, "searchPlayers").and.returnValue(of(PLAYER_AUTOCOMPLETE));
          const input = await loader.getHarness(MatInputHarness);
          await input.setValue('a');
    
          const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    
          const options = await autocomplete.getOptions();
          expect(options.length).toBe(3);
          expect(await options[0].getText()).toBe('Andrea Belotti');
          expect(await options[1].getText()).toBe('Dusan Vlahovic');
          expect(await options[2].getText()).toBe('Antonio Candreva');
        });

        let findButton = (btns_list:DebugElement[], btn_txt:string) : true | false => {
          for(let btn of btns_list) {
              let text = btn.nativeElement.textContent.trim();
              if(text == btn_txt) {
                  return true
              }
          }
          return false;
        }

        it('should have button with mat-icon "close" when value_input_text is not empty string', () => {
          component.value_input_text = 'test';
          const btn_txt = 'close';
          fixture.detectChanges();

          const btns_list = fixture.debugElement.queryAll(By.css('button'));

          expect(findButton(btns_list, btn_txt)).toBeTrue();
        });

        it('should not have button with mat-icon "close" when value_input_text is empty string', () => {
          component.value_input_text = '';
          const btn_txt = 'close';
          fixture.detectChanges();

          const btns_list = fixture.debugElement.queryAll(By.css('button'));

          expect(findButton(btns_list, btn_txt)).toBeFalse();
        });
  
        it('should have button with text mat-icon "add" and value of tab_selected variable', () => {
          const spy_tabSelected = spyOn(component, "getTabSelected").and.returnValue('test');
          const btn_txt:string = 'addtest'
          fixture.detectChanges();

          const btns_list = fixture.debugElement.queryAll(By.css('button'));

          expect(findButton(btns_list, btn_txt)).toBeTrue();
        });
    });

    describe('Template methods', () => {

        it('should set value of input into value_input_text variable when text is written', async () => {
            const input = await loader.getHarness(MatInputHarness);
      
            await input.setValue('test');
            expect(component.value_input_text).toBe('test');
      
            await input.setValue('');
            expect(component.value_input_text).toBe('');
        });
    
        it('should input call filterText method when keypress events occurs', () => {
            const spy_filter = spyOn(component, "filterText");
            const input = fixture.debugElement.query(By.css('input'));
            const event = new KeyboardEvent("keypress", {
                "key": "b",
            });
        
            input.nativeElement.dispatchEvent(event);
            fixture.detectChanges();
        
            expect(spy_filter).toHaveBeenCalled();
        });
    
        it('should input call searchPlayer method when set text', async () => {
            const spy_search = spyOn(component, "searchPlayer");
        
            const input = await loader.getHarness(MatInputHarness);
            await input.setValue('test');
        
            expect(spy_search).toHaveBeenCalled();
        });

        let getButton = (btns_list:DebugElement[], btn_txt:string) : DebugElement | undefined => {
            for(let btn of btns_list) {
              const text = btn.nativeElement.textContent.trim();
              if(text == btn_txt) {
                return btn;
              }
            }
            return undefined;
          }

        it('should set value_input_text to empty string when close button is clicked', async () => {
            const btn_txt:string = 'close';
            const input = await loader.getHarness(MatInputHarness);
            await input.setValue('test');
        
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
            const btn_close = getButton(btns_list, btn_txt);
        
            await btn_close?.nativeElement.click();
        
            expect(component.value_input_text).toBe('');
        });
    
        it('should show player name on input when player name from list of autocomplete is clicked', async () => {
            const spy_players = spyOn(shared, "searchPlayers").and.returnValue(of(PLAYER_AUTOCOMPLETE));
            const input = await loader.getHarness(MatInputHarness);
            input.setValue('a');
        
            const autocomplete = await loader.getHarness(MatAutocompleteHarness);
            const options = await autocomplete.getOptions();
            await options[0].click();
        
            expect(await input.getValue()).toBe(await options[0].getText());
        });
    
        it('should set value_input_text to player name when player name from list of autocomplete is clicked', async () => {
            const spy_players = spyOn(shared, "searchPlayers").and.returnValue(of(PLAYER_AUTOCOMPLETE));
            const input = await loader.getHarness(MatInputHarness);
            input.setValue('a');
        
            const autocomplete = await loader.getHarness(MatAutocompleteHarness);
            const options = await autocomplete.getOptions();
        
            expect(options.length).toBe(3);
            await options[0].click();
            expect(component.value_input_text).toBe(await options[0].getText());
        });
    
        it('should call searchPlayer when close button is clicked', () => {
            const spy_search = spyOn(component, "searchPlayer");
            const btn_txt:string = 'close';
            component.value_input_text = 'test';
            fixture.detectChanges();
            
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
            const btn_close = getButton(btns_list, btn_txt);
        
            btn_close?.nativeElement.click();
        
            expect(spy_search).toHaveBeenCalledTimes(1);
        });

        it('should call addPlayer method when button add is clicked', () => {
            const spy_addPlayer = spyOn(component, "addPlayer");
            const btn_txt:string = 'addtest';
            const spy_tabSelected = spyOn(component, "getTabSelected").and.returnValue('test');
            fixture.detectChanges();
        
        
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
            const btn_add = getButton(btns_list, btn_txt);
            btn_add?.nativeElement.click();
            
            expect(spy_addPlayer).toHaveBeenCalled();
        });
    });

    describe('Template style', () => {

        let findButton = (btns_list:DebugElement[], btn_txt:string) : true | false => {
            for(let btn of btns_list) {
                let text = btn.nativeElement.textContent.trim();
                if(text == btn_txt) {
                    return true
                }
            }
            return false;
          }

        it('should show mat-form-field and button add when input_visible is true', () => {
            const spy_tabSelected = spyOn(component, "getTabSelected").and.returnValue('test');
            const btn_txt:string = 'addtest';
            component.input_visible = true;
            fixture.detectChanges();
            
            const form_field = fixture.debugElement.query(By.css('mat-form-field'));
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
        
            expect(form_field).not.toBeNull();
            expect(findButton(btns_list, btn_txt)).toBeTrue();
        });
    
        it('should not show mat-form-field and button add when input_visible is false', () => {
            component.input_visible = false;
            const spy_tabSelected = spyOn(component, "getTabSelected").and.returnValue('test');
            const btn_txt:string = 'addtest';
            fixture.detectChanges();
            
            const form_field = fixture.debugElement.query(By.css('mat-form-field'));
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
        
            expect(form_field).toBeNull();
            expect(findButton(btns_list, btn_txt)).toBeFalse();
        });

        it('should show button close when value_input_text is not empty string', async () => {
            const btn_txt:string = 'close';
            const input = await loader.getHarness(MatInputHarness);
        
            await input.setValue('test');
        
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
            expect(findButton(btns_list, btn_txt)).toBeTrue();
        });
    
        it('should hide button close when value_input_text is empty string', async () => {
            const btn_txt:string = 'close';
            const input = await loader.getHarness(MatInputHarness);
        
            await input.setValue('');
        
            const btns_list = fixture.debugElement.queryAll(By.css('button'));
            expect(findButton(btns_list, btn_txt)).toBeFalse();
        });
    });
})