import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { datepickerSettings } from 'src/app/settings';

@Component({
  selector: 'app-enforcement-request',
  templateUrl: './enforcement-request.component.html',
  styleUrls: ['./enforcement-request.component.scss'],
})
export class EnforcementRequestComponent implements OnInit, OnDestroy {
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  dicSub!: Subscription;
  dictionaries!: any;

  regionSub!: Subscription | undefined;
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
      outDocNumber: new FormControl(formTemplate, Validators.required),

      outDocDate: new FormControl(formTemplate, Validators.required),
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
      outDocNumber: this.form.value.outDocNumber,
      outDocDate: this.form.value.outDocDate.singleDate.formatted,

      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.addInfo,
    };

    this.lawsuitService
      .apiFetch(data, 'enforcement/request/add', actionId)
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

  ngOnDestroy(): void {
    this.dicSub?.unsubscribe();
    this.regionSub?.unsubscribe();
  }
}
