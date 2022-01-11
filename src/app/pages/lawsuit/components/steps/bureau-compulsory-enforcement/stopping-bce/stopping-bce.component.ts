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
export class StoppingBCEComponent implements OnInit, OnDestroy {
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  stopTypeDic = [
    { value: 1, label: 'Полная' },
    { value: 2, label: 'Временная' },
  ];

  stopInitiatorDic = [
    { value: 3, label: 'Клиент' },
    { value: 4, label: 'Банк' },
    { value: 5, label: 'МИБ' },
    { value: 6, label: 'Суд' },
  ];

  reasonStoppingDic: any[] = [];

  readonly: string = '';

  stopSuspendDate!: any;
  stopReason!: any;

  private stopTypeSub!: Subscription | undefined;
  private stopInitiatorSub!: Subscription | undefined;

  private dicSub!: Subscription;

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

    this.stopSuspendDate = this.form.get('stopSuspendDate');
    this.stopReason = this.form.get('stopReason');

    this.subscribeToStopType();
  }

  private subscribeToStopType(): void {
    this.stopTypeSub = this.form
      .get('stopType')
      ?.valueChanges.subscribe((value) => {
        this.toggleStopSuspendDateValidators(value, 'stopType');
      });

    this.stopInitiatorSub = this.form
      .get('stopInitiator')
      ?.valueChanges.subscribe((value) => {
        this.toggleStopSuspendDateValidators(value, 'stopInitiator');
        this.changeDic(value);
      });
  }

  changeDic(value: any) {
    this.form.patchValue({
      stopReason: null,
    });

    if (value === 1) {
      this.dicSub = this.lawsuitService
        .getDic('STOP_REASON_CLIENT')
        .subscribe(
          (reasonStoppingDic) => (this.reasonStoppingDic = reasonStoppingDic)
        );
    } else if (value === 2) {
      this.dicSub = this.lawsuitService
        .getDic('STOP_REASON_BANK')
        .subscribe(
          (reasonStoppingDic) => (this.reasonStoppingDic = reasonStoppingDic)
        );
    } else if (value === 3) {
      this.dicSub = this.lawsuitService
        .getDic('STOP_REASON_MIB')
        .subscribe(
          (reasonStoppingDic) => (this.reasonStoppingDic = reasonStoppingDic)
        );
    } else {
      this.dicSub = this.lawsuitService
        .getDic('STOP_REASON_COURT')
        .subscribe(
          (reasonStoppingDic) => (this.reasonStoppingDic = reasonStoppingDic)
        );
    }
  }

  toggleStopSuspendDateValidators(value: any, field: any): void {
    console.log(value, field);

    this.form.patchValue({
      stopSuspendDate: null,
    });
    if (
      value == 1 ||
      this.form.get('stopInitiator')?.value == 3 ||
      value == 3 ||
      this.form.get('stopType')?.value == 1
    ) {
      this.stopSuspendDate.disable();

      this.readonly = 'readonly';

      this.stopSuspendDate?.clearAsyncValidators();
    } else {
      this.stopSuspendDate.enable();
      this.readonly = '';

      this.stopSuspendDate?.setValidators(Validators.required);
    }

    this.stopSuspendDate?.updateValueAndValidity();
  }

  submit(actionId: number) {
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

    this.lawsuitService.apiFetch(data, 'mib/add/stop', actionId).subscribe(
      (actions) => {
        // this.lawsuitService.historyActions = actions;
        this.submitted = false;
        this.alert.success('Форма оформлена');
      },
      (error) => {
        this.submitted = false;
        // this.alert.danger('Форма не оформлена');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.stopTypeSub) {
      this.stopTypeSub.unsubscribe();
    }

    if (this.stopInitiatorSub) {
      this.stopInitiatorSub.unsubscribe();
    }

    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }
  }
}
