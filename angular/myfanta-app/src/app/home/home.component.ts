import { animate, state, style, transition, trigger, group, keyframes, query, animateChild } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { InternalDataService } from '../internal-data.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('champListAnimation', [
      state('openList', style({
        height: '*',
        opacity: 1,
      })),
      state('closeList', style({
        height: '0',
        opacity: 0,
      })),
      transition('closeList => openList', [
        group([
          animate(
            "400ms cubic-bezier(0.4, 0, 0.2, 1)", 
            style({height: '*'})
          ),
          animate(
            "350ms cubic-bezier(0.4, 0, 0.2, 1)",
            style({opacity: '1'})
          ),
        ])
      ]),
      transition('openList => closeList', [
        group([
          animate(
            "400ms cubic-bezier(0.4, 0, 0.2, 1)", 
            style({height: '0'})
          ),
          animate(
            "200ms cubic-bezier(0.4, 0, 0.2, 1)",
            style({opacity: '0'})
          ),
        ])
      ]),
    ]),
    trigger('champElement', [
      state('show', style({
        display: 'block',
      })),
      state('hide', style({
        display: 'none',
      })),
      transition('* => *', [
          animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(private service:SharedService, private internal_data:InternalDataService) { }

  private _state_btns = new Map<string, boolean>();
  private _active_btn!:string;
  panelOpenState:boolean = false;

  championship_selected:string = '';
  subscrip_champ:Subscription = new Subscription;

  sportsList:any = [];
  championshipsList:any = [];

  ngOnInit(): void {
    this.loadSportsList();
    this.loadChampionshipsList();

    this.getChampionshipSelected();

    this._active_btn = '';
    this.initStateBtns();
  }

  ngOnDestroy(): void {
    if(this.subscrip_champ)
      this.subscrip_champ.unsubscribe();
  }

  private getChampionshipSelected() {
    this.subscrip_champ = this.internal_data.getChampionshipSelected().subscribe(champ => {
      this.championship_selected = champ;
    })
  }

  private loadSportsList() {
    this.service.getSportList().subscribe(data => {
      this.sportsList = data;
    });
  }

  private loadChampionshipsList() {
    this.service.getChampionshipList().subscribe(data => {
      this.championshipsList = data;
    });
  }

  private initStateBtns() {
    for(let sport of this.sportsList) {
      this._state_btns.set(sport.sportName, false);
    }
  }

  filterChampionship(champ:any, sport:any):boolean {
    if(champ.sport != sport.sportId)
      return false;
    return true;
  }

  setChampionshipSelected(name:string) {
    this.internal_data.setChampionshipSelected(name);
  }

  toggleSportBtnFromIcon(icon:any) {
    this.toggleSportBtn(icon.parentElement);
  }

  toggleSportBtn(btn:any) {
    const btn_text = btn.textContent.split('keyboard');
    this.setStateBtn(btn_text[0].trim());
  }

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

  isActiveBtn(text_btn:string) : boolean {
    return this._state_btns.get(text_btn) ? true : false
  }

  setActivePage(page_name: string) {
    this.internal_data.setActiveLink(page_name);
  }
}