import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost";

  constructor(private http:HttpClient) { }

  getSportList():Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/sports/');
  }

  getChampionshipList():Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/championships/');
  }
}
