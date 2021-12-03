import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-sending-case-law',
  templateUrl: './sending-case-law.component.html',
  styleUrls: ['./sending-case-law.component.scss'],
})
export class SendingCaseLawComponent implements OnInit {
  @Input() actionId!: number;
  form!: FormGroup;
  submitted = false;

  options = [
    { id: 1, label: 'решение1' },
    { id: 2, label: 'решение2' },
  ];

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
      kindLaw: new FormControl(null, Validators.required),
      typeLaw: new FormControl(null, Validators.required),
      regionLaw: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      defendant: new FormControl(null, Validators.required),
      districtLaw: new FormControl(null, Validators.required),
      amountClaim: new FormControl({ value: '700 000', disabled: true }),
      amountForfeit: new FormControl(null, Validators.required),
      amountFine: new FormControl(null, Validators.required),
      dateLaw: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const data = {
      lawKind: this.form.value.kindLaw,
      lawType: this.form.value.typeLaw,
      lawRegion: this.form.value.regionLaw,
      region: this.form.value.region,
      lawDistrict: this.form.value.districtLaw,
      defendant: this.form.value.defendant,
      lawSum: this.form.controls.amountClaim.value,
      penaltySum: this.form.value.amountForfeit,
      fineSum: this.form.value.amountFine,
      files: [
        {
          id: 0,
          name: 'string',
        },
      ],
      lawInDate: this.form.value.dateLaw.singleDate.formatted,
      addInfo: this.form.value.additionalInfo,
      active: true,
    };

    this.lawsuitService.apiFetch(data, 'law/add/pre').subscribe(
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