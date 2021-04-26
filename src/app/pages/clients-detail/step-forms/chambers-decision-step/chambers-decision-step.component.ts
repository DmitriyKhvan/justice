import { Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';
declare var $: any;
@Component({
  selector: 'app-chambers-decision-step',
  templateUrl: './chambers-decision-step.component.html',
  styleUrls: ['./chambers-decision-step.component.scss']
})
export class ChambersDecisionStepComponent implements OnInit {

  constructor(public mainService: MainService) { }

  ngOnInit(): void {
    $('#outDocDate').datepicker({
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

  logger(evt: any): void {
    console.log('1', evt);
  }
  logger2(evt: any): void {
    console.log('2', evt);
  }
}
