import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {ItemComponent} from './item/item.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuardService] },
  { path: 'detail/:id', component: HeroDetailComponent , canActivate: [AuthGuardService]},
  { path: 'heroes', component: HeroesComponent , canActivate: [AuthGuardService]},
  { path: 'item', component: ItemComponent , canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
