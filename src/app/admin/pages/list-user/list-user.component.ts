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
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  @ViewChild('search', { static: true }) inputRef!: ElementRef;

  users: any[] = [];
  uSub!: Subscription;
  dSub!: Subscription;
  tSub!: Subscription;
  isASub!: Subscription;
  searchSub!: Subscription;

  mfos: any[] = [];

  currentPage: number = 0;
  totalItems!: number;
  pages: Array<any> = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 'all', value: 999999999 },
  ];
  itemsPerPage: number = this.pages[0].value;
  searchValue: string = '';

  loading = false;

  constructor(
    public adminService: AdminService,
    private confirm: ConfirmService,
    public alert: AlertService,
    private titlecase: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.searchSub = fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(700),
        map((event: any) => event.target.value.toLowerCase()),
        // filter((value) => value.length > 2),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.currentPage = 0;
        this.searchValue = value;
        this.getUsers();
      });

    // this.tSub = this.adminService.translate.onLangChange.subscribe(() => {
    //   this.users.forEach((user: any) => {
    //     user.attributes.filials = [];
    //   });
    //   this.getUsers();
    // });
  }

  usersTransform() {
    this.adminService.getRegions().subscribe((regions) => {
      this.users.forEach((user: any) => {
        regions.data.forEach((region: any) => {
          region.branches.forEach((branch: any) => {
            if (user.attributes.mfo.includes(branch.mfo)) {
              // console.log('branch', branch);
              user.attributes.filials_ru.push(branch.nameRu);
              user.attributes.filials_uz.push(branch.nameUz);
            }
          });
        });
      });

      this.users.sort((a: any, b: any) => {
        if (a.createdTimestamp > b.createdTimestamp) {
          return -1;
        }
        if (a.createdTimestamp < b.createdTimestamp) {
          return 1;
        }

        return 0;
      });
    });
  }

  getUsers() {
    this.loading = true;

    const data = {
      itemsPerPage: this.itemsPerPage,
      currentPage: (this.currentPage - 1) * this.itemsPerPage,
      searchValue: this.searchValue,
    };

    const users = this.adminService.getUsers(data);
    const countUsers = this.adminService.getCountUsers();
    // const usersSearch = this.adminService.getSearchUsers(data);

    forkJoin({ users, countUsers }).subscribe(
      (res: any) => {
        // if (this.searchValue) {
        //   this.totalItems = res.users.length;
        //   console.log(this.totalItems);
        // } else {
        //   this.totalItems = res.countUsers;
        // }

        this.totalItems = res.countUsers;

        this.users = res.users
          // .filter((user: any) =>
          //   res.usersSearch.some((u: any) => u.id === user.id)
          // )
          .map((user: any) => {
            return {
              ...user,
              attributes: {
                ...user.attributes,
                filials_ru: [],
                filials_uz: [],
              },
            };
          });

        this.usersTransform();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  // getUsers() {
  //   this.loading = true;
  //   const data = {
  //     // itemsPerPage: this.itemsPerPage,
  //     // currentPage: this.currentPage,
  //     // searchValue: this.searchValue,
  //   };
  //   this.uSub = this.adminService
  //     .getUsers(data)
  //     .pipe(
  //       map((users: any) => {
  //         return users.map((user: any) => {
  //           return {
  //             ...user,
  //             attributes: {
  //               ...user.attributes,
  //               filials: [],
  //             },
  //           };
  //         });
  //       })
  //     )
  //     .subscribe(
  //       (users) => {
  //         // this.users = users.users;
  //         // this.totalItems = users.count;

  //         this.users = users;

  //         this.usersTransform();

  //         this.loading = false;
  //       },
  //       (error) => {
  //         this.loading = false;
  //       }
  //     );
  // }

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
        this.getUsers();
      },
      (error) => {
        // this.alert.danger('Пользователь не удален');
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
        // this.alert.danger(`Пользователь не был ${isActiveUser}`);
      }
    );
  }

  pageChanged(currentPage: number) {
    this.currentPage = currentPage;
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.uSub?.unsubscribe;
    this.dSub?.unsubscribe;
    this.tSub?.unsubscribe;
    this.isASub?.unsubscribe;
    this.searchSub?.unsubscribe;
  }
}
