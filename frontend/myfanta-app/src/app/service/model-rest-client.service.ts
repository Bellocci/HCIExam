import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpStatusEnum } from 'src/enum/HttpStatusEnum';
import { environment } from 'src/environments/environment';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { TeamEntity } from 'src/model/teamEntity.model';
import { UserEntity } from 'src/model/userEntity.model';
import { ApiResponse } from 'src/utility/rest/api-response';
import { RestAPIHelper } from 'src/utility/rest/rest-builder-impl';

@Injectable({
  providedIn: 'root'
})
export class ModelRestClientService {

  private apiUrl = environment.apiModelBaseUrl

  constructor(private httpClient:HttpClient) { }

  /*
   * =============
   * GET REQUEST 
   * =============
   */

  getLeagues() : Observable<LeagueEntity[]> {
    return new RestAPIHelper<ApiResponse>().Builder()
        .setHttpClient(this.httpClient)
        .setUrl(this.apiUrl + "/league")
        .createGetRequest()
        .invoke()
        .pipe(
          map((response) => response.result),
          // Permette di memorizzare i risultati ottenuti nella cache
          tap(response => console.log("Received Response:", response)),
          catchError(this.handleError)
        );
  }

  loadLeague(leagueId:string) : Observable<LeagueEntity> {
    if(leagueId == null) {
      return throwError(() => new Error('League id is mandatory'));
    }

    console.log("Starting invokin REST to load league with id: ", leagueId)
    return new RestAPIHelper<ApiResponse>().Builder()
        .setHttpClient(this.httpClient)
        .setUrl(this.apiUrl + "/league/loadleague")
        .createGetRequest()
        .addQueryParam("league_id", leagueId)
        .invoke()
        .pipe(
          map((response) => response.result),
          // Permette di memorizzare i risultati ottenuti nella cache
          tap(response => console.log("Teams recovered:", response)),
          catchError(this.handleError)
        )
  }

  getTeams(league:LeagueEntity) : Observable<TeamEntity[]> {
    if(league == null) {
      return throwError(() => new Error('Cannot search teams! League is mandatory : ' + league));
    }
    console.log("Starting invokin REST to recovery teams with league: " + league.name)
    return new RestAPIHelper<ApiResponse>().Builder()
        .setHttpClient(this.httpClient)
        .setUrl(this.apiUrl + "/team/")
        .createGetRequest()
        .addQueryParam("league_id", league.league_id.toString())
        .invoke()
        .pipe(
          map((response) => response.result),
          // Permette di memorizzare i risultati ottenuti nella cache
          tap(response => console.log("Teams recovered:", response)),
          catchError(this.handleError)
        )
  }

  getAllPlayers(league:LeagueEntity) : Observable<PlayerEntity[]> {
    if(league == null) {
      return throwError(() => new Error('Cannot search teams! League is mandatory : ' + league));
    }

    return new RestAPIHelper<ApiResponse>().Builder()
        .setHttpClient(this.httpClient)
        .setUrl(this.apiUrl + "/player/searchAll")
        .createGetRequest()
        .addQueryParam("league_id", league.league_id.toString())
        .invoke()
        .pipe(
          map((response) => response.result),
          // Permette di memorizzare i risultati ottenuti nella cache
          tap(response => console.log("Teams recovered:", response)),
          catchError(this.handleError)
        )
  }

  /*
   * =============
   * POST REQUEST 
   * =============
   */

  login(username:string, password:string) : Observable<UserEntity> {
    return new RestAPIHelper<ApiResponse>().Builder()
        .setHttpClient(this.httpClient)
        .setUrl(this.apiUrl + "/user/login")
        .createPostRequest()
        .addBodyParam("username", username)
        .addBodyParam("password", password)
        .invoke()
        .pipe(
          map((response) => response.result),
          catchError(this.handleError)
        );
  }

  signup(name:string, surname:string, username:string, password:string) : Observable<UserEntity> {
    return new RestAPIHelper<ApiResponse>().Builder()
      .setHttpClient(this.httpClient)
      .setUrl(this.apiUrl + "/user/subscription")
      .createPostRequest()
      .addBodyParam("name", name)
      .addBodyParam("surname", surname)
      .addBodyParam("username", username)
      .addBodyParam("password", password)
      .invoke()
      .pipe(
        map((response) => response.result),
        catchError(this.handleError)
      );
  }

  recoverPassword(name:string, surname:string, username:string) : Observable<UserEntity> {
    return new RestAPIHelper<ApiResponse>().Builder()
        .setHttpClient(this.httpClient)
        .setUrl(this.apiUrl + "/user/recover_password")
        .createPostRequest()
        .addBodyParam("name", name)
        .addBodyParam("surname", surname)
        .addBodyParam("username", username)
        .invoke()
        .pipe(
          map((response) => response.result),
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Errore client-side o di rete
      console.error("An error occurred while invoking REST: ", error.error.message);
    } else {
      // REST ha restituito un codice di risposta non riuscito
      if(error.status == HttpStatusEnum.BAD_REQUEST) {
        console.error("Error while invoking REST caused by 'Bad Request'. " + error.error)
      } else if(error.status == HttpStatusEnum.NOT_FOUND) {
        console.error(error.error);
      } else {
        console.error("Error while invoking REST. Rest returned code" + error.status + " with result: " + error.error);
      }
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
