import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { throwError } from 'rxjs';
import { CustomValidators } from 'src/app/custom.validators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Step1Service } from '../../services/step1.service';
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

  constructor(
    public fileUploadservice: FileUploadService,
    private stepService: Step1Service,
    public auth: AuthService,
    private alert: AlertService
  ) {}

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
      numberCriminalCase: new FormControl(null, [
        Validators.required,
        // Validators.maxLength(6),
        // CustomValidators.uppercaseText,
      ]),
      outDocDate: new FormControl(null, Validators.required),
      criminalCasecDate: new FormControl(null, Validators.required),
    });
  }

  submit(): any {
    if (this.form.invalid) {
      return;
    }
    // this.submitted = true;

    // this.form.get('numberLetter').disable();

    console.log('form', this.form);

    this.stepService.submit().subscribe(
      () => {
        debugger;
        this.alert.success('Форма оформлена');
      },
      (error) => {
        console.log(error);
        this.submitted = false;
        this.alert.danger('Форма не оформлена');
      }
    );
  }
}
