import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  template: `
    <div class="select-field" [formGroup]="form">
      <div *ngIf="title" class="select-field__title">{{ title }}</div>
      <ng-select
        appearance="outline"
        [items]="options"
        [bindLabel]="bindLabel"
        [bindValue]="bindValue"
        [placeholder]="placeholder"
        #agreeSelect
        labelForId="yesno"
        [searchable]="false"
        [formControlName]="controlName"
      ></ng-select>
      <div
        *ngIf="form.get(controlName)?.touched && form.get(controlName)?.invalid"
        class="validation"
      >
        <small *ngIf="form.get(controlName)?.errors?.required">
          {{ 'select_data' | translate }}
        </small>
      </div>
    </div>
  `,
  styles: [],
})
export class SelectComponent implements OnInit {
  @Input() form: any;
  @Input() options: any;
  @Input() title: any;
  @Input() placeholder: any;
  @Input() controlName: any;
  @Input() bindLabel: any = 'label';
  @Input() bindValue: any = 'value';
  constructor() {}

  ngOnInit(): void {}
}
