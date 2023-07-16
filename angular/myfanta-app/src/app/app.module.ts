import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { AppInitService } from './service/app-init.service';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TableComponent } from './table/table.component';
import { OptionsComponent } from './options/options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarBaseComponent } from './toolbar/toolbar-base/toolbar-base.component';
import { ToolbarMobileComponent } from './toolbar/toolbar-mobile/toolbar-mobile.component';
import { SearchAddPlayerComponent } from './search-add-player/search-add-player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ShortTableComponent } from './table/short-table/short-table.component';
import { TableFavBlackPlayerComponent } from './table/table-fav-black-player/table-fav-black-player.component';
import { LoginDialogComponent } from './Dialog/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './Dialog/registration-dialog/registration-dialog.component';
import { RecoveryPasswordDialogComponent } from './Dialog/recovery-password-dialog/recovery-password-dialog.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CreateNewTeamDialogComponent } from './Dialog/create-new-team-dialog/create-new-team-dialog.component';
import { OptionFilterComponent } from './option-filter/option-filter.component';
import { PlayerPageComponent } from './player-page/player-page.component';

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTeamComponent,
    TableComponent,
    OptionsComponent,
    ToolbarComponent,
    ToolbarBaseComponent,
    ToolbarMobileComponent,
    SearchAddPlayerComponent,
    PlayerListComponent,
    ShortTableComponent,
    TableFavBlackPlayerComponent,
    LoginDialogComponent,
    RegistrationDialogComponent,
    RecoveryPasswordDialogComponent,
    UserPageComponent,
    CreateNewTeamDialogComponent,
    OptionFilterComponent,
    PlayerPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
