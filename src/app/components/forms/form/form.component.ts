import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.outDocDate').datepicker({
      minDate: new Date(),
      inline: true,
      navTitles: {
        days: 'MM <span>yyyy</span>',
      },
      classes: 'sidebar-calendar',
      // todayButton: new Date(),
      // autoClose: true,
      // dateFormat: 'M yyyy',
      // // timepicker: true,
      // // timeFormat: 'hh:ii AA',
      // // onSelect: function onSelect(fd: string, date: any, inst: object): void {
      // //   setTaskDeadline(date);
      // // },
      // prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
      // nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>'
    });
  }

}
