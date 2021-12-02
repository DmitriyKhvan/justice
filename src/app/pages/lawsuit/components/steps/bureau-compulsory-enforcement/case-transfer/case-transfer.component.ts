import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-case-transfer',
  templateUrl: './case-transfer.component.html',
  styleUrls: ['./case-transfer.component.scss'],
})
export class CaseTransferComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  options = [
    { id: 1, label: 'В электронном виде' },
    { id: 2, label: 'В бумажном виде' },
  ];

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
      typeApplication: new FormControl(null, Validators.required),
      numberDoc: new FormControl(null, Validators.required),
      dateDoc: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
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
      files: [
        {
          id: 0,
          name: 'string',
        },
      ],
      stopType: 0,
      stopSuspendDate: 'string',
      stopInitiator: 0,
      stopDocDate: 'string',
      stopAddInfo: 'string',
      stopFiles: [
        {
          id: 0,
          name: 'string',
        },
      ],
      stopReason: 0,
    };

    this.lawsuitService.apiFetch(data, 'mib/add').subscribe(
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
