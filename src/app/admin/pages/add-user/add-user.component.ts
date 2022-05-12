import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;

  uSub!: Subscription;
  rSub!: Subscription;
  tSub!: Subscription;

  roles = [];

  regions = [];

  districts = [];

  constructor(
    public adminService: AdminService,
    private alert: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      last_name: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      roles: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      district: new FormControl({ value: null, disabled: false }),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.uSub = this.adminService.getRoles().subscribe((roles) => {
      // this.roles = roles;
      this.roles = this.userRolesTransform(roles);
    });

    this.rSub = this.adminService.getRegions().subscribe((regions) => {
      this.regions = regions.data;
    });

    this.tSub = this.adminService.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.regions = JSON.parse(JSON.stringify(this.regions));
        this.roles = [...this.roles];
        this.districts = [...this.districts];
      }
    );
  }

  userRolesTransform(roles: any) {
    return roles.map((role: any) => {
      const rolesName = role.description.split('##');
      return {
        ...role,
        role_ru: rolesName[0],
        role_uz: rolesName[1],
      };
    });
  }

  setRegion(region: any) {
    this.form.get('district')?.reset();

    if (!region) {
      this.form.get('district')?.disable();
      this.form.patchValue({
        district: null,
      });
    } else if (region.code !== '00') {
      this.districts = region.branches;
      this.form.get('district')?.enable();
    } else if (region.code === '00') {
      this.districts = region.branches;
      this.form.get('district')?.disable();
      this.form.patchValue({
        district: [region.branches[0].mfo],
      });
    }
  }

  submit(): any {
    if (this.form.invalid) {
      return;
    }

    // console.log('this.form', this.form.value);

    this.submitted = true;

    const user: any = {
      lastName: this.form.value.last_name,
      firstName: this.form.value.first_name,
      // roles: this.form.value.roles,
      username: this.form.value.username,
      // password: this.form.value.password,
      enabled: true,
      attributes: {
        middleName: this.form.value.middle_name,
        mfo: this.form.controls.district.value,
        roles: this.form.value.roles.map((role: any) => role.description),
        roles_ru: this.form.value.roles.map((role: any) => role.role_ru),
        roles_uz: this.form.value.roles.map((role: any) => role.role_uz),
      },
    };

    this.adminService
      .createUser(user)
      .pipe(
        switchMap(() => {
          return this.adminService.getUsers({});
        }),
        map((users) => {
          return users.find((u: any) => u.username === user.username);
        }),
        mergeMap((user: any) => {
          const setPass = this.adminService.setUserPassWord(user.id, {
            type: 'password',
            value: this.form.value.password,
            temporary: false,
          });

          //need delete for keyclock API
          this.form.value.roles.forEach((role: any) => {
            delete role.role_ru;
            delete role.role_uz;
          });

          const setRole = this.adminService.setUserRoles(
            user.id,
            this.form.value.roles
          );

          return forkJoin([setPass, setRole]);
        })
      )
      .subscribe(
        (res) => {
          // console.log('res', res);
          this.alert.success('Пользователь добавлен', {
            login: user.username,
            password: this.form.value.password,
          });
          this.form.reset();
          this.submitted = false;
        },
        (error) => {
          console.log(error);

          // this.alert.danger('Пользователь не добавлен');
          this.alert.danger(
            error.error.errorMessage || error.statusText === 'Unknown Error'
              ? this.translate.instant('serverError')
              : error.message
          );
          this.submitted = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.uSub?.unsubscribe;
    this.rSub?.unsubscribe;
    this.tSub?.unsubscribe;
  }
}
