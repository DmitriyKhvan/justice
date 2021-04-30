import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { datepickerSettings } from '../../../../settings';

@Component({
  selector: 'app-lawyer-form-step8-success',
  templateUrl: './lawyer-form-step8-success.component.html',
  styleUrls: ['./lawyer-form-step8-success.component.scss'],
})
export class LawyerFormStep8SuccesComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  options = [
    { id: 1, label: 'результат1' },
    { id: 2, label: 'результат2' },
    { id: 3, label: 'результат3' },
    { id: 4, label: 'результат4' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      additionalInfo: new FormControl(null, Validators.required),
      numberLot: new FormControl(null, Validators.required),
      resultAuction: new FormControl(null, Validators.required),
      dateLotStart: new FormControl(null, Validators.required),
      dateLotEnd: new FormControl(null, Validators.required),
      amountSales: new FormControl(null, Validators.required),
      pledgeDebtors: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
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

    console.log(this.form);

    this.submitted = true;
  }
}
