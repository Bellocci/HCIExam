import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { SharedService } from 'src/app/service/shared.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { TeamDataService } from 'src/app/service/team-data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterViewInit {

  constructor(
    private _internal_data:InternalDataService,
    private _team_data:TeamDataService,
    private _snack_bar:SnackBarService,
    private _shared:SharedService
  ) { }

  @ViewChild('tab_group') private tab_group!:MatTabGroup;
  private _tab_selected:string = '';

  private _disable_clear_team_btn: boolean = false;
  private _clear_btn_blacklist_disabled: boolean = false;
  private _save_btn_disabled: boolean = false;
  save_btn_clicked:boolean = false;

  private _player_selected: any = null;

  private _breakpoint: number = 4;
  private _rows_table: number = 5;
  private _cols_table:number = 3;
  private _rows_btns:number = 0;
  private _cols_btns:number = 1;

  row_height:number = 100;


  ngOnInit(): void {
    this.setBtnRows();
    
    this._team_data.showTeam();
    this.subscribePlayerSelected();
    this.subscribeDisableClearTeamBtn();
    this.subscribeSaveBtnEnabled();
    this.subscribeClearBlacklistBtnDisabled();
  }

  ngAfterViewInit(): void {
    const tab_name = this.tab_group?._tabs?.first.textLabel;
    this._internal_data.setTabSelected(tab_name);

    this._internal_data.getTabSelected().subscribe((tab:string) => {
      this._tab_selected = tab;
    });
  }

  /* PRIVATE METHODS */

  private subscribePlayerSelected() : void {
    this._team_data.getPlayerSelected().subscribe((player:any) => {
      this._player_selected = player;
    });
  }

  private subscribeDisableClearTeamBtn() : void {
    this._internal_data.isDisabledClearTeamBtn().subscribe((is_disable:boolean) => {
      this._disable_clear_team_btn = is_disable;
    });
  }

  private subscribeSaveBtnEnabled() : void {
    this._internal_data.isSaveOptionEnable().subscribe((is_enable) => {
      this._save_btn_disabled = is_enable;
      this.save_btn_clicked = false;
    });
  }

  private subscribeClearBlacklistBtnDisabled() : void {
    this._internal_data.isClearBlacklistBtnDisabled().subscribe((is_disabled) => {
      this._clear_btn_blacklist_disabled = is_disabled;
    }); 
  }

  /* GETTER METHODS */

  getInnerWidth() : number {
    return window.innerWidth;
  }

  getRowsTable() : number {
    return this._rows_table;
  }

  getRowHeight() : number {
    return this.row_height;
  }

  getRowsBtns() : number {
    return this._rows_btns;
  }

  getBreakpoint() : number {
    return this._breakpoint;
  }

  getColumnTable() : number {
    return this._cols_table;
  }

  getColumnButtons() : number {
    return this._cols_btns;
  }

  getTabSelected() : string {
    return this._tab_selected;
  }

  getPlayerSelected() : any {
    return this._player_selected;
  }

  /* SETTER METHOD */

  setTab(tab_name:string) : void {
    this._internal_data.setTabSelected(tab_name);
  }

  setPlayerSelected() : void {
    this._team_data.setPlayerSelected(null);
  }

  setBtnRows() : void {
    this._rows_btns = this.getInnerWidth() >= 1000 ? 5 : 4;
  }
  
  /* METHODS */

  isDisableClearTeamBtn() : boolean {
    return this._disable_clear_team_btn;
  }

  isGridDisplayed() : boolean {
    return this.getInnerWidth() >= 501 ? true : false;
  }

  clearAll() : void {
      this._tab_selected == 'Team' && !this.isDisableClearTeamBtn() ? this._team_data.clearTeam() 
        : this._tab_selected == 'Blacklist' && !this.isClearBlacklistBtnDisabled() ? this._team_data.clearBlacklist()
        : this._snack_bar.openSnackBarError("Errore: impossibile rimuovere tutti i giocatori dalla lista.");
  }

  isPlayerSelected() : boolean {
    return this._player_selected != null ? true : false;
  }
  
  removePlayer() : void {
    if(this._player_selected != null) {
      this._tab_selected == 'Team' ? this._team_data.removePlayerFromTeam(this._player_selected)
        : this._tab_selected == 'Blacklist' ? this._team_data.removePlayerFromBlacklist(this._player_selected)
        : this._snack_bar.openSnackBarError("Errore: il tab selezionato non esiste. Impossibile eseguire l'operazione 'Remove'");
    }
    else {
      this._snack_bar.openSnackBarError("Nessun giocatore è stato selezionato. Impossibile eseguire l'operazione");
    }
  }

  moveToBlacklist() : void {
    if(this._player_selected != null) {
      this._tab_selected == 'Team' ? this._team_data.addToBlacklistFromTeam(this._player_selected)
        : this._snack_bar.openSnackBarError("Errore: il tab selezionato non esiste. Impossibile eseguire l'operazione");
    }
    else {
      this._snack_bar.openSnackBarError("Nessun giocatore è stato selezionato. Impossibile eseguire l'operazione");
    }
  }

  resetOptions() : void {
    this._shared.resetOptions();
  }

  isClearBlacklistBtnDisabled() : boolean {
    return this._clear_btn_blacklist_disabled ? true : false;
  }

  isSaveBtnEnabled() : boolean {
    return this._save_btn_disabled;
  }

  saveOptions() : void {
    this.save_btn_clicked = true;
  }

  isLayoutMobile() : boolean {
    return this.getInnerWidth() < 801 ? true : false;
  }

  setPlayersToView(tab_name:string) : void {
    if (tab_name == 'Team')
      this._team_data.showTeam();
    else if(tab_name == 'Blacklist')
      this._team_data.showBlacklist();
  }
}
