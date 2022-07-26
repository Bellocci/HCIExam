import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './create-team/create-team.component';
import { HomeComponent } from './home/home.component';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
  {path: "", redirectTo: '/home', pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: "home/createTeam", redirectTo: '/createTeam', pathMatch: "full"},
  {path: 'createTeam', component: CreateTeamComponent},
  {path: "home/playerList", redirectTo: '/playerList', pathMatch: 'full'},
  {path: "playerList", component: PlayerListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
