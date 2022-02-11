import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { datepickerSettings } from 'src/app/settings';

@Component({
  selector: 'app-case-transfer',
  templateUrl: './case-transfer.component.html',
  styleUrls: ['./case-transfer.component.scss'],
})
export class CaseTransferComponent implements OnInit, OnDestroy {
  @Input() formData: any = null;
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  dictionaries!: any;
  dicSub!: Subscription;

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
        this.formData.data.outDocDate.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d },
        // dateRange: null,
      };

      this.form = new FormGroup({
        typeApplication: new FormControl({
          value: this.formData.data.type,
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
        typeApplication: new FormControl(formTemplateNull, Validators.required),
        numberDoc: new FormControl(formTemplateNull, Validators.required),
        dateDoc: new FormControl(formTemplateNull, Validators.required),
        additionalInfo: new FormControl(formTemplateNull, Validators.required),
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

    const data = {
      active: true,
      type: this.form.value.typeApplication,
      outDocNumber: this.form.value.numberDoc,
      outDocDate: this.form.value.dateDoc.singleDate.formatted,
      addInfo: this.form.value.additionalInfo,
      files: this.fileUploadService.transformFilesData(),
    };

    this.lawsuitService.apiFetch(data, 'mib/add/send', actionId).subscribe(
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
  }
}
