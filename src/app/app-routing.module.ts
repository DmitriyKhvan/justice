import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsDetailComponent } from './pages/clients-detail/clients-detail.component';
import { HistoryComponent } from './pages/history/history.component';
import { DamageClaimsComponent } from './pages/damage-claims/damage-claims.component';
import { ApplicationComponent } from './pages/application/application.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './layouts/main/main.component';
// import { AuthGuard } from './services/auth.guard';
import { SearchComponent } from './pages/search/search.component';
import { AdminGuard } from './services/admin.guard';
import { ErrorComponent } from './pages/error/error.component';
import { AddUserComponent } from './admin/pages/add-user/add-user.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { EditUserComponent } from './admin/pages/edit-user/edit-user.component';
import { ListUserComponent } from './admin/pages/list-user/list-user.component';
import { LawsuitComponent } from './pages/lawsuit/lawsuit.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AdminGuard],
    canActivate: [AuthGuard],
    data: {
      roles: ['admin'],
    },
    children: [
      {
        path: 'listUser',
        component: ListUserComponent,
      },
      {
        path: 'addUser',
        component: AddUserComponent,
      },
      {
        path: 'editUser/:id',
        component: EditUserComponent,
      },
    ],
    // loadChildren: () =>
    //   import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['lawyer'],
    },
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: 'clients', component: ClientsComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'clients/list',
        component: ClientsListComponent,
      },
      {
        path: 'clients/detail',
        component: ClientsDetailComponent,
        data: { taskInfo: {} },
      },
      // {
      //   path: 'clients/lawsuit/:stepId',
      //   component: LawsuitComponent,
      // },

      {
        path: 'clients/lawsuit',
        component: LawsuitComponent,
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
      {
        path: 'search',
        component: SearchComponent,
      },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
