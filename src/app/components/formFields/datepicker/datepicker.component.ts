import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-datepicker',
  template: `
    <div class="input-field">
      <div class="input-field__title">{{ title }}</div>
      <label class="input-field__label">
        <input type="text" [class]="field" readonly />
        <i class="icon-calendar"></i>
      </label>
    </div>
  `,
  styles: [],
})
export class DatepickerComponent implements OnInit {
  @Input() title: any;
  @Input() field: any;

  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    $('.' + $(this)[0].field).datepicker({
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
      onSelect: function onSelect(fd: string, date: any, inst: object): void {
        selected(date);
      },
    });
    const selected = (pld: any) => {
      const data = {
        field: this.field,
        date: pld,
      };
      this.onselect.emit(data);
    };
  }
}
