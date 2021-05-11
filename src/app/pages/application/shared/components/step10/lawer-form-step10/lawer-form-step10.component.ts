import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { datepickerSettings } from '../../../settings';

@Component({
  selector: 'app-lawer-form-step10',
  templateUrl: './lawer-form-step10.component.html',
  styleUrls: ['./lawer-form-step10.component.scss'],
})
export class LawerFormStep10Component implements OnInit {
  form!: FormGroup;
  submitted = false;
  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      numberAct: new FormControl(null, Validators.required),
      dateAct: new FormControl(null, Validators.required),
      amountOwed: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
      pledgeDebtors: new FormArray([
        new FormGroup({
          pledgeDebtor1: new FormControl(false, Validators.required),
        }),
        new FormGroup({
          pledgeDebtor2: new FormControl(false, Validators.required),
        }),
        new FormGroup({
          pledgeDebtor3: new FormControl(false, Validators.required),
        }),
        new FormGroup({
          pledgeDebtor4: new FormControl(false, Validators.required),
        }),
      ]),
    });
  }

  get pledgeDebtors() {
    return this.form.get('pledgeDebtors') as FormArray;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    console.log(this.form);
  }
}
