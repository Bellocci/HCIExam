import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TabsComponent } from './create-team/tabs/tabs.component';
import { TableComponent } from './table/table.component';
import { OptionsComponent } from './create-team/tabs/options/options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableEmptyComponent } from './table/table-empty/table-empty.component';
import { TableBlacklistComponent } from './table/table-blacklist/table-blacklist.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarBaseComponent } from './toolbar/toolbar-base/toolbar-base.component';
import { ToolbarMobileComponent } from './toolbar/toolbar-mobile/toolbar-mobile.component';
import { SearchAddPlayerComponent } from './search-add-player/search-add-player.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTeamComponent,
    TabsComponent,
    TableComponent,
    OptionsComponent,
    TableEmptyComponent,
    TableBlacklistComponent,
    ToolbarComponent,
    ToolbarBaseComponent,
    ToolbarMobileComponent,
    SearchAddPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
