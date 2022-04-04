import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatInputHarness } from '@angular/material/input/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule } from "@angular/forms";

import { CreateTeamComponent } from "./create-team.component";
import { By } from "@angular/platform-browser";
import { SharedService } from "../shared.service";
import { of } from "rxjs";

const PLAYERS_DATA = [
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

describe('CreateTeamComponent DOM', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  let loader: HarnessLoader;
  let shared: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        FormsModule,
        NoopAnimationsModule
      ],
      declarations: [ 
        CreateTeamComponent 
      ],
      providers: [
        SharedService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    shared = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template', () => {

    it('should have h1 element with text "CREATE TEAM"', () => {
        const h1 = fixture.debugElement.query(By.css('h1'));

        expect(h1).toBeTruthy();
        expect(h1.nativeElement.textContent).toBe('CREATE TEAM');
    });

    it('should have mat-grid-list', () => {
        const grid_list = fixture.debugElement.query(By.css('mat-grid-list'));

        expect(grid_list).toBeTruthy();
    });

    it('should have two mat-grid-tile', () => {
        const grid_tiles = fixture.debugElement.queryAll(By.css('mat-grid-tile'));

        expect(grid_tiles).toBeTruthy();
        expect(grid_tiles.length).toBe(2);
    })

    it('should have app-table component', () => {
        const tabs = fixture.debugElement.query(By.css('app-tabs'));

        expect(tabs).toBeTruthy();
    });

    it('should have mat-form-field', () => {
        const form_field = fixture.debugElement.query(By.css('mat-form-field'));

        expect(form_field).toBeTruthy();
    });

    it('should have mat-label, input and matAutocomplete inside mat-form-field', () => {
        const form_field = fixture.debugElement.query(By.css('mat-form-field'));
        const childrens = form_field.children;

        expect(childrens.length).toBe(3);
        expect(childrens[0].nativeNode.localName).toBe('mat-label');
        expect(childrens[1].nativeNode.localName).toBe('input');
        expect(childrens[2].nativeNode.localName).toBe('mat-autocomplete');
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

    it('should have button with text mat-icon "add" and value of tab_selected variable', () => {
        const spy_tabSelected = spyOn(component, "getTabSelected").and.returnValue('test');
        const btn_txt:string = 'addtest'
        fixture.detectChanges();

        const btns_list = fixture.debugElement.queryAll(By.css('button'));

        expect(findButton(btns_list, btn_txt)).toBeTrue();
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

    it('should have button with text "Generate Team"', () => {
        const btn_txt:string = 'Generate Team'

        const btns_list = fixture.debugElement.queryAll(By.css('button'));

        expect(findButton(btns_list, btn_txt)).toBeTrue();
    });

    it('should have button with text "Generate Team with favorit list"', () => {
        const btn_txt:string = 'Generate Team with favorit list'

        const btns_list = fixture.debugElement.queryAll(By.css('button'));

        expect(findButton(btns_list, btn_txt)).toBeTrue();
    });
  });

  describe('Template methods', () => {

    it('should call onResize method when window resize event occurs', () => {
      const spy_onResize = spyOn(component, "onResize");
      
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      
      expect(spy_onResize).toHaveBeenCalled();
    });

    it('should call setTabSelected method when tab_selected event from app-tabs occurs', () => {
      const spy_setTab = spyOn(component, "setTabSelected");
      const tab_name:string = 'test';

      const app_tabs = fixture.debugElement.query(By.css('app-tabs'));
      app_tabs.triggerEventHandler('tab_selected', tab_name);

      expect(spy_setTab).toHaveBeenCalled();
    });

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

    it('should call generateTeam method when button "Generate Team" is called', () => {
      const btn_txt:string = 'Generate Team';
      const spy_team = spyOn(component, "generateTeam");

      const btns_list = fixture.debugElement.queryAll(By.css('button'));
      const btn_gen_team = getButton(btns_list, btn_txt);
      btn_gen_team?.nativeElement.click();

      expect(spy_team).toHaveBeenCalled();
    });

    it('should call generateTeamWithFavoritList method when button "Generate Team with favorit list" is called', () => {
      const btn_txt:string = 'Generate Team with favorit list';
      const spy_team = spyOn(component, "generateTeamWithFavoritList");

      const btns_list = fixture.debugElement.queryAll(By.css('button'));
      const btn_gen_team = getButton(btns_list, btn_txt);
      btn_gen_team?.nativeElement.click();

      expect(spy_team).toHaveBeenCalled();
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

    it('should show div with error message if error_message variable is not empty string', () => {
      const error_message:string = "Error test";
      const spy_errorMessage = spyOn(component, "getErrorMessage").and.returnValue(error_message);
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('#display-error'));
      expect(error).not.toBeNull();
      expect(error.nativeElement.textContent.trim()).toBe(error_message);
    });

    it('should hide div with error message if error_message variable is empty string', () => {
      const spy_errorMessage = spyOn(component, "getErrorMessage").and.returnValue('');
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('#display-error'));
      expect(error).toBeNull();
    });
  });
})