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

  constructor(private alert: AlertService, private lawsuit: LawsuitService) {}

  ngOnInit(): void {
    let d: Date = new Date();
    d.setDate(d.getDate() + 2);
    let model: IMyDateModel = {
      isRange: false,
      // singleDate: { jsDate: d },
      // dateRange: null,
    };

    this.form = new FormGroup({
      notificationDate: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log('form', this.form.value);

    const notificatationData = {
      uniqueId: 0,
      mfo: '00415',
      processId: 0,
      nextActionId: 0,
      active: true,
      lastPaymentDate: this.form.value.notificationDate.singleDate.formatted,
      text: this.form.value.additionalInfo,
    };

    this.lawsuit.notificationAdd(notificatationData).subscribe(
      () => {
        this.alert.success('Форма оформлена');
      },
      (error) => {
        this.submitted = false;
        this.alert.danger('Форма не оформлена');
      }
    );
  }
}
