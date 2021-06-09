import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent as AdminLayoutComponent } from '../layouts/admin/admin.component';
import { LoginComponent } from '../pages/login/login.component';
import { AdminGuard } from '../services/admin.guard';
import { AuthGuard } from '../services/auth.guard';
import { SharedModule } from '../shared.module';
import { AddUserComponent } from './pages/add-user/add-user.component';

@NgModule({
  declarations: [AdminLayoutComponent, AddUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          // {
          //   path: '',
          //   redirectTo: '/admin/login',
          //   pathMatch: 'full',
          // },
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'user',
            component: AddUserComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AdminModule {}
