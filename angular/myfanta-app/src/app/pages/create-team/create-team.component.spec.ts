import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';

import { CreateTeamComponent } from './create-team.component';
import { SnackBarService } from '../../service/snack-bar.service';
import { TeamDataService } from '../../service/team-data.service';
import { InternalDataService } from '../../service/internal-data.service';
import { of } from 'rxjs';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  let snackbar_service:SnackBarService;
  let team_data:TeamDataService;
  let internal_data:InternalDataService;

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
        InternalDataService
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
    internal_data = TestBed.inject(InternalDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should set _rows variable to 6', () => {
      component.ngOnInit();

      expect(component.getRows()).toBe(6);
    });

    it('should set _breakpoint variable to 5', 
    () => {
      component.ngOnInit();

      expect(component.getBreakpoint()).toEqual(5);
    });

    it('should set cols_tabs variable to 3', () => {
      component.ngOnInit();

      expect(component.getColsTabs()).toEqual(3);
    });

    it('should set cols_buttons variable to 2', () => {
      component.ngOnInit();

      expect(component.getColsButtons()).toEqual(2);
    });

    it('testing subscribe getErrorMessage from internal data service', () => {
      const spy_getMessage = spyOn(internal_data, 'getErrorMessage').and.returnValue(of());
      const spy_subscribe = spyOn(internal_data.getErrorMessage(), 'subscribe');

      component.ngOnInit();

      expect(spy_getMessage).toHaveBeenCalledBefore(spy_subscribe);
      expect(spy_subscribe).toHaveBeenCalled();
    });
  });

  describe('Methods called by template', () => {

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

    it('should clearErrorMessage method call setErrorMessage method from internal_data service with empty string argument', () => {
      const spy_clearMsg = spyOn(internal_data, "setErrorMessage");

      component.clearErrorMessage();

      expect(spy_clearMsg).toHaveBeenCalledWith('');
    });
  });

});
