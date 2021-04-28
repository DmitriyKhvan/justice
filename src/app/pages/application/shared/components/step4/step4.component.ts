import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { datepickerSettings } from '../../settings';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
})
export class Step4Component implements OnInit {
  form!: FormGroup;
  form2!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      additionalInfo: new FormControl(null, Validators.required),
    });

    this.form2 = new FormGroup({
      nameCourt: new FormControl(null, Validators.required),
      numberCase: new FormControl(null, Validators.required),
      dateCourt: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
  }

  submit2() {
    if (this.form2.invalid) {
      return;
    }

    this.submitted = true;
  }
}
