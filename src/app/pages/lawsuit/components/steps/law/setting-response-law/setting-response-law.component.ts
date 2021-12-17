import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-setting-response-law',
  templateUrl: './setting-response-law.component.html',
  styleUrls: ['./setting-response-law.component.scss'],
})
export class SettingResponseLawComponent implements OnInit, OnDestroy {
  @Input() formData: any = null;
  @Input() actionId!: number;
  form!: FormGroup;
  submitted = false;
  conductLawDic = [
    { id: 1, label: 'Положительный' },
    { id: 2, label: 'Отрицательный' },
  ];

  actionDic = [
    { id: 1, label: 'Отложить' },
    { id: 2, label: 'Дело закрыто' },
    { id: 3, label: 'Новое обращение в суд' },
  ];

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  private lawTypeSupscription!: Subscription | undefined;
  private actionTypeSupscription!: Subscription | undefined;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    // let d: Date = new Date();
    // d.setDate(d.getDate() + 2);
    // let model: IMyDateModel = {
    //   isRange: false,
    //   // singleDate: { jsDate: d },
    //   // dateRange: null,
    // };

    if (this.formData) {
      let d2: Date = new Date(
        this.formData.data.suspendDate?.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model2: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d2 },
        // dateRange: null,
      };

      this.form = new FormGroup({
        conductLaw: new FormControl({
          value: this.formData.data.decision,
          disabled: true,
        }),
        caseNumber: new FormControl({
          value: this.formData.data.docNumber,
          disabled: true,
        }),
        // datesLaw: new FormArray([
        //   new FormControl({ value: '', disabled: true }),
        // ]),
        datesLaw: new FormArray([]),

        action: new FormControl({
          value: this.formData.data.action,
          disabled: true,
        }),
        deferTo: new FormControl({
          value: model2,
          disabled: true,
        }),

        additionalInfo: new FormControl({
          value: this.formData.data.addInfo,
          disabled: true,
        }),
      });

      this.formData.data.lawDatetime.forEach((date: any) => {
        let d1: Date = new Date(date.split('.').reverse().join('.'));

        // d.setDate(d.getDate() + 2);
        let model1: IMyDateModel = {
          isRange: false,
          singleDate: { jsDate: d1 },
          // dateRange: null,
        };

        this.addDateLawDisable(model1);
      });
    } else {
      this.form = new FormGroup({
        conductLaw: new FormControl(null, Validators.required),
        caseNumber: new FormControl(''),
        datesLaw: new FormArray([new FormControl('', Validators.required)]),

        action: new FormControl(null),
        deferTo: new FormControl(''),

        additionalInfo: new FormControl(null),
      });
    }

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
          additionalInfo: '',
          caseNumber: '',
          // conductLaw: null,
          datesLaw: [],
          deferTo: '',
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
          additionalInfo: '',
          caseNumber: '',
          // conductLaw: null,
          datesLaw: [],
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
    // this.addDateLaw();
    const dateLaw = this.datesLaw.controls[0];

    const action = this.form.get('action');
    const deferTo = this.form.get('deferTo');
    const additionalInfo = this.form.get('additionalInfo');

    const validators: ValidatorFn[] = [Validators.required];

    if (lawType === 1) {
      caseNumber?.setValidators([Validators.required]);
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

  addDateLawDisable(value: any) {
    const control = new FormControl({ value, disabled: true });
    this.datesLaw.push(control);
  }

  removeDateLaw(idx: number) {
    this.datesLaw.removeAt(idx);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    console.log('this.form.value.datesLaw', this.form.value.datesLaw);

    const preId = this.lawsuitService.getReqId(4)?.id;

    const lawDatetime = this.form.value.datesLaw?.map(
      (date: any) => date?.singleDate?.formatted
    );

    const data = {
      active: true,
      decision: this.form.value.conductLaw,
      docNumber: this.form.value.caseNumber,
      lawDatetime,
      files: this.fileUploadService.transformFilesData(),
      action: this.form.value.action,
      suspendDate: this.form.value.deferTo?.singleDate?.formatted,
      addInfo: this.form.value.additionalInfo,
      preId,
    };

    this.lawsuitService.apiFetch(data, 'law/add/answer').subscribe(
      (actions) => {
        this.submitted = false;
        this.alert.success('Форма оформлена');
      },
      (error) => {
        this.submitted = false;
        this.alert.danger('Форма не оформлена');
      }
    );
  }

  ngOnDestroy() {
    this.lawTypeSupscription?.unsubscribe();
    this.actionTypeSupscription?.unsubscribe();
  }
}
