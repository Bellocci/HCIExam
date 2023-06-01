import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InternalDataService } from './internal-data.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private readonly HOME_PAGE_PATH:string = "";
  private readonly CREATE_TEAM_PAGE_PATH:string = "/createTeam";
  private readonly PLAYER_LIST_PAGE_PATH:string = "/playerList";
  private readonly FAVORIT_LIST_PAGE_PATH:string = "/favoritList"
  private readonly BLACKLIST_PAGE_PATH:string = "/blackList";
  private readonly MYPROFILE_PAGE_PATH:string = "/myProfile";

  constructor(private router: Router, private internalDataService:InternalDataService) { }

  private linkEnum: typeof LinkEnum = LinkEnum;

  // Metodo che renderizza alla pagina di Home
  goToHomePage() : void {
    this.router.navigate([this.HOME_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.HOME.label);
  }

  // Metodo che renderizza alla pagina di Create Team
  goToCreateTeamPage() : void {
    this.router.navigate([this.CREATE_TEAM_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.CREATE_TEAM.label);
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori
  goToPlayerListPage() : void {
    this.router.navigate([this.PLAYER_LIST_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.PLAYER_LIST.label);
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori preferiti
  goToFavoritListPage() : void {
    this.router.navigate([this.FAVORIT_LIST_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.FAVORIT_LIST.label);
  }

  // Metodo che renderizza alla pagina di lista dei giocatori esclusi
  goToBlacklistPage() : void {
    this.router.navigate([this.BLACKLIST_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.BLACKLIST.label);
  }

  // Metodo che renderizza alla pagina di profilo
  goToMyProfilePage() : void {
    this.router.navigate([this.MYPROFILE_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.USER_PROFILE.label);
  }

  currentPageisMyProfile() : boolean {
    return this.router.url == this.MYPROFILE_PAGE_PATH;
  }
  
}
