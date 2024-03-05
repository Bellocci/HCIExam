import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ColorEnum } from 'src/enum/ColorEnum.model';
import { TeamDataService } from '../../service/team-data.service';
import { RouterService } from '../../service/router.service';
import { InternalDataService } from '../../service/internal-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { CreateNewTeamDialogComponent } from '../../Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { DialogService } from '../../service/dialog.service';
import { DialogHelper } from '../../Dialog/dialogHelper.interface';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { UserEntity } from 'src/model/userEntity.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, AfterViewInit {

  private dialogHelper!:DialogHelper;

  private myTeams:UserTeamEntity[] = [];
  private removedTeams:UserTeamEntity[] = [];

  constructor(private userService:UserService,
    private teamDataService:TeamDataService, 
    private routerService:RouterService,
    private internalDataService:InternalDataService,
    private dialogService:DialogService) { }

  ngOnInit(): void {
    this.dialogHelper = this.dialogService.getDialogHelper();
    //this.internalDataService.setLoadingData(false);
  }

  ngAfterViewInit(): void {    
  }

  // Getter

  getUser() : UserEntity {
    return this.userService.getUser();
  }

  /**
   * Restituisce tutti i team dell'utenti che sono attivi per quello sport
   * 
   * @param sport 
   * @returns UserTeam[]
   */
  getTeams(sport:SportEnum) : UserTeamEntity[] {
    return this.userService.loadTeams(sport);
  }

  getSports() : SportEnum[] {
    return SportEnum.getAllSport();
  }

  getNumberOfPlayerIntoFavoritList(team:UserTeamEntity) : number {
    return team.favoriteList.length;
  }

  getNumberOfPlayerIntoBlacklist(team:UserTeamEntity) : number {
    return team.blacklist.length;
  }

  getColors() : string[] {
    return Object.values(ColorEnum);
  }

  // Setter

  /**
   * Evento listener che scatta per l'evento onmouseenter.
   * Setta all'elemento un bordo di dimensione 3px e style solid.
   * 
   * @param event 
   */
  setBorderColor(event: MouseEvent) {
    const divElement:HTMLDivElement = event.currentTarget as HTMLDivElement;
    divElement.style.border = '3px solid';
  }

  /**
   * Evento listener che scatta all'evento onmouseleave.
   * Setta all'elemento un bordo di dimensione 1px e style solid.
   * 
   * @param event 
   */
  removeBorderColor(event: MouseEvent) {
    const divElement:HTMLDivElement = event.currentTarget as HTMLDivElement;
    divElement.style.border = '1px solid';
  }

  /* Visibilità */

  /**
   * Verifica se alla chiave nella mappa sono associati team attivi.
   * 
   * @param sport 
   * @returns true se presenti team attivi per lo sport, false altrimenti
   */
  hasTeam(sport:SportEnum) : boolean {
    return this.userService.hasActiveTeam(sport);
  }

  /* Funzionalità */

  /**
   * Evento listener che scatta all'evento click del mouse.
   * Cambia il background color dell'immagine dell'utente con quello selezionato.
   * 
   * @param event 
   */
  changeBackgroundColorToAvatar(event: MouseEvent) {
    const colorDiv:HTMLDivElement = event.currentTarget as HTMLDivElement;
    const color:string | null = colorDiv.style.backgroundColor;

    const divImgElment:HTMLElement | null = document.getElementById("img-user-container");
    if(color != null && divImgElment != null) {
      divImgElment.style.backgroundColor = color;
    }
  }

  /**
   * Evento listener che scatta alla cancellazione di un team.
   * Si rimuove il team dalla lista di quelli attivi e lo si aggiunge a quella dei non attivi.
   *  
   * @param sport 
   * @param team 
   */
  removeTeam(team:UserTeamEntity) : void {
    this.userService.removeTeam(team);
  }

  loadTeam(team:UserTeamEntity) : void {
    this.teamDataService.loadTeam(team);
    this.routerService.goToMyTeamPage();
    this.internalDataService.setLeagueSelected(team.league);
  }

  /**
   * Listener per l'apertura della dialog CreateNewTeamDialog
   */
  openCreateNewTeamDialog() {
    this.dialogHelper.setData(null);
    this.dialogHelper.openDialog(CreateNewTeamDialogComponent);
    this.dialogHelper.afterClosed()?.subscribe(result => {
      if(result instanceof UserTeamEntity) {
        this.userService.addNewTeam(result);
      }
    });
  }
}
