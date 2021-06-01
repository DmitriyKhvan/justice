import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  users!: any;
  uSub!: Subscription;
  dSub!: Subscription;
  isASub!: Subscription;

  constructor(
    public adminService: AdminService,
    private confirm: ConfirmService,
    public alert: AlertService
  ) {}

  ngOnInit(): void {
    this.uSub = this.adminService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  confirmRemoveUser(user: any) {
    this.confirm.confirm(
      `Удалить доступ для ${user.last_name} ${user.first_name} ${user.middle_name}`,
      user,
      this.removeUser.bind(this)
    );
  }

  confirmToggleActiveteUser(user: any) {
    this.confirm.confirm(
      `Деактивировать ${user.last_name} ${user.first_name} ${user.middle_name}`,
      user,
      this.toggleActiveUser.bind(this)
    );
  }

  removeUser(user: any) {
    console.log('user', user);

    this.dSub = this.adminService.removeUser(user.id).subscribe(() => {
      this.users = this.users.filter((u: any) => u.id !== user.id);
      this.alert.warning('Пользователь был удален');
    });
  }

  toggleActiveUser(user: any) {
    const cloneUser = { ...user };
    if (cloneUser.status === 1) {
      cloneUser.status = 0;
    } else {
      cloneUser.status = 1;
    }

    console.log('userr', user);

    this.isASub = this.adminService.updateUser(cloneUser).subscribe(() => {
      console.log('update');
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe;
    }

    if (this.dSub) {
      this.dSub.unsubscribe;
    }

    if (this.isASub) {
      this.dSub.unsubscribe;
    }
  }
}
