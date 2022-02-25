import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { datepickerSettings } from 'src/app/settings';

@Component({
  selector: 'app-enforcement-response',
  templateUrl: './enforcement-response.component.html',
  styleUrls: ['./enforcement-response.component.scss'],
})
export class EnforcementResponseComponent implements OnInit {
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  dicSub!: Subscription;
  regionSub!: Subscription | undefined;

  dictionaries!: any;
  districtDic: any[] = [];

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
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

    this.form = new FormGroup({
      organ: new FormControl(formTemplateNull, Validators.required),
      region: new FormControl(formTemplateNull, Validators.required),
      district: new FormControl(formTemplateNull, Validators.required),
      inDocNumber: new FormControl(formTemplate, Validators.required),

      inDocDate: new FormControl(formTemplate, Validators.required),
      addInfo: new FormControl(formTemplateNull, Validators.required),
    });

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

    const reqId = this.lawsuitService.getReqId(12)?.id;

    const data = {
      organ: this.form.value.organ,
      region: this.form.value.region,
      district: this.form.value.district,
      inDocNumber: this.form.value.inDocNumber,
      inDocDate: this.form.value.inDocDate.singleDate.formatted,

      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.addInfo,
    };

    this.lawsuitService
      .apiFetch(data, 'enforcement/response/add', actionId)
      .subscribe(
        (actions) => {
          // this.lawsuitService.historyActions = actions;
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
}
