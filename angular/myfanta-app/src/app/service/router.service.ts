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
  private lastPage:string = "";

  constructor(private router: Router, 
    private internalDataService:InternalDataService,
    private sessionStorageLastPage:SessionStorageService<string>) { 

      this.lastPage = this.sessionStorageLastPage.getData(RouterService.KEY_SESSION_LAST_PAGE) != null ? 
        this.sessionStorageLastPage.getData(RouterService.KEY_SESSION_LAST_PAGE)! :
        "";
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

  // Metodo che renderizza alla pagina di Home
  goToHomePage(link:LinkEnum) : void {
    this.internalDataService.setLoadingData(true);    
    this.currentPageIsHome(link) ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, link.path);
  }

  // Verifica se la pagina currente è 'home'
  currentPageIsHome(link:LinkEnum) : boolean {
    return this.router.url == link.path;
  }

  // Metodo che renderizza alla pagina di Create Team
  goToMyTeamPage(link:LinkEnum) : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsMyTeam(link) ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, link.path);
  }

  // Verifica se la pagina corrente è 'myTeam'
  currentPageIsMyTeam(link:LinkEnum) : boolean {
    return this.router.url == link.path;
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori
  goToPlayerListPage(link:LinkEnum) : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsPlayerList(link) ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, link.path);
  }

  currentPageIsPlayerList(link:LinkEnum) : boolean {
    return this.router.url == link.path;
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori preferiti
  goToFavoritListPage(link:LinkEnum) : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsFavoritList(link) ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, link.path);
  }

  // Verifica se la pagina corrente è 'Favorit List'
  currentPageIsFavoritList(link:LinkEnum) : boolean {
    return this.router.url == link.path;
  }

  // Metodo che renderizza alla pagina di lista dei giocatori esclusi
  goToBlacklistPage(link:LinkEnum) : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsBlacklist(link) ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, link.path);
  }

  // Verifica se la pagina corrente è 'Blacklist'
  currentPageIsBlacklist(link:LinkEnum) : boolean {
    return this.router.url == link.path;
  }

  // Metodo che renderizza alla pagina di profilo
  goToMyProfilePage(link:LinkEnum) : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsMyProfile(link) ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, link.path);
  }

  // Verifica se la pagina corrente è myProfile
  currentPageIsMyProfile(link:LinkEnum) : boolean {
    return this.router.url == link.path;
  }

  // Metodo che renderizza alla pagina di opzioni di filtraggio dei giocatori
  goToOptionsPage(link:LinkEnum) : void {
    this.internalDataService.setLoadingData(true);
    this.currentPageIsOptions(link) ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, link.path);
  }

  // Verifica se la pagina corrente è myProfile
  currentPageIsOptions(link:LinkEnum) : boolean {
    return this.router.url == link.path;
  }

  goToPlayerPage(player:Player) : void {
    this.internalDataService.setLoadingData(true);
    const playerProfilePath:string = this.buildPlayerProfilePath(player);
    this.reloadOrNavigate(false, playerProfilePath);
  }

  currentPageIsPlayerProfile(player:Player) : boolean {
    const playerProfilePath:string = this.buildPlayerProfilePath(player);
    return this.router.url == playerProfilePath;
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

  private buildPlayerProfilePath(player:Player) : string {
    const team:string = player.getTeam().getName().replace(/[^a-zA-Z]/g, "-");
    const league:string = player.getTeam().getLeague().getName().replace(/[^a-zA-Z]/g, "-");
    const playerName:string = player.getName().replace(/[^a-zA-Z]/g, "-");
    return LinkEnum.PARENT_PATH + league + "/" + team + "/" + playerName + "/" + player.getId();
  }
}
