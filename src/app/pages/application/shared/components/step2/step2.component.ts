import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({});
  }

  logger(event: any) {
    console.log(event);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
  }
}
