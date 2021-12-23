import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-sending-application',
  templateUrl: './sending-application.component.html',
  styleUrls: ['./sending-application.component.scss'],
})
export class SendingApplicationComponent implements OnInit {
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
    // d.setDate(d.getDate() + 2);
    // let model: IMyDateModel = {
    //   isRange: false,
    //   // singleDate: { jsDate: d },
    //   // dateRange: null,
    // };

    const formTemplate = this.formTemplate
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
        numberDoc: new FormControl(formTemplate, Validators.required),
        dateDoc: new FormControl(formTemplate, Validators.required),
        additionalInfo: new FormControl(formTemplate, Validators.required),
      });
    }
  }

  submit(actionId: number) {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      active: true,
      outDocNumber: this.form.value.numberDoc,
      outDocDate: this.form.value.dateDoc.singleDate.formatted,
      addInfo: this.form.value.additionalInfo,
      files: this.fileUploadService.transformFilesData(),
    };

    this.lawsuitService.apiFetch(data, 'tpp/add/request', actionId).subscribe(
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
