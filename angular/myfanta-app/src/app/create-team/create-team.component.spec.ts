import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CreateTeamComponent } from './create-team.component';
import { SnackBarService } from '../snack-bar.service';
import { InternalDataService } from '../internal-data.service';
import { SharedService } from '../shared.service';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  let snackbar_service:SnackBarService;
  let internal_data:InternalDataService;
  let shared: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        MatAutocompleteModule
      ],
      declarations: [ 
        CreateTeamComponent 
      ],
      providers: [
        SnackBarService,
        InternalDataService,
        SharedService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    snackbar_service = TestBed.inject(SnackBarService);
    internal_data = TestBed.inject(InternalDataService);
    shared = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('breakpoint value should be 5 when getInnerWidth return a value greater or equal than 800', () => {
      let width:number = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();
      expect(component.getBreakpoint()).toEqual(5);

      width = 800;
      spy_window.and.returnValue(width);

      component.ngOnInit();
      expect(component.getBreakpoint()).toEqual(5);
    });

    it('breakpoint value should be 1 when getInnerWidth return a value less than 800', () => {
      const width:number = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.getBreakpoint()).toEqual(1);
    });

    it('should set number of rows equal to 6', () => {
      component.ngOnInit();

      expect(component.getRows()).toBe(6);
    })

    it('cols_tabs value should be 3 when getInnerWidth return a value greater or equal than 800', () => {
      let width:number = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();
      expect(component.getColsTabs()).toEqual(3);

      width = 800;
      spy_window.and.returnValue(width);

      component.ngOnInit();
      expect(component.getColsTabs()).toEqual(3);
    });

    it('cols_tab value should be 1 when getInnerWidth return a value less than 800', () => {
      const width:number = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.getColsTabs()).toEqual(1);
    });

    it('cols_buttons value should be 2 when getInnerWidth return a value greater or equal than 800', () => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();
      expect(component.getColsButtons()).toEqual(2);

      width = 800;
      spy_window.and.returnValue(width);

      component.ngOnInit();
      expect(component.getColsButtons()).toEqual(2);
    });

    it('cols_buttons value should be 0 when getInnerWidth return a value less than 800', () => {
      const width = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.getColsButtons()).toEqual(0);
    });
  });

  describe('Methods called by template', () => {

    it('onResize should set breakpoint value to 5 when getInnerWidth return a value greater or equal than 800', () => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();
      expect(component.getBreakpoint()).toEqual(5);

      width = 800;
      spy_window.and.returnValue(width);

      component.onResize();
      expect(component.getBreakpoint()).toEqual(5);
    });

    it('onResize should set breakpoint value to 1 when getInnerWidth return a value less than 800', () => {
      const width = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.getBreakpoint()).toEqual(1);
    });

    it('onResize should set cols_tabs value to 3 when getInnerWidth return a value greater than 800', () => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();
      expect(component.getColsTabs()).toEqual(3);

      width = 800;
      spy_window.and.returnValue(width);

      component.onResize();
      expect(component.getColsTabs()).toEqual(3);
    });

    it('onResize should set cols_tabs value to 1 when getInnerWidth return a value less than 800', () => {
      const width = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.getColsTabs()).toEqual(1);
    });

    it('onResize should set cols_buttons value to 2 when getInnerWidth return a value greater or equal than 800', () => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();
      expect(component.getColsButtons()).toEqual(2);

      width = 800;
      spy_window.and.returnValue(width);

      component.onResize();
      expect(component.getColsButtons()).toEqual(2);
    });

    it('onResize should set cols_buttons value to 0 when getInnerWidth return a value less than 800', () => {
      const width = 700;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.getColsButtons()).toEqual(0);
    });

    it('should call openSnackBar method from snack_bar service when method openSnackBar is called', () => {
      const textMessage = '';
      const spy_snack_bar = spyOn(snackbar_service, 'openSnackBar');

      component.openSnackBar(textMessage);

      expect(spy_snack_bar).toHaveBeenCalled();
    });

    it('should call generateTeam from internal_data service when generateTeam method is called', () => {
      const spy_generateTeam = spyOn(internal_data, "generateTeam");

      component.generateTeam();

      expect(spy_generateTeam).toHaveBeenCalled();
    });

    it('should call generateTeamWithFavoritList from internal_data servie when generateTeamWithFavoritList method is called',
    () => {
      const spy_generateWithFavorit = spyOn(internal_data, "generateTeamWithFavoritList");

      component.generateTeamWithFavoritList();

      expect(spy_generateWithFavorit).toHaveBeenCalled();
    });

    it('should set empty string to error_message when clearErrorMessage method is called', () => {
      component.setErrorMessage('test');

      component.clearErrorMessage();

      expect(component.getErrorMessage()).toBe('');
    });
  });

});
