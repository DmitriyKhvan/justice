import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { forkJoin, from, fromEvent, Observable, Subscription } from 'rxjs';
import {
  map,
  tap,
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  delay,
  mergeMap,
} from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  @ViewChild('search', { static: true }) inputRef!: ElementRef;

  users!: any;
  uSub!: Subscription;
  dSub!: Subscription;
  isASub!: Subscription;
  searchSub!: Subscription;

  mfos: any[] = [];

  currentPage: number = 0;
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

    this.usersTransform();

    this.searchSub = fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(700),
        map((event: any) => event.target.value.toLowerCase()),
        // filter((value) => value.length > 2),
        distinctUntilChanged(),
        mergeMap((value) => {
          const data = {
            itemsPerPage: this.itemsPerPage,
            currentPage: this.currentPage,
            searchValue: value,
          };
          const users = this.adminService.getUsers(data);
          const usersSearch = this.adminService.getSearchUsers(data);
          return forkJoin({ users, usersSearch });
        })
      )
      .subscribe((res: any) => {
        this.users = res.users
          .filter((user: any) =>
            res.usersSearch.some((u: any) => u.id === user.id)
          )
          .map((user: any) => {
            return {
              ...user,
              attributes: {
                ...user.attributes,
                filials: [],
              },
            };
          });

        this.usersTransform();
      });
  }

  usersTransform() {
    this.adminService.getRegions().subscribe((regions) => {
      this.users.forEach((user: any) => {
        regions.data.forEach((region: any) => {
          region.branches.forEach((branch: any) => {
            if (user.attributes.mfo.includes(branch.mfo)) {
              // console.log('branch', branch);
              user.attributes.filials.push(branch.nameRu);
            }
          });
        });
      });
    });
  }

  getUsers() {
    this.loading = true;
    const data = {
      // itemsPerPage: this.itemsPerPage,
      // currentPage: this.currentPage,
      // searchValue: this.searchValue,
    };
    this.uSub = this.adminService
      .getUsers(data)
      .pipe(
        map((users: any) => {
          return users.map((user: any) => {
            return {
              ...user,
              attributes: {
                ...user.attributes,
                filials: [],
              },
            };
          });
        })
      )
      .subscribe(
        (users) => {
          // this.users = users.users;
          // this.totalItems = users.count;
          console.log(users);

          this.users = users;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  confirmRemoveUser(user: any) {
    this.confirm.confirm(
      `Удалить доступ для ${user.lastName} ${user.firstName} ${user.attributes.middleName}`,
      user,
      this.removeUser.bind(this)
    );
  }

  confirmToggleActiveteUser(user: any) {
    const isActiveUser = user.enabled ? 'Деактивировать' : 'Активировать';
    this.confirm.confirm(
      `${isActiveUser} ${user.lastName} ${user.firstName} ${user.attributes.middleName}?`,
      user,
      this.toggleActiveUser.bind(this)
    );
  }

  removeUser(user: any) {
    this.dSub = this.adminService.removeUser(user.id).subscribe(
      () => {
        this.users = this.users.filter((u: any) => u.id !== user.id);
        this.alert.warning('Пользователь был удален');
      },
      (error) => {
        console.log(error);

        this.alert.danger('Пользователь не удален');
      }
    );
  }

  toggleActiveUser(user: any) {
    const cloneUser = { ...user };
    if (cloneUser.enabled) {
      cloneUser.enabled = false;
    } else {
      cloneUser.enabled = true;
    }

    const isActiveUser = cloneUser.enabled ? 'Активирован' : 'Деактивирован';

    this.isASub = this.adminService.updateUser(user.id, cloneUser).subscribe(
      () => {
        user.enabled = cloneUser.enabled;
        this.alert.warning(`Пользователь был ${isActiveUser}`);
      },
      (error) => {
        console.log(error);

        this.alert.danger(`Пользователь не был ${isActiveUser}`);
      }
    );
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
