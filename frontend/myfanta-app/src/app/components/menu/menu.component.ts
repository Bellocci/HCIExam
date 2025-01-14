import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListboxClickEvent } from 'primeng/listbox';
import { Subscription } from 'rxjs';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { RouterService } from 'src/app/service/router.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/decorator/user';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  links: LinkEnum[] = LinkEnum.values();

  private _userLogged: boolean = false;
  private _subscriptionUserObservable: Subscription | undefined;

  private _leagueSelected: boolean = false;  
  private _subscriptionLeagueSelectedObservable: Subscription | undefined;

  /*
   * ===============================
   * CONSTRUCTOR - INIT - DESTROYER 
   * ===============================
   */

  constructor(public routerService: RouterService,
    private userService: UserService,
    private internalDataService:InternalDataService) {
  }

  ngOnInit(): void {
    this._subscriptionUserObservable = this.observeUserLogged();
    this._subscriptionLeagueSelectedObservable = this.observeLeagueSelected();
  }

  ngOnDestroy(): void {
    this._subscriptionUserObservable != undefined ? this._subscriptionUserObservable.unsubscribe() : undefined;
    this._subscriptionLeagueSelectedObservable != undefined ? this._subscriptionLeagueSelectedObservable.unsubscribe() : undefined;
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private observeUserLogged(): Subscription | undefined {
    return this.userService.addObserverForUser(new ObserverStepBuilder<User>()
      .next((user: User) => {
        this._userLogged = user.isUserDefined();
      })
      .error((error: any) => console.error("Error to get user: " + error))
      .complete(() => console.log("User observer completed"))
      .build()
    );
  }

  private observeLeagueSelected(): Subscription | undefined {
    return this.internalDataService.addObserverToLeagueSelected(new ObserverStepBuilder<LeagueEntity | null>()
      .next((league: LeagueEntity | null) => this.leagueSelected = league != null)
      .error((error: any) => console.error("Error to get league: " + error))
      .complete(() => console.log("League selected observer completed"))
      .build()
    );
  }

  /*
   * ================
   * GETTER & SETTER 
   * ================
   */

  public get userLogged() {
    return this._userLogged;
  }

  private set userLogged(value) {
    this._userLogged = value;
  }

  public get leagueSelected(): boolean {
    return this._leagueSelected;
  }
  
  private set leagueSelected(value: boolean) {
    this._leagueSelected = value;
  }

  getLinks() : LinkEnum[] {
    return LinkEnum.values().filter(link => this.isLinkVisible(link))
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  goToPage(event: ListboxClickEvent) {
    let linkSelected: LinkEnum = event.value;
    if (linkSelected != undefined) {
      this.routerService.goToLink(linkSelected);
    }
  }

  /*
   * ============
   * VISIBILITA' 
   * ============
   */

  private isLinkVisible(link: LinkEnum) {

    if (link.label == LinkEnum.PLAYER_PROFILE.label) {
      return false;
    }

    if (link.label == LinkEnum.MYTEAM.label) {
      return this.userLogged;
    }

    if (link.label != LinkEnum.HOME.label) {
      return this.leagueSelected;
    }

    return true;
  }

  isSaveBtnRendered() : boolean {
    return this.userLogged;
  }
}
