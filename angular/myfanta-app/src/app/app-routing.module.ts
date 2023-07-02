import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './create-team/create-team.component';
import { HomeComponent } from './home/home.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { OptionsComponent } from './options/options.component';

const routes: Routes = [
  {path: "", redirectTo: '/home', pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: "home/myTeam", redirectTo: '/myTeam', pathMatch: "full"},
  {path: 'myTeam', component: CreateTeamComponent},
  {path: "home/playerList", redirectTo: '/playerList', pathMatch: 'full'},
  {path: "playerList", component: PlayerListComponent},
  {path: "home/favoritList", redirectTo: '/favoritList', pathMatch: 'full'},
  {path: "favoritList", component: PlayerListComponent},
  {path: "home/blackList", redirectTo: '/blackList', pathMatch: 'full'},
  {path: "blackList", component: PlayerListComponent},
  {path: "myProfile", component: UserPageComponent},
  {path: "home/myProfile", redirectTo: "/myProfile", pathMatch: 'full'},
  {path: "options", component: OptionsComponent},
  {path: "home/options", redirectTo: "/options", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
