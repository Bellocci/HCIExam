import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/decorator/user.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { USER_DATA, UserEntity } from 'src/model/userEntity.model';
import { CUSTOMS_TEAM_DATA } from 'src/model/userTeamEntity.model';
import { SessionStorageService } from './session-storage.service';
import { ColorEnum } from 'src/enum/ColorEnum.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly KEY_SESSION:string = "user";
  
  private user:BehaviorSubject<User> = new BehaviorSubject(new User());
  private currentUser:Observable<User> = this.user.asObservable();

  constructor(private _session_storage:SessionStorageService<UserEntity>) {;
    const entity = this._session_storage.getData(UserService.KEY_SESSION);
    if(!new User().equals(entity) && entity != null) {
      this.user.next(new User(entity));
    }
  }

  /**
   * Metodo che restituisce l'observer sul valore corrente dell'utente
   * 
   * @returns Observable<User>
   */
  getUser() : Observable<User> {
    return this.currentUser;
  }

  private setUser(user:User) {
    this.user.next(user);
  }

  // LOGIN

  /**
   * Metodo che controlla se esiste un utente con lo stesso username e password,
   * in caso di corrispondenza setta il nuovo valore dello User.
   * 
   * @param username 
   * @param password 
   */
  login(username:string, password:string) : void {
    // Query su db
    let result:UserEntity | undefined = USER_DATA.find(user => user.username == username && user.password == password);
    if(result != undefined) {
      this._session_storage.saveData(UserService.KEY_SESSION, result);
      const value:User = new User(this._session_storage.getData(UserService.KEY_SESSION) as UserEntity);
      console.log(value.toString());
      this.setUser(new User(result));
    } else {
      this.setUser(new User())
    }
  }

  /**
   * Metodo che permette la disconnessione dal proprio account e setta
   * come valore corrente uno User vuoto.
   */
  logout() : void {    
    this._session_storage.saveData(UserService.KEY_SESSION, new User().getEntity());
    this.setUser(new User());
  }

  // REGISTRAZIONE

  /**
   * Metodo che verifica se è già presente un utente con lo stesso username,
   * nel caso non ci fosse procede alla creazione ed al salvataggio su db
   * 
   * @param name 
   * @param surname 
   * @param username 
   * @param password 
   * @returns lo User creato, undefined se esiste già un utente con lo stesso username
   */
  createNewUser(name:string, surname:string, username:string, password:string) : User | undefined {
    // Chiamata al db
    const result:UserEntity[] = USER_DATA.filter(user => user.username == username);
    if(result.length == 0) {
      const entity:UserEntity = {
        userId : USER_DATA.length,
        name : name,
        surname : surname,
        username : username,
        password : password,
        color : ColorEnum.WHITE,
        active: true
      };
      // Salvataggio su db
      USER_DATA.push(entity)
      return new User(entity);
    }
    return undefined;
  }

  // RECUPERO PASSWORD

  /**
   * Metodo per il recupero della password
   * 
   * @param name 
   * @param surname 
   * @param username 
   * @returns la password oppure undefined se non è stata trovata alcuna corrispondenza
   */
  recoveryPassword(name:string, surname:string, username:string) : string | undefined {
    // Chiamata al db
    const result:UserEntity[] = USER_DATA.filter(user => 
      user.name == name && user.surname == surname && user.username == username);
    
    return result.length == 1 ? result[0].password : undefined;
  }


  /**
   * Caricamento di tutti i teams realizzati dall'utente
   * 
   * @returns UserTeam[]
   */
  loadTeams() : UserTeam[] {    
    let resultList:UserTeam[] = [];
    CUSTOMS_TEAM_DATA.filter(team => team.user.equals(this.user.getValue())).forEach(team => resultList.push(new UserTeam(team)));
    return resultList;
  } 
}
