import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-sending-case-law',
  templateUrl: './sending-case-law.component.html',
  styleUrls: ['./sending-case-law.component.scss'],
})
export class SendingCaseLawComponent implements OnInit {
  @Input() formData: any = null;
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  viewLawDic = [
    { id: 1, label: 'Вид суда1' },
    { id: 2, label: 'Вид суда2' },
  ];

  typeLawDic = [
    { id: 1, label: 'Тип суда1' },
    { id: 2, label: 'Тип суда2' },
  ];

  regionLawDic = [
    { id: 1, label: 'Регион суда1' },
    { id: 2, label: 'Регион суда2' },
  ];

  regionDic = [
    { id: 1, label: 'Регион1' },
    { id: 2, label: 'Регион2' },
  ];

  districtLawDic = [
    { id: 1, label: 'Районный суд1' },
    { id: 2, label: 'Районный суд2' },
  ];

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
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
        regionLaw: new FormControl({
          value: this.formData.data.lawRegion,
          disabled: true,
        }),
        region: new FormControl({
          value: this.formData.data.region,
          disabled: true,
        }),
        defendant: new FormControl({
          value: this.formData.data.defendant,
          disabled: true,
        }),
        districtLaw: new FormControl({
          value: this.formData.data.lawDistrict,
          disabled: true,
        }),
        amountClaim: new FormControl({
          value: this.formData.data.lawSum,
          disabled: true,
        }),
        amountForfeit: new FormControl({
          value: this.formData.data.penaltySum,
          disabled: true,
        }),
        amountFine: new FormControl({
          value: this.formData.data.fineSum,
          disabled: true,
        }),
        dateLaw: new FormControl({
          value: model,
          disabled: true,
        }),
        additionalInfo: new FormControl({
          value: this.formData.data.addInfo,
          disabled: true,
        }),
      });
    } else {
      formTemplateNull;
      this.form = new FormGroup({
        kindLaw: new FormControl(formTemplateNull, Validators.required),
        typeLaw: new FormControl(formTemplateNull, Validators.required),
        regionLaw: new FormControl(formTemplateNull, Validators.required),
        region: new FormControl(formTemplateNull, Validators.required),
        defendant: new FormControl(formTemplate, Validators.required),
        districtLaw: new FormControl(formTemplateNull, Validators.required),
        // amountClaim: new FormControl({ value: '700 000', disabled: true }),
        amountClaim: new FormControl(formTemplate, Validators.required),
        amountForfeit: new FormControl(formTemplate, Validators.required),
        amountFine: new FormControl(formTemplate, Validators.required),
        dateLaw: new FormControl(formTemplateNull, Validators.required),
        additionalInfo: new FormControl(formTemplate, Validators.required),
      });
    }
  }

  submit(actionId: number) {
    if (this.form.invalid) {
      return;
    }

    const data = {
      lawKind: this.form.value.kindLaw,
      lawType: this.form.value.typeLaw,
      lawRegion: this.form.value.regionLaw,
      region: this.form.value.region,
      lawDistrict: this.form.value.districtLaw,
      defendant: this.form.value.defendant,
      lawSum: this.form.controls.amountClaim.value,
      penaltySum: this.form.value.amountForfeit,
      fineSum: this.form.value.amountFine,
      files: this.fileUploadService.transformFilesData(),
      lawInDate: this.form.value.dateLaw.singleDate.formatted,
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
        this.alert.danger('Форма не оформлена');
      }
    );
  }
}
