import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-stopping-bce',
  templateUrl: './stopping-bce.component.html',
  styleUrls: ['./stopping-bce.component.scss'],
})
export class StoppingBCEComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

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
    public lawsuitService: LawsuitService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      stopType: new FormControl(null, Validators.required),
      stopSuspendDate: new FormControl(null, Validators.required),
      stopInitiator: new FormControl(null, Validators.required),
      dateDoc: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
      stopReason: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      active: true,
      stopType: this.form.value.stopType,
      stopSuspendDate: this.form.value.stopSuspendDate.singleDate.formatted,
      stopInitiator: this.form.value.stopInitiator,
      stopDocDate: this.form.value.dateDoc.singleDate.formatted,
      stopAddInfo: this.form.value.additionalInfo,
      stopFiles: this.fileUploadService.transformFilesData(),
      stopReason: this.form.value.stopReason,
    };

    this.lawsuitService.apiFetch(data, 'mib/add/stop').subscribe(
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
