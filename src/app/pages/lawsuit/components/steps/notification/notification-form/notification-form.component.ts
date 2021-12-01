import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
})
export class NotificationFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    let d: Date = new Date();
    d.setDate(d.getDate() + 2);
    let model: IMyDateModel = {
      isRange: false,
      // singleDate: { jsDate: d },
      // dateRange: null,
    };

    this.form = new FormGroup({
      notificationDate: new FormControl({
        value: '05.11.2021',
        disabled: true,
      }),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    console.log('form', this.form.value);

    const notificatationData = {
      active: true,
      lastPaymentDate: this.form.controls.notificationDate.value,
      text: this.form.value.additionalInfo,
      files: [
        {
          id: 0,
          name: 'test1',
        },
        {
          id: 1,
          name: 'test2',
        },
      ],
    };

    this.lawsuitService
      .apiFetch(notificatationData, 'notification/add')
      .subscribe(
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
