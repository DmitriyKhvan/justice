import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent } from '@ngx-translate/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-referral-for-appeal',
  templateUrl: './referral-for-appeal.component.html',
  styleUrls: ['./referral-for-appeal.component.scss'],
})
export class ReferralForAppealComponent implements OnInit, OnDestroy {
  @Input() formData: any = null;
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;
  region!: any;

  dicSub!: Subscription;
  tSub!: Subscription;
  regionLawSub!: Subscription | undefined;

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

        region: new FormControl({
          value: this.formData.data.region,
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
        lawKind: new FormControl(formTemplateNull, Validators.required),
        lawType: new FormControl(formTemplateNull, Validators.required),
        regionLaw: new FormControl(formTemplateNull, Validators.required),
        region: new FormControl(
          { value: null, disabled: true },
          Validators.required
        ),

        numberDoc: new FormControl(formTemplate, Validators.required),
        dateDoc: new FormControl(formTemplate, Validators.required),
        additionalInfo: new FormControl(formTemplate, Validators.required),
      });

      this.region = this.form.get('region');
    }

    this.dicSub = this.dicService
      .getDicByActionId(this.action.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });

    this.tSub = this.lawsuitService.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.dictionaries = JSON.parse(JSON.stringify(this.dictionaries));
        // this.districtDic = [...this.districtDic];
      }
    );

    this.regionLawSub = this.form
      .get('regionLaw')
      ?.valueChanges.subscribe((id: number) => {
        if (id === 162) {
          this.region?.setValidators([Validators.required]);

          this.region?.enable();
        } else {
          this.region?.clearValidators();
          this.form.patchValue({
            region: null,
          });
          this.region?.disable();
        }
      });

    this.region?.updateValueAndValidity();
  }

  submit(actionId: number) {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const lawId = this.lawsuitService.getReqId(5)?.id;

    const data = {
      lawKind: this.form.value.lawKind,
      lawType: this.form.value.lawType,
      region: this.form.value.region,
      regionLaw: this.form.value.regionLaw,

      outDocNumber: this.form.value.numberDoc,
      outDocDate: this.form.value.dateDoc.singleDate.formatted,
      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.additionalInfo,
      lawId,
      active: true,
    };

    this.lawsuitService
      .apiFetch(data, 'law/add/appealRequest', actionId)
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
    this.regionLawSub?.unsubscribe();
    this.dicSub?.unsubscribe();
    this.tSub?.unsubscribe();
  }
}
