import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { User } from 'src/decorator/user.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { USER_DATA, UserEntity } from 'src/model/userEntity.model';
import { CUSTOMS_TEAM_DATA, UserTeamEntity } from 'src/model/userTeamEntity.model';
import { SessionStorageService } from './session-storage.service';
import { ColorEnum } from 'src/enum/ColorEnum.model';
import { UserTeamDecoratorFactoryService } from 'src/decorator-factory/user-team-decorator-factory.service';
import { ObserverHelper } from 'src/utility/observer-helper';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { SportEnum } from 'src/enum/SportEnum.model';

/**
 * Interfaccia utilizzata insieme alla mappa per definire una coppia
 * di valori, una contenente la lista dei team attivi, l'altra la lista
 * dei team non attivi.
 */
interface UserTeamCouple {
  activeList: UserTeam[];
  deactiveList: UserTeam[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly KEY_SESSION:string = "user";
  
  private user:ObserverHelper<User> = new ObserverHelper<User>(new User());
  private userValue:User = new User();

  private sportTeamMap:Map<SportEnum, UserTeamCouple> | undefined = undefined;
  private selectedTeam:ObserverHelper<UserTeam | undefined> = new ObserverHelper<UserTeam | undefined>(undefined);

  constructor(private _session_storage:SessionStorageService<UserEntity>,
    private userTeamDecoratorFactory:UserTeamDecoratorFactoryService) {;

    // Registriamo l'observer sul valore dell'utente
    this.subscribeUser();

    const entity = this._session_storage.getData(UserService.KEY_SESSION);
    if(!new User().equals(entity) && entity != null) {
      this.user.setValue(new User(entity));
    }

  }

  private subscribeUser() : void {
    this.user.addObserver(new ObserverStepBuilder<User>()
      .next(user => this.userValue = user)
      .build()
    );
  }

  addObserverForUser(observer:Observer<User>) : void {
    this.user.addObserver(observer);
  } 

  getUser(): User {
    return this.userValue;
  }

  private setUser(user:User) {
    this.user.setValue(user);
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
   * Caricamento di tutti i teams realizzati dall'utente di un determinato sport
   * 
   * @returns UserTeam[]
   */
  loadTeams(sport:SportEnum) : UserTeam[] {
    if(this.sportTeamMap == undefined) {
      this.sportTeamMap = new Map<SportEnum, UserTeamCouple>();
    }

    if(!this.sportTeamMap.has(sport)) {
      // Caricamento da db
      let resultList:UserTeamEntity[] = CUSTOMS_TEAM_DATA.filter(team => team.user.equals(this.userValue) && 
          team.league.getSport().code == sport.code);
      let myTeams:UserTeam[] = this.userTeamDecoratorFactory.decorateList(resultList);    
      this.buildSportTeamMap(myTeams, sport);
    }
    return this.sportTeamMap.get(sport)?.activeList!;
  } 

  private buildSportTeamMap(myTeams:UserTeam[], sport:SportEnum) : void {
    if(this.sportTeamMap != undefined) {
      this.sportTeamMap.set(sport, { activeList : [], deactiveList : [] });
      myTeams.forEach(t => {
        t.isActive() ? this.sportTeamMap!.get(sport)!.activeList.push(t) : 
          this.sportTeamMap!.get(sport)!.deactiveList.push(t);
      })
    }
  }

  addNewTeam(userTeam:UserTeam) : boolean {
    let sport:SportEnum = userTeam.getLeague().getSport();
    this.loadTeams(sport);
    if(this.sportTeamMap != undefined && this.sportTeamMap.has(sport) && 
        this.sportTeamMap.get(sport)!.activeList.filter(t => t.getNameTeam() == userTeam.getNameTeam()).length == 0) {
        // Chiamata al backend
        CUSTOMS_TEAM_DATA.push(userTeam.getEntity());      
        this.sportTeamMap.get(sport)?.activeList.push(userTeam);
        return true;
    }
    return false;
  } 

  removeTeam(userTeam:UserTeam) : boolean {
    const sport:SportEnum = userTeam.getLeague().getSport();
    if(this.sportTeamMap != undefined && this.sportTeamMap.has(sport)) {
      const index:number = this.sportTeamMap.get(sport)!.activeList.findIndex(t => t.equals(userTeam));
      if(index != -1) {
        // Contiene esattamente un valore
        const team:UserTeam[] = this.sportTeamMap.get(sport)!.activeList.splice(index, 1);        
        this.sportTeamMap.get(sport)!.deactiveList.push(team[0]);
        return true;
      }
    }
    return false;
  }

  hasActiveTeam(sport:SportEnum) : boolean {
    if(this.sportTeamMap == undefined || !this.sportTeamMap.has(sport)) {
      this.loadTeams(sport);
    }

    // E' sicuramente presente per il controllo precedente
    return this.sportTeamMap!.get(sport)!.activeList.length > 0;
  }

  setSelectedTeam(userTeam : UserTeam | undefined) {
    this.selectedTeam.setValue(userTeam);
  }

  addSelectedTeamObserver(observer:Observer<UserTeam | undefined>) : void {
    this.selectedTeam.addObserver(observer);
  }
}
