import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-appeal-law-response',
  templateUrl: './appeal-law-response.component.html',
  styleUrls: ['./appeal-law-response.component.scss'],
})
export class AppealLawResponseComponent implements OnInit, OnDestroy {
  @Input() formData: any = null;
  @Input() actionId!: number;
  form!: FormGroup;
  submitted = false;

  resultDesicion = [
    { value: 1, label: 'Не удовлетворено' },
    { value: 2, label: 'Удовлетворено' },
  ];

  lawDesicion = [
    { value: true, label: 'Да' },
    { value: false, label: 'Нет' },
  ];

  appealType = [{ value: 1, label: 'Апелляция' }];

  actionTypeDic = [
    { value: 1, label: 'Продолжить дело' },
    { value: 2, label: 'Отложить на время' },
    { value: 3, label: 'Закрыть дело' },
  ];

  // caseNumber!: any;
  forceDecisionDate!: any;
  appealAgainstLawDesicion!: any;
  typeAppeal!: any;
  totalAmount!: any;
  principalAmount!: any;
  forfeitAmount!: any;
  stateDutyAmount!: any;
  additionalInfo!: any;

  appealAddInfo!: any;

  actionType!: any;
  postponeUntil!: any;

  private resultDecisionSub!: Subscription | undefined;
  private appealLawDecisionSub!: Subscription | undefined;
  private actionTypeSub!: Subscription | undefined;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    if (this.formData) {
      let d1: Date = new Date(
        this.formData.data.decisionDate.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model1: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d1 },
        // dateRange: null,
      };

