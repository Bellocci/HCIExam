import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SPORT_DATA } from 'src/model/sport.model';
import { CHAMPIONSHIP_DATA } from 'src/model/championship.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost";

  constructor(private http:HttpClient) { }

  getSportList():Observable<any[]> {
    return SPORT_DATA;
  }

  getChampionshipList():Observable<any[]> {
    return CHAMPIONSHIP_DATA;
  }
}
