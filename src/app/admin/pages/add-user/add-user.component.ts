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
      role: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      district: new FormControl({ value: null, disabled: true }),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.adminService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });

    this.adminService.getRegions().subscribe((regions) => {
      this.regions = regions.data;
    });
  }

  setRegion(region: any) {
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

    console.log('this.form', this.form.value);

    this.submitted = true;

    const user: any = {
      last_name: this.form.value.last_name,
      first_name: this.form.value.first_name,
      middle_name: this.form.value.middle_name,
      roles: this.form.value.role,
      mfo: this.form.value.district,
      username: this.form.value.username,
      password: this.form.value.password,
      status: 1,
    };

    this.adminService.createUser(user).subscribe(
      () => {
        this.alert.success('Пользователь добавлен', {
          login: user.username,
          password: user.password,
        });
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
