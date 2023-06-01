import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private _session_service:SessionStorageService<string>) {
  }
  
  Init() {

      return new Promise<void>((resolve, reject) => {
          console.log("AppInitService.init() called");
          // Internal Data Service
          if(this._session_service.getData('link') == null)
            this._session_service.saveData('link', '');
          if(this._session_service.getData('championship') == null)
            this._session_service.saveData('championship', '');

          setTimeout(() => {
              console.log('AppInitService Finished');
              resolve();
          }, 1000);

      });
  }
}
