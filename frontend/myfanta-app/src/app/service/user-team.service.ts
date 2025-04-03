import { Injectable } from '@angular/core';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { PlayerSearchRequest } from 'src/rest-client/PlayerSearchRequest';
import { ObservableHelper } from 'src/utility/observable-helper';

@Injectable({
  providedIn: 'root'
})
export class UserTeamService {

  //  Opzioni di ricerca per la creazione della squadra 
  private option:ObservableHelper<OptionEntity | null> = new ObservableHelper<OptionEntity | null>(null);

  constructor() { }

  createPlayerSearchRequestFromUserOption() : PlayerSearchRequest {
    // TODO: Implementare copia degli attributi presenti in option in un nuovo oggetto PlayerSearchRequest
    return new PlayerSearchRequest(); 
  }
}
