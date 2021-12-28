import { JsonpClientBackend } from '@angular/common/http';
import { Component, DoCheck, HostBinding, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { datepickerSettings } from '../../../../settings';

@Component({
  selector: 'app-lawyer-form-step6',
  templateUrl: './lawyer-form.component.html',
  styleUrls: ['./lawyer-form.component.scss'],
})
export class LawyerFormStep6Component implements OnInit {
  form!: FormGroup;
  submitted = false;
  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  options = [
    { id: 1, label: 'исполнителя1' },
    { id: 2, label: 'исполнителя2' },
    { id: 3, label: 'исполнителя3' },
    { id: 4, label: 'исполнителя4' },
  ];

  options2 = [
    { id: 1, label: 'обеспечение1' },
    { id: 2, label: 'обеспечение2' },
    { id: 3, label: 'обеспечение3' },
    { id: 4, label: 'обеспечение4' },
  ];

  options3 = [
    { id: 1, label: 'залог1' },
    { id: 2, label: 'залог2' },
    { id: 3, label: 'залог3' },
    { id: 4, label: 'залог4' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      numberLetter: new FormControl(null, Validators.required),
      outDocDate: new FormControl(null, Validators.required),
      claimant: new FormControl(null, Validators.required),
      // debtor: new FormControl(null, Validators.required),
      bailiff: new FormControl(null, Validators.required),
      security: new FormControl(null, Validators.required),
      pledge: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
      debtors: new FormArray([new FormControl('', Validators.required)]),
    });
  }

  get debtors() {
    return this.form.get('debtors') as FormArray;
  }

  addDebtor() {
    const control = new FormControl('', Validators.required);
    this.debtors.push(control);
  }

  removeDebtor(idx: number) {
    this.debtors.removeAt(idx);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
  }

  getObject(obj: any) {}
}