      let d2: Date = new Date(
        this.formData.data.decisionBeginDate?.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model2: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d2 },
        // dateRange: null,
      };

      let d3: Date = new Date(
        this.formData.data.suspendDate?.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model3: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d3 },
        // dateRange: null,
      };

      this.form = new FormGroup({
        caseNumber: new FormControl({
          value: this.formData.data.docNumber,
          disabled: true,
        }),
        decisionDate: new FormControl({
          value: model1,
          disabled: true,
        }),
        decisionResult: new FormControl({
          value: this.formData.data.decisionResult,
          disabled: true,
        }),
        forceDecisionDate: new FormControl({
          value: model2,
          disabled: true,
        }), // Дата вступления решения в силу

        appealAgainstLawDesicion: new FormControl({
          value: this.formData.data.appeal,
          disabled: true,
        }), // Обжаловать решение суда
        typeAppeal: new FormControl({
          value: this.formData.data.appealKind,
          disabled: true,
        }),
        totalAmount: new FormControl({
          value: this.formData.data.appealTotalAmount,
          disabled: true,
        }),
        principalAmount: new FormControl({
          value: this.formData.data.appealMainDebt,
          disabled: true,
        }),
        forfeitAmount: new FormControl({
          value: this.formData.data.appealPenaltySum,
          disabled: true,
        }),
        stateDutyAmount: new FormControl({
          value: this.formData.data.appealOtherAmount,
          disabled: true,
        }),
        additionalInfo: new FormControl({
          value: this.formData.data.addInfo,
          disabled: true,
        }),

        appealAddInfo: new FormControl({
          value: this.formData.data.appealAddInfo,
          disabled: true,
        }),

        actionType: new FormControl({
          value: this.formData.data.action,
          disabled: true,
        }),
        postponeUntil: new FormControl({
          value: model3,
          disabled: true,
        }),
        lawId: new FormControl({
          value: this.formData.data.lawId,
          disabled: true,
        }),
      });
    } else {
      const law = this.lawsuitService.getReqId(5);
      this.form = new FormGroup({
        caseNumber: new FormControl({ value: law?.docNumber, disabled: true }),
        decisionDate: new FormControl('', Validators.required),
        decisionResult: new FormControl(null, Validators.required),
        forceDecisionDate: new FormControl(''), // Дата вступления решения в силу

        appealAgainstLawDesicion: new FormControl(null), // Обжаловать решение суда
        typeAppeal: new FormControl(null),
        totalAmount: new FormControl(''),
        principalAmount: new FormControl(''),
        forfeitAmount: new FormControl(''),
        stateDutyAmount: new FormControl(''),
        additionalInfo: new FormControl(''),

        appealAddInfo: new FormControl(''),

        actionType: new FormControl(null),
        postponeUntil: new FormControl(''),
        lawId: new FormControl({ value: law?.id, disabled: true }),
      });
    }

    // this.caseNumber = this.form.get('caseNumber');
    this.forceDecisionDate = this.form.get('forceDecisionDate');
    this.appealAgainstLawDesicion = this.form.get('appealAgainstLawDesicion');

    this.typeAppeal = this.form.get('typeAppeal');
    this.totalAmount = this.form.get('totalAmount');
    this.principalAmount = this.form.get('principalAmount');
    this.forfeitAmount = this.form.get('forfeitAmount');
    this.stateDutyAmount = this.form.get('stateDutyAmount');
    this.additionalInfo = this.form.get('additionalInfo');

    this.appealAddInfo = this.form.get('appealAddInfo');

    this.actionType = this.form.get('actionType');
    this.postponeUntil = this.form.get('postponeUntil');

    this.subToResultDecision();
    this.subToAppealLawDecision();
    this.subToActionType();
  }

  private subToActionType(): void {
    this.actionTypeSub = this.form
      .get('actionType')
      ?.valueChanges.subscribe((value) => {
        this.fileUploadService.UploaderFiles.next([]);
        this.fileUploadService.allUploadFiles = [];
        this.form.patchValue({
          // decisionDate: null,
          // decisionResult: null,
          // forceDecisionDate: null,
          // appealAgainstLawDesicion: null,
          // typeAppeal: null,
          // totalAmount: null,
          // principalAmount: null,
          // forfeitAmount: null,
          // stateDutyAmount: null,
          additionalInfo: '',

          // actionType: null,
          postponeUntil: '',
        });

        this.toggleValidatorsActionType(value);
      });
  }

  private subToAppealLawDecision(): void {
    this.appealLawDecisionSub = this.form
      .get('appealAgainstLawDesicion')
      ?.valueChanges.subscribe((value) => {
        this.fileUploadService.UploaderFiles.next([]);
        this.fileUploadService.allUploadFiles = [];
        this.form.patchValue({
          // decisionDate: null,
          // decisionResult: null,
          // forceDecisionDate: null,
          // appealAgainstLawDesicion: null,
          typeAppeal: null,
          totalAmount: '',
          principalAmount: '',
          forfeitAmount: '',
          stateDutyAmount: '',
          additionalInfo: '',
          appealAddInfo: '',

          actionType: null,
          postponeUntil: '',
        });

        this.toggleValidatorsAppealLawDecision(value);
      });
  }

  private subToResultDecision(): void {
    this.resultDecisionSub = this.form
      .get('decisionResult')
      ?.valueChanges.subscribe((value) => {
        this.fileUploadService.UploaderFiles.next([]);
        this.fileUploadService.allUploadFiles = [];
        this.form.patchValue({
          // decisionDate: null,
          // decisionResult: null,
          forceDecisionDate: '',
          appealAgainstLawDesicion: null,
          typeAppeal: null,
          totalAmount: '',
          principalAmount: '',
          forfeitAmount: '',
          stateDutyAmount: '',
          additionalInfo: '',
          appealAddInfo: '',

          actionType: null,
          postponeUntil: '',
        });

        this.toggleValidatorsDecisionResult(value);
      });
  }

  private toggleValidatorsActionType(actionType: any) {
    if (actionType === 2) {
      this.postponeUntil?.setValidators([Validators.required]);

      this.additionalInfo?.clearValidators();
    } else if (actionType === 3) {
      this.additionalInfo?.setValidators([Validators.required]);

      this.postponeUntil?.clearValidators();
    }

    this.postponeUntil?.updateValueAndValidity();
    this.additionalInfo?.updateValueAndValidity();
  }

  private toggleValidatorsAppealLawDecision(appealLawDecision: any) {
    if (appealLawDecision === true) {
      this.typeAppeal?.setValidators([Validators.required]);
      this.totalAmount?.setValidators([Validators.required]);
      this.principalAmount?.setValidators([Validators.required]);
      this.forfeitAmount?.setValidators([Validators.required]);
      this.stateDutyAmount?.setValidators([Validators.required]);
      // this.additionalInfo?.setValidators([Validators.required]);
      this.appealAddInfo?.setValidators([Validators.required]);

      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
      this.additionalInfo?.clearValidators();
    } else if (appealLawDecision === false) {
      this.actionType?.setValidators([Validators.required]);
      this.postponeUntil?.setValidators([Validators.required]);

      this.typeAppeal?.clearValidators();
      this.totalAmount?.clearValidators();
      this.principalAmount?.clearValidators();
      this.forfeitAmount?.clearValidators();
      this.stateDutyAmount?.clearValidators();
      this.additionalInfo?.clearValidators();
      this.appealAddInfo?.clearValidators();
    }

    this.typeAppeal?.updateValueAndValidity();
    this.totalAmount?.updateValueAndValidity();
    this.principalAmount?.updateValueAndValidity();
    this.forfeitAmount?.updateValueAndValidity();
    this.stateDutyAmount?.updateValueAndValidity();
    this.additionalInfo?.updateValueAndValidity();
    this.appealAddInfo?.updateValueAndValidity();

    this.actionType?.updateValueAndValidity();
    this.postponeUntil?.updateValueAndValidity();
  }

  private toggleValidatorsDecisionResult(desicionResult: any): void {
    if (desicionResult === 1) {
      this.appealAgainstLawDesicion?.setValidators([Validators.required]);

      // this.caseNumber?.clearValidators();
      this.forceDecisionDate?.clearValidators();
      // this.appealAgainstLawDesicion?.clearValidators();
      this.typeAppeal?.clearValidators();
      this.totalAmount?.clearValidators();
      this.principalAmount?.clearValidators();
      this.forfeitAmount?.clearValidators();
      this.stateDutyAmount?.clearValidators();
      this.additionalInfo?.clearValidators();
      this.appealAddInfo?.clearValidators();

      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
    } else if (desicionResult === 2) {
      this.forceDecisionDate?.setValidators([Validators.required]);

      // this.caseNumber?.clearValidators();
      // this.forceDecisionDate?.clearValidators();
      this.appealAgainstLawDesicion?.clearValidators();
      this.typeAppeal?.clearValidators();
      this.totalAmount?.clearValidators();
      this.principalAmount?.clearValidators();
      this.forfeitAmount?.clearValidators();
      this.stateDutyAmount?.clearValidators();
      this.additionalInfo?.clearValidators();
      this.appealAddInfo?.clearValidators();
      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
    }

    // this.caseNumber?.updateValueAndValidity();
    this.forceDecisionDate?.updateValueAndValidity();
    this.appealAgainstLawDesicion?.updateValueAndValidity();
    this.typeAppeal?.updateValueAndValidity();
    this.totalAmount?.updateValueAndValidity();
    this.principalAmount?.updateValueAndValidity();
    this.forfeitAmount?.updateValueAndValidity();
    this.stateDutyAmount?.updateValueAndValidity();
    this.additionalInfo?.updateValueAndValidity();
    this.appealAddInfo?.updateValueAndValidity();

    this.actionType?.updateValueAndValidity();
    this.postponeUntil?.updateValueAndValidity();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    // console.log('form', this.form.value.forceDecisionDate.singleDate.formatted);

    this.submitted = true;

    const data = {
      active: true,
      decisionDate: this.form.value.decisionDate.singleDate.formatted,
      decisionResult: this.form.value.decisionResult,
      appeal: this.form.value.appealAgainstLawDesicion, //false
      files:
        this.form.value.actionType === 3
          ? this.fileUploadService.transformFilesData()
          : [],
      action: this.form.value.actionType,
      addInfo: this.form.value.additionalInfo,
      suspendDate: this.form.value.postponeUntil?.singleDate?.formatted,
      appealKind: this.form.value.typeAppeal,
      appealTotalAmount: this.form.value.totalAmount,
      appealMainDebt: this.form.value.principalAmount,
      appealPenaltySum: this.form.value.forfeitAmount,
      appealOtherAmount: this.form.value.stateDutyAmount,
      appealFiles: this.form.value.appealAgainstLawDesicion
        ? this.fileUploadService.transformFilesData()
        : [],
      appealAddInfo: this.form.value.appealAddInfo,
      decisionBeginDate: this.form.value.forceDecisionDate?.singleDate
        ?.formatted,
      defendantAppeal: true,
      lawId: this.form.controls.lawId.value,
    };

    this.lawsuitService.apiFetch(data, 'law/add/appealResponse').subscribe(
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

  ngOnDestroy(): void {
    this.resultDecisionSub?.unsubscribe();
    this.appealLawDecisionSub?.unsubscribe();
    this.actionTypeSub?.unsubscribe();
  }
}
