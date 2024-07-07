import { Injectable } from '@angular/core';
import { LoadDataService } from 'src/app/service/load-data.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { Player } from 'src/decorator/player.model';
import { TypeMessageEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { ValidationProblemBuilder } from 'src/utility/validation/ValidationProblemBuilder';

@Injectable({
  providedIn: 'root'
})
export class TeamValidatorService {

  constructor(private teamDataService:TeamDataService,
    private loadDataService:LoadDataService) { }

  private static readonly LIST_HAS_PLAYER_MESSAGE = "Il giocatore è già presente nella lista";
  private static readonly BLACKLIST_HAS_PLAYER_MESSAGE = "Operazione non riuscita. Il giocatore è presente nella lista dei giocatori da escludere";
  private static readonly FAVORITE_LIST_HAS_PLAYER_MESSAGE = "Operazione non riuscita. Il giocatore è presente nella lista dei giocatori preferiti";

    

  addPlayerToMyListValidation(player:Player) : ValidationProblem[] {
    let validationProblemList:ValidationProblem[] = [];

    // Validazione comuni
    const searchIntoListFunction:(player:Player) => boolean = (player:Player) => {return this.teamDataService.userTeamHasPlayer(player)};
    this.commonValidation(player, searchIntoListFunction).forEach(problem => validationProblemList.push(problem));

    // Verifico che il giocatore non sia presente nei giocatori da escludere
    if(this.teamDataService.blacklistHasPlayer(player)) {
      validationProblemList.push(new ValidationProblemBuilder()
          .withValidationType(TypeMessageEnum.ERROR)
          .withMessage(TeamValidatorService.BLACKLIST_HAS_PLAYER_MESSAGE)
          .build());
    }

    return validationProblemList;
  }

  addPlayerToFavoriteListValidation(player:Player) : ValidationProblem[] {
    let validationProblemList:ValidationProblem[] = [];

    // Validazioni a comune
    const searchIntoListFunction:(player:Player) => boolean = (player:Player) => {return this.teamDataService.favoriteListHasPlayer(player)};
    this.commonValidation(player, searchIntoListFunction).forEach(problem => validationProblemList.push(problem));

    /**
     * Verifico che il giocatore non sia presente nella lista dei giocatori esclusi
     */
    if(this.teamDataService.blacklistHasPlayer(player)) {
      validationProblemList.push(new ValidationProblemBuilder()
          .withValidationType(TypeMessageEnum.ERROR)
          .withMessage(TeamValidatorService.BLACKLIST_HAS_PLAYER_MESSAGE)
          .build());
    }

    return validationProblemList;
  }

  addPlayerToBlacklistValidation(player:Player) : ValidationProblem[] {
    let validationProblemList:ValidationProblem[] = [];

    // Validazione comuni
    const searchIntoListFunction:(player:Player) => boolean = (player:Player) => {return this.teamDataService.blacklistHasPlayer(player)};
    this.commonValidation(player, searchIntoListFunction).forEach(problem => validationProblemList.push(problem));

    // Verifico che il giocatore non sia presente nella lista dei giocatori preferiti
    if(this.teamDataService.favoriteListHasPlayer(player)) {
      validationProblemList.push(new ValidationProblemBuilder()
          .withValidationType(TypeMessageEnum.ERROR)
          .withMessage(TeamValidatorService.FAVORITE_LIST_HAS_PLAYER_MESSAGE)
          .build());
    }

    return validationProblemList;
  }

  /**
   * Validazione a comune tra tutti i metodi
   * 
   * @param player giocatore da aggiungere
   * @param checkListfunction funzione di ricerca del giocatore nella lista in cui deve essere aggiunto
   * @returns ValidationProblem[]
   */
  private commonValidation(player:Player, checkListfunction:(player:Player) => boolean) : ValidationProblem[] {
    let validationProblemList:ValidationProblem[] = [];

    // Verifico l'esistenza del giocatore
    let result:Player | null = this.loadDataService.loadPlayerBydId(player.getId());
    if(result == null) {
      validationProblemList.push(new ValidationProblemBuilder()
          .withValidationType(TypeMessageEnum.ERROR)
          .withMessage("Nessun giocatore trovato con il nome: " + player.getName())
          .build());
    }

    // Verifico che il giocatore sia presente nella lista
    if(result != null && checkListfunction(result)) {
      validationProblemList.push(new ValidationProblemBuilder()
          .withValidationType(TypeMessageEnum.ERROR)
          .withMessage(TeamValidatorService.LIST_HAS_PLAYER_MESSAGE)
          .build());
    }

    return validationProblemList;
  }
}
