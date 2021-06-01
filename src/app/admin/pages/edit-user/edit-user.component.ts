import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  roles = [
    { id: 1, label: 'Роль1' },
    { id: 2, label: 'Роль2' },
    { id: 3, label: 'Роль3' },
    { id: 4, label: 'Роль4' },
  ];

  regions = [];

  districts = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log(params);

          return this.adminService.getUserById(params['id']);
        })
      )
      .subscribe((user: any) => {
        this.user = user;
        this.form = new FormGroup({
          last_name: new FormControl(user.last_name, Validators.required),
          first_name: new FormControl(user.first_name, Validators.required),
          middle_name: new FormControl(user.middle_name, Validators.required),
          role: new FormControl(null),
          region: new FormControl(1),
          district: new FormControl('09002'),
          username: new FormControl(user.username, Validators.required),
          password: new FormControl(null, Validators.required),
        });
      });

    this.adminService.getRegions().subscribe((regions) => {
      this.regions = regions.data;

      const region = this.regions.find((region: any) => region.region_id === 1);

      this.setRegion(region);
    });
  }

  setRegion(region: any) {
    console.log(region);
    if (region) {
      this.districts = region.branches;
      this.form.get('district')?.enable();
    } else {
      this.districts = [];
      this.form.get('district')?.reset();
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
