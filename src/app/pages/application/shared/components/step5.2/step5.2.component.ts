import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step5_2',
  templateUrl: './step5.2.component.html',
  styleUrls: ['./step5.2.component.scss'],
})
export class Step5_2Component implements OnInit {
  form!: FormGroup;
  form2!: FormGroup;
  submitted = false;

  options = [
    { id: 1, label: 'Одобрить' },
    { id: 2, label: 'Отказать' },
    { id: 3, label: 'Пересмотреть' },
    { id: 4, label: 'Проверить' },
  ];
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.form2 = new FormGroup({
      decision: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form2);

    this.submitted = true;
  }
}
