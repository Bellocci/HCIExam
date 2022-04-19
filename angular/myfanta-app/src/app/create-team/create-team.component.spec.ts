import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CreateTeamComponent } from './create-team.component';
import { SnackBarService } from '../service/snack-bar.service';
import { TeamDataService } from '../service/team-data.service';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  let snackbar_service:SnackBarService;
  let team_data:TeamDataService;

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
        TeamDataService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    snackbar_service = TestBed.inject(SnackBarService);
    team_data = TestBed.inject(TeamDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should set _rows_tabs equal to 6', () => {
      component.ngOnInit();

      expect(component.getRowsTabs()).toBe(6);
    });

    it('should call setColsRowsMatGrid', () => {
      const spy_setGrid = spyOn(component, "setColsRowsMatGrid");

      component.ngOnInit();

      expect(spy_setGrid).toHaveBeenCalledTimes(1);
    });
  });

  describe('Methods called by template', () => {

    it('should setColsRowsMatGrid method set breakpoint value to 5 when getInnerWidth return a value greater than 801', 
    () => {
      const width = 1000;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();
      expect(component.getBreakpoint()).toEqual(5);
    });

    it('should setColsRowsMatGrid method set breakpoint value to 5 when getInnerWidth return a value equal to 801', 
    () => {
      const width = 801;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();
      expect(component.getBreakpoint()).toEqual(5);
    });

    it('should setColsRowsMatGrid method set breakpoint value to 1 when getInnerWidth return a value less than 801', () => {
      const width = 800;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();

      expect(component.getBreakpoint()).toEqual(1);
    });

    it('should setColsRowsMatGrid method set cols_tabs value to 3 when getInnerWidth return a value greater than 801', () => {
      const width = 1000;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();
      expect(component.getColsTabs()).toEqual(3);
    });

    it('should setColsRowsMatGrid method set cols_tabs value to 3 when getInnerWidth return a value equal to 801', () => {
      const width = 801;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();
      expect(component.getColsTabs()).toEqual(3);
    });

    it('should setColsRowsMatGrid method set cols_tabs value to 1 when getInnerWidth return a value less than 801', () => {
      const width = 800;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();

      expect(component.getColsTabs()).toEqual(1);
    });

    it('should setColsRowsMatGrid method set cols_buttons value to 2 when getInnerWidth return a value greater than 801', () => {
      const width = 1000;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();

      expect(component.getColsButtons()).toEqual(2);
    });

    it('should setColsRowsMatGrid method set cols_buttons value to 2 when getInnerWidth return a value equal to 801', () => {
      const width = 801;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();

      expect(component.getColsButtons()).toEqual(2);
    });

    it('should setColsRowsMatGrid method set cols_buttons value to 1 when getInnerWidth return a value less than 801', () => {
      const width = 800;
      const spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.setColsRowsMatGrid();

      expect(component.getColsButtons()).toEqual(1);
    });

    it('should setColsRowsMatGrid method set _rows_btns value to 6 when getInnerWidth return a value greatern than 801', () => {
      const width = 1000;
      const spy_window = spyOn(component, "getInnerWidth").and.returnValue(width);

      component.setColsRowsMatGrid();

      expect(component.getRowsBtns()).toBe(6);
    });

    it('should setColsRowsMatGrid method set _rows_btns value to 6 when getInnerWidth return a value equal than 801', () => {
      const width = 801;
      const spy_window = spyOn(component, "getInnerWidth").and.returnValue(width);

      component.setColsRowsMatGrid();

      expect(component.getRowsBtns()).toBe(6);
    });

    it('should setColsRowsMatGrid method set _rows_btns value to 3 when getInnerWidth return a value less than 801', () => {
      const width = 800;
      const spy_window = spyOn(component, "getInnerWidth").and.returnValue(width);

      component.setColsRowsMatGrid();

      expect(component.getRowsBtns()).toBe(3);
    });

    it('should call openSnackBar method from snack_bar service when method openSnackBar is called', () => {
      const textMessage = '';
      const spy_snack_bar = spyOn(snackbar_service, 'openSnackBar');

      component.openSnackBar(textMessage);

      expect(spy_snack_bar).toHaveBeenCalled();
    });

    it('should call generateTeam from internal_data service when generateTeam method is called', () => {
      const spy_generateTeam = spyOn(team_data, "generateTeam");

      component.generateTeam();

      expect(spy_generateTeam).toHaveBeenCalled();
    });

    it('should call generateTeamWithFavoritList from internal_data servie when generateTeamWithFavoritList method is called',
    () => {
      const spy_generateWithFavorit = spyOn(team_data, "generateTeamWithFavoritList");

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
