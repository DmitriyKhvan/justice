import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
})
export class NotificationFormComponent implements OnInit {
  @Input() formData: any = null;
  @Input() action!: any;
  @Input() formTemplate: any = null;
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
    // let d: Date = new Date();
    // d.setDate(d.getDate() + 2);
    // let model: IMyDateModel = {
    //   isRange: false,
    //   // singleDate: { jsDate: d },
    //   // dateRange: null,
    // };

    if (this.formData) {
      let d: Date = new Date(
        this.formData.data.lastPaymentDate.split('.').reverse().join('.')
      );

      // d.setDate(d.getDate() + 2);
      let model: IMyDateModel = {
        isRange: false,
        singleDate: { jsDate: d },
        // dateRange: null,
      };
      this.form = new FormGroup({
        notificationDate: new FormControl({
          value: model,
          disabled: true,
        }),

        additionalInfo: new FormControl({
          value: this.formData.data.text,
          disabled: true,
        }),
      });
    } else {
      this.form = new FormGroup({
        notificationDate: new FormControl(
          this.formTemplate ? { value: null, disabled: true } : null,
          Validators.required
        ),

        additionalInfo: new FormControl(
          this.formTemplate ? { value: null, disabled: true } : null,
          Validators.required
        ),
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
      lastPaymentDate: this.form.value.notificationDate.singleDate.formatted,
      text: this.form.value.additionalInfo,
      files: this.fileUploadService.transformFilesData(),
    };

    this.lawsuitService.apiFetch(data, 'notification/add', actionId).subscribe(
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
