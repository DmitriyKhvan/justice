import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-head-lawyer-form-step7-success',
  templateUrl: './head-lawyer-form-step7-success.component.html',
  styleUrls: ['./head-lawyer-form-step7-success.component.scss'],
})
export class HeadLawyerFormStep7SuccessComponent implements OnInit {
  form!: FormGroup;
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
      decision: new FormControl(null, Validators.required),
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
