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
import { SearchPlayersService } from 'src/app/service/search-players.service';

@Component({
  selector: 'app-search-add-player',
  templateUrl: './search-add-player.component.html',
  styleUrls: ['./search-add-player.component.scss']
})
export class SearchAddPlayerComponent implements OnInit {

  inputPlayerName:string = '';
  players: PlayerEntity[] = []; // Lista dei giocatori restituiti dall'autocomplete
  private playerResultList:Subject<string> = new Subject<string>();
  private leagueSelected:LeagueEntity | null = null;

  constructor(
    private internalDataService:InternalDataService,
    private routerService:RouterService,
    private teamDataService:TeamDataService,
    private searchPlayersService:SearchPlayersService,
    private snackBarService:SnackBarService,
    private searchAddPlayerValidator:SearchAddPlayerValidatorService) { }

  ngOnInit(): void {

    this.subscribeLeagueSelected();

    this.playerResultList.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      switchMap((name:string) => this.searchPlayersService.searchPlayerToAddList(name, this.leagueSelected)),
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
    const value = this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM) ? 'Aggiungi giocatore al Team' :
      this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) ? 'Aggiungi giocatore ai preferiti' :
      this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST) ? 'Aggiungi giocatore da escludere' :
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

  private loadPlayer(playerName:string) : PlayerEntity | undefined {
    let playerSelected:PlayerEntity | undefined = this.players.find(player => player.playerName.toLowerCase() === playerName.toLocaleLowerCase());
    if(playerSelected == undefined && this.leagueSelected != null) {
      playerSelected = this.searchPlayersService.searchPlayer(playerName, this.leagueSelected);
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
