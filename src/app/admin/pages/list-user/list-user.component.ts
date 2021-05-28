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
      user.id,
      this.removeUser.bind(this)
    );
  }

  removeUser(id: number) {
    this.dSub = this.adminService.removeUser(id).subscribe(() => {
      this.users = this.users.filter((user: any) => user.id !== id);
      this.alert.warning('Пользователь был удален');
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe;
    }

    if (this.dSub) {
      this.dSub.unsubscribe;
    }
  }
}
