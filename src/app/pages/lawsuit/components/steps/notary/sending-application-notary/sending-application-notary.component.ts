import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-sending-application-notary',
  templateUrl: './sending-application-notary.component.html',
  styleUrls: ['./sending-application-notary.component.scss'],
})
export class SendingApplicationNotaryComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor(
    private alert: AlertService,
    private lawsuitService: LawsuitService
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
      numberDoc: new FormControl(null, Validators.required),
      dateDoc: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const data = {
      active: true,
      outDocNumber: this.form.value.numberDoc,
      outDocDate: this.form.value.dateDoc.singleDate.formatted,
      addInfo: this.form.value.additionalInfo,
      files: [
        {
          id: 0,
          name: 'string',
        },
      ],
    };

    this.lawsuitService.apiFetch(data, 'notary/add/request').subscribe(
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