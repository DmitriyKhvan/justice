import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { datepickerSettings } from '../../settings';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
  form!: FormGroup;
  submitted = false;

  myDpOptions = datepickerSettings;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      dateVictim: new FormControl(null, Validators.required),
      fioAccused: new FormControl(null, Validators.required),
      preventiveMeasure: new FormControl(null, Validators.required),
      amountDamage: new FormControl(null, Validators.required),
      dateFailure: new FormControl(null, Validators.required),
      dateArrest: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    // this.submitted = true;

    console.log(this.form);
  }
}
