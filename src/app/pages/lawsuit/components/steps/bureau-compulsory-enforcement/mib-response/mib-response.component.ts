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
  selector: 'app-mib-response',
  templateUrl: './mib-response.component.html',
  styleUrls: ['./mib-response.component.scss'],
})
export class MibResponseComponent implements OnInit, OnDestroy {
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;
  actionDic: any[] = [];

  appeal!: any;
  actionType!: any;

  appealPrincipalAmount!: any;
  appealInterestAmount!: any;
  appealPenaltyAmount!: any;
  appealFineAmount!: any;
  appealStateDutyCourtCostsAmount!: any;
  appealClaimAmount!: any;
  addInfo!: any;

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

      this.subToAppealLawDecision();
      this.subToActionType();
    } else {
      this.formBuild();

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
    this.form = new FormGroup({
      type: new FormControl(formTemplateNull, Validators.required),
      inDocNumber: new FormControl(formTemplate, Validators.required),
      inDocDate: new FormControl(formTemplate, Validators.required),
      decisionResult: new FormControl(null, Validators.required),

      appeal: new FormControl(null), // Обжаловать решение суда
      actionType: new FormControl(null),

      appealPrincipalAmount: new FormControl(formTemplate),
      appealInterestAmount: new FormControl(formTemplate),
      appealPenaltyAmount: new FormControl(formTemplate),
      appealFineAmount: new FormControl(formTemplate),
      appealStateDutyCourtCostsAmount: new FormControl(formTemplate),
      appealClaimAmount: new FormControl(formTemplate),

      addInfo: new FormControl(formTemplate),
    });

    this.appeal = this.form.get('appeal');
    this.appealPrincipalAmount = this.form.get('appealPrincipalAmount');
    this.appealInterestAmount = this.form.get('appealInterestAmount');
    this.appealPenaltyAmount = this.form.get('appealPenaltyAmount');
    this.appealFineAmount = this.form.get('appealFineAmount');
    this.appealStateDutyCourtCostsAmount = this.form.get(
      'appealStateDutyCourtCostsAmount'
    );
    this.appealClaimAmount = this.form.get('appealClaimAmount');
    this.addInfo = this.form.get('addInfo');
    this.actionType = this.form.get('actionType');
  }

  //!!!!!!!!!!
  private subToActionType(): void {
    this.actionTypeSub = this.actionType?.valueChanges.subscribe(
      (value: any) => {
        this.form.patchValue({
          // decisionResult: null,
          // appeal: null,
          // appealPrincipalAmount: null,
          // appealInterestAmount: null,
          // appealPenaltyAmount: null,
          // appealFineAmount: null,
          // appealStateDutyCourtCostsAmount: null,
          // appealClaimAmount: null,
          // addInfo: '',
          // actionType: null,
        });

        this.toggleValidatorsActionType(value);
      }
    );
  }

  private subToAppealLawDecision(): void {
    this.appealLawDecisionSub = this.appeal?.valueChanges.subscribe(
      (value: any) => {
        this.form.patchValue({
          // decisionResult: null,
          // appeal: null,
          actionType: null,
          appealPrincipalAmount: '',
          appealInterestAmount: '',
          appealPenaltyAmount: '',
          appealFineAmount: '',
          appealStateDutyCourtCostsAmount: '',
          appealClaimAmount: '',
          // appealAddInfo: '',
        });

        this.toggleValidatorsAppealLawDecision(value);
      }
    );
  }

  private subToResultDecision(): void {
    this.resultDecisionSub = this.form
      .get('decisionResult')
      ?.valueChanges.subscribe((value) => {
        this.form.patchValue({
          // decisionResult: null,
          appeal: null,
          actionType: null,

          appealPrincipalAmount: '',
          appealInterestAmount: '',
          appealPenaltyAmount: '',
          appealFineAmount: '',
          appealStateDutyCourtCostsAmount: '',
          appealClaimAmount: '',
          // appealAddInfo: '',
        });

        this.toggleValidatorsDecisionResult(value);
      });
  }

  private toggleValidatorsActionType(actionType: any) {
    if (actionType === 158 || actionType === 159) {
      this.appealPrincipalAmount?.setValidators([Validators.required]);
      this.appealInterestAmount?.setValidators([Validators.required]);
      this.appealPenaltyAmount?.setValidators([Validators.required]);
      this.appealFineAmount?.setValidators([Validators.required]);
      this.appealStateDutyCourtCostsAmount?.setValidators([
        Validators.required,
      ]);
      this.appealClaimAmount?.setValidators([Validators.required]);
      // this.actionType?.clearValidators();
    } else if (actionType === 160) {
      // this.actionType?.setValidators([Validators.required]);
      this.appealPrincipalAmount?.clearValidators();
      this.appealInterestAmount?.clearValidators();
      this.appealPenaltyAmount?.clearValidators();
      this.appealFineAmount?.clearValidators();
      this.appealStateDutyCourtCostsAmount?.clearValidators();
      this.appealClaimAmount?.clearValidators();
    }
    this.appealPrincipalAmount?.updateValueAndValidity();
    this.appealInterestAmount?.updateValueAndValidity();
    this.appealPenaltyAmount?.updateValueAndValidity();
    this.appealFineAmount?.updateValueAndValidity();
    this.appealStateDutyCourtCostsAmount?.updateValueAndValidity();
    this.appealClaimAmount?.updateValueAndValidity();
    // this.actionType?.updateValueAndValidity();
  }

  private toggleValidatorsAppealLawDecision(appealLawDecision: any) {
    console.log('appealLawDecision', appealLawDecision);

    if (appealLawDecision === true) {
      this.actionDic = this.dictionaries.mibAppealYes;
      this.actionType?.setValidators([Validators.required]);
      this.actionType?.updateValueAndValidity();
    } else if (appealLawDecision === false) {
      this.actionDic = this.dictionaries.mibAppealNo;
      this.actionType?.setValidators([Validators.required]);

      this.appealPrincipalAmount?.clearValidators();
      this.appealInterestAmount?.clearValidators();
      this.appealPenaltyAmount?.clearValidators();
      this.appealFineAmount?.clearValidators();
      this.appealStateDutyCourtCostsAmount?.clearValidators();
      this.appealClaimAmount?.clearValidators();

      this.actionType?.updateValueAndValidity();
      this.appealPrincipalAmount?.updateValueAndValidity();
      this.appealInterestAmount?.updateValueAndValidity();
      this.appealPenaltyAmount?.updateValueAndValidity();
      this.appealFineAmount?.updateValueAndValidity();
      this.appealStateDutyCourtCostsAmount?.updateValueAndValidity();
      this.appealClaimAmount?.updateValueAndValidity();
    }

    // if (appealLawDecision === true) {
    //   this.appealPrincipalAmount?.setValidators([Validators.required]);
    //   this.appealInterestAmount?.setValidators([Validators.required]);
    //   this.appealPenaltyAmount?.setValidators([Validators.required]);
    //   this.appealFineAmount?.setValidators([Validators.required]);
    //   this.appealStateDutyCourtCostsAmount?.setValidators([
    //     Validators.required,
    //   ]);
    //   this.appealClaimAmount?.setValidators([Validators.required]);
    //   this.actionType?.clearValidators();
    // } else if (appealLawDecision === false) {
    //   this.actionType?.setValidators([Validators.required]);
    //   this.appealPrincipalAmount?.clearValidators();
    //   this.appealInterestAmount?.clearValidators();
    //   this.appealPenaltyAmount?.clearValidators();
    //   this.appealFineAmount?.clearValidators();
    //   this.appealStateDutyCourtCostsAmount?.clearValidators();
    //   this.appealClaimAmount?.clearValidators();
    // }
    // this.appealPrincipalAmount?.updateValueAndValidity();
    // this.appealInterestAmount?.updateValueAndValidity();
    // this.appealPenaltyAmount?.updateValueAndValidity();
    // this.appealFineAmount?.updateValueAndValidity();
    // this.appealStateDutyCourtCostsAmount?.updateValueAndValidity();
    // this.appealClaimAmount?.updateValueAndValidity();
    // this.actionType?.updateValueAndValidity();
  }

  private toggleValidatorsDecisionResult(desicionResult: any): void {
    if (desicionResult === 155 || desicionResult === 157) {
      this.appeal?.setValidators([Validators.required]);
      this.appealPrincipalAmount?.clearValidators();
      this.appealInterestAmount?.clearValidators();
      this.appealPenaltyAmount?.clearValidators();
      this.appealFineAmount?.clearValidators();
      this.appealStateDutyCourtCostsAmount?.clearValidators();
      this.appealClaimAmount?.clearValidators();

      this.actionType?.clearValidators();
    } else if (desicionResult === 156) {
      this.appeal?.clearValidators();
      this.appealPrincipalAmount?.clearValidators();
      this.appealInterestAmount?.clearValidators();
      this.appealPenaltyAmount?.clearValidators();
      this.appealFineAmount?.clearValidators();
      this.appealStateDutyCourtCostsAmount?.clearValidators();
      this.appealClaimAmount?.clearValidators();
      this.actionType?.clearValidators();
    }

    this.appeal?.updateValueAndValidity();
    this.appealPrincipalAmount?.updateValueAndValidity();
    this.appealInterestAmount?.updateValueAndValidity();
    this.appealPenaltyAmount?.updateValueAndValidity();
    this.appealFineAmount?.updateValueAndValidity();
    this.appealStateDutyCourtCostsAmount?.updateValueAndValidity();
    this.appealClaimAmount?.updateValueAndValidity();
    this.actionType?.updateValueAndValidity();
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
      console.log(this.form);

      return;
    }

    this.submitted = true;

    const data = {
      type: this.form.value.type,
      inDocNumber: this.form.value.inDocNumber,
      inDocDate: this.form.value.inDocDate.singleDate.formatted,
      decisionResult: this.form.value.decisionResult,
      appeal: this.form.value.appeal, //false

      action: this.form.value.actionType,

      appealPrincipalAmount: this.form.value.appealPrincipalAmount,
      appealInterestAmount: this.form.value.appealInterestAmount,
      appealPenaltyAmount: this.form.value.appealPenaltyAmount,
      appealFineAmount: this.form.value.appealFineAmount,
      appealStateDutyCourtCostsAmount: this.form.value
        .appealStateDutyCourtCostsAmount,
      appealClaimAmount: this.form.value.appealClaimAmount,

      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.addInfo,
    };

    this.lawsuitService.apiFetch(data, 'mib/response/add', actionId).subscribe(
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
