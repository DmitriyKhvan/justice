import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LangChangeEvent } from '@ngx-translate/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { datepickerSettings } from 'src/app/settings';
import currencyTransform from 'src/app/utils/format-number';

@Component({
  selector: 'app-sending-case-law',
  templateUrl: './sending-case-law.component.html',
  styleUrls: ['./sending-case-law.component.scss'],
})
export class SendingCaseLawComponent implements OnInit, OnDestroy {
  @Input() formData: any = null;
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;
  dicSub!: Subscription;
  tSub!: Subscription;
  regionSub!: Subscription | undefined;

  kindLawSub!: Subscription | undefined;
  principalAmountSub!: Subscription | undefined;
  percentAmountSub!: Subscription | undefined;
  penaltyAmountSub!: Subscription | undefined;
  fineAmountSub!: Subscription | undefined;
  totalClaimAmountSub!: Subscription | undefined;

  defendantArraySub!: Subscription | undefined;

  dictionaries!: any;
  districtDic: any[] = [];

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    private dicService: DictionariesService,
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
        this.formData.data.lawInDate.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d },
        // dateRange: null,
      };

      this.form = new FormGroup({
        kindLaw: new FormControl({
          value: this.formData.data.lawKind,
          disabled: true,
        }),
        typeLaw: new FormControl({
          value: this.formData.data.lawType,
          disabled: true,
        }),
        // regionLaw: new FormControl({
        //   value: this.formData.data.lawRegion,
        //   disabled: true,
        // }),
        region: new FormControl({
          value: this.formData.data.region,
          disabled: true,
        }),
        // defendant: new FormControl({
        //   value: this.formData.data.defendant,
        //   disabled: true,
        // }),
        // districtLaw: new FormControl({
        //   value: this.formData.data.lawDistrict,
        //   disabled: true,
        // }),
        // amountClaim: new FormControl({
        //   value: this.formData.data.lawSum,
        //   disabled: true,
        // }),
        // amountForfeit: new FormControl({
        //   value: this.formData.data.penaltySum,
        //   disabled: true,
        // }),
        // amountFine: new FormControl({
        //   value: this.formData.data.fineSum,
        //   disabled: true,
        // }),
        // dateLaw: new FormControl({
        //   value: model,
        //   disabled: true,
        // }),
        additionalInfo: new FormControl({
          value: this.formData.data.addInfo,
          disabled: true,
        }),
      });
    } else {
      this.form = new FormGroup({
        kindLaw: new FormControl(formTemplateNull, Validators.required),
        typeLaw: new FormControl(formTemplateNull, Validators.required),
        // regionLaw: new FormControl(formTemplateNull, Validators.required),
        region: new FormControl(formTemplateNull, Validators.required),
        // defendant: new FormControl(formTemplate, Validators.required),
        defendantArray: new FormArray([
          new FormControl(formTemplate, [Validators.required]),
        ]),

        thirdPartiesArray: new FormArray([new FormControl(formTemplate)]),

        district: new FormControl({ value: null, disabled: true }, [
          Validators.required,
        ]),
        // districtLaw: new FormControl(formTemplateNull, Validators.required),
        // amountClaim: new FormControl({ value: '700 000', disabled: true }),
        // amountClaim: new FormControl(formTemplate, Validators.required),
        // amountForfeit: new FormControl(formTemplate, Validators.required),
        // amountFine: new FormControl(formTemplate, Validators.required),
        // dateLaw: new FormControl(formTemplateNull, Validators.required),
        principalAmount: new FormControl(formTemplate, Validators.required),
        percentAmount: new FormControl(formTemplate, Validators.required),
        penaltyAmount: new FormControl(formTemplate, Validators.required),
        fineAmount: new FormControl(formTemplate, Validators.required),
        totalClaimAmount: new FormControl(formTemplate, Validators.required),

        outDocNumber: new FormControl(formTemplate, Validators.required),
        outDocDate: new FormControl(formTemplate, Validators.required),

        additionalInfo: new FormControl(formTemplate, Validators.required),
      });
    }

    // this.form.valueChanges.subscribe((form) => {
    //   if (form.principalAmount) {
    //     this.form.patchValue(
    //       {
    //         principalAmount: this.currencyPipe.transform(
    //           form.principalAmount.replace(/\D/g, '').replace(/^0+/, ''),
    //           'USD',
    //           'symbol',
    //           '1.0-0'
    //         ),
    //       },
    //       { emitEvent: false }
    //     );
    //   }
    // });

    this.subsribtionKindLaw();

    this.dicSub = this.dicService
      .getDicByActionId(this.action.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });

    this.tSub = this.lawsuitService.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.dictionaries = JSON.parse(JSON.stringify(this.dictionaries));
        this.districtDic = [...this.districtDic];
      }
    );

    this.regionSub = this.form
      .get('region')
      ?.valueChanges.subscribe((id: number) => {
        this.districtDic = [];
        this.form.patchValue({
          district: null,
        });

        if (id) {
          this.districtDic = this.dictionaries.regionDistrict.find(
            (reg: any) => reg.id === id
          ).child;

          this.form.get('district')?.enable();
        } else {
          this.form.get('district')?.disable();
        }
      });

    this.defendantArraySub = this.form
      .get('defendantArray')
      ?.valueChanges.pipe(debounceTime(700))
      .subscribe((value: any) => {
        if (value.some((el: any) => el)) {
          this.thirdPartiesArray.controls.forEach((el) => {
            el.clearValidators();
            el.updateValueAndValidity();
          });
        }
      });

    this.principalAmountSub = this.form
      .get('principalAmount')
      ?.valueChanges.pipe
      // debounceTime(700)
      ()
      .subscribe((val) => {
        this.getTotalClaimAmount();

        this.form.patchValue(
          {
            principalAmount: currencyTransform(val),
          },
          { emitEvent: false }
        );
      });

    this.percentAmountSub = this.form
      .get('percentAmount')
      ?.valueChanges.pipe
      // debounceTime(700)
      ()
      .subscribe((val) => {
        this.getTotalClaimAmount();
        this.form.patchValue(
          {
            percentAmount: currencyTransform(val),
          },
          { emitEvent: false }
        );
      });

    this.penaltyAmountSub = this.form
      .get('penaltyAmount')
      ?.valueChanges.pipe
      // debounceTime(700)
      ()
      .subscribe((val) => {
        this.getTotalClaimAmount();
        this.form.patchValue(
          {
            penaltyAmount: currencyTransform(val),
          },
          { emitEvent: false }
        );
      });

    this.fineAmountSub = this.form
      .get('fineAmount')
      ?.valueChanges.pipe
      // debounceTime(700)
      ()
      .subscribe((val) => {
        this.getTotalClaimAmount();
        this.form.patchValue(
          {
            fineAmount: currencyTransform(val),
          },
          { emitEvent: false }
        );
      });

    this.totalClaimAmountSub = this.form
      .get('totalClaimAmount')
      ?.valueChanges.pipe
      // debounceTime(700)
      ()
      .subscribe((val) => {
        this.form.patchValue(
          {
            totalClaimAmount: currencyTransform(val),
          },
          { emitEvent: false }
        );
      });

    // this.form.valueChanges.subscribe((form) => {
    //   if (form.totalClaimAmount) {
    //     this.form.patchValue(
    //       {
    //         // totalClaimAmount: new Intl.NumberFormat().format(
    //         //   form.totalClaimAmount.replace(/[^0-9.]/gim, '')
    //         // ),
    //         totalClaimAmount: currencyTransform(form.totalClaimAmount),
    //       },
    //       { emitEvent: false }
    //     );
    //   }
    // });
  }

  private subsribtionKindLaw(): void {
    this.kindLawSub = this.form
      .get('kindLaw')
      ?.valueChanges.subscribe((value) => {
        this.form.patchValue({
          district: null,
        });

        this.toggleValidatorsDistrict(value);
      });
  }

  private toggleValidatorsDistrict(kindLaw: any): void {
    const district = this.form.get('district');
    const validators: ValidatorFn[] = [Validators.required];

    if (kindLaw === 1) {
      district?.clearValidators();
    } else {
      district?.setValidators(validators);
    }

    district?.updateValueAndValidity();
  }

  getTotalClaimAmount() {
    let totalClaimAmount =
      +Number(
        this.form.get('principalAmount')?.value.replace(/[^0-9]/gim, '')
      ) +
      +Number(this.form.get('percentAmount')?.value.replace(/[^0-9]/gim, '')) +
      +Number(this.form.get('penaltyAmount')?.value.replace(/[^0-9]/gim, '')) +
      +Number(this.form.get('fineAmount')?.value.replace(/[^0-9]/gim, ''));
    this.form.patchValue(
      {
        // totalClaimAmount: this.currencyTransform(String(totalClaimAmount)),
        totalClaimAmount: currencyTransform(String(totalClaimAmount)),
      },
      { emitEvent: false }
    );
  }

  get defendantArray() {
    return this.form.get('defendantArray') as FormArray;
  }

  addDefendant() {
    const control = new FormControl('', [Validators.required]);
    this.defendantArray.push(control);
  }

  removeDefendant(idx: number) {
    this.defendantArray.removeAt(idx);
  }

  get thirdPartiesArray() {
    return this.form.get('thirdPartiesArray') as FormArray;
  }

  addThirdParties() {
    const control = new FormControl('');
    this.thirdPartiesArray.push(control);
  }

  removeThirdParties(idx: number) {
    this.thirdPartiesArray.removeAt(idx);
  }

  submit(actionId: number) {
    if (this.form.invalid) {
      return;
    }

    const data = {
      lawKind: this.form.value.kindLaw,
      lawType: this.form.value.typeLaw,
      // lawRegion: this.form.value.regionLaw,
      region: this.form.value.region,
      district: this.form.value.district,
      // lawDistrict: this.form.value.districtLaw,
      // defendant: this.form.value.defendant,
      defendantArray: this.form.value.defendantArray,
      thirdPartiesArray: this.form.value.thirdPartiesArray,
      // lawSum: this.form.controls.amountClaim.value,
      // penaltySum: this.form.value.amountForfeit,
      // fineSum: this.form.value.amountFine,
      principalAmount: this.form.value.principalAmount,
      percentAmount: this.form.value.percentAmount,
      penaltyAmount: this.form.value.penaltyAmount,
      fineAmount: this.form.value.fineAmount,
      totalClaimAmount: this.form.value.totalClaimAmount,
      outDocNumber: this.form.value.outDocNumber,
      outDocDate: this.form.value.outDocDate.singleDate.formatted,
      files: this.fileUploadService.transformFilesData(),
      // lawInDate: this.form.value.dateLaw.singleDate.formatted,
      addInfo: this.form.value.additionalInfo,
      active: true,
    };

    this.lawsuitService.apiFetch(data, 'law/add/pre', actionId).subscribe(
      (actions) => {
        // this.lawsuitService.historyActions = actions;
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
    this.tSub?.unsubscribe();
    this.regionSub?.unsubscribe();
    this.kindLawSub?.unsubscribe();
    this.principalAmountSub?.unsubscribe();
    this.percentAmountSub?.unsubscribe();
    this.penaltyAmountSub?.unsubscribe();
    this.fineAmountSub?.unsubscribe();
    this.defendantArraySub?.unsubscribe();
    this.totalClaimAmountSub?.unsubscribe();
  }
}
