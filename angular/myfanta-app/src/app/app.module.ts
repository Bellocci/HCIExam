import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { AppInitService } from './service/app-init.service';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './components/table/table.component';
import { OptionsComponent } from './pages/options/options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarBaseComponent } from './toolbar/toolbar-base/toolbar-base.component';
import { SearchAddPlayerComponent } from './components/search-add-player/search-add-player.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { LoginDialogComponent } from './Dialog/login-dialog/login-dialog.component';
import { SignupDialogComponent } from './Dialog/signup-dialog/signup-dialog.component';
import { RecoveryPasswordDialogComponent } from './Dialog/recovery-password-dialog/recovery-password-dialog.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { CreateNewTeamDialogComponent } from './Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { OptionFilterComponent } from './components/option-filter/option-filter.component';
import { PlayerPageComponent } from './pages/player-page/player-page.component';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { LinkListComponent } from './components/link-list/link-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OptionsFootballComponent } from './pages/options/options-football/options-football.component';
import { OptionsVolleyballComponent } from './pages/options/options-volleyball/options-volleyball.component';
import { OptionsBasketballComponent } from './pages/options/options-basketball/options-basketball.component';
import { TeamListResponsiveComponent } from './components/team-list-responsive/team-list-responsive.component';
import { OptionPlayerSearchComponent } from './components/option-player-search/option-player-search.component';

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    OptionsComponent,
    ToolbarComponent,
    ToolbarBaseComponent,
    SearchAddPlayerComponent,
    PlayerListComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    RecoveryPasswordDialogComponent,
    UserPageComponent,
    CreateNewTeamDialogComponent,
    OptionFilterComponent,
    PlayerPageComponent,
    CustomSnackbarComponent,
    LinkListComponent,
    OptionsFootballComponent,
    OptionsVolleyballComponent,
    OptionsBasketballComponent,
    TeamListResponsiveComponent,
    OptionPlayerSearchComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
