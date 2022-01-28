import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  dicSub!: Subscription;
  regionSub!: Subscription | undefined;

  dictionaries!: any;
  districtDic: any[] = [];

  constructor(
    public lawsuitService: LawsuitService,
    private alert: AlertService,
    private dicService: DictionariesService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    const formTemplate = this.formTemplate ? { value: '', disabled: true } : '';
    const formTemplateNull = this.formTemplate
      ? { value: null, disabled: true }
      : null;

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

        district: new FormControl({
          value: this.formData.data.district,
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
        region: new FormControl(formTemplateNull, Validators.required),
        district: new FormControl(
          { value: null, disabled: true },
          Validators.required
        ),

        numberDoc: new FormControl(formTemplate, Validators.required),
        dateDoc: new FormControl(formTemplate, Validators.required),
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
      district: this.form.value.district,

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
    if (this.regionSub) {
      this.regionSub.unsubscribe();
    }

    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }
  }
}
