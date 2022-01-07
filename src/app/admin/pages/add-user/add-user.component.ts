import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  roles = [];

  regions = [];

  districts = [];

  constructor(
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      last_name: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      roles: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      district: new FormControl({ value: null, disabled: true }),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.adminService.getRoles().subscribe((roles) => {
      this.roles = roles;
      console.log('roles', this.roles);
    });

    this.adminService.getRegions().subscribe((regions) => {
      this.regions = regions.data;
    });
  }

  setRegion(region: any) {
    this.form.get('district')?.reset();

    if (region.code !== '00') {
      this.districts = region.branches;
      this.form.get('district')?.enable();
    } else if (region.code === '00') {
      this.districts = region.branches;
      this.form.get('district')?.enable();
      this.form.patchValue({
        district: [region.branches[0].mfo],
      });
    } else {
      this.form.get('district')?.disable();
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
        mfo: this.form.value.district,
        roles: this.form.value.roles.map((role: any) => role.description),
      },
    };

    // console.log('user', user);

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
          // console.log(error);

          this.alert.danger('Пользователь не добавлен');
          this.submitted = false;
        }
      );
  }
}
