import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { datepickerSettings } from '../../../../settings';

@Component({
  selector: 'app-head-lawyer-form-step6',
  templateUrl: './head-lawyer-form.component.html',
  styleUrls: ['./head-lawyer-form.component.scss'],
})
export class HeadLawyerFormStep6Component implements OnInit {
  form!: FormGroup;
  myDpOptions: IAngularMyDpOptions = datepickerSettings;
  submitted = false;
  options = [
    { id: 1, label: 'решение1' },
    { id: 2, label: 'решение2' },
    { id: 3, label: 'решение3' },
    { id: 4, label: 'решение4' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      decision: new FormControl(1, Validators.required),
      dateControl: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
  }
}
