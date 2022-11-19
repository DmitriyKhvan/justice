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
  selector: 'app-referral-case-to-cassation',
  templateUrl: './referral-case-to-cassation.component.html',
  styleUrls: ['./referral-case-to-cassation.component.scss'],
})
export class ReferralCaseToCassationComponent implements OnInit, OnDestroy {
  @Input() formData: any = null;
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  appealPrincipalAmount!: any;
  appealInterestAmount!: any;
  appealPenaltyAmount!: any;
  appealFineAmount!: any;
  appealStateDutyCourtCostsAmount!: any;
  appealClaimAmount!: any;

  dicSub!: Subscription;

  private appealPrincipalAmountSub!: Subscription | undefined;
  private appealInterestAmountSub!: Subscription | undefined;
  private appealPenaltyAmountSub!: Subscription | undefined;
  private appealFineAmountSub!: Subscription | undefined;
  private appealStateDutyCourtCostsAmountSub!: Subscription | undefined;
  private appealClaimAmountSub!: Subscription | undefined;

  dictionaries!: any;
  districtDic: any[] = [];

  constructor(
    public lawsuitService: LawsuitService,
    private alert: AlertService,
    private dicService: DictionariesService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    let formTemplate: any = '';
    let formTemplateNull: any = null;

    if (this.formTemplate) {
      this.action = {
        actionId: this.formTemplate.id,
      };

      formTemplate = { value: '', disabled: true };
      formTemplateNull = { value: null, disabled: true };
    }

    if (this.formData) {
      let d: Date = new Date(
        this.formData.data.outDocDate.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d },
        // dateRange: null,
      };

      this.form = new FormGroup({
        lawKind: new FormControl({
          value: this.formData.data.lawKind,
          disabled: true,
        }),
        lawType: new FormControl({
          value: this.formData.data.lawType,
          disabled: true,
        }),

        numberDoc: new FormControl({
          value: this.formData.data.outDocNumber,
          disabled: true,
        }),
        dateDoc: new FormControl({
          value: model,
          disabled: true,
        }),
        additionalInfo: new FormControl({
          value: this.formData.data.addInfo,
          disabled: true,
        }),
      });
    } else {
      this.form = new FormGroup({
        numberDoc: new FormControl(formTemplate, Validators.required),
        dateDoc: new FormControl(formTemplate, Validators.required),
        additionalInfo: new FormControl(formTemplate, Validators.required),

        appealPrincipalAmount: new FormControl(
          formTemplate,
          Validators.required
        ),
        appealInterestAmount: new FormControl(
          formTemplate,
          Validators.required
        ),
        appealPenaltyAmount: new FormControl(formTemplate, Validators.required),
        appealFineAmount: new FormControl(formTemplate, Validators.required),
        appealStateDutyCourtCostsAmount: new FormControl(
          formTemplate,
          Validators.required
        ),
        appealClaimAmount: new FormControl(formTemplate, Validators.required),
      });

      this.appealPrincipalAmount = this.form.get('appealPrincipalAmount');
      this.appealInterestAmount = this.form.get('appealInterestAmount');
      this.appealPenaltyAmount = this.form.get('appealPenaltyAmount');
      this.appealFineAmount = this.form.get('appealFineAmount');
      this.appealStateDutyCourtCostsAmount = this.form.get(
        'appealStateDutyCourtCostsAmount'
      );
      this.appealClaimAmount = this.form.get('appealClaimAmount');

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

    const lawId = this.lawsuitService.getReqId(5)?.id;

    const data = {
      lawName: 1,
      outDocNumber: this.form.value.numberDoc,
      outDocDate: this.form.value.dateDoc.singleDate.formatted,
      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.additionalInfo,

      appealPrincipalAmount: this.form.value.appealPrincipalAmount,
      appealInterestAmount: this.form.value.appealInterestAmount,
      appealPenaltyAmount: this.form.value.appealPenaltyAmount,
      appealFineAmount: this.form.value.appealFineAmount,
      appealStateDutyCourtCostsAmount: this.form.value
        .appealStateDutyCourtCostsAmount,
      appealClaimAmount: this.form.value.appealClaimAmount,

      lawId,
      active: true,
    };

    this.lawsuitService
      .apiFetch(data, 'law/add/cassationRequest', actionId)
      .subscribe(
        (actions) => {
          this.submitted = false;
          this.alert.success('Форма оформлена');
        },
        (error) => {
          this.submitted = false;
          // this.alert.danger('Форма не оформлена');
        }
      );
  }

  ngOnDestroy(): void {
    this.dicSub?.unsubscribe();
    this.appealPrincipalAmountSub?.unsubscribe();
    this.appealInterestAmountSub?.unsubscribe();
    this.appealPenaltyAmountSub?.unsubscribe();
    this.appealFineAmountSub?.unsubscribe();
    this.appealStateDutyCourtCostsAmountSub?.unsubscribe();
    this.appealClaimAmountSub?.unsubscribe();
  }
}
