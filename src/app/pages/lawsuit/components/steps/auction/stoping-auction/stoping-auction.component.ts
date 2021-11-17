import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-stoping-auction',
  templateUrl: './stoping-auction.component.html',
  styleUrls: ['./stoping-auction.component.scss'],
})
export class StopingAuctionComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  options = [
    { id: 1, label: 'Остановка на основании заявления от Следователя' },
    { id: 2, label: 'Остановка на основании решения Суда' },
    { id: 3, label: 'Остановка на основании заявления от Взыскателя' },
    { id: 4, label: 'Снятие заявления на исполнение' },
  ];

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
      dateDoc: new FormControl(null, Validators.required),
      dateRenewal: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
      resonStopping: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
