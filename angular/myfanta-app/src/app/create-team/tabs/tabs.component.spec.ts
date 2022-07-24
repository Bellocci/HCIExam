import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material-module';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { InternalDimensionService } from 'src/app/service/internal-dimension.service';
import { SharedService } from 'src/app/service/shared.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { TeamDataService } from 'src/app/service/team-data.service';

import { TabsComponent } from './tabs.component';

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

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let internal_dimension: InternalDimensionService;
  let internal_data: InternalDataService;
  let team_data: TeamDataService;
  let snack_bar: SnackBarService;
  let shared: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [ 
        TabsComponent
      ],
      providers: [
        InternalDimensionService,
        InternalDataService,
        TeamDataService,
        SharedService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    internal_dimension = TestBed.inject(InternalDimensionService);
    internal_data = TestBed.inject(InternalDataService);
    team_data = TestBed.inject(TeamDataService);
    snack_bar = TestBed.inject(SnackBarService);
    shared = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should call setBtnRows method', () => {
      const spy_setComuns = spyOn(component, "setBtnRows");

      component.ngOnInit();

      expect(spy_setComuns).toHaveBeenCalled();
    });

    it('testing subscribe method from result of getPlayerSelected method of internal_data is called', () => {
      const spy_getPlayerSelected = spyOn(internal_data, "getPlayerSelected").and.returnValue(of());
      const spy_sub = spyOn(internal_data.getPlayerSelected(), "subscribe");

      component.ngOnInit();

      expect(spy_getPlayerSelected).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should set _player_selected with value returned by getPlayerSelected method of internal_data', () => {
      const spy_getPlayerSelected = spyOn(internal_data, "getPlayerSelected").and.returnValue(of(PLAYER_DATA[0]));
      component['_player_selected'] = null;

      component.ngOnInit();

      expect(component.getPlayerSelected()).toEqual(PLAYER_DATA[0]);
    });
    
    it('testing subscribe method from result of isDisabledClearTeamBtn method of internal_data is called', () => {
      const spy_isDisable = spyOn(internal_data, "isDisabledClearTeamBtn").and.returnValue(of(false));
      const spy_sub = spyOn(internal_data.isDisabledClearTeamBtn(), "subscribe");

      component.ngOnInit();

      expect(spy_isDisable).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should set _disable_clear_team_btn with value returned by isDisabledClearTeamBtn method of internal_data', 
    () => {
      const spy_isDisable = spyOn(internal_data, "isDisabledClearTeamBtn").and.returnValue(of(false));
      component['_disable_clear_team_btn'] = true;
      
      component.ngOnInit();

      expect(component.isDisableClearTeamBtn()).toBeFalse();

      spy_isDisable.and.returnValue(of(true));
      component['_disable_clear_team_btn'] = false;

      component.ngOnInit();

      expect(component.isDisableClearTeamBtn()).toBeTrue();
    });

    it('testing subscribe method from result of isClearBlacklistBtnDisabled of internal_data is called', () => {
      const spy_isDisable = spyOn(internal_data, "isClearBlacklistBtnDisabled").and.returnValue(of(false));
      const spy_sub = spyOn(internal_data.isClearBlacklistBtnDisabled(), "subscribe");

      component.ngOnInit();

      expect(spy_isDisable).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should set value of _clear_btn_blacklist_disabled with value returned by isClearBlacklistBtnDisabled ' +
    'of internal_data', 
    () => {
      const spy_isDisable = spyOn(internal_data, "isClearBlacklistBtnDisabled").and.returnValue(of(false));
      component['_clear_btn_blacklist_disabled'] = true;

      component.ngOnInit();

      expect(component['_clear_btn_blacklist_disabled']).toBeFalse();

      spy_isDisable.and.returnValue(of(true));
      component['_clear_btn_blacklist_disabled'] = false;

      component.ngOnInit();

      expect(component['_clear_btn_blacklist_disabled']).toBeTrue();
    });
    
    it('testing subscribe method from result of isSaveBtnDisabled method of internal_data is called', () => {
      const spy_isDisable = spyOn(internal_data, "isSaveBtnDisabled").and.returnValue(of(false));
      const spy_sub = spyOn(internal_data.isSaveBtnDisabled(), "subscribe");

      component.ngOnInit();

      expect(spy_isDisable).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should set value of save_btn_disabled with value returned by isSaveBtnDisabled method of internal_data', () => {
      const spy_isDisable = spyOn(internal_data, "isSaveBtnDisabled").and.returnValue(of(false));
      component['_save_btn_disabled'] = true;

      component.ngOnInit();

      expect(component['_save_btn_disabled']).toBeFalse();

      spy_isDisable.and.returnValue(of(true));
      component['_save_btn_disabled'] = false;

      component.ngOnInit();

      expect(component['_save_btn_disabled']).toBeTrue();
    });

    it('should call showTeam method from team data service', () => {
      const spy_player_team = spyOn(team_data, "showTeam");

      component.ngOnInit();

      expect(spy_player_team).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {

    it('should call setTabSelected method from internal_data with params name of first tab', () => {
      const tab_name = component['tab_group']._tabs.first.textLabel;
      const spy_setTab = spyOn(internal_data, "setTabSelected");

      component.ngAfterViewInit();

      expect(spy_setTab).toHaveBeenCalledOnceWith(tab_name);
    });

    it('testing subcribe method from result of getTabSelected method of internal_data is called', () => {
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of('test'));
      const spy_sub = spyOn(internal_data.getTabSelected(), "subscribe");

      component.ngAfterViewInit();

      expect(spy_getTab).toHaveBeenCalledBefore(spy_sub);
      expect(spy_sub).toHaveBeenCalled();
    });

    it('should set tab_selected with value returned by getTabSelected method of internal_data', () => {
      const spy_getTab = spyOn(internal_data, "getTabSelected").and.returnValue(of('test'));

      component.ngAfterViewInit();

      expect(spy_getTab).toHaveBeenCalled();
      expect(component.getTabSelected()).toBe('test');
    });
  });

  describe('Template methods', () => {

    it('should setBtnRows method set _rows_btns to 5 when window width is greater or equal than 1000', () => {
      let width = 1000;
      component['_rows_btns'] = 0;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width);

      component.setBtnRows();

      expect(component.getRowsBtns()).toBe(5);

      width = 1200;
      spy_width.and.returnValue(width);

      component.setBtnRows();

      expect(component.getRowsBtns()).toBe(5);
    });

    it('should setBtnRows method set _rows_btns to 4 when window width is less than 1000', 
    () => {
      let width = 999;
      component['_rows_btns'] = 0;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width);

      component.setBtnRows();

      expect(component.getRowsBtns()).toBe(4);
    });

    it('should call setPlayerSelected method from internal_data with params null when setPlayerSelected is called', () => {
      const spy_setPlayerSelected = spyOn(internal_data, "setPlayerSelected");

      component.setPlayerSelected();

      expect(spy_setPlayerSelected).toHaveBeenCalledOnceWith(null);
    });

    it('should return true if player_selected is not null when isPlayerSelected is called', () => {
      component['_player_selected'] = PLAYER_DATA[0];

      expect(component.isPlayerSelected()).toBeTrue();
    });

    it('should return false if player_selected is null when isPlayerSelected is called', () => {
      component['_player_selected'] = null;

      expect(component.isPlayerSelected()).toBeFalse();
    });

    it('should call setTabSelected method from internal_data with params tab selected when setTab is called', () => {
      const tab_selected = 'test';
      const spy_setTab = spyOn(internal_data, "setTabSelected");

      component.setTab(tab_selected);

      expect(spy_setTab).toHaveBeenCalledOnceWith(tab_selected);
    });

    it('should isDisableClearTeamBtn method return true when value of _disable_clear_team_btn is true', () => {
      component['_disable_clear_team_btn'] = true;

      expect(component.isDisableClearTeamBtn()).toBeTrue();
    });

    it('should isDisableClearTeamBtn method return false when value of _disable_clear_team_btn is false', () => {
      component['_disable_clear_team_btn'] = false;

      expect(component.isDisableClearTeamBtn()).toBeFalse();
    });

    it('should isClearBlacklistBtnDisabled method return true when value of _clear_btn_blacklist_disabled is true', () => {
      component['_clear_btn_blacklist_disabled'] = true;

      expect(component.isClearBlacklistBtnDisabled()).toBeTrue();
    });

    it('should isClearBlacklistBtnDisabled method return false when value of _clear_btn_blacklist_disabled is false', () => {
      component['_clear_btn_blacklist_disabled'] = false;

      expect(component.isClearBlacklistBtnDisabled()).toBeFalse();
    });

    it('should call openSnackBarError from snack-bar service when clearAll is called and any condition is verified', () => {
      const spy_snackbar = spyOn(snack_bar, "openSnackBarError");
      component['_tab_selected'] = 'tab error';
      const txt_error = "Errore: impossibile rimuovere tutti i giocatori dalla lista.";

      component.clearAll();

      expect(spy_snackbar).toHaveBeenCalledWith(txt_error);
    });

    it('should call clearTeam from team-data service when clearAll is called, isDisableClearTeamBtn method return false ' +
    'and tab selected is "Team"', () => {
      const spy_clearTeam = spyOn(team_data, "clearTeam");
      const spy_isDisable = spyOn(component, "isDisableClearTeamBtn").and.returnValue(false);
      component['_tab_selected'] = 'Team';
      
      component.clearAll();

      expect(spy_clearTeam).toHaveBeenCalled();
    });

    it('should not call clearTeam from team-data service when clearAll is called, isDisableClearTeamBtn method return false ' +
    'and tab selected is not "Team"', () => {
      const spy_clearTeam = spyOn(team_data, "clearTeam");
      const spy_isDisable = spyOn(component, "isDisableClearTeamBtn").and.returnValue(false);
      component['_tab_selected'] = 'test_error';
      
      component.clearAll();

      expect(spy_clearTeam).not.toHaveBeenCalled();
    });

    it('should call clearBlacklist from team-data service when clearAll is called, isClearBlacklistBtnDisabled method return false ' +
    'and tab selected is "Blacklist"', () => {
      const spy_clearBlacklist = spyOn(team_data, "clearBlacklist");
      const spy_isDisable = spyOn(component, "isClearBlacklistBtnDisabled").and.returnValue(false);
      component['_tab_selected'] = 'Blacklist';

      component.clearAll();

      expect(spy_clearBlacklist).toHaveBeenCalled();
    });

    it('should not call clearBlacklist from team-data service when clearAll is called, isClearBlacklistBtnDisabled ' +
    'method return false and tab selected is not "Blacklist"', () => {
      const spy_clearBlacklist = spyOn(team_data, "clearBlacklist");
      const spy_isDisable = spyOn(component, "isClearBlacklistBtnDisabled").and.returnValue(false);
      component['_tab_selected'] = 'test error';

      component.clearAll();

      expect(spy_clearBlacklist).not.toHaveBeenCalled();
    });

    it('should call openSnackBarError method from snack-bar service when player selected is null and removePlayer is called', 
    () => {
      const spy_snackbar = spyOn(snack_bar, "openSnackBarError");
      component['_player_selected'] = null;
      const txt_error = "Nessun giocatore è stato selezionato. Impossibile eseguire l'operazione";

      component.removePlayer();

      expect(spy_snackbar).toHaveBeenCalledWith(txt_error);
    });

    it('should call openSnackBarError method from snack-bar service when player selected is not null and removePlayer is called ' +
    'but tab selected does not exist', 
    () => {
      const spy_snackbar = spyOn(snack_bar, "openSnackBarError");
      component['_player_selected'] = PLAYER_DATA[0];
      component['_tab_selected'] = 'tab error';
      const txt_error = "Errore: il tab selezionato non esiste. Impossibile eseguire l'operazione 'Remove'";

      component.removePlayer();

      expect(spy_snackbar).toHaveBeenCalledWith(txt_error);
    });

    it('should call removePlayerFromTeam method from team-data service when removePlayer is called, ' +
    'player selected is not null and tab selected is "Team"',
    () => {
      const spy_remove = spyOn(team_data, "removePlayerFromTeam");
      component['_tab_selected'] = 'Team';
      component['_player_selected'] = PLAYER_DATA[0];

      component.removePlayer();

      expect(spy_remove).toHaveBeenCalledOnceWith(PLAYER_DATA[0]);
    });

    it('should not call removePlayerFromTeam method from team-data service when removePlayer is called, ' +
    'player selected is not null and tab selected is not "Team"',
    () => {
      const spy_remove = spyOn(team_data, "removePlayerFromTeam");
      component['_tab_selected'] = 'test_error';
      component['_player_selected'] = PLAYER_DATA[0];

      component.removePlayer();

      expect(spy_remove).not.toHaveBeenCalled();
    });

    it('should call removePlayerFromBlacklist method from team-data service when removePlayer is called, ' +
    'player selected is not null and tab selected is "Blacklist"', 
    () => {
      const spy_remove = spyOn(team_data, "removePlayerFromBlacklist");
      component['_tab_selected'] = 'Blacklist';
      component['_player_selected'] = PLAYER_DATA[0];

      component.removePlayer();
      
      expect(spy_remove).toHaveBeenCalledOnceWith(PLAYER_DATA[0]);
    });

    it('should not call removePlayerFromBlacklist method from team-data service when removePlayer is called, ' +
    'player selected is not null and tab selected is not "Blacklist"', 
    () => {
      const spy_remove = spyOn(team_data, "removePlayerFromBlacklist");
      component['_tab_selected'] = 'tab error';
      component['_player_selected'] = PLAYER_DATA[0];

      component.removePlayer();
      
      expect(spy_remove).not.toHaveBeenCalled();
    });

    it('should call openSnackBarError method from snack-bar service when moveToBlacklist is called and player_selected is null',
    () => {
      const spy_snackbar = spyOn(snack_bar, "openSnackBarError");
      component['_player_selected'] = null;
      const txt_error = "Nessun giocatore è stato selezionato. Impossibile eseguire l'operazione";

      component.moveToBlacklist();

      expect(spy_snackbar).toHaveBeenCalledWith(txt_error);
    });

    it('should call openSnackBarError method from snack-bar service when moveToBlacklist is called, player_selected is not null ' +
    'and tab selected no match any condition',
    () => {
      const spy_snackbar = spyOn(snack_bar, "openSnackBarError");
      component['_player_selected'] = PLAYER_DATA[0];
      component['_tab_selected'] = 'tab error';
      const txt_error = "Errore: il tab selezionato non esiste. Impossibile eseguire l'operazione";

      component.moveToBlacklist();

      expect(spy_snackbar).toHaveBeenCalledWith(txt_error);
    });

    it('should call addToBlacklistFromTeam method from team-data service when moveToBlacklist is called, ' +
    'player_selected is not null and tab selected is "Team"',
    () => {
      const spy_addToBlacklist = spyOn(team_data, "addToBlacklistFromTeam");
      component['_tab_selected'] = 'Team';
      component['_player_selected'] = PLAYER_DATA[0];

      component.moveToBlacklist();

      expect(spy_addToBlacklist).toHaveBeenCalledOnceWith(PLAYER_DATA[0]);
    });

    it('should not call addToBlacklistFromTeam method from team-data service when moveToBlacklist is called, ' + 
    'player_selected is not null and tab selected is not "Team"',
    () => {
      const spy_addToBlacklist = spyOn(team_data, "addToBlacklistFromTeam");
      component['_tab_selected'] = 'test_error';
      component['_player_selected'] = PLAYER_DATA[0];

      component.moveToBlacklist();

      expect(spy_addToBlacklist).not.toHaveBeenCalled();
    });

    it('should call resetOptions method from shared service when resetOptions is called', () => {
      const spy_reset = spyOn(shared, "resetOptions");

      component.resetOptions();

      expect(spy_reset).toHaveBeenCalled();
    });

    it('should return true when _save_btn_disabled to be true and isSaveBtnDisabled is called', () => {
      component['_save_btn_disabled'] = true;

      expect(component.isSaveBtnDisabled()).toBeTrue();
    });

    it('should return false when _save_btn_disabled to be false and isSaveBtnDisabled is called', () => {
      component['_save_btn_disabled'] = false;

      expect(component.isSaveBtnDisabled()).toBeFalse();
    });

    it('should call saveOptions method from internal_data when saveOptions method is called', () => {
      const spy_save = spyOn(internal_data, "saveOptions");

      component.saveOptions();

      expect(spy_save).toHaveBeenCalled();
    });

    it('should return true if window width is less than 801 when isLayoutMobile is called', () => {
      const width = 800;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width);

      expect(component.isLayoutMobile()).toBeTrue();
    });

    it('should return false if window width is greater or equal than 801 when isLayoutMobile is called', () => {
      let width = 801;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width);

      expect(component.isLayoutMobile()).toBeFalse();

      width = 1000;
      spy_width.and.returnValue(width);

      expect(component.isLayoutMobile()).toBeFalse();
    });

    it('should isGridDisplayed method return true if window.width is greater or equal than 501', () => {
      let width = 501;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width);

      expect(component.isGridDisplayed()).toBeTrue();

      width = 1000;
      spy_width.and.returnValue(width);

      expect(component.isGridDisplayed()).toBeTrue();
    });

    it('should isGridDisplayed method return false if window.width is less than 501', () => {
      const width = 500;
      const spy_width = spyOn(component, "getInnerWidth").and.returnValue(width);

      expect(component.isGridDisplayed()).toBeFalse();
    });

    it('should setPlayersToView method call showTeam method from team data service when "Team" is given as argument', () => {
      const spy_player_team = spyOn(team_data, "showTeam");
      const spy_blacklist = spyOn(team_data, "showBlacklist");

      component.setPlayersToView('Team');

      expect(spy_blacklist).not.toHaveBeenCalled();
      expect(spy_player_team).toHaveBeenCalled();
    });

    it('should setPlayersToView method call showBlacklist from team data service when "Blacklist" is given as argument', () => {
      const spy_blacklist = spyOn(team_data, "showBlacklist");
      const spy_player_team = spyOn(team_data, "showTeam");

      component.setPlayersToView('Blacklist');

      expect(spy_player_team).not.toHaveBeenCalled();
      expect(spy_blacklist).toHaveBeenCalled();
    });

    it('should setPlayersToView method not call "showTeam" and "showBlacklist" methods from team data service when ' +
    'argument is not "Blacklist" or "Team"', () => {
      const spy_player_team = spyOn(team_data, "showTeam");
      const spy_blacklist = spyOn(team_data, "showBlacklist");

      component.setPlayersToView('error');

      expect(spy_player_team).not.toHaveBeenCalled();
      expect(spy_blacklist).not.toHaveBeenCalled();
    });
  });
});
