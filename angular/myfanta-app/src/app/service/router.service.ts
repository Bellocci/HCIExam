import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InternalDataService } from './internal-data.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private readonly HOME_PAGE_PATH:string = "";
  private readonly MYTEAM_PAGE_PATH:string = "/myTeam";
  private readonly PLAYER_LIST_PAGE_PATH:string = "/playerList";
  private readonly FAVORIT_LIST_PAGE_PATH:string = "/favoritList"
  private readonly BLACKLIST_PAGE_PATH:string = "/blackList";
  private readonly MYPROFILE_PAGE_PATH:string = "/myProfile";
  private readonly OPTIONS_PAGE_PATH:string = "/options";

  constructor(private router: Router, private internalDataService:InternalDataService) { }

  private linkEnum: typeof LinkEnum = LinkEnum;

  // Metodo che renderizza alla pagina di Home
  goToHomePage() : void {
    this.internalDataService.setLoadingData(true);
    this.router.navigate([this.HOME_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.HOME.label);
  }

  // Metodo che renderizza alla pagina di Create Team
  goToMyTeamPage() : void {
    this.internalDataService.setLoadingData(true);
    this.router.navigate([this.MYTEAM_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.MYTEAM.label);
  }

  // Verifica se la pagina corrente è 'myTeam'
  currentPageIsMyTeam() : boolean {
    return this.router.url == this.MYTEAM_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori
  goToPlayerListPage() : void {
    this.internalDataService.setLoadingData(true);
    this.router.navigate([this.PLAYER_LIST_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.PLAYER_LIST.label);
  }

  currentPageIsPlayerList() : boolean {
    return this.router.url == this.PLAYER_LIST_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori preferiti
  goToFavoritListPage() : void {
    this.internalDataService.setLoadingData(true);
    this.router.navigate([this.FAVORIT_LIST_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.FAVORIT_LIST.label);
  }

  // Verifica se la pagina corrente è 'Favorit List'
  currentPageIsFavoritList() : boolean {
    return this.router.url == this.FAVORIT_LIST_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di lista dei giocatori esclusi
  goToBlacklistPage() : void {
    this.internalDataService.setLoadingData(true);
    this.router.navigate([this.BLACKLIST_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.BLACKLIST.label);
  }

  // Verifica se la pagina corrente è 'Blacklist'
  currentPageIsBlacklist() : boolean {
    return this.router.url == this.BLACKLIST_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di profilo
  goToMyProfilePage() : void {
    this.internalDataService.setLoadingData(true);
    this.router.navigate([this.MYPROFILE_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.USER_PROFILE.label);
  }

  // Verifica se la pagina corrente è myProfile
  currentPageIsMyProfile() : boolean {
    return this.router.url == this.MYPROFILE_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di opzioni di filtraggio dei giocatori
  goToOptionsPage() : void {
    this.internalDataService.setLoadingData(true);
    this.router.navigate([this.OPTIONS_PAGE_PATH]);
    this.internalDataService.setActiveLink(this.linkEnum.OPTIONS.label);
  }

  // Verifica se la pagina corrente è myProfile
  currentPageIsOptions() : boolean {
    return this.router.url == this.OPTIONS_PAGE_PATH;
  }
  
}
