import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { datepickerSettings } from '../../settings';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  form!: FormGroup;
  submitted = false;
  submitSucces = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor(public fileUploadservice: FileUploadService) {}

  ngOnInit(): void {
    console.log('onInit(): SampleDatePickerReacticeForms');
    let d: Date = new Date();
    d.setDate(d.getDate() + 2);
    let model: IMyDateModel = {
      isRange: false,
      // singleDate: { jsDate: d },
      // dateRange: null,
    };

    this.form = new FormGroup({
      numberLetter: new FormControl(
        { value: null, disabled: this.submitted },
        // null,
        Validators.required
      ),
      numberCriminalCase: new FormControl(null, Validators.required),
      outDocDate: new FormControl(null, Validators.required),
      criminalCasecDate: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.form.get('numberLetter').disable();

    console.log('form', this.form);

    console.log('numberLetter', this.form.value.numberLetter);
    console.log('numberCriminalCase', this.form.value.numberCriminalCase);
    console.log('outDocDate', this.form.value.outDocDate.singleDate.jsDate);
    console.log(
      'criminalCasecDate',
      this.form.value.criminalCasecDate.singleDate.jsDate
    );
  }
}
