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
  selector: 'app-main-appeal',
  templateUrl: './main-appeal.component.html',
  styleUrls: ['./main-appeal.component.scss'],
})
export class MainAppealComponent implements OnInit, OnDestroy {
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  dicSub!: Subscription;
  dictionaries!: any;

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
      object: new FormControl(formTemplateNull, Validators.required),
      subject: new FormControl(formTemplateNull, Validators.required),
      docNumber: new FormControl(formTemplate, Validators.required),

      docDate: new FormControl(formTemplate, Validators.required),
      addInfo: new FormControl(formTemplateNull, Validators.required),
    });

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

    const reqId = this.lawsuitService.getReqId(12)?.id;

    const data = {
      actionId: this.action.actionId,
      object: this.form.value.object,
      subject: this.form.value.subject,

      docNumber: this.form.value.docNumber,
      docDate: this.form.value.docDate.singleDate.formatted,

      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.addInfo,
    };

    this.lawsuitService.apiFetch(data, 'mainAppeal/add', actionId).subscribe(
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
  }
}
