import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  form: FormGroup;
  date = '';

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
      onSelect: function onSelect(
        formattedDate: string,
        date: Date | [],
        inst: object
      ): void {
        setDate(formattedDate);
        // this.date = formattedDate;
      },
    });
    const setDate = (formattedDate: string) => {
      this.date = formattedDate;
    };
  }
}
