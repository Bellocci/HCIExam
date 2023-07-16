import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';
import { InternalDataService } from '../service/internal-data.service';
import { TeamDataService } from '../service/team-data.service';
import { RouterService } from '../service/router.service';
import { Player } from 'src/decorator/player.model';
import { FilterDataService } from '../service/filter-data.service';
import { League } from 'src/decorator/League.model';
import { LoadDataService } from '../service/load-data.service';
import { SnackBarService } from '../service/snack-bar.service';
import { TeamValidatorService } from 'src/validator/team-validator.service';

@Component({
  selector: 'app-search-add-player',
  templateUrl: './search-add-player.component.html',
  styleUrls: ['./search-add-player.component.css']
})
export class SearchAddPlayerComponent implements OnInit {

  inputPlayerName:string = '';
  players: Player[] = []; // Lista dei giocatori restituiti dall'autocomplete
  private playerResultList:Subject<string> = new Subject<string>();
  private leagueSelected:League | null = null;

  constructor(
    private internalDataService:InternalDataService,
    private filterDataService:FilterDataService,
    private routerService:RouterService,
    private teamDataService:TeamDataService,
    private loadDataService:LoadDataService,
    private snackBarService:SnackBarService,
    private teamValidator:TeamValidatorService) { }

  ngOnInit(): void {

    this.subscribeLeagueSelected();

    this.playerResultList.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      switchMap((name:string) => this.filterDataService.searchPlayerToAddList(name, this.leagueSelected)),
    ).subscribe(
      (players) => {
        this.players = players;
      }
    );
  }

  private subscribeLeagueSelected() : void {
    this.internalDataService.getLeagueSelected().subscribe(league => {
      this.leagueSelected = league;
    })
  }

  /* GETTER */

  getAddBtnDescription() : string {
    const value = this.routerService.currentPageIsMyTeam() ? 'Aggiungi giocatore al Team' :
      this.routerService.currentPageIsFavoritList() ? 'Aggiungi giocatore ai preferiti' :
      this.routerService.currentPageIsBlacklist() ? 'Aggiungi giocatore a quelli esclusi' :
      'Aggiungi giocatore';
    return value;
  }

  /* METHODS */

  isValueInputTextEmpty() : boolean {
    return this.inputPlayerName.trimStart() == '' ? true : false;
  }

  searchPlayer(player_name:string) : void {
    this.playerResultList.next(player_name);
  }

  filterText(event:KeyboardEvent) : boolean {
    return event.key.match(/[^a-zA-Z ,]/g) === null;
  }

  addPlayer(playerName:string) : void {
    let playerSelected:Player | undefined = this.players.find(player => player.getName().toLowerCase() === playerName.toLocaleLowerCase());
    if(playerSelected == undefined && this.leagueSelected != null) {
      playerSelected = this.loadDataService.searchPlayer(playerName, this.leagueSelected);
    }

    if(this.teamValidator.canAddPlayerToList(playerSelected)) {
      this.teamDataService.addPlayerToList(playerSelected!);
      this.snackBarService.openInfoWithCustomDurationSnackBar("Aggiunto giocatore!", 3000);
    } else {
      this.snackBarService.openErrorSnackBar("Errore! Nessun giocatore trovato con nome " + playerName);
    }
  }
}
