import { Injectable } from '@angular/core';
import { RouterService } from 'src/app/service/router.service';
import { PlayerSearchRequestService } from 'src/app/service/player-search-request.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { SnackBarDataTypeEnum } from 'src/enum/SnackBarDataTypeEnum.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { ValidationProblem } from 'src/utility/validation/ValidationProblem';
import { ValidationProblemBuilder } from 'src/utility/validation/ValidationProblemBuilder';

@Injectable({
  providedIn: 'root'
})
export class SearchAddPlayerValidatorService {

  constructor(private teamDataService:TeamDataService,
    private playerSearchRequest:PlayerSearchRequestService,
    private routerService:RouterService) { }

    private static readonly LIST_HAS_PLAYER_MESSAGE = "Il giocatore è già presente nella lista";
    private static readonly BLACKLIST_HAS_PLAYER_MESSAGE = "Operazione non riuscita. Il giocatore è presente nella lista dei giocatori da escludere";
    private static readonly FAVORITE_LIST_HAS_PLAYER_MESSAGE = "Operazione non riuscita. Il giocatore è presente nella lista dei giocatori preferiti";      
  
    validateAddPlayerToListOperation(player:PlayerEntity) : ValidationProblem | null {
      if(this.routerService.currentPageIsMyTeam()) {
        return this.addPlayerToMyListValidation(player);
      } else if(this.routerService.currentPageIsFavoritList()) {
        return this.addPlayerToFavoriteListValidation(player);
      } else if(this.routerService.currentPageIsBlacklist()) {
        return this.addPlayerToBlacklistValidation(player);
      } else {
        // Operazione non ancora supportata
        return new ValidationProblemBuilder()
            .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
            .withMessage("Errore durante l'inserimento del giocatore. Operazione non ancora supportata")
            .build();
      }
    }

    private addPlayerToMyListValidation(player:PlayerEntity) : ValidationProblem | null {
  
      // Validazione comuni
      const searchIntoListFunction:(player:PlayerEntity) => boolean = 
          (player:PlayerEntity) => {return this.teamDataService.myTeamHasPlayer(player)};
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
  
    private addPlayerToFavoriteListValidation(player:PlayerEntity) : ValidationProblem | null {
  
      // Validazioni a comune
      const searchIntoListFunction:(player:PlayerEntity) => boolean = 
          (player:PlayerEntity) => {return this.teamDataService.favoriteListHasPlayer(player)};
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
  
    private addPlayerToBlacklistValidation(player:PlayerEntity) : ValidationProblem | null {
  
      // Validazione comuni
      const searchIntoListFunction:(player:PlayerEntity) => boolean = 
          (player:PlayerEntity) => {return this.teamDataService.blacklistHasPlayer(player)};
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
    private commonValidation(player:PlayerEntity, checkListfunction:(player:PlayerEntity) => boolean) : ValidationProblem | null {  
      // Verifico l'esistenza del giocatore
      let result:PlayerEntity | null = this.playerSearchRequest.loadPlayerBydId(player.playerId);
      if(result == null) {
        return new ValidationProblemBuilder()
            .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
            .withMessage("Nessun giocatore trovato con il nome: " + player.playerName)
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
