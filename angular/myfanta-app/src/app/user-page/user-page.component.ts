import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'src/decorator/user.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { ColorEnum } from 'src/enum/ColorEnum.model';
import { TeamDataService } from '../service/team-data.service';
import { RouterService } from '../service/router.service';
import { InternalDataService } from '../service/internal-data.service';
import { SportEnum } from 'src/enum/SportEnum.model';
import { CreateNewTeamDialogComponent } from '../Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { DialogService } from '../service/dialog.service';
import { DialogHelper } from '../Dialog/dialogHelper.interface';

/**
 * Interfaccia utilizzata insieme alla mappa per definire una coppia
 * di valori, una contenente la lista dei team attivi, l'altra la lista
 * dei team non attivi.
 */
interface UserTeamCouple {
  activeList: UserTeam[];
  deactiveList: UserTeam[];
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {

  private dialogHelper!:DialogHelper;

  private user!:User;
  private myTeams!:UserTeam[];
  private removedTeams:UserTeam[] = [];

  private sportTeamMap:Map<SportEnum, UserTeamCouple> = new Map<SportEnum, UserTeamCouple>();

  constructor(private userService:UserService,
    private teamDataService:TeamDataService, 
    private routerService:RouterService,
    private internalDataService:InternalDataService,
    private dialogService:DialogService) { }

  ngOnInit(): void {
    this.subscribeUser();    
    this.dialogHelper = this.dialogService.getDialogHelper();
    this.myTeams = this.userService.loadTeams();
    this.buildSportTeamMap();
  }

  subscribeUser() : void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  buildSportTeamMap() : void {
    for(let team of this.myTeams) {
      const sport:SportEnum = team.getLeague().getSport();
      if(!this.sportTeamMap.has(sport)) {
        this.sportTeamMap.set(sport, {
          activeList : [],
          deactiveList : []
        });
      }

      team.isActive() ? this.sportTeamMap.get(sport)!.activeList.push(team) : 
        this.sportTeamMap.get(sport)!.deactiveList.push(team);
    }
  }

  // Getter

  getUser() : User {
    return this.user;
  }

  /**
   * Restituisce tutti i team dell'utenti che sono attivi per quello sport
   * 
   * @param sport 
   * @returns UserTeam[]
   */
  getTeams(sport:SportEnum) : UserTeam[] {
    return this.sportTeamMap.get(sport) != undefined ? this.sportTeamMap.get(sport)!.activeList : [];
  }

  getSports() : SportEnum[] {
    return SportEnum.getAllSport();
  }

  getNumberOfPlayerIntoFavoritList(team:UserTeam) : number {
    return team.getFavoritList().length;
  }

  getNumberOfPlayerIntoBlacklist(team:UserTeam) : number {
    return team.getBlackList().length;
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
    if(!this.sportTeamMap.has(sport)) {
      return false;
    }

    // E' sicuramente presente per il controllo precedente
    return this.sportTeamMap.get(sport)!.activeList.length > 0;
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
  removeTeam(sport:SportEnum, team:UserTeam) : void {
    const index:number | undefined = this.sportTeamMap.get(sport)?.activeList.findIndex(t => t.equals(team));
    if(index != undefined && index != -1) {
      // Rimuovo un elemento a partire dall'indice precedente all'elemento
      // Siamo sicuri che esiste l'elemento nella mappa dal controllo precedente
      this.sportTeamMap.get(sport)!.activeList.splice(index, 1);
      team.setActive(false);
      this.removedTeams.push(team);
      this.sportTeamMap.get(sport)!.deactiveList.push(team);
    }
  }

  loadTeam(team:UserTeam) : void {
    this.teamDataService.loadTeam(team);
    this.routerService.goToCreateTeamPage();
    this.internalDataService.setLeagueSelected(team.getLeague());
  }

  /**
   * Listener per l'apertura della dialog CreateNewTeamDialog
   */
  openCreateNewTeamDialog() {
    this.dialogHelper.openDialog(CreateNewTeamDialogComponent);
    this.dialogHelper.afterClosed()?.subscribe(result => {
      if(result instanceof UserTeam) {
        this.sportTeamMap.get(result.getLeague().getSport())!.activeList.push(result);
      }
    });
  }
}
