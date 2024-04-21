import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InternalDataService } from './internal-data.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { SessionStorageService } from './session-storage.service';
import { LinkEnumNavigateToPageVisitor } from 'src/visitor/link-enum/LinkEnumNavigateToPageVisitor';
import { LinkEnumIsCurrentPageVisitorWithReturn } from 'src/visitor/link-enum/LinkEnumIsCurrentPageVisitorWithReturn';
import { PlayerEntity } from 'src/model/playerEntity.model';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  public static readonly KEY_SESSION_LAST_PAGE:string = "lastPage";
  private lastPage:string = "";

  private visitorNavigateToLink:LinkEnumNavigateToPageVisitor;
  private visitorIsCurrentPage:LinkEnumIsCurrentPageVisitorWithReturn;

  constructor(private router: Router, 
    private internalDataService:InternalDataService,
    private sessionStorageLastPage:SessionStorageService) { 

      this.lastPage = this.sessionStorageLastPage.getData(RouterService.KEY_SESSION_LAST_PAGE) != null ? 
        this.sessionStorageLastPage.getData(RouterService.KEY_SESSION_LAST_PAGE)! :
        "";

      this.visitorNavigateToLink = new LinkEnumNavigateToPageVisitor(this);
      this.visitorIsCurrentPage = new LinkEnumIsCurrentPageVisitorWithReturn(this);
  }

  /**
   * Riporta alla pagina visitata precedentemente
   */
  goPreviousPage() : void {
    this.reloadOrNavigate(false, this.lastPage);
  }

  goToLink(linkEnum:LinkEnum) : void {
    console.log("Navigate to:" + linkEnum.path);
    LinkEnum.visit(linkEnum, this.visitorNavigateToLink);
  }

  isLinkActivated(linkEnum:LinkEnum) : boolean {
    return LinkEnum.visitAndReturn(linkEnum, this.visitorIsCurrentPage);
  }

  // Metodo che renderizza alla pagina di Home 
  goToHomePage() : void {
    //this.internalDataService.setLoadingData(true); 
    this.currentPageIsHome() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, LinkEnum.HOME.path);
  }

  // Verifica se la pagina currente è 'home'
  currentPageIsHome() : boolean {
    return this.router.url == LinkEnum.HOME.path;
  }

  // Metodo che renderizza alla pagina di Create Team
  goToMyTeamPage() : void {
    //this.internalDataService.setLoadingData(true);
    this.currentPageIsMyTeam() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, LinkEnum.MYTEAM.path);
  }

  // Verifica se la pagina corrente è 'myTeam'
  currentPageIsMyTeam() : boolean {
    return this.router.url == LinkEnum.MYTEAM.path;
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori
  goToPlayerListPage() : void {
    //this.internalDataService.setLoadingData(true);
    this.currentPageIsPlayerList() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, LinkEnum.PLAYER_LIST.path);
  }

  currentPageIsPlayerList() : boolean {
    return this.router.url == LinkEnum.PLAYER_LIST.path;
  }

  // Metodo che renderizza alla pagina di Lista dei giocatori preferiti
  goToFavoritListPage() : void {
    //this.internalDataService.setLoadingData(true);
    this.currentPageIsFavoritList() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, LinkEnum.FAVORIT_LIST.path);
  }

  // Verifica se la pagina corrente è 'Favorit List'
  currentPageIsFavoritList() : boolean {
    return this.router.url == LinkEnum.FAVORIT_LIST.path;
  }

  // Metodo che renderizza alla pagina di lista dei giocatori esclusi
  goToBlacklistPage() : void {
    //this.internalDataService.setLoadingData(true);
    this.currentPageIsBlacklist() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, LinkEnum.BLACKLIST.path);
  }

  // Verifica se la pagina corrente è 'Blacklist'
  currentPageIsBlacklist() : boolean {
    return this.router.url == LinkEnum.BLACKLIST.path;
  }

  // Metodo che renderizza alla pagina di profilo
  goToMyProfilePage() : void {
    //this.internalDataService.setLoadingData(true);
    this.currentPageIsMyProfile() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, LinkEnum.USER_PROFILE.path);
  }

  // Verifica se la pagina corrente è myProfile
  currentPageIsMyProfile() : boolean {
    return this.router.url == LinkEnum.USER_PROFILE.path;
  }

  // Metodo che renderizza alla pagina di opzioni di filtraggio dei giocatori
  goToOptionsPage() : void {
    //this.internalDataService.setLoadingData(true);
    this.currentPageIsOptions() ? this.reloadOrNavigate(true) : this.reloadOrNavigate(false, LinkEnum.OPTIONS.path);
  }

  // Verifica se la pagina corrente è myProfile
  currentPageIsOptions() : boolean {
    return this.router.url == LinkEnum.OPTIONS.path;
  }

  goToPlayerPage(player:PlayerEntity) : void {
    //this.internalDataService.setLoadingData(true);
    const playerProfilePath:string = this.buildPlayerProfilePath(player);
    this.reloadOrNavigate(false, playerProfilePath);
  }

  currentPageIsPlayerProfile(player:PlayerEntity) : boolean {
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

  private buildPlayerProfilePath(player:PlayerEntity) : string {
    const team:string = player.team.teamName.replace(/[^a-zA-Z]/g, "-");
    const league:string = player.team.league.name.replace(/[^a-zA-Z]/g, "-");
    const playerName:string = player.playerName.replace(/[^a-zA-Z]/g, "-");
    return LinkEnum.PARENT_PATH + league + "/" + team + "/" + playerName + "/" + player.playerId;
  }
}
