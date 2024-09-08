import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { RouterService } from './router.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';
import { ModelRestClientService } from './model-rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private sessionService:SessionStorageService,
    private routerService:RouterService,
    private modelRestClient:ModelRestClientService) {
  }
  
  Init() {

      return new Promise<void>((resolve, reject) => {
          console.log("AppInitService.init() called");

          // Router service
          if(this.sessionService.getData(RouterService.KEY_SESSION_LAST_PAGE) == null) {
            // Se è la prima volta che si apre la pagina allora si reindirizza alla home page
            this.routerService.goToLink(LinkEnum.HOME);
          }

          setTimeout(() => {
              console.log('AppInitService Finished');
              resolve();
          }, 1000);

      });
  }
}
