import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  // Il salvataggio deve essere serializzato in JSON
  public saveData(key:string, value:string) {
    sessionStorage.setItem(key, value);
  }

  // Avviene la deserializzazione in JSON
  public getData(key:string) : string | null {
    return sessionStorage.getItem(key);
  }

  // Metodo per la rimozione di una singola chiave
  public removeData(key:string) {
    sessionStorage.removeItem(key);
  }

  // Metodo per rimuovere tutte le chiavi
  public clearData() {
    sessionStorage.clear();
  }
}
