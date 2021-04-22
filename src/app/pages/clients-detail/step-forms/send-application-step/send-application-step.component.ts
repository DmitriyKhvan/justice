import { Component, OnInit } from '@angular/core';
import {FileUploadService} from '../../../../services/file-upload.service';
import {ClientsDetailComponent} from '../../clients-detail.component';
declare var $: any;
@Component({
  selector: 'app-send-application-step',
  templateUrl: './send-application-step.component.html',
  styleUrls: ['./send-application-step.component.scss']
})
export class SendApplicationStepComponent implements OnInit {

  constructor(public fileUploadService: FileUploadService, public clientDetail: ClientsDetailComponent) { }

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
