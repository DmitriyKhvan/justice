import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { FileUploadService } from 'src/app/services/file-upload.service';

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
    closeSelectorOnDateSelect: false,
  };

  constructor(public fileUploadservice: FileUploadService) {}

  ngOnInit(): void {
    console.log('onInit(): SampleDatePickerReacticeForms');
    let d: Date = new Date();
    d.setDate(d.getDate() + 2);
    let model: IMyDateModel = {
      isRange: false,
      // singleDate: { jsDate: d },
      dateRange: null,
    };

    this.form = new FormGroup({
      numberLetter: new FormControl(null, Validators.required),
      numberCriminalCase: new FormControl(null, Validators.required),
      outDocDate: new FormControl(model, Validators.required),
      // criminalCasecDate: new FormControl(null, Validators.required),
    });
  }

  submit() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    console.log(this.form.value.numberLetter);
    console.log(this.form.value.outDocDate);
    console.log(this.form.value.criminalCasecDate);
  }

  logger(evt: any) {
    console.log(evt);
  }
}
