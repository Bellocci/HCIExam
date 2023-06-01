import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";

import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { FormsModule } from "@angular/forms";

import { CreateTeamComponent } from "./create-team.component";

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

describe('CreateTeamComponent DOM', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  let loader: HarnessLoader;

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
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
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

    it('should have mat-grid-list when window width is greater than 800', () => {
      const width = 801;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width)
      fixture.detectChanges();
      const grid_list = fixture.debugElement.query(By.css('mat-grid-list'));

      expect(grid_list).toBeTruthy();
    });

    it('should have two mat-grid-tile when window width is greater than 800', () => {
        const width = 801;
        const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width)
        fixture.detectChanges();
        const grid_tiles = fixture.debugElement.queryAll(By.css('mat-grid-tile'));

        expect(grid_tiles).toBeTruthy();
        expect(grid_tiles.length).toBe(2);
    })

    it('should not have mat-grid-list when window width is equal to 800', () => {
      const width = 800;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width)
      fixture.detectChanges();

      const grid_list = fixture.debugElement.query(By.css('mat-grid-list'));

      expect(grid_list).not.toBeTruthy();
    })

    it('should not have mat-grid-list when window width is less than 800', () => {
      const width = 799;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width)
      fixture.detectChanges();

      const grid_list = fixture.debugElement.query(By.css('mat-grid-list'));

      expect(grid_list).not.toBeTruthy();
    })

    it('should have app-table component', () => {
        const tabs = fixture.debugElement.query(By.css('app-tabs'));

        expect(tabs).toBeTruthy();
    });

    it('should have app-search-add-player component', () => {
      const search = fixture.debugElement.query(By.css('app-search-add-player'));

      expect(search).toBeTruthy();
    })

    let findButton = (btns_list:DebugElement[], btn_txt:string) : true | false => {
      for(let btn of btns_list) {
          let text = btn.nativeElement.textContent.trim();
          if(text == btn_txt) {
              return true
          }
      }
      return false;
  }

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

    let getButton = (btns_list:DebugElement[], btn_txt:string) : DebugElement | undefined => {
      for(let btn of btns_list) {
        const text = btn.nativeElement.textContent.trim();
        if(text == btn_txt) {
          return btn;
        }
      }
      return undefined;
    }

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

    it('should show div with error message and close button if error_message variable is not empty string', () => {
      const error_message:string = "Error test";
      component['_error_message'] = error_message;
      const icon = 'close';
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('#display-error'));
      expect(error).not.toBeNull();
      expect(error.nativeElement.textContent.trim()).toBe(error_message + icon);
    });

    it('should hide div with error message if error_message variable is empty string', () => {
      const spy_errorMessage = spyOn(component, "getErrorMessage").and.returnValue('');
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('#display-error'));
      expect(error).toBeNull();
    });

    it('should call clearErrorMessage method when close button of div error is clicked', () => {
      const spy_clear = spyOn(component, "clearErrorMessage");
      component['_error_message'] = 'test'
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.error-container'));
      const btn_close = error.children[1].nativeElement.click();

      expect(spy_clear).toHaveBeenCalled();
    });
  });
})