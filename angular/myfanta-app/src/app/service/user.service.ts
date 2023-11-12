import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { USER_DATA, UserEntity } from 'src/model/userEntity.model';
import { CUSTOMS_TEAM_DATA, UserTeamEntity } from 'src/model/userTeamEntity.model';
import { SessionStorageService } from './session-storage.service';
import { ColorEnum } from 'src/enum/ColorEnum.model';
import { ObserverHelper } from 'src/utility/observer-helper';
import { SportEnum } from 'src/enum/SportEnum.model';
import { UserDecoratorFactoryService } from 'src/decorator-factory/user-decorator-factory.service';

/**
 * Interfaccia utilizzata insieme alla mappa per definire una coppia
 * di valori, una contenente la lista dei team attivi, l'altra la lista
 * dei team non attivi.
 */
interface UserTeamCouple {
  activeList: UserTeamEntity[];
  deactiveList: UserTeamEntity[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  /* 
   * ===========
   * VARIABILI
   * ===========
   */
  static readonly USERNAME_KEY_SESSION:string = "username";
  static readonly PASSWORD_KEY_SESSION:string = "password";

  private user:ObserverHelper<UserEntity> = new ObserverHelper<UserEntity>(new UserEntity());

  private sportTeamMap:Map<SportEnum, UserTeamCouple> | undefined = undefined;
  private selectedTeam:ObserverHelper<UserTeamEntity | undefined> = new ObserverHelper<UserTeamEntity | undefined>(undefined);

  /*
   * =========================
   * CONSTRUCTOR & DESTROYER
   * =========================
   */

  constructor(private sessionStorage:SessionStorageService,
    private userDecoratorFactory:UserDecoratorFactoryService) {

    console.log("Construct the User service");

    const username:string | null = this.sessionStorage.getData(UserService.USERNAME_KEY_SESSION);
    const password:string | null = this.sessionStorage.getData(UserService.PASSWORD_KEY_SESSION);
    console.log("Recupero utente dalla sessione: " + username);
    if(username != null && password != null) {
      // FIXME: Si prende l'utente che era loggato nella sessione facendo nuovamente la richiesta al backend 
      this.login(username, password);
      console.log("Utente: " + this.user.getValue());
    } else {
      // Si genera un utente "stampino" necessario solo per eseguire le operazioni
      console.log("Generazione utente stampino");
      this.user.setValue(userDecoratorFactory.createFakeUser());
    }
  }

  ngOnDestroy(): void {
    console.log("Destroy the User service");
    this.user.destroy();
    this.selectedTeam.destroy();
  }

  /*
   * =========
   * OBSERVER
   * =========
   */

  addObserverForUser(observer:Observer<UserEntity>) : Subscription | undefined {
    return this.user.addObserver(observer);
  }
  
  getObservableUser() : Observable<UserEntity> {
    return this.user.getObservable();
  }

  getUser(): UserEntity {
    return this.user.getValue();
  }

  private setUser(user:UserEntity) {
    this.user.setValue(user);
  }

  setSelectedTeam(userTeam : UserTeamEntity | undefined) {
    this.selectedTeam.setValue(userTeam);
  }

  addSelectedTeamObserver(observer:Observer<UserTeamEntity | undefined>) : Subscription | undefined {
    return this.selectedTeam.addObserver(observer);
  }

  /*
   * ================
   * GESTIONE UTENTE
   * ================
   */

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
      console.log("User: " + result.toString());
      this.sessionStorage.saveData(UserService.USERNAME_KEY_SESSION, result.username);
      this.sessionStorage.saveData(UserService.PASSWORD_KEY_SESSION, result.password);
      this.setUser(result);
    } else {
      this.setUser(this.userDecoratorFactory.createFakeUser());
      this.sessionStorage.removeData(UserService.USERNAME_KEY_SESSION);
      this.sessionStorage.removeData(UserService.PASSWORD_KEY_SESSION);
    }
  }

  /**
   * Metodo che permette la disconnessione dal proprio account e setta
   * come valore corrente uno User vuoto.
   */
  logout() : void {    
    this.sessionStorage.removeData(UserService.USERNAME_KEY_SESSION);
    this.sessionStorage.removeData(UserService.PASSWORD_KEY_SESSION);
    this.setUser(this.userDecoratorFactory.createFakeUser());
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
  createNewUser(name:string, surname:string, username:string, password:string) : UserEntity | undefined {
    // TODO: Chiamata al db
    const result:UserEntity[] = USER_DATA.filter(user => user.username == username);
    if(result.length == 0) {
      // TODO: Salvataggio su db

      // TODO: Chiamata al db per caricare il nuovo utente
      let entity:UserEntity = new UserEntity(USER_DATA.length, name, surname, username, password, ColorEnum.WHITE, true);
      // Salvataggio su db
      USER_DATA.push(entity)
      return entity;
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

  /*
   * =====================
   * GESTIONE TEAM UTENTE 
   * =====================
   */

  /**
   * Caricamento di tutti i teams realizzati dall'utente di un determinato sport
   * 
   * @returns UserTeam[]
   */
  loadTeams(sport:SportEnum) : UserTeamEntity[] {

    // Il metodo può essere invocato solamente quando l'utente ha fatto la login
    let myTeams:UserTeamEntity[] = [];
    if(!this.user.getValue().isFakeUser()) {
      if(this.sportTeamMap == undefined) {
        this.sportTeamMap = new Map<SportEnum, UserTeamCouple>();
      }
  
      if(!this.sportTeamMap.has(sport)) {
        // Caricamento da db
        myTeams = CUSTOMS_TEAM_DATA.filter(team => team.user.equals(this.user.getValue()) && 
            team.league.sport.code == sport.code);   
        this.buildSportTeamMap(myTeams, sport);
      }
      return this.sportTeamMap.get(sport)?.activeList!;
    }

    return myTeams;
  } 

  private buildSportTeamMap(myTeams:UserTeamEntity[], sport:SportEnum) : void {
    if(this.sportTeamMap != undefined) {
      this.sportTeamMap.set(sport, { activeList : [], deactiveList : [] });
      myTeams.forEach(t => {
        t.active ? this.sportTeamMap!.get(sport)!.activeList.push(t) : 
          this.sportTeamMap!.get(sport)!.deactiveList.push(t);
      })
    }
  }

  addNewTeam(userTeam:UserTeamEntity) : boolean {
    let sport:SportEnum = userTeam.league.sport;
    this.loadTeams(sport);
    if(this.sportTeamMap != undefined && this.sportTeamMap.has(sport) && 
        this.sportTeamMap.get(sport)!.activeList.filter(t => t.nameTeam == userTeam.nameTeam).length == 0) {
        // Chiamata al backend
        CUSTOMS_TEAM_DATA.push(userTeam);      
        this.sportTeamMap.get(sport)?.activeList.push(userTeam);
        return true;
    }
    return false;
  } 

  removeTeam(userTeam:UserTeamEntity) : boolean {
    const sport:SportEnum = userTeam.league.sport;
    if(this.sportTeamMap != undefined && this.sportTeamMap.has(sport)) {
      const index:number = this.sportTeamMap.get(sport)!.activeList.findIndex(t => t.equals(userTeam));
      if(index != -1) {
        // Contiene esattamente un valore
        const team:UserTeamEntity[] = this.sportTeamMap.get(sport)!.activeList.splice(index, 1);        
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
}
