import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { datepickerSettings } from '../../../../settings';

@Component({
  selector: 'app-lawyer-form-step7-success',
  templateUrl: './lawyer-form-step7-success.component.html',
  styleUrls: ['./lawyer-form-step7-success.component.scss'],
})
export class LawyerFormStep7SuccessComponent implements OnInit {
  form!: FormGroup;
  myDpOptions: IAngularMyDpOptions = datepickerSettings;
  submitted = false;
  options = [
    { id: 1, label: 'решение1' },
    { id: 2, label: 'решение2' },
    { id: 3, label: 'решение3' },
    { id: 4, label: 'решение4' },
  ];

  options2 = [
    { id: 1, label: 'исполнитель1' },
    { id: 2, label: 'исполнитель2' },
    { id: 3, label: 'исполнитель3' },
    { id: 4, label: 'исполнитель4' },
  ];

  options3 = [
    { id: 1, label: 'обжалование1' },
    { id: 2, label: 'обжалование2' },
    { id: 3, label: 'обжалование3' },
    { id: 4, label: 'обжалование4' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      decision: new FormControl(null, Validators.required),
      bailiff: new FormControl(null, Validators.required),
      numberDecree: new FormControl(null, Validators.required),
      dateAppeals: new FormControl(null, Validators.required),
      numberCase: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
  }
}
