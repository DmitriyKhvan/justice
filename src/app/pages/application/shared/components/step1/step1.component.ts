import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IAngularMyDpOptions,
  IMyDateModel,
} from 'src/app/components/angular-mydatepicker/src/public-api';

declare var $: any;

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
    // other options are here...
  };

  myDateInit: boolean = true;
  model!: IMyDateModel;

  constructor() {}

  ngOnInit(): void {
    // $('.outDocDate').datepicker({
    //   // minDate: new Date(),
    //   inline: false,
    //   todayButton: new Date(),
    //   autoClose: true,
    //   dateFormat: 'dd.mm.yyyy',
    //   navTitles: {
    //     days: 'MM, <span>yyyy</span>',
    //     months: 'yyyy',
    //     years: 'yyyy1 - yyyy2',
    //   },
    //   // timepicker: true,
    //   // timeFormat: 'hh:ii AA',
    //   onSelect: function onSelect(
    //     formattedDate: string,
    //     date: Date | [],
    //     inst: object
    //   ): void {
    //     setDate(date);
    //     // this.date = formattedDate;
    //   },
    // });
    // const setDate = (date: Date | []) => {
    //   this.form.patchValue({ outDocDate: date });
    // };

    // $('.criminalCasecDate').datepicker({
    //   // minDate: new Date(),
    //   inline: false,
    //   todayButton: new Date(),
    //   autoClose: true,
    //   dateFormat: 'dd.mm.yyyy',
    //   navTitles: {
    //     days: 'MM, <span>yyyy</span>',
    //     months: 'yyyy',
    //     years: 'yyyy1 - yyyy2',
    //   },
    //   // timepicker: true,
    //   // timeFormat: 'hh:ii AA',
    //   onSelect: function onSelect(
    //     formattedDate: string,
    //     date: Date | [],
    //     inst: object
    //   ): void {
    //     setDate2(date);
    //     // this.date = formattedDate;
    //   },
    // });
    // const setDate2 = (date: Date | []) => {
    //   this.form.patchValue({ criminalCasecDate: date });
    // };

    if (this.myDateInit) {
      // Initialize to specific date (14.05.2019) with IMyDate object
      this.model = {
        isRange: false,
        singleDate: {
          date: {
            year: 2019,
            month: 5,
            day: 14,
          },
        },
      };
    } else {
      // Initialize to today with javascript date object
      this.model = { isRange: false, singleDate: { jsDate: new Date() } };
    }

    this.form = new FormGroup({
      numberLetter: new FormControl(null, [Validators.required]),
      outDocDate: new FormControl(null, Validators.required),
      criminalCasecDate: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    //this.submitted = true;

    console.log(this.form.value.numberLetter);
    console.log(this.form.value.outDocDate);
    console.log(this.form.value.criminalCasecDate);
  }
}
