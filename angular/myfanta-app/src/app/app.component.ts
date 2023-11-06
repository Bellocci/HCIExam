import { Component, OnDestroy } from '@angular/core';
import { SessionStorageService } from './service/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'myfanta-app';

  /**
   * ========================
   * CONSTRUCTOR & DESTROYER
   * ========================
   */

  constructor(private sessionService:SessionStorageService) { }

  public ngOnDestroy(): void {
    console.log("Destroy the app");
    this.sessionService.clearData();
  }
}