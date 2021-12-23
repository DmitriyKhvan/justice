import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

declare var $: any;
@Component({
  selector: 'app-datepicker',
  template: `
    <div class="input-field" [formGroup]="form">
      <div class="input-field__title">{{ title }}</div>

      <label
        class="input-field__label"
        [class]="formTemplate ? 'readonly' : ''"
      >
        <!--        <input type="text" class="datepicker-here" readonly />-->
        <input
          class="input-box"
          angular-mydatepicker
          name="reactiveFormsDate"
          [formControlName]="controlName"
          [options]="myDpOptions"
          #dp="angular-mydatepicker"
          [locale]="'ru'"
        />
        <i class="icon-calendar" (click)="dp.toggleCalendar()"></i>
      </label>

      <div
        *ngIf="form.get(controlName)?.touched && form.get(controlName)?.invalid"
        class="validation"
      >
        <small
          *ngIf="
            form.get(controlName)?.errors &&
            form.get(controlName)?.errors?.required &&
            !form.get(controlName)?.errors?.invalidDateFormat
          "
        >
          Введите данные
        </small>
        <small
          *ngIf="
            form.get(controlName)?.errors &&
            form.get(controlName)?.errors?.invalidDateFormat
          "
        >
          Неккоректные данные
        </small>
      </div>
    </div>
  `,
  styles: [],
})
export class DatepickerComponent implements OnInit {
  @Input() title: any;
  @Input() form: any;
  @Input() formTemplate: any = null;
  @Input() controlName: any;

  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
    closeSelectorOnDateSelect: false,
    openSelectorTopOfInput: false,
  };

  ngOnInit(): void {
    let d: Date = new Date();
    d.setDate(d.getDate() + 2);
    let model: IMyDateModel = {
      isRange: false,
      // singleDate: { jsDate: d },
      // dateRange: null,
    };
  }
}
