import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import currencyTransform from 'src/app/utils/format-number';

@Component({
  selector: 'app-appeal-law-response',
  templateUrl: './appeal-law-response.component.html',
  styleUrls: ['./appeal-law-response.component.scss'],
})
export class AppealLawResponseComponent implements OnInit, OnDestroy {
  @Input() formData: any = null;
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  // caseNumber!: any;
  forceDecisionDate!: any;
  appealAgainstLawDesicion!: any;
  typeAppeal!: any;

  appealPrincipalAmount!: any;
  appealInterestAmount!: any;
  appealPenaltyAmount!: any;
  appealFineAmount!: any;
  appealStateDutyCourtCostsAmount!: any;
  appealClaimAmount!: any;
  additionalInfo!: any;

  actionType!: any;
  postponeUntil!: any;

  private resultDecisionSub!: Subscription | undefined;
  private appealLawDecisionSub!: Subscription | undefined;
  private actionTypeSub!: Subscription | undefined;

  private appealPrincipalAmountSub!: Subscription | undefined;
  private appealInterestAmountSub!: Subscription | undefined;
  private appealPenaltyAmountSub!: Subscription | undefined;
  private appealFineAmountSub!: Subscription | undefined;
  private appealStateDutyCourtCostsAmountSub!: Subscription | undefined;
  private appealClaimAmountSub!: Subscription | undefined;

  private dicSub!: Subscription;

  dictionaries!: any;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    private dicService: DictionariesService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    if (this.formTemplate) {
      this.action = {
        actionId: this.formTemplate.id,
      };

      const formTemplate = { value: '', disabled: true };
      const formTemplateNull = { value: null, disabled: true };

      this.formBuild(formTemplate, formTemplateNull);
    } else {
      this.formBuild();

      // this.caseNumber = this.form.get('caseNumber');
      this.forceDecisionDate = this.form.get('forceDecisionDate');
      this.appealAgainstLawDesicion = this.form.get('appealAgainstLawDesicion');

      this.typeAppeal = this.form.get('typeAppeal');
      this.appealPrincipalAmount = this.form.get('appealPrincipalAmount');
      this.appealInterestAmount = this.form.get('appealInterestAmount');
      this.appealPenaltyAmount = this.form.get('appealPenaltyAmount');
      this.appealFineAmount = this.form.get('appealFineAmount');
      this.appealStateDutyCourtCostsAmount = this.form.get(
        'appealStateDutyCourtCostsAmount'
      );
      this.appealClaimAmount = this.form.get('appealClaimAmount');

      this.additionalInfo = this.form.get('additionalInfo');

      // this.appealAddInfo = this.form.get('appealAddInfo');

      this.actionType = this.form.get('actionType');
      this.postponeUntil = this.form.get('postponeUntil');

      this.subToResultDecision();
      this.subToAppealLawDecision();
      this.subToActionType();

      this.appealPrincipalAmountSub = this.appealPrincipalAmount?.valueChanges.subscribe(
        (val: any) => {
          this.getTotalClaimAmount();

          this.form.patchValue(
            {
              appealPrincipalAmount: currencyTransform(val),
            },
            { emitEvent: false }
          );
        }
      );

      this.appealInterestAmountSub = this.appealInterestAmount?.valueChanges.subscribe(
        (val: any) => {
          this.getTotalClaimAmount();

          this.form.patchValue(
            {
              appealInterestAmount: currencyTransform(val),
            },
            { emitEvent: false }
          );
        }
      );

      this.appealPenaltyAmountSub = this.appealPenaltyAmount?.valueChanges.subscribe(
        (val: any) => {
          this.getTotalClaimAmount();

          this.form.patchValue(
            {
              appealPenaltyAmount: currencyTransform(val),
            },
            { emitEvent: false }
          );
        }
      );

      this.appealFineAmountSub = this.appealFineAmount?.valueChanges.subscribe(
        (val: any) => {
          this.getTotalClaimAmount();

          this.form.patchValue(
            {
              appealFineAmount: currencyTransform(val),
            },
            { emitEvent: false }
          );
        }
      );

      this.appealStateDutyCourtCostsAmountSub = this.appealStateDutyCourtCostsAmount?.valueChanges.subscribe(
        (val: any) => {
          this.getTotalClaimAmount();

          this.form.patchValue(
            {
              appealStateDutyCourtCostsAmount: currencyTransform(val),
            },
            { emitEvent: false }
          );
        }
      );

      this.appealClaimAmountSub = this.appealClaimAmount?.valueChanges.subscribe(
        (val: any) => {
          this.form.patchValue(
            {
              appealClaimAmount: currencyTransform(val),
            },
            { emitEvent: false }
          );
        }
      );
    }

