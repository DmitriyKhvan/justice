import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

declare var $: any;
@Component({
  selector: 'app-datepicker',
  template: `
    <div class="input-field">
      <div class="input-field__title">{{ title }}</div>
      <label class="input-field__label">
        <!--        <input type="text" class="datepicker-here" readonly />-->
        <input
          class="input-box"
          angular-mydatepicker
          name="mydate"
          (click)="dp.toggleCalendar()"
          [(ngModel)]="model"
          [options]="myDpOptions"
          #dp="angular-mydatepicker"
          (dateChanged)="onDateChanged($event)"
          [locale]="'ru'"
        />
        <i class="icon-calendar"></i>
      </label>
    </div>
  `,
  styles: [],
})
export class DatepickerComponent implements OnInit {
  @Input() title: any;

  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
    closeSelectorOnDateSelect: true,
  };

  model!: IMyDateModel;

  onDateChanged(event: IMyDateModel): void {
    // date selected
    this.onselect.emit(event);
  }

  ngOnInit(): void {}
}
