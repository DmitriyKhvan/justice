import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { datepickerSettings } from '../../settings';

@Component({
  selector: 'app-step9',
  templateUrl: './step9.component.html',
  styleUrls: ['./step9.component.scss'],
})
export class Step9Component implements OnInit {
  form!: FormGroup;
  myDpOptions: IAngularMyDpOptions = datepickerSettings;
  submitted = false;
  options = [
    { id: 1, label: 'Решение1' },
    { id: 2, label: 'Решение2' },
    { id: 3, label: 'Решение3' },
    { id: 4, label: 'Решение4' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      numberDecree: new FormControl(null, Validators.required),
      dateDecree: new FormControl(null, Validators.required),
      article: new FormControl(null, Validators.required),
      amountOwed: new FormControl(null, Validators.required),
      sentence: new FormControl(null, Validators.required),
      decision: new FormControl(null, Validators.required),
      collateralValue: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
  }
}
