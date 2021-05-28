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

  options = [
    { id: 1, label: 'Роль1' },
    { id: 2, label: 'Роль2' },
    { id: 3, label: 'Роль3' },
    { id: 4, label: 'Роль4' },
  ];

  options2 = [
    { id: 1, label: 'Район1' },
    { id: 2, label: 'Район2' },
    { id: 3, label: 'Район3' },
    { id: 4, label: 'Район4' },
  ];

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
          district: new FormControl(null),
          username: new FormControl(user.username, Validators.required),
          password: new FormControl(null, Validators.required),
        });
      });
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
