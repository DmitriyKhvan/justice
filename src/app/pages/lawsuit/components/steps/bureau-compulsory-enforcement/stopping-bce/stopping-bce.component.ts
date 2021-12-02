import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-stopping-bce',
  templateUrl: './stopping-bce.component.html',
  styleUrls: ['./stopping-bce.component.scss'],
})
export class StoppingBCEComponent implements OnInit {
  form!: FormGroup;

  stopTypeDic = [
    { value: 1, label: 'Полная' },
    { value: 2, label: 'Временная' },
  ];

  stopInitiatorDic = [
    { value: 1, label: 'Клиент' },
    { value: 2, label: 'Банк' },
    { value: 3, label: 'МИБ' },
    { value: 4, label: 'Суд' },
  ];

  reasonStoppingDic = [
    { value: 1, label: 'Полная' },
    { value: 2, label: 'Временная' },
  ];

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      stopType: new FormControl(null, Validators.required),
      dateResumptionProcess: new FormControl(null, Validators.required),
      stopInitiator: new FormControl(null, Validators.required),
      dateDoc: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
      reasonStopping: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.valid) {
      return;
    }
  }
}
