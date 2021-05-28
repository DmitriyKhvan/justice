import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      last_name: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      role: new FormControl(null),
      district: new FormControl(null),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  submit(): any {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: any = {
      username: this.form.value.username,
      password: this.form.value.password,
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      middle_name: this.form.value.middle_name,
      status: 1,
    };

    this.adminService.createUser(user).subscribe(
      () => {
        this.alert.success('Пользователь добавлен');
        this.form.reset();
        this.submitted = false;
      },
      () => {
        this.alert.danger('Пользователь не добавлен');
        this.alert.success('Форма оформлена');
        this.submitted = false;
      }
    );
  }
}
