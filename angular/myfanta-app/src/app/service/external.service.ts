import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StandardOption } from 'src/decorator/option/standard-option.model';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  readonly APIUrl = "http://localhost";

  constructor(private http:HttpClient) { }

  createTeamWithSimpleOption(option:StandardOption) : void {
    //FIXME: Chiamata al backend per la generazione della squadra
  }

  createTeamWithAdvancedOption(option:OptionEntity, sport:SportEnum) : void {
    //FIXME: Chiamata al backend per la generazione della squadra
  }
}
