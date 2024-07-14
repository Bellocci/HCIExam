import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpStatusEnum } from 'src/enum/HttpStatusEnum';
import { environment } from 'src/environments/environment';
import { LeagueEntity } from 'src/model/leagueEntity.model';
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
          catchError(this.handleError)
        );
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
