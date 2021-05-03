import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-head-lawer-form-step10',
  templateUrl: './head-lawer-form-step10.component.html',
  styleUrls: ['./head-lawer-form-step10.component.scss'],
})
export class HeadLawerFormStep10Component implements OnInit {
  form!: FormGroup;
  submitted = false;

  options = [
    { id: 1, label: 'решение1' },
    { id: 2, label: 'решение2' },
    { id: 3, label: 'решение3' },
    { id: 4, label: 'решение4 ' },
  ];
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      decision: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
  }
}
