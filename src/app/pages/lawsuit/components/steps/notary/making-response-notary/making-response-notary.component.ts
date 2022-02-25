import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { datepickerSettings } from 'src/app/settings';

@Component({
  selector: 'app-making-response-notary',
  templateUrl: './making-response-notary.component.html',
  styleUrls: ['./making-response-notary.component.scss'],
})
export class MakingResponseNotaryComponent implements OnInit {
  @Input() formData: any = null;
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    // let d: Date = new Date();
    // // this.formData.data.inDocDate.split('.').reverse().join('.')
    // d.setDate(d.getDate() + 2);
    // let model: IMyDateModel = {
    //   isRange: false,
    //   singleDate: { jsDate: d },
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
        this.formData.data.intDocDate.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d },
        // dateRange: null,
      };
      this.form = new FormGroup({
        numberDoc: new FormControl({
          value: this.formData.data.inDocNumber,
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
        numberDoc: new FormControl(formTemplateNull, Validators.required),
        dateDoc: new FormControl(formTemplateNull, Validators.required),
        additionalInfo: new FormControl(formTemplateNull, Validators.required),
      });
    }
  }

  submit(actionId: number) {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const reqId = this.lawsuitService.getReqId(12)?.id;

    const data = {
      inDocNumber: this.form.value.numberDoc,
      inDocDate: this.form.value.dateDoc.singleDate.formatted,
      addInfo: this.form.value.additionalInfo,
      files: this.fileUploadService.transformFilesData(),
      // reqId: reqId ? reqId : null,
      reqId,
    };

    this.lawsuitService
      .apiFetch(data, 'notary/add/response', actionId)
      .subscribe(
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
}
