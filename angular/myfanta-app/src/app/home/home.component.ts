import { animate, state, style, transition, trigger, group, keyframes, query, animateChild } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterDataService } from '../service/filter-data.service';
import { InternalDataService } from '../service/internal-data.service';
import { LoadDataService } from '../service/load-data.service';
import { SharedService } from '../service/shared.service';
import { SportEnum } from 'src/enum/SportEnum.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('champListAnimation', [
      state('openList', style({ height: '*', opacity: 1 })),
      state('closeList', style({ height: '0', opacity: 0 })),
      transition('closeList => openList', [
        group([
          animate("300ms cubic-bezier(0.4,0.0,0.2,1)", style({height: '*'})),
          animate("225ms cubic-bezier(0.4,0.0,0.2,1)", style({opacity: '1'}))
        ])
      ]),
      transition('openList => closeList', [
        group([
          animate("300ms cubic-bezier(0.4,0.0,0.2,1)", style({height: '0'})),
          animate("225ms cubic-bezier(0.4,0.0,0.2,1)", style({opacity: '0', transform: 'translateY(-100%)'}))
        ])
      ]),
    ]),
    trigger('champElement', [
      state('show', style({ display: 'block' })),
      state('hide', style({ display: 'none' })),
      transition('* => *', [
          animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(private service:SharedService, private loadDataService:LoadDataService,
    private filterDataService:FilterDataService, private internal_data:InternalDataService) { }

  private _state_btns = new Map<string, boolean>();
  private _active_btn!:string;

  championship_selected:string = '';
  subscrip_champ:Subscription = new Subscription;

  sportsList:any = [];
  championshipsList:any = [];

  ngOnInit(): void {

    this._active_btn = '';
    this.initStateBtns();
  }

  ngOnDestroy(): void {
    if(this.subscrip_champ)
      this.subscrip_champ.unsubscribe();
  }

  // GETTER

  getSportsList(): String[] {
    return Object.values(SportEnum);
  }

  // SETTER

  setActivePage(page_name: string) {
    this.internal_data.setActiveLink(page_name);
  }

  // OTHER METHODS

  filterChampionship(champ:any, sport:any):boolean {
    if(champ.sport != sport.sportId)
      return false;
    return true;
  }

  toggleSportBtnFromIcon(icon:any) {
    this.toggleSportBtn(icon.parentElement);
  }

  toggleSportBtn(btn:any) {
    const btn_text = btn.textContent.split('keyboard');
    this.setStateBtn(btn_text[0].trim());
  }  

  isActiveBtn(text_btn:string) : boolean {
    return this._state_btns.get(text_btn) ? true : false
  }

  

  // PRIVATE METHODS

  private setStateBtn(text_btn:string) {
    if(this._state_btns.has(text_btn)) {
      if(!this._state_btns.get(text_btn)) {
        if(this._active_btn != '') {
          this._state_btns.set(this._active_btn, false);
        }
        this._active_btn = text_btn;
        this._state_btns.set(this._active_btn, true);
      } 
      else {
        this._state_btns.set(this._active_btn, false);
        this._active_btn = '';
      }
    }
  }

  private initStateBtns() {
    for(let sport of this.sportsList) {
      this._state_btns.set(sport.sportName, false);
    }
  }
}