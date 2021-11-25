import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-referral-for-appeal',
  templateUrl: './referral-for-appeal.component.html',
  styleUrls: ['./referral-for-appeal.component.scss'],
})
export class ReferralForAppealComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  viewLawDic = [
    { value: 1, label: 'Вид1' },
    { value: 2, label: 'Вид2' },
  ];

  typeLawDic = [
    { value: 1, label: 'Тип1' },
    { value: 2, label: 'Тип2' },
  ];

  regionLawDic = [
    { value: 1, label: 'Регион суда1' },
    { value: 2, label: 'Регион суда2' },
  ];

  regionDic = [
    { value: 1, label: 'Регион1' },
    { value: 2, label: 'Регион2' },
  ];

  districtLawDic = [
    { value: 1, label: 'Районный суд1' },
    { value: 2, label: 'Районный суд2' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      viewLaw: new FormControl(null, Validators.required),
      typeLaw: new FormControl(null, Validators.required),
      regionLaw: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      districtLaw: new FormControl(null, Validators.required),
      numberDoc: new FormControl(null, Validators.required),
      dateDoc: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log('form', this.form.value);
  }
}
