import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsDetailComponent } from './pages/clients-detail/clients-detail.component';
import { HistoryComponent } from './pages/history/history.component';
import { DamageClaimsComponent } from './pages/damage-claims/damage-claims.component';
import { ApplicationComponent } from './pages/application/application.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'clients', pathMatch: 'full'}, 
      {path: 'clients', component: ClientsComponent},
      {path: 'login', component: LoginComponent},
      {
        path: 'clients/list',
        component: ClientsListComponent,
      },
      {
        path: 'clients/detail',
        component: ClientsDetailComponent,
      },
      {
        path: 'clients/history',
        component: HistoryComponent,
      },
      {
        path: 'claims',
        component: DamageClaimsComponent,
      },
      {
        path: 'claims/application',
        component: ApplicationComponent,
      },
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
