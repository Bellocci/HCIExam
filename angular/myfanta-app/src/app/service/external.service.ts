import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Option } from 'src/decorator/option/option.model';
import { SimpleOption } from 'src/decorator/option/simple-option.interfaces';
import { SportEnum } from 'src/enum/SportEnum.model';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  readonly APIUrl = "http://localhost";

  constructor(private http:HttpClient) { }

  createTeamWithSimpleOption(option:SimpleOption) : void {
    //FIXME: Chiamata al backend per la generazione della squadra
  }

  createTeamWithAdvancedOption(option:Option, sport:SportEnum) : void {
    //FIXME: Chiamata al backend per la generazione della squadra
  }
}
