import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService<T> {

  constructor() { }

  // Il salvataggio deve essere serializzato in JSON
  public saveData(key:string, value:T | null) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Avviene la deserializzazione in JSON
  public getData(key:string) : T | null {
    const result = sessionStorage.getItem(key);
    return result != null ? JSON.parse(result) as T : null;
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
