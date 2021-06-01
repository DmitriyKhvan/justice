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

  roles = [
    { id: 1, label: 'Роль1' },
    { id: 2, label: 'Роль2' },
    { id: 3, label: 'Роль3' },
    { id: 4, label: 'Роль4' },
  ];

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
      role: new FormControl(null),
      region: new FormControl(null),
      district: new FormControl({ value: null, disabled: true }),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.adminService.getRegions().subscribe((regions) => {
      this.regions = regions.data;
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

    console.log('this.form', this.form.value);

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
