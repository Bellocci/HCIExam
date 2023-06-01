import { Component, OnDestroy } from '@angular/core';
import { SessionStorageService } from './service/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'myfanta-app';

  constructor(private _session_service:SessionStorageService<string>) { }

  public ngOnDestroy(): void {
    this._session_service.clearData();
  }
}