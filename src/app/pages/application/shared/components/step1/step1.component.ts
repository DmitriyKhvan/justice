import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  form!: FormGroup;
  submitted = false;

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
        setDate(date);
        // this.date = formattedDate;
      },
    });
    const setDate = (date: Date | []) => {
      this.form.patchValue({ outDocDate: date });
    };

    $('.criminalCasecDate').datepicker({
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
        setDate2(date);
        // this.date = formattedDate;
      },
    });
    const setDate2 = (date: Date | []) => {
      this.form.patchValue({ criminalCasecDate: date });
    };

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
