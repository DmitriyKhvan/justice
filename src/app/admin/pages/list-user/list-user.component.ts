import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { from, fromEvent, Subscription } from 'rxjs';
import {
  map,
  tap,
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  delay,
} from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  @ViewChild('search', { static: true }) inputRef!: ElementRef;

  users: Array<any> = [];
  uSub!: Subscription;
  dSub!: Subscription;
  isASub!: Subscription;
  searchSub!: Subscription;

  currentPage: number = 1;
  totalItems!: number;
  pages: Array<any> = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    // { label: 'Все', value: 'all' },
  ];
  itemsPerPage: number = this.pages[0].value;
  searchValue: string = '';

  loading = false;

  constructor(
    public adminService: AdminService,
    private confirm: ConfirmService,
    public alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.searchSub = fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(700),
        map((event: any) => event.target.value.toLowerCase()),
        // filter((value) => value.length > 2),
        distinctUntilChanged()
        // switchMap((value) => {
        //   const data = {
        //     itemsPerPage: this.itemsPerPage,
        //     currentPage: this.currentPage,
        //     searchValue: value,
        //   };
        //   return this.adminService.getUsers(data);
        // })
      )
      .subscribe((value: any) => {
        // console.log(value);
        this.currentPage = 1;
        this.searchValue = value;
        this.getUsers();
      });
  }

  getUsers() {
    this.loading = true;
    const data = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      searchValue: this.searchValue,
    };
    this.uSub = this.adminService
      .getUsers(data)
      // .pipe(delay(500000))
      .subscribe(
        (users) => {
          console.log('users', users);

          this.users = users.users;
          this.totalItems = users.count;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  confirmRemoveUser(user: any) {
    this.confirm.confirm(
      `Удалить доступ для ${user.last_name} ${user.first_name} ${user.middle_name}`,
      user,
      this.removeUser.bind(this)
    );
  }

  confirmToggleActiveteUser(user: any) {
    const isActiveUser = user.status === 1 ? 'Деактивировать' : 'Активировать';
    this.confirm.confirm(
      `${isActiveUser} ${user.last_name} ${user.first_name} ${user.middle_name}`,
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
      user.status = cloneUser.status;
    });
  }

  pageChanged(currentPage: number) {
    this.currentPage = currentPage;
    this.getUsers();
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe;
    }

    if (this.dSub) {
      this.dSub.unsubscribe;
    }

    if (this.isASub) {
      this.isASub.unsubscribe;
    }

    if (this.searchSub) {
      this.searchSub.unsubscribe;
    }
  }
}
