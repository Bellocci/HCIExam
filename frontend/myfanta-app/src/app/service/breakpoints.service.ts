import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, fromEvent, map, shareReplay, takeUntil } from 'rxjs';

/**
 * Interfaccia per rappresentare le dimensioni di larghezza minima e massima per ogni breakpoint
 */
interface Breakpoint {
  minWidth: number,
  maxWidth?: number
}

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService implements OnDestroy {

  // Observable utilizzato per rilasciare le risorse quando il servizio viene distrutto
  private onDestroy$: Subject<any>;

  /*
   * =============
   * BREAKPOINT
   * =============
   */

  public static readonly MOBILE_BREAKPOINT: Breakpoint = { minWidth: 320, maxWidth: 599.98}
  public static readonly MOBILE_XL_BREAKPOINT : Breakpoint = {minWidth: 600, maxWidth : 767.98}
  public static readonly TABLET_BREAKPOINT: Breakpoint = { minWidth: 768, maxWidth: 991.98 }
  public static readonly LAPTOP_BREAKPOINT: Breakpoint = { minWidth: 992, maxWidth: 1199.98 }
  public static readonly LARGE_DEVICE_BREAKPOINT: Breakpoint = { minWidth: 1200, maxWidth: 1399.98}
  public static readonly XL_DEVICE_BREAKPOINT: Breakpoint = {minWidth: 1400}

  /*
   * ======================= 
   * OBSERVABLE BREAKPOINT
   * =======================
   */

  private readonly _mobileObservable: Observable<boolean>;  
  private readonly _mobileXLObservable: Observable<boolean>;  
  private readonly _tabletObservable: Observable<boolean>;  
  private readonly _laptopObservable: Observable<boolean>;
  private readonly _largeDeviceObservable: Observable<boolean>;
  private readonly _xlDeviceObservable: Observable<boolean>;  
  private readonly _mobileOrTabletObservable: Observable<boolean>;  
  private readonly _mobileOrMobileXLObservable: Observable<boolean>;

  constructor() {
    console.log("Construct the Breakpoints service");
    this.onDestroy$ = new Subject<any>();
    this._mobileObservable = this.createMobileObservable();
    this._mobileXLObservable = this.createMobileXLObservable();
    this._tabletObservable = this.createTabletObservable();
    this._laptopObservable = this.createLaptopObservable();
    this._largeDeviceObservable = this.createLargeDeviceObservable();
    this._xlDeviceObservable = this.createXLDeviceObservable();
    this._mobileOrTabletObservable = this.createMobileOrTabletObservable();
    this._mobileOrMobileXLObservable = this.createMobileOrMobileXLObservable();
  }

  ngOnDestroy(): void {
    console.log("Destroy the Breakpoints service");
    this.onDestroy$.next("");
  }

  /*
   * ================
   * METODI PRIVATI
   * ================
   */

  /*
   * NOTE TECNICHE: 
   * pipe() : consente di applicare una serie di trasformazioni a un Observable. Le trasformazioni possono essere utilizate
   * per modificare o filtrare i valori emessi dall'Observable.
   * map() : si mappa il valore emesso dall'Observable a un valore booleano che indica se il viewport è più piccolo 
   * del #pixel del breakpoint.
   * shareReplay() : consente di condividere un Observable con altri componenti, mantenendo nella cache i valori memorizzati
   */
  private createMobileObservable(): Observable<boolean> {
    return fromEvent(window, "resize")
      .pipe(
        takeUntil(this.onDestroy$),
        map((event) => {
          let result: boolean = false;
          if (event != null && event.target != null) {
            const window = event.target as Window;
            result = BreakpointsService.MOBILE_BREAKPOINT.minWidth <= window.innerWidth &&
              window.innerWidth < BreakpointsService.MOBILE_BREAKPOINT.maxWidth!;
          }
          return result;
        }),
        shareReplay()
      )
  }

  private createMobileXLObservable(): Observable<boolean> {
    return fromEvent(window, "resize")
      .pipe(
        takeUntil(this.onDestroy$),
        map((event) => {
          let result: boolean = false;
          if (event != null && event.target != null) {
            const window = event.target as Window;
            result = BreakpointsService.MOBILE_XL_BREAKPOINT.minWidth <= window.innerWidth &&
              window.innerWidth < BreakpointsService.MOBILE_XL_BREAKPOINT.maxWidth!;
          }
          return result;
        }),
        shareReplay()
      )
  }

  private createTabletObservable(): Observable<boolean> {
    return fromEvent(window, "resize")
      .pipe(
        takeUntil(this.onDestroy$),
        map((event) => {
          let result: boolean = false;
          if (event != null && event.target != null) {
            const window = event.target as Window;
            result = BreakpointsService.TABLET_BREAKPOINT.minWidth <= window.innerWidth &&
              window.innerWidth < BreakpointsService.TABLET_BREAKPOINT.maxWidth!;
          }
          return result;
        }),
        shareReplay()
      )
  }

  private createLaptopObservable(): Observable<boolean> {
    return fromEvent(window, "resize")
      .pipe(
        takeUntil(this.onDestroy$),
        map((event) => {
          let result: boolean = false;
          if (event != null && event.target != null) {
            const window = event.target as Window;
            result = BreakpointsService.LAPTOP_BREAKPOINT.minWidth <= window.innerWidth &&
              window.innerWidth < BreakpointsService.LAPTOP_BREAKPOINT.maxWidth!;
          }
          return result;
        }),
        shareReplay()
      )
  }

  private createLargeDeviceObservable(): Observable<boolean> {
    return fromEvent(window, "resize")
      .pipe(
        takeUntil(this.onDestroy$),
        map((event) => {
          let result: boolean = false;
          if (event != null && event.target != null) {
            const window = event.target as Window;
            result = BreakpointsService.LARGE_DEVICE_BREAKPOINT.minWidth <= window.innerWidth &&
              window.innerWidth < BreakpointsService.LARGE_DEVICE_BREAKPOINT.maxWidth!;
          }
          return result;
        }),
        shareReplay()
      )
  }

  private createXLDeviceObservable(): Observable<boolean> {
    return fromEvent(window, "resize")
      .pipe(
        takeUntil(this.onDestroy$),
        map((event) => {
          let result: boolean = false;
          if (event != null && event.target != null) {
            const window = event.target as Window;
            result = BreakpointsService.XL_DEVICE_BREAKPOINT.minWidth <= window.innerWidth;
          }
          return result;
        }),
        shareReplay()
      )
  }

  private createMobileOrTabletObservable() : Observable<boolean> {
    return fromEvent(window, "resize")
      .pipe(
        takeUntil(this.onDestroy$),
        map((event) => {
          let result:boolean = false;
          if(event != null && event.target != null) {
            const window = event.target as Window;
            result = BreakpointsService.MOBILE_BREAKPOINT.minWidth <= window.innerWidth && 
                window.innerWidth < BreakpointsService.TABLET_BREAKPOINT.maxWidth!;
          }
          return result;
        }),
        shareReplay()
      )
  }

  private createMobileOrMobileXLObservable() : Observable<boolean> {
    return fromEvent(window, "resize")
      .pipe(
        takeUntil(this.onDestroy$),
        map((event) => {
          let result:boolean = false;
          if(event != null && event.target != null) {
            const window = event.target as Window;
            result = BreakpointsService.MOBILE_BREAKPOINT.minWidth <= window.innerWidth && 
                window.innerWidth < BreakpointsService.MOBILE_XL_BREAKPOINT.maxWidth!;
          }
          return result;
        }),
        shareReplay()
      )
  }

  /*
   * ============
   * METODI GET
   * ============
   */

  public get mobileObservable(): Observable<boolean> {
    return this._mobileObservable;
  }

  public get mobileXLObservable(): Observable<boolean> {
    return this._mobileXLObservable;
  }

  public get tabletObservable(): Observable<boolean> {
    return this._tabletObservable;
  }
  
  public get laptopObservable(): Observable<boolean> {
    return this._laptopObservable;
  }

  public get largeDeviceObservable(): Observable<boolean> {
    return this._largeDeviceObservable;
  }

  public get xlDeviceObservable(): Observable<boolean> {
    return this._xlDeviceObservable;
  }

  public get mobileOrTabletObservable(): Observable<boolean> {
    return this._mobileOrTabletObservable;
  }

  public get mobileOrMobileXLObservable() : Observable<boolean> {
    return this._mobileOrMobileXLObservable;
  }

  /*
   * ===============
   * METODI STATICI 
   * ===============
   */

  /**
   * @param windowWidth 
   * @returns true se 320px <= width <= 599.98px, false altrimenti
   */
  public static isMobileBreakpointActive(windowWidth:number) : boolean {
    return this.MOBILE_BREAKPOINT.minWidth <= windowWidth && windowWidth <= this.MOBILE_BREAKPOINT.maxWidth!; 
  }

  /**
   * @param windowWidth 
   * @returns true se 600px <= width <= 767.98px, false altrimenti
   */
  public static isMobileXLBreakpointActive(windowWidth:number) : boolean {
    return this.MOBILE_XL_BREAKPOINT.minWidth <= windowWidth && windowWidth <= this.MOBILE_XL_BREAKPOINT.maxWidth!; 
  }

  /**
   * @param windowWidth 
   * @returns true se 768px <= width <= 991.98px, false altrimenti
   */
  public static isTabletBreakpointActive(windowWidth:number) : boolean {
    return this.TABLET_BREAKPOINT.minWidth <= windowWidth && windowWidth <= this.TABLET_BREAKPOINT.maxWidth!; 
  }

  /**
   * @param windowWidth 
   * @returns true se 992px <= width <= 1199.98px, false altrimenti
   */
  public static isLaptopBreakpointActive(windowWidth:number) : boolean {
    return this.LAPTOP_BREAKPOINT.minWidth <= windowWidth && windowWidth <= this.LAPTOP_BREAKPOINT.maxWidth!; 
  }

  /**
   * @param windowWidth 
   * @returns true se 1200px <= width <= 1399.98px, false altrimenti
   */
  public static isLargeDeviceBreakpointActive(windowWidth:number) : boolean {
    return this.LARGE_DEVICE_BREAKPOINT.minWidth <= windowWidth && windowWidth <= this.LARGE_DEVICE_BREAKPOINT.maxWidth!; 
  }
  
  /**
   * @param windowWidth 
   * @returns true se 1400px <= width, false altrimenti
   */
  public static isXLDeviceBreakpointActive(windowWidth:number) : boolean {
    return this.XL_DEVICE_BREAKPOINT.minWidth <= windowWidth; 
  }

  /**
   * @param windowWidth 
   * @returns true se 320px <= width <= 767.98px, false altrimenti
   */
  public static isMobileOrMobileXLBreakpointActive(windowWidth:number) : boolean {
    return this.MOBILE_BREAKPOINT.minWidth <= windowWidth && windowWidth <= this.MOBILE_XL_BREAKPOINT.maxWidth!; 
  }

  /**
   * @param windowWidth 
   * @returns true se 320px <= width <= 767.98px, false altrimenti
   */
  public static isMobileOrTabletBreakpointActive(windowWidth:number) : boolean {
    return this.MOBILE_BREAKPOINT.minWidth <= windowWidth && windowWidth <= this.TABLET_BREAKPOINT.maxWidth!; 
  }

  /**
   * @param windowWidth 
   * @returns true se width >= 768px, false altrimenti
   */
  public static isEqualOrGreaterThanTabletBreakpoint(windowWidth:number) : boolean {
    return windowWidth >= this.TABLET_BREAKPOINT.minWidth; 
  }

  /**
   * @param windowWidth 
   * @returns true se width >= 992px, false altrimenti
   */
  public static isEqualOrGreaterThanLaptopBreakpoint(windowWidth:number) : boolean {
    return windowWidth >= this.LAPTOP_BREAKPOINT.minWidth; 
  }

  /**
   * @param windowWidth 
   * @returns true se width >= 1200px, false altrimenti
   */
  public static isEqualOrGreaterThanLargeDeviceBreakpoint(windowWidth:number) : boolean {
    return windowWidth >= this.LARGE_DEVICE_BREAKPOINT.minWidth; 
  }
  
}
