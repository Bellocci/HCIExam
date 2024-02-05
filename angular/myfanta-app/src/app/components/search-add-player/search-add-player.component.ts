import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';
import { InternalDataService } from '../../service/internal-data.service';
import { TeamDataService } from '../../service/team-data.service';
import { RouterService } from '../../service/router.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { SearchAddPlayerValidatorService } from './search-add-player-validator.service';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { ValidationProblemBuilder } from 'src/utility/validation/ValidationProblemBuilder';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { PlayerSearchRequestService } from 'src/app/service/player-search-request.service';
import { BreakpointsService } from 'src/app/service/breakpoints.service';

@Component({
  selector: 'app-search-add-player',
  templateUrl: './search-add-player.component.html',
  styleUrls: ['./search-add-player.component.scss']
})
export class SearchAddPlayerComponent implements OnInit {

  /*
   * ==========
   * VARIABILI 
   * ==========
   */

  inputPlayerName:string = '';
  players: PlayerEntity[] = []; // Lista dei giocatori restituiti dall'autocomplete
  private playerResultList:Subject<string> = new Subject<string>();
  private leagueSelected:LeagueEntity | null = null;

  /*
   * =================
   * CONSTRUCT & INIT 
   * =================
   */

  constructor(
    private internalDataService:InternalDataService,
    private routerService:RouterService,
    private teamDataService:TeamDataService,
    private playerSearchRequest:PlayerSearchRequestService,
    private snackBarService:SnackBarService,
    private searchAddPlayerValidator:SearchAddPlayerValidatorService,
    public breakpointsService:BreakpointsService) { }

  ngOnInit(): void {

    this.subscribeLeagueSelected();

    this.playerResultList.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      switchMap((name:string) => this.playerSearchRequest.byNameAndLeagueAsObservable(name, this.leagueSelected!)),
    ).subscribe(
      (players) => {
        this.players = players;
      }
    );
  }

  /*
   * =========
   * OBSERVER 
   * =========
   */

  private subscribeLeagueSelected() : void {
    this.internalDataService.getObservableLeagueSelected().subscribe(league => {
      this.leagueSelected = league;
    })
  }

  /*
   * ========
   * GETTER 
   * ========
   */

  getAddBtnDescription() : string {
    const value = this.routerService.currentPageIsMyTeam() ? 'Aggiungi giocatore al Team' :
      this.routerService.currentPageIsFavoritList() ? 'Aggiungi giocatore ai preferiti' :
      this.routerService.currentPageIsBlacklist() ? 'Aggiungi giocatore da escludere' :
      'Aggiungi giocatore';
    return value;
  }

  /*
   * ============
   * VISIBILITA' 
   * ============
   */

  isValueInputTextEmpty() : boolean {
    return this.inputPlayerName.trimStart() == '' ? true : false;
  }

  /*
   * =========
   * LISTENER 
   * =========
   */

  searchPlayer(player_name:string) : void {
    this.playerResultList.next(player_name);
  }

  filterText(event:KeyboardEvent) : boolean {
    return event.key.match(/[^a-zA-Z ,]/g) === null;
  }

  addPlayer(playerName:string) : void { 
    let player:PlayerEntity | undefined = this.loadPlayer(playerName);
    if(player == undefined) {
      this.snackBarService.openErrorSnackBar("Errore! Nessun giocatore trovato con nome " + playerName);    
    } else {
      let validationProblem:ValidationProblem | null = this.searchAddPlayerValidator.validateAddPlayerToListOperation(player);
      if(validationProblem != null) {
        this.snackBarService.openSnackBar(validationProblem)
      } else {
        validationProblem = this.addPlayerToList(player);
        this.inputPlayerName = "";
        if(validationProblem != null) {
          this.snackBarService.openSnackBar(validationProblem);
        }
      }          
    }
  }

  /*
   * ===============
   * METODI PRIVATI 
   * ===============
   */

  private loadPlayer(playerName:string) : PlayerEntity | undefined {
    let playerSelected:PlayerEntity | undefined = this.players.find(player => player.playerName.toLowerCase() === playerName.toLocaleLowerCase());
    if(playerSelected == undefined && this.leagueSelected != null) {
      playerSelected = this.playerSearchRequest.byNameAndLeague(playerName, this.leagueSelected)[0];
    }

    return playerSelected;
  }

  private addPlayerToList(player:PlayerEntity) : ValidationProblem | null {
    if(this.routerService.isLinkActivated(LinkEnum.MYTEAM)) {
      return this.teamDataService.addPlayerToMyTeam(player);
    } else if(this.routerService.isLinkActivated(LinkEnum.FAVORIT_LIST)) {
      return this.teamDataService.addPlayerToFavoriteList(player);
    } else if(this.routerService.isLinkActivated(LinkEnum.BLACKLIST)) {
      return this.teamDataService.addPlayerToBlacklist(player);
    } else {
      return new ValidationProblemBuilder()
          .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
          .withMessage("Impossibile aggiungere il giocatore alla lista")
          .build();
    }
  }
}
