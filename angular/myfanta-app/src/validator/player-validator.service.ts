import { Injectable } from '@angular/core';
import { InternalDataService } from 'src/app/service/internal-data.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { OptionFootballSoccer } from 'src/decorator/option/optionFootballSoccer.model';
import { Player } from 'src/decorator/player.model';
import { Result } from 'src/decorator/result/result.interface';
import { ResultImpl } from 'src/decorator/result/resultImpl';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionFootballSoccerEnum } from 'src/enum/optionEnum/OptionFootballSoccerEnum.model';
import { SportEnumVisitorAbstract } from 'src/visitor/sport-enum/SportEnumVisitorAbstract';

@Injectable({
  providedIn: 'root'
})
export class PlayerValidatorService {

  constructor(private teamDataService:TeamDataService) { }

  canAddPlayerToTeam(player:Player, sport:SportEnum) : Result {
    let errorMessage:string[] = [];
    const roleMap:Map<string,number> = this.getMaxPlayerForRole(sport);
    let numOfPlayer:number = this.teamDataService.getUserTeamList().filter(p => p.getRole() == player.getRole()).length;
    return numOfPlayer < roleMap.get(player.getRole())! ? new ResultImpl(true, []) :
        new ResultImpl(false, ["Raggiunto il numero massimo di giocatori per il ruolo " + player.getRole()]);
  }  

  private getMaxPlayerForRole(sport:SportEnum) : Map<string,number> {
  
    return SportEnum.visitAndReturn(sport, {
      footballSoccer() : Map<string,number> {
        let result:Map<string,number> = new Map();
        // Portieri
        result.set(OptionFootballSoccerEnum.MAX_GOALKEEPER_PLAYERS.shortName!, 
          OptionFootballSoccerEnum.MAX_GOALKEEPER_PLAYERS.value as number);
        // Difensori
        result.set(OptionFootballSoccerEnum.MAX_DEFENDER_PLAYERS.shortName!, 
          OptionFootballSoccerEnum.MAX_DEFENDER_PLAYERS.value as number);
        // Centrocampisti
        result.set(OptionFootballSoccerEnum.MAX_MIDFIELDER_PLAYERS.shortName!, 
          OptionFootballSoccerEnum.MAX_MIDFIELDER_PLAYERS.value as number);
        // Attaccanti
        result.set(OptionFootballSoccerEnum.MAX_STRAIKERS_PLAYERS.shortName!, 
          OptionFootballSoccerEnum.MAX_STRAIKERS_PLAYERS.value as number);

        return result;
      },

      volleyball() : Map<string,number> {
        return new Map();
      },

      basketball() : Map<string,number> {
        return new Map();
      },
    })
  }
}
