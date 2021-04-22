import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-datepicker',
  template: `
    <div class="input-field ml-1">
      <div class="input-field__title">Дата исх. документа</div>
      <label class="input-field__label">
        <input type="text" class="outDocDate" readonly />
        <i class="icon-calendar"></i>
      </label>
    </div>
  `,
  styles: [],
})
export class DatepickerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $('.outDocDate').datepicker({
      // minDate: new Date(),
      inline: false,
      todayButton: new Date(),
      autoClose: true,
      dateFormat: 'dd.mm.yyyy',
      navTitles: {
        days: 'MM, <span>yyyy</span>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2',
      },
      // timepicker: true,
      // timeFormat: 'hh:ii AA',
      // onSelect: function onSelect(fd: string, date: any, inst: object): void {
      //   setTaskDeadline(date);
      // },
    });
  }
}
