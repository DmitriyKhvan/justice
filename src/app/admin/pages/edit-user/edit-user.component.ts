import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, map, tap, delay } from 'rxjs/operators';
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
        switchMap((params: Params) => {
          return this.adminService.getUserById(params['id']);
        }),
        tap(this.setRegion.bind(this))
      )
      .subscribe((user: any) => {
        this.user = user;

        this.form = new FormGroup({
          last_name: new FormControl(user.last_name, Validators.required),
          first_name: new FormControl(user.first_name, Validators.required),
          middle_name: new FormControl(user.middle_name, Validators.required),
          role: new FormControl(user.roles, Validators.required),
          region: new FormControl(null, Validators.required),
          district: new FormControl(user.mfo, Validators.required),
          username: new FormControl(user.username, Validators.required),
          password: new FormControl(null),
        });

        this.loading = false;
      });

    this.adminService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  setRegion(user: any) {
    this.adminService.getRegions().subscribe((regions) => {
      this.regions = regions.data;

      const region: any = this.regions.find((region: any) => {
        return region.branches.find(
          (branche: any) => branche.mfo === user.mfo[0]
        );
      });

      this.districts = region.branches;

      this.form.patchValue({ region: region.region_id });
    });
  }

  setDistrict(region: any) {
    this.form.get('district')?.reset();
    if (region) {
      this.districts = region.branches;
      this.form.get('district')?.enable();
    } else {
      this.form.get('district')?.disable();
    }
  }

  submit(): any {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.uSub = this.adminService
      .updateUser({
        ...this.user,
        last_name: this.form.value.last_name,
        first_name: this.form.value.first_name,
        middle_name: this.form.value.middle_name,
        roles: this.form.value.role,
        mfo: this.form.value.district,
        username: this.form.value.username,
        password: this.form.value.password,
      })
      .subscribe(() => {
        this.submitted = false;
        this.alert.success('Пользователь обновлен');
      });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe;
    }
  }
}
