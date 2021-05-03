import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finish-form-step10',
  templateUrl: './finish-form-step10.component.html',
  styleUrls: ['./finish-form-step10.component.scss'],
})
export class FinishFormStep10Component implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
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
