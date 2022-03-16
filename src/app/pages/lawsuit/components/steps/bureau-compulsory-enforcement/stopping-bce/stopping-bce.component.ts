import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
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

  reasonStoppingDic: any[] = [];

  readonly: string = '';

  stopSuspendDate!: any;
  stopReason!: any;

  dictionaries!: any;

  private stopTypeSub!: Subscription | undefined;
  private stopInitiatorSub!: Subscription | undefined;

  private dicSub!: Subscription;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    private dicService: DictionariesService,
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

    this.dicSub = this.dicService
      .getDicByActionId(this.action.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });

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

    if (!value) {
      this.reasonStoppingDic = [];
    } else if (value === 5) {
      this.reasonStoppingDic = this.dictionaries.stopReasonClient;
    } else if (value === 6) {
      this.reasonStoppingDic = this.dictionaries.stopReasonBank;
    } else if (value === 7) {
      this.reasonStoppingDic = this.dictionaries.stopReasonMib;
    } else {
      this.reasonStoppingDic = this.dictionaries.stopReasonCourt;
    }
  }

  toggleStopSuspendDateValidators(value: any, field: any): void {
    this.form.patchValue({
      stopSuspendDate: null,
    });
    if (
      value == 1 ||
      this.form.get('stopInitiator')?.value == 5 ||
      value == 5 ||
      this.form.get('stopType')?.value == 1
    ) {
      this.stopSuspendDate.disable();

      this.readonly = 'readonly';

      this.stopSuspendDate?.clearValidators();
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
      stopSuspendDate: this.form.value.stopSuspendDate?.singleDate?.formatted,
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
