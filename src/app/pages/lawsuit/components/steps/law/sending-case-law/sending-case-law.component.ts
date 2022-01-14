import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

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
  regionSub!: Subscription | undefined;

  principalAmountSub!: Subscription | undefined;
  percentAmountSub!: Subscription | undefined;
  penaltyAmountSub!: Subscription | undefined;
  fineAmountSub!: Subscription | undefined;

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

    const formTemplate = this.formTemplate ? { value: '', disabled: true } : '';

    const formTemplateNull = this.formTemplate
      ? { value: null, disabled: true }
      : null;

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
          new FormControl('', [Validators.required]),
        ]),

        thirdPartiesArray: new FormArray([new FormControl('')]),

        district: new FormControl(
          { value: null, disabled: true },
          Validators.required
        ),
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

        additionalInfo: new FormControl(formTemplate, Validators.required),
      });
    }

    this.dicSub = this.dicService
      .getDicByActionId(this.action.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });

    this.regionSub = this.form
      .get('region')
      ?.valueChanges.subscribe((id: number) => {
        if (id) {
          this.districtDic = this.dictionaries.regionDistrict.find(
            (reg: any) => reg.id === id
          ).child;

          this.form.get('district')?.enable();
        } else {
          this.districtDic = [];
          this.form.patchValue({
            district: null,
          });
          this.form.get('district')?.disable();
        }
      });

    this.defendantArraySub = this.form
      .get('defendantArray')
      ?.valueChanges.pipe(debounceTime(700))
      .subscribe((value: any) => {
        console.log(value.some((el: any) => el));
        if (value.some((el: any) => el)) {
          this.thirdPartiesArray.controls.forEach((el) => {
            el.clearValidators();
            el.updateValueAndValidity();
          });
        }
      });

    this.principalAmountSub = this.form
      .get('principalAmount')
      ?.valueChanges.pipe(debounceTime(700))
      .subscribe(() => {
        this.getTotalClaimAmount();
      });

    this.percentAmountSub = this.form
      .get('percentAmount')
      ?.valueChanges.pipe(debounceTime(700))
      .subscribe(() => {
        this.getTotalClaimAmount();
      });

    this.penaltyAmountSub = this.form
      .get('penaltyAmount')
      ?.valueChanges.pipe(debounceTime(700))
      .subscribe(() => {
        this.getTotalClaimAmount();
      });

    this.fineAmountSub = this.form
      .get('fineAmount')
      ?.valueChanges.pipe(debounceTime(700))
      .subscribe(() => {
        this.getTotalClaimAmount();
      });
  }

  getTotalClaimAmount() {
    let totalClaimAmount =
      +this.form.get('principalAmount')?.value +
      +this.form.get('percentAmount')?.value +
      +this.form.get('penaltyAmount')?.value +
      +this.form.get('fineAmount')?.value;
    this.form.patchValue({
      totalClaimAmount,
    });
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
    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }

    if (this.regionSub) {
      this.regionSub.unsubscribe();
    }

    if (this.principalAmountSub) {
      this.principalAmountSub.unsubscribe();
    }

    if (this.percentAmountSub) {
      this.percentAmountSub.unsubscribe();
    }

    if (this.penaltyAmountSub) {
      this.penaltyAmountSub.unsubscribe();
    }

    if (this.fineAmountSub) {
      this.fineAmountSub.unsubscribe();
    }

    if (this.defendantArraySub) {
      this.defendantArraySub.unsubscribe();
    }
  }
}
