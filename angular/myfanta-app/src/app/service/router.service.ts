import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InternalDataService } from './internal-data.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { Player } from 'src/decorator/player.model';
import { SessionStorageService } from './session-storage.service';
import { LinkEnumNavigateToPageVisitor } from 'src/visitor/link-enum/LinkEnumNavigateToPageVisitor';
import { LinkEnumIsCurrentPageVisitorWithReturn } from 'src/visitor/link-enum/LinkEnumIsCurrentPageVisitorWithReturn';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private static readonly KEY_SESSION_LAST_PAGE:string = "lastPage";

  private readonly PARENT_PATH:string = "/fantasyteam/";

  private readonly HOME_PAGE_PATH:string = "home";
  private readonly MYTEAM_PAGE_PATH:string = "myTeam";
  private readonly PLAYER_LIST_PAGE_PATH:string = "playerList";
  private readonly FAVORIT_LIST_PAGE_PATH:string = "favoriteList"
  private readonly BLACKLIST_PAGE_PATH:string = "blackList";
  private readonly MYPROFILE_PAGE_PATH:string = "myProfile";
  private readonly OPTIONS_PAGE_PATH:string = "options";

  private lastPage:string = "";

  constructor(private router: Router, 
    private internalDataService:InternalDataService,
    private sessionStorageLastPage:SessionStorageService<string>) { 

      this.lastPage = this.sessionStorageLastPage.getData(RouterService.KEY_SESSION_LAST_PAGE) != null ? 
        this.sessionStorageLastPage.getData(RouterService.KEY_SESSION_LAST_PAGE)! :
        "";
  }

  // Metodo che renderizza alla pagina di Home
  goToHomePage() : void {
    this.internalDataService.setLoadingData(true);    
    this.currentPageIsHome() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, "");
  }

  // Verifica se la pagina currente è 'home'
  currentPageIsHome() : boolean {
    return this.router.url == this.PARENT_PATH + this.HOME_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di Create Team
  goToMyTeamPage() : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsMyTeam() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, this.PARENT_PATH + this.MYTEAM_PAGE_PATH);
  }

  // Verifica se la pagina corrente è 'myTeam'
  currentPageIsMyTeam() : boolean {
    return this.router.url == this.PARENT_PATH + this.MYTEAM_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori
  goToPlayerListPage() : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsPlayerList() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, this.PARENT_PATH + this.PLAYER_LIST_PAGE_PATH);
  }

  currentPageIsPlayerList() : boolean {
    return this.router.url == this.PARENT_PATH + this.PLAYER_LIST_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori preferiti
  goToFavoritListPage() : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsFavoritList() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, this.PARENT_PATH + this.FAVORIT_LIST_PAGE_PATH);
  }

  // Verifica se la pagina corrente è 'Favorit List'
  currentPageIsFavoritList() : boolean {
    return this.router.url == this.PARENT_PATH + this.FAVORIT_LIST_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di lista dei giocatori esclusi
  goToBlacklistPage() : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsBlacklist() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, this.PARENT_PATH + this.BLACKLIST_PAGE_PATH);
  }

  // Verifica se la pagina corrente è 'Blacklist'
  currentPageIsBlacklist() : boolean {
    return this.router.url == this.PARENT_PATH + this.BLACKLIST_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di profilo
  goToMyProfilePage() : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsMyProfile() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, this.PARENT_PATH + this.MYPROFILE_PAGE_PATH);
  }

  // Verifica se la pagina corrente è myProfile
  currentPageIsMyProfile() : boolean {
    return this.router.url == this.PARENT_PATH + this.MYPROFILE_PAGE_PATH;
  }

  // Metodo che renderizza alla pagina di opzioni di filtraggio dei giocatori
  goToOptionsPage() : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsOptions() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, this.PARENT_PATH + this.OPTIONS_PAGE_PATH);
  }

  // Verifica se la pagina corrente è myProfile
  currentPageIsOptions() : boolean {
    return this.router.url == this.PARENT_PATH + this.OPTIONS_PAGE_PATH;
  }

  goToPlayerPage(player:Player) : void {
    this.internalDataService.setLoadingData(true);
    const team:string = player.getTeam().getName().replace(/[^a-zA-Z]/g, "-");
    const league:string = player.getTeam().getLeague().getName().replace(/[^a-zA-Z]/g, "-");
    const playerName:string = player.getName().replace(/[^a-zA-Z]/g, "-");
    this.currentPageIsPlayerProfile(player) ? this.reloadOrNavigate(true) : 
      this.reloadOrNavigate(false, this.PARENT_PATH + league + "/" + team + "/" + playerName + "/" + player.getId());
  }

  currentPageIsPlayerProfile(player:Player) : boolean {
    const team:string = player.getTeam().getName().replace(/[^a-zA-Z]/g, "-");
    const league:string = player.getTeam().getLeague().getName().replace(/[^a-zA-Z]/g, "-");
    const playerName:string = player.getName().replace(/[^a-zA-Z]/g, "-");
    return this.router.url == this.PARENT_PATH + league + "/" + team + "/" + playerName + "/" + player.getId();
  }

  /**
   * Riporta alla pagina visitata precedentemente
   */
  goPreviousPage() : void {
    this.reloadOrNavigate(false, this.lastPage);
  }

  goToLink(linkEnum:LinkEnum) : void {
    const visitor = new LinkEnumNavigateToPageVisitor(this);
    LinkEnum.visit(linkEnum, visitor);
  }

  isLinkActivated(linkEnum:LinkEnum) : boolean {
    const visitor = new LinkEnumIsCurrentPageVisitorWithReturn(this);
    return LinkEnum.visitAndReturn(linkEnum, visitor);
  }
  
  /**
   * Metodo che ricarica la pagina corrente o naviga all'url passato come argomento 
   * 
   * @param self : boolean
   * @param urlToNavigateTo : string (Obbligatorio solo se self è false)
   */
  private reloadOrNavigate(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
    let url:string = "";
    if(self) {
      url = this.router.url;
    } else {
      this.lastPage = this.router.url;
      this.sessionStorageLastPage.saveData(RouterService.KEY_SESSION_LAST_PAGE, this.lastPage);
      url = urlToNavigateTo!;
    }
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(() => this.router.navigate([`/${url}`]) );
  }
}
