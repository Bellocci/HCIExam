import { animate, state, style, transition, trigger, group, keyframes } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';

import { InternalDataService } from '../../service/internal-data.service';
import { RouterService } from '../../service/router.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { BreakpointsService } from 'src/app/service/breakpoints.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LeagueDialogComponent } from 'src/app/Dialog/league-dialog/league-dialog.component';
import { LeagueDialogHelper } from 'src/app/Dialog/league-dialog/league-dialog-helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService],
  animations: [
    trigger('elevationAnimation', [
      transition('* => *', [
        animate('3s infinite', keyframes([
          style({ offset: 0, 'box-shadow': '0px 2px 4px rgba(0,0,0,0.2)' }),  // z4
          style({ offset: 0.5, 'box-shadow': '0px 6px 8px rgba(0,0,0,0.3)' }), // z6
          style({ offset: 1, 'box-shadow': '0px 2px 4px rgba(0,0,0,0.2)' })  // ritorno a z4
        ]))
      ])
    ]),

    trigger('ListAnimation', [
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
    trigger('element', [
      state('show', style({ display: 'block' })),
      state('hide', style({ display: 'none' })),
      transition('* => *', [
          animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  ref!: DynamicDialogRef;

  @ViewChildren('tutorialImage') tutorialImages!: QueryList<ElementRef>;

  /*
   * ================================================
   * CONSTRUCTOR - INIT - DESTROY -  AFTER VIEW INIT
   *  ===============================================
   */  

  constructor(private routerService:RouterService,
    private internalDataService:InternalDataService,
    private breakpointsService:BreakpointsService,
    public dialogService: DialogService) {

      console.log("Construct Home page component");      
    } 

  ngOnInit(): void {     
    //this.internalDataService.setLoadingData(false);
  }

  ngOnDestroy(): void {
    console.log("Destroy Home page component");

    if (this.ref) {
      this.ref.close();
    }
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-left-animation');  // Cambia lo stato di animazione
          observer.unobserve(entry.target);  // Disabilita l'osservatore per l'elemento
        }
      });
    });

    this.tutorialImages.forEach((img) => {
      observer.observe(img.nativeElement);
    });
  }
  
  /**
   * ================
   * METODI LISTENER
   * ================
   */

  selectedLeagueListener(league:LeagueEntity) : void {
    //this.internalDataService.setLoadingData(true);
    this.internalDataService.setLeagueSelected(league);
    this.routerService.goToMyTeamPage();
  }

  openLeagueDialog() : void {
    let helper:LeagueDialogHelper = new LeagueDialogHelper();
    let width:string;
    let height:string 
    console.log("WINDOW WIDTH:" + window.innerWidth);
    if(BreakpointsService.isEqualOrGreaterThanLaptopBreakpoint(window.innerWidth)) {
      width = LeagueDialogHelper.DEFAULT_WIDTH;
      height = LeagueDialogHelper.DEFAULT_HEIGHT;
    } else {
      width = "100%";
      height = "100%";      
    }
    this.ref = this.dialogService.open(LeagueDialogComponent, 
      helper.getDynamicDialogConfig(width, height));
    
    this.ref.onClose.subscribe((league: LeagueEntity) => {
      if (league) {
        this.internalDataService.setLeagueSelected(league);
        this.routerService.goToMyTeamPage();
      }
    });
  }
}