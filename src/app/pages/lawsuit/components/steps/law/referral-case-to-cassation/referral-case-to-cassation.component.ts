import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

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

  dicSub!: Subscription;

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
      lawName: 1,
      outDocNumber: this.form.value.numberDoc,
      outDocDate: this.form.value.dateDoc.singleDate.formatted,
      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.additionalInfo,
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
    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }
  }
}