    this.dicSub = this.dicService
      .getDicByActionId(this.action.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });
  }

  private formBuild(
    formTemplate: any = '',
    formTemplateNull: any = null
  ): void {
    const law = this.lawsuitService.getReqId(5);
    this.form = new FormGroup({
      caseNumber: new FormControl({ value: law?.docNumber, disabled: true }),
      decisionDate: new FormControl(formTemplate, Validators.required),
      decisionResult: new FormControl(null, Validators.required),
      forceDecisionDate: new FormControl(formTemplate), // Дата вступления решения в силу

      appealAgainstLawDesicion: new FormControl(null), // Обжаловать решение суда
      typeAppeal: new FormControl(formTemplate),

      appealPrincipalAmount: new FormControl(formTemplate),
      appealInterestAmount: new FormControl(formTemplate),
      appealPenaltyAmount: new FormControl(formTemplate),
      appealFineAmount: new FormControl(formTemplate),
      appealStateDutyCourtCostsAmount: new FormControl(formTemplate),
      appealClaimAmount: new FormControl(formTemplate),

      additionalInfo: new FormControl(formTemplate),
      actionType: new FormControl(null),
      postponeUntil: new FormControl(formTemplate),
      lawId: new FormControl({ value: law?.id, disabled: true }),
    });
  }

  private subToActionType(): void {
    this.actionTypeSub = this.form
      .get('actionType')
      ?.valueChanges.subscribe((value) => {
        this.form.patchValue({
          // decisionDate: null,
          // decisionResult: null,
          // forceDecisionDate: null,
          // appealAgainstLawDesicion: null,
          // typeAppeal: null,
          // appealPrincipalAmount: null,
          // appealInterestAmount: null,
          // appealPenaltyAmount: null,
          // appealFineAmount: null,
          // appealStateDutyCourtCostsAmount: null,
          // appealClaimAmount: null,
          // additionalInfo: '',

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
        this.form.patchValue({
          // decisionDate: null,
          // decisionResult: null,
          // forceDecisionDate: null,
          // appealAgainstLawDesicion: null,
          typeAppeal: null,
          appealPrincipalAmount: '',
          appealInterestAmount: '',
          appealPenaltyAmount: '',
          appealFineAmount: '',
          appealStateDutyCourtCostsAmount: '',
          appealClaimAmount: '',
          // additionalInfo: '',
          // appealAddInfo: '',

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
        this.form.patchValue({
          // decisionDate: null,
          // decisionResult: null,
          forceDecisionDate: '',
          appealAgainstLawDesicion: null,
          typeAppeal: null,
          appealPrincipalAmount: '',
          appealInterestAmount: '',
          appealPenaltyAmount: '',
          appealFineAmount: '',
          appealStateDutyCourtCostsAmount: '',
          appealClaimAmount: '',
          // additionalInfo: '',
          // appealAddInfo: '',

          actionType: null,
          postponeUntil: '',
        });

        this.toggleValidatorsDecisionResult(value);
      });
  }

  private toggleValidatorsActionType(actionType: any) {
    if (actionType === 49) {
      this.postponeUntil?.setValidators([Validators.required]);
    } else if (actionType === 48 || actionType === 50) {
      this.postponeUntil?.clearValidators();
    }
    this.postponeUntil?.updateValueAndValidity();
  }

  private toggleValidatorsAppealLawDecision(appealLawDecision: any) {
    if (appealLawDecision === true) {
      this.typeAppeal?.setValidators([Validators.required]);
      this.appealPrincipalAmount?.setValidators([Validators.required]);
      this.appealInterestAmount?.setValidators([Validators.required]);
      this.appealPenaltyAmount?.setValidators([Validators.required]);
      this.appealFineAmount?.setValidators([Validators.required]);
      this.appealStateDutyCourtCostsAmount?.setValidators([
        Validators.required,
      ]);
      this.appealClaimAmount?.setValidators([Validators.required]);

      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
    } else if (appealLawDecision === false) {
      this.actionType?.setValidators([Validators.required]);

      this.typeAppeal?.clearValidators();
      this.appealPrincipalAmount?.clearValidators();
      this.appealInterestAmount?.clearValidators();
      this.appealPenaltyAmount?.clearValidators();
      this.appealFineAmount?.clearValidators();
      this.appealStateDutyCourtCostsAmount?.clearValidators();
      this.appealClaimAmount?.clearValidators();
    }

    this.typeAppeal?.updateValueAndValidity();
    this.appealPrincipalAmount?.updateValueAndValidity();
    this.appealInterestAmount?.updateValueAndValidity();
    this.appealPenaltyAmount?.updateValueAndValidity();
    this.appealFineAmount?.updateValueAndValidity();
    this.appealStateDutyCourtCostsAmount?.updateValueAndValidity();
    this.appealClaimAmount?.updateValueAndValidity();
    this.actionType?.updateValueAndValidity();
    this.postponeUntil?.updateValueAndValidity();
  }

  private toggleValidatorsDecisionResult(desicionResult: any): void {
    if (desicionResult === 35 || desicionResult === 36) {
      this.appealAgainstLawDesicion?.setValidators([Validators.required]);
      this.forceDecisionDate?.clearValidators();
      this.typeAppeal?.clearValidators();
      this.appealPrincipalAmount?.clearValidators();
      this.appealInterestAmount?.clearValidators();
      this.appealPenaltyAmount?.clearValidators();
      this.appealFineAmount?.clearValidators();
      this.appealStateDutyCourtCostsAmount?.clearValidators();
      this.appealClaimAmount?.clearValidators();

      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
    } else if (desicionResult === 34) {
      this.forceDecisionDate?.setValidators([Validators.required]);
      this.appealAgainstLawDesicion?.clearValidators();
      this.typeAppeal?.clearValidators();
      this.appealPrincipalAmount?.clearValidators();
      this.appealInterestAmount?.clearValidators();
      this.appealPenaltyAmount?.clearValidators();
      this.appealFineAmount?.clearValidators();
      this.appealStateDutyCourtCostsAmount?.clearValidators();
      this.appealClaimAmount?.clearValidators();
      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
    }

    this.forceDecisionDate?.updateValueAndValidity();
    this.appealAgainstLawDesicion?.updateValueAndValidity();
    this.typeAppeal?.updateValueAndValidity();
    this.appealPrincipalAmount?.updateValueAndValidity();
    this.appealInterestAmount?.updateValueAndValidity();
    this.appealPenaltyAmount?.updateValueAndValidity();
    this.appealFineAmount?.updateValueAndValidity();
    this.appealStateDutyCourtCostsAmount?.updateValueAndValidity();
    this.appealClaimAmount?.updateValueAndValidity();
    this.actionType?.updateValueAndValidity();
    this.postponeUntil?.updateValueAndValidity();
  }

  getTotalClaimAmount() {
    let appealClaimAmount =
      +Number(
        this.form.get('appealPrincipalAmount')?.value.replace(/[^0-9]/gim, '')
      ) +
      +Number(
        this.form.get('appealInterestAmount')?.value.replace(/[^0-9]/gim, '')
      ) +
      +Number(
        this.form.get('appealPenaltyAmount')?.value.replace(/[^0-9]/gim, '')
      ) +
      +Number(
        this.form.get('appealFineAmount')?.value.replace(/[^0-9]/gim, '')
      ) +
      Number(
        this.form
          .get('appealStateDutyCourtCostsAmount')
          ?.value.replace(/[^0-9]/gim, '')
      );

    this.form.patchValue(
      {
        appealClaimAmount: currencyTransform(String(appealClaimAmount)),
      },
      { emitEvent: false }
    );
  }

  submit(actionId: number) {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      active: true,
      decisionDate: this.form.value.decisionDate.singleDate.formatted,
      decisionResult: this.form.value.decisionResult,
      appeal: this.form.value.appealAgainstLawDesicion, //false
      files: this.fileUploadService.transformFilesData(),
      action: this.form.value.actionType,
      addInfo: this.form.value.additionalInfo,
      suspendDate: this.form.value.postponeUntil?.singleDate?.formatted,
      appealKind: this.form.value.typeAppeal,

      appealPrincipalAmount: this.form.value.appealPrincipalAmount,
      appealInterestAmount: this.form.value.appealInterestAmount,
      appealPenaltyAmount: this.form.value.appealPenaltyAmount,
      appealFineAmount: this.form.value.appealFineAmount,
      appealStateDutyCourtCostsAmount: this.form.value
        .appealStateDutyCourtCostsAmount,
      appealClaimAmount: this.form.value.appealClaimAmount,
      decisionBeginDate: this.form.value.forceDecisionDate?.singleDate
        ?.formatted,
      defendantAppeal: true,
      lawId: this.form.controls.lawId.value,
    };

    this.lawsuitService
      .apiFetch(data, 'law/add/appealResponse', actionId)
      .subscribe(
        (action) => {
          this.alert.success('Форма оформлена');
        },
        (error) => {
          // this.alert.danger('Форма не оформлена');
        },
        () => {
          this.submitted = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.dicSub?.unsubscribe();
    this.resultDecisionSub?.unsubscribe();
    this.appealLawDecisionSub?.unsubscribe();
    this.actionTypeSub?.unsubscribe();
    this.appealPrincipalAmountSub?.unsubscribe();
    this.appealInterestAmountSub?.unsubscribe();
    this.appealPenaltyAmountSub?.unsubscribe();
    this.appealFineAmountSub?.unsubscribe();
    this.appealStateDutyCourtCostsAmountSub?.unsubscribe();
    this.appealClaimAmountSub?.unsubscribe();
  }
}
