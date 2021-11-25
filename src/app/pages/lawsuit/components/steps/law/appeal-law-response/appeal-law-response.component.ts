import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-appeal-law-response',
  templateUrl: './appeal-law-response.component.html',
  styleUrls: ['./appeal-law-response.component.scss'],
})
export class AppealLawResponseComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;

  resultDesicion = [
    { value: 1, label: 'Не удовлетворено' },
    { value: 2, label: 'Удовлетворено' },
  ];

  lawDesicion = [
    { value: 1, label: 'Да' },
    { value: 2, label: 'Нет' },
  ];

  appealType = [{ value: 1, label: 'Кассация' }];

  actionTypeDic = [
    { value: 1, label: 'Продолжить дело' },
    { value: 2, label: 'Отложить на время' },
    { value: 3, label: 'Закрыть дело' },
  ];

  caseNumber!: any;
  forceDecisionDate!: any;
  appealAgainstLawDesicion!: any;
  typeAppeal!: any;
  totalAmount!: any;
  principalAmount!: any;
  forfeitAmount!: any;
  stateDutyAmount!: any;
  additionalInfo!: any;

  actionType!: any;
  postponeUntil!: any;

  private resultDecisionSub!: Subscription | undefined;
  private appealLawDecisionSub!: Subscription | undefined;
  private actionTypeSub!: Subscription | undefined;

  constructor(private alert: AlertService, private lawsuit: LawsuitService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      caseNumber: new FormControl(8012),
      decisionDate: new FormControl(null, Validators.required),
      decisionResult: new FormControl(null, Validators.required),
      forceDecisionDate: new FormControl(null), // Дата вступления решения в силу

      appealAgainstLawDesicion: new FormControl(null), // Обжаловать решение суда
      typeAppeal: new FormControl(null),
      totalAmount: new FormControl(null),
      principalAmount: new FormControl(null),
      forfeitAmount: new FormControl(null),
      stateDutyAmount: new FormControl(null),
      additionalInfo: new FormControl(null),

      actionType: new FormControl(null),
      postponeUntil: new FormControl(null),
    });

    this.caseNumber = this.form.get('caseNumber');
    this.forceDecisionDate = this.form.get('forceDecisionDate');
    this.appealAgainstLawDesicion = this.form.get('appealAgainstLawDesicion');

    this.typeAppeal = this.form.get('typeAppeal');
    this.totalAmount = this.form.get('totalAmount');
    this.principalAmount = this.form.get('principalAmount');
    this.forfeitAmount = this.form.get('forfeitAmount');
    this.stateDutyAmount = this.form.get('stateDutyAmount');
    this.additionalInfo = this.form.get('additionalInfo');

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
          additionalInfo: null,

          // actionType: null,
          postponeUntil: null,
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
          totalAmount: null,
          principalAmount: null,
          forfeitAmount: null,
          stateDutyAmount: null,
          additionalInfo: null,

          actionType: null,
          postponeUntil: null,
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
          forceDecisionDate: null,
          appealAgainstLawDesicion: null,
          typeAppeal: null,
          totalAmount: null,
          principalAmount: null,
          forfeitAmount: null,
          stateDutyAmount: null,
          additionalInfo: null,

          actionType: null,
          postponeUntil: null,
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
    if (appealLawDecision === 1) {
      this.typeAppeal?.setValidators([Validators.required]);
      this.totalAmount?.setValidators([Validators.required]);
      this.principalAmount?.setValidators([Validators.required]);
      this.forfeitAmount?.setValidators([Validators.required]);
      this.stateDutyAmount?.setValidators([Validators.required]);
      this.additionalInfo?.setValidators([Validators.required]);

      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
    } else if (appealLawDecision === 2) {
      this.actionType?.setValidators([Validators.required]);
      this.postponeUntil?.setValidators([Validators.required]);

      this.typeAppeal?.clearValidators();
      this.totalAmount?.clearValidators();
      this.principalAmount?.clearValidators();
      this.forfeitAmount?.clearValidators();
      this.stateDutyAmount?.clearValidators();
      this.additionalInfo?.clearValidators();
    }

    this.typeAppeal?.updateValueAndValidity();
    this.totalAmount?.updateValueAndValidity();
    this.principalAmount?.updateValueAndValidity();
    this.forfeitAmount?.updateValueAndValidity();
    this.stateDutyAmount?.updateValueAndValidity();
    this.additionalInfo?.updateValueAndValidity();

    this.actionType?.updateValueAndValidity();
    this.postponeUntil?.updateValueAndValidity();
  }

  private toggleValidatorsDecisionResult(desicionResult: any): void {
    if (desicionResult === 1) {
      this.appealAgainstLawDesicion?.setValidators([Validators.required]);

      this.caseNumber?.clearValidators();
      this.forceDecisionDate?.clearValidators();
      // this.appealAgainstLawDesicion?.clearValidators();
      this.typeAppeal?.clearValidators();
      this.totalAmount?.clearValidators();
      this.principalAmount?.clearValidators();
      this.forfeitAmount?.clearValidators();
      this.stateDutyAmount?.clearValidators();
      this.additionalInfo?.clearValidators();

      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
    } else if (desicionResult === 2) {
      this.forceDecisionDate?.setValidators([Validators.required]);

      this.caseNumber?.clearValidators();
      // this.forceDecisionDate?.clearValidators();
      this.appealAgainstLawDesicion?.clearValidators();
      this.typeAppeal?.clearValidators();
      this.totalAmount?.clearValidators();
      this.principalAmount?.clearValidators();
      this.forfeitAmount?.clearValidators();
      this.stateDutyAmount?.clearValidators();
      this.additionalInfo?.clearValidators();
      this.actionType?.clearValidators();
      this.postponeUntil?.clearValidators();
    }

    this.caseNumber?.updateValueAndValidity();
    this.forceDecisionDate?.updateValueAndValidity();
    this.appealAgainstLawDesicion?.updateValueAndValidity();
    this.typeAppeal?.updateValueAndValidity();
    this.totalAmount?.updateValueAndValidity();
    this.principalAmount?.updateValueAndValidity();
    this.forfeitAmount?.updateValueAndValidity();
    this.stateDutyAmount?.updateValueAndValidity();
    this.additionalInfo?.updateValueAndValidity();

    this.actionType?.updateValueAndValidity();
    this.postponeUntil?.updateValueAndValidity();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log('form', this.form.value);
  }

  ngOnDestroy(): void {
    this.resultDecisionSub?.unsubscribe();
    this.appealLawDecisionSub?.unsubscribe();
    this.actionTypeSub?.unsubscribe();
  }
}
