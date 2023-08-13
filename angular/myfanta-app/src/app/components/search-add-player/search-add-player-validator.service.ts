import { Injectable } from '@angular/core';
import { LoadDataService } from 'src/app/service/load-data.service';
import { RouterService } from 'src/app/service/router.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { Player } from 'src/decorator/player.model';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { ValidationProblemBuilder } from 'src/utility/validation/ValidationProblemBuilder';

@Injectable({
  providedIn: 'root'
})
export class SearchAddPlayerValidatorService {

  constructor(private teamDataService:TeamDataService,
    private loadDataService:LoadDataService,
    private routerService:RouterService) { }

    private static readonly LIST_HAS_PLAYER_MESSAGE = "Il giocatore è già presente nella lista";
    private static readonly BLACKLIST_HAS_PLAYER_MESSAGE = "Operazione non riuscita. Il giocatore è presente nella lista dei giocatori da escludere";
    private static readonly FAVORITE_LIST_HAS_PLAYER_MESSAGE = "Operazione non riuscita. Il giocatore è presente nella lista dei giocatori preferiti";      
  
    validateAddPlayerToListOperation(player:Player) : ValidationProblem | null {
      if(this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM)) {
        return this.addPlayerToMyListValidation(player);
      } else if(this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST)) {
        return this.addPlayerToFavoriteListValidation(player);
      } else if(this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST)) {
        return this.addPlayerToBlacklistValidation(player);
      } else {
        // Operazione non ancora supportata
        return new ValidationProblemBuilder()
            .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
            .withMessage("Errore durante l'inserimento del giocatore. Operazione non ancora supportata")
            .build();
      }
    }

    private addPlayerToMyListValidation(player:Player) : ValidationProblem | null {
  
      // Validazione comuni
      const searchIntoListFunction:(player:Player) => boolean = (player:Player) => {return this.teamDataService.userTeamHasPlayer(player)};
      let resultCommonValidation:ValidationProblem | null = this.commonValidation(player, searchIntoListFunction);
      if(resultCommonValidation != null) {
        return resultCommonValidation;
      }
  
      // Verifico che il giocatore non sia presente nei giocatori da escludere
      if(this.teamDataService.blacklistHasPlayer(player)) {
        return new ValidationProblemBuilder()
            .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
            .withMessage(SearchAddPlayerValidatorService.BLACKLIST_HAS_PLAYER_MESSAGE)
            .build();
      }
  
      return null;
    }
  
    private addPlayerToFavoriteListValidation(player:Player) : ValidationProblem | null {
  
      // Validazioni a comune
      const searchIntoListFunction:(player:Player) => boolean = (player:Player) => {return this.teamDataService.favoriteListHasPlayer(player)};
      let resultCommonValidation:ValidationProblem | null = this.commonValidation(player, searchIntoListFunction);
      if(resultCommonValidation != null) {
        return resultCommonValidation;
      }
  
      /**
       * Verifico che il giocatore non sia presente nella lista dei giocatori esclusi
       */
      if(this.teamDataService.blacklistHasPlayer(player)) {
        return new ValidationProblemBuilder()
            .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
            .withMessage(SearchAddPlayerValidatorService.BLACKLIST_HAS_PLAYER_MESSAGE)
            .build();
      }
  
      return null;
    }
  
    private addPlayerToBlacklistValidation(player:Player) : ValidationProblem | null {
  
      // Validazione comuni
      const searchIntoListFunction:(player:Player) => boolean = (player:Player) => {return this.teamDataService.blacklistHasPlayer(player)};
      let resultCommonValidation:ValidationProblem | null = this.commonValidation(player, searchIntoListFunction);
      if(resultCommonValidation != null) {
        return resultCommonValidation;
      }
  
      // Verifico che il giocatore non sia presente nella lista dei giocatori preferiti
      if(this.teamDataService.favoriteListHasPlayer(player)) {
        return new ValidationProblemBuilder()
            .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
            .withMessage(SearchAddPlayerValidatorService.FAVORITE_LIST_HAS_PLAYER_MESSAGE)
            .build();
      }
  
      return null;
    }
  
    /**
     * Validazione a comune tra tutti i metodi
     * 
     * @param player giocatore da aggiungere
     * @param checkListfunction funzione di ricerca del giocatore nella lista in cui deve essere aggiunto
     * @returns ValidationProblem[]
     */
    private commonValidation(player:Player, checkListfunction:(player:Player) => boolean) : ValidationProblem | null {  
      // Verifico l'esistenza del giocatore
      let result:Player | null = this.loadDataService.loadPlayerBydId(player.getId());
      if(result == null) {
        return new ValidationProblemBuilder()
            .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
            .withMessage("Nessun giocatore trovato con il nome: " + player.getName())
            .build();
      }
  
      // Verifico che il giocatore sia presente nella lista
      if(result != null && checkListfunction(result)) {
        return new ValidationProblemBuilder()
            .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
            .withMessage(SearchAddPlayerValidatorService.LIST_HAS_PLAYER_MESSAGE)
            .build();
      }
  
      return null;
    }
}
