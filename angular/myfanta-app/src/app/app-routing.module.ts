import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { OptionsComponent } from './pages/options/options.component';
import { PlayerPageComponent } from './pages/player-page/player-page.component';

const routes: Routes = [

  // Serve per reindirizzare la pagina alla HomePage
  {path: "fantasyteam", redirectTo: '/fantasyteam/home', pathMatch: "full"},

  // HomePage
  {
    path: "fantasyteam",
    children : [{ path : "home", component : HomeComponent}]
  },

  // MyTeam
  {
    path: "fantasyteam",
    children : [{ path : "myTeam", component : PlayerListComponent}]
  },

  // PlayerList
  {
    path: "fantasyteam",
    children : [{ path : "playerList", component : PlayerListComponent}]
  },

  // FavoriteList
  {
    path: "fantasyteam",
    children : [{ path : "favoriteList", component : PlayerListComponent}]
  },

  // Blacklist
  {
    path: "fantasyteam",
    children : [{ path : "blacklist", component : PlayerListComponent}]
  },

  // MyProfile
  {
    path: "fantasyteam",
    children : [{ path : "myProfile", component : UserPageComponent}]
  },

  // Options
  {
    path: "fantasyteam",
    children : [{ path : "options", component : OptionsComponent}]
  },

  // PlayerPage
  {
    path: "fantasyteam", 
    children : [{ path: ":league/:team/:player/:id", component: PlayerPageComponent }]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
