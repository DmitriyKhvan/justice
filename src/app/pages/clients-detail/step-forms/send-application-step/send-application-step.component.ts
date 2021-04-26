import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../../services/file-upload.service';
import { ClientsDetailComponent } from '../../clients-detail.component';
import {FormControl, FormGroup} from '@angular/forms';
import {MainService} from '../../../../services/main.service';
declare var $: any;
@Component({
  selector: 'app-send-application-step',
  templateUrl: './send-application-step.component.html',
  styleUrls: ['./send-application-step.component.scss'],
})
export class SendApplicationStepComponent implements OnInit {
  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Одобрить' },
    { id: 2, label: 'Отказать' },
    { id: 3, label: 'Пересмотреть' },
    { id: 4, label: 'Проверить' },
  ];

  constructor(
    public mainService: MainService,
    public fileUploadService: FileUploadService,
    public clientDetail: ClientsDetailComponent
  ) {}

  dateForm!: FormGroup;

  ngOnInit(): void {

    this.dateForm = new FormGroup({
      outDate: new FormControl(''),
      inDate: new FormControl(''),
    });
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

  firstDatePicker(evt: any): void {
    console.log(evt);
  }

  showForm(): void {
    console.log(this.dateForm);
  }

  setDatepickerVal(evt: any, formControlName: string): void {
    console.log(evt, formControlName);
  }

  setOutDateVal(evt: any, formControlName: string): void {
    console.log(evt, formControlName);
  }
  setInDateVal(evt: any, formControlName: string): void {
    console.log(evt, formControlName);
  }
}
