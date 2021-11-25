import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-setting-response-law',
  templateUrl: './setting-response-law.component.html',
  styleUrls: ['./setting-response-law.component.scss'],
})
export class SettingResponseLawComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  options = [
    { id: 1, label: 'Положительный' },
    { id: 2, label: 'Отрицательный' },
  ];

  options2 = [
    { id: 1, label: 'Отложить' },
    { id: 2, label: 'Дело закрыто' },
    { id: 3, label: 'Новое обращение в суд' },
  ];

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  private lawTypeSupscription!: Subscription | undefined;
  private actionTypeSupscription!: Subscription | undefined;

  constructor(
    private alert: AlertService,
    private lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    let d: Date = new Date();
    d.setDate(d.getDate() + 2);
    let model: IMyDateModel = {
      isRange: false,
      // singleDate: { jsDate: d },
      // dateRange: null,
    };
    this.form = new FormGroup({
      conductLaw: new FormControl(null, Validators.required),
      caseNumber: new FormControl(null),
      datesLaw: new FormArray([new FormControl(null)]),

      action: new FormControl(null),
      deferTo: new FormControl(null),

      additionalInfo: new FormControl(null),
    });

    this.subscribeToLawType();
    this.subscribeToActionType();
  }

  get datesLaw() {
    return this.form.get('datesLaw') as FormArray;
  }

  private subscribeToActionType(): void {
    this.actionTypeSupscription = this.form
      .get('action')
      ?.valueChanges.subscribe((value) => {
        this.form.patchValue({
          // action: null,
          additionalInfo: null,
          caseNumber: null,
          // conductLaw: null,
          datesLaw: [null],
          deferTo: null,
        });
        this.toggleValidatorsAction(value);
      });
  }

  private subscribeToLawType(): void {
    this.lawTypeSupscription = this.form
      .get('conductLaw')
      ?.valueChanges.subscribe((value) => {
        /** reset data form */
        this.form.patchValue({
          action: null,
          additionalInfo: null,
          caseNumber: null,
          // conductLaw: null,
          datesLaw: [null],
          deferTo: null,
        });
        this.toggleValidatorsLaw(value);
      });
  }

  private toggleValidatorsAction(actionType: any): void {
    const deferTo = this.form.get('deferTo');
    const additionalInfo = this.form.get('additionalInfo');
    const validators: ValidatorFn[] = [Validators.required];

    if (actionType === 1) {
      deferTo?.setValidators(validators);
      additionalInfo?.setValidators(validators);
    } else if (actionType === 2 || actionType === 3) {
      deferTo?.clearValidators();
    }

    deferTo?.updateValueAndValidity();
    additionalInfo?.updateValueAndValidity();
  }

  private toggleValidatorsLaw(lawType: any): void {
    const caseNumber = this.form.get('caseNumber');
    const dateLaw = this.datesLaw.controls[0];

    const action = this.form.get('action');
    const deferTo = this.form.get('deferTo');
    const additionalInfo = this.form.get('additionalInfo');

    const validators: ValidatorFn[] = [Validators.required];

    if (lawType === 1) {
      caseNumber?.setValidators([
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]);
      dateLaw?.setValidators(validators);

      action?.clearValidators();
      deferTo?.clearValidators();
      additionalInfo?.clearValidators();
    } else if (lawType === 2) {
      action?.setValidators(validators);
      deferTo?.setValidators(validators);
      additionalInfo?.setValidators(validators);

      caseNumber?.clearValidators();
      dateLaw.clearValidators();
    }

    caseNumber?.updateValueAndValidity();
    dateLaw?.updateValueAndValidity();

    action?.updateValueAndValidity();
    deferTo?.updateValueAndValidity();
    additionalInfo?.updateValueAndValidity();
    // setTimeout(() => {
    //   this.form.reset({ ...this.form.value, ...this.defaultFormData });
    // }, 0);

    // this.form.reset({ ...this.form.value, ...this.defaultFormData });
  }

  addDateLaw() {
    const control = new FormControl(null, [Validators.required]);
    this.datesLaw.push(control);
  }

  removeDateLaw(idx: number) {
    this.datesLaw.removeAt(idx);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

  ngOnDestroy() {
    this.lawTypeSupscription?.unsubscribe();
    this.actionTypeSupscription?.unsubscribe();
  }
}
