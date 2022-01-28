import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { switchMap, map, tap, delay, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  user!: any;

  uSub!: Subscription;
  rSub!: Subscription;

  roles = [];

  regions = [];

  districts = [];

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        // delay(5000),
        mergeMap((params: Params) => {
          const getUser = this.adminService.getUserById(params['id']);
          const userRoles = this.adminService.getUserRoles(params['id']);
          return forkJoin({ getUser, userRoles });
        }),
        tap((res) => this.setRegion.bind(this, res.getUser)())
      )
      .subscribe((res: any) => {
        this.user = res.getUser;

        this.form = new FormGroup({
          lastName: new FormControl(this.user.lastName, Validators.required),
          firstName: new FormControl(this.user.firstName, Validators.required),
          middleName: new FormControl(
            this.user.attributes.middleName,
            Validators.required
          ),
          roles: new FormControl(res.userRoles, Validators.required),
          region: new FormControl(null, Validators.required),
          district: new FormControl(
            this.user.attributes.mfo,
            Validators.required
          ),
          username: new FormControl({
            value: this.user.username,
            disabled: true,
          }),
          password: new FormControl(null),
        });

        this.loading = false;
      });

    this.adminService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  setRegion(user: any) {
    this.adminService
      .getRegions()
      // .pipe(
      //   map((regions) => {
      //     regions.data.push({
      //       nameRu: 'ВCE',
      //       regionId: 'ALL',
      //       branches: [
      //         {
      //           id: 'All',
      //           mfo: 'ALL',
      //           nameRu: 'ВСЕ',
      //         },
      //       ],
      //     });

      //     return regions;
      //   })
      // )
      .subscribe((regions) => {
        this.regions = regions.data;

        const region: any = this.regions.find((region: any) => {
          return region.branches.find(
            (branche: any) => branche.mfo === user.attributes.mfo[0]
          );
        });

        this.districts = region.branches;

        this.form.patchValue({ region: region.regionId });
      });
  }

  setDistrict(region: any) {
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

    this.submitted = true;

    const user = {
      ...this.user,
      lastName: this.form.value.lastName,
      firstName: this.form.value.firstName,
      username: this.form.value.username,
      attributes: {
        ...this.user.attributes,
        mfo: this.form.controls.district.value,
        middleName: this.form.value.middleName,
        roles: this.form.value.roles.map((role: any) => role.description),
      },
    };

    const updateUser = this.adminService.updateUser(this.user.id, user);
    const setRole = this.adminService.setUserRoles(
      this.user.id,
      this.form.value.roles
    );

    let observables = [updateUser, setRole];

    if (this.form.value.password) {
      const setPass = this.adminService.setUserPassWord(this.user.id, {
        type: 'password',
        value: this.form.value.password,
        temporary: true,
      });

      observables.push(setPass);
    }

    forkJoin(observables).subscribe(
      (res) => {
        this.alert.success('Пользователь обновлен', {
          login: user.username,
          password: this.form.value.password,
        });
        // this.form.reset();
        this.submitted = false;
      },
      (error) => {
        // this.alert.danger('Пользователь не обновлен');
        this.submitted = false;
      }
    );
  }

  remove(event: any) {
    // console.log(event.value);

    this.rSub = this.adminService
      .removeUserRoles(this.user.id, event.value)
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe;
    }
  }
}
